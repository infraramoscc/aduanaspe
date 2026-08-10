import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import test from 'node:test';
import ts from 'typescript';

const root = process.cwd();
const pages = ['home', 'services', 'trade', 'about'];
const slots = ['hero', 'middle', 'lower'];
const assetNames = pages.flatMap((page) => slots.map((slot) => `${page}-${slot}.webp`));

function readRequired(path) {
  const absolute = join(root, path);
  assert.ok(existsSync(absolute), `${path} must exist`);
  return readFileSync(absolute, 'utf8');
}

function parse(path) {
  return ts.createSourceFile(path, readRequired(path), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
}

function descendants(node) {
  const nodes = [];
  const visit = (child) => {
    nodes.push(child);
    ts.forEachChild(child, visit);
  };
  ts.forEachChild(node, visit);
  return nodes;
}

function nameOf(node) {
  return node && (ts.isIdentifier(node) || ts.isStringLiteral(node) || ts.isNumericLiteral(node))
    ? node.text
    : undefined;
}

function unwrap(node) {
  while (ts.isParenthesizedExpression(node) || ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) {
    node = node.expression;
  }
  return node;
}

function objectProperties(node, label) {
  node = unwrap(node);
  assert.ok(ts.isObjectLiteralExpression(node), `${label} must be an object literal`);
  return node.properties.filter(ts.isPropertyAssignment);
}

function exactKeys(properties, expected, label) {
  const actual = properties.map((property) => nameOf(property.name)).sort();
  assert.deepEqual(actual, [...expected].sort(), `${label} must contain exactly ${expected.join(', ')}`);
}

function property(properties, key, label) {
  const match = properties.find((item) => nameOf(item.name) === key);
  assert.ok(match, `${label}.${key} must exist`);
  return match;
}

function literalString(node, label) {
  node = unwrap(node);
  assert.ok(ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node), `${label} must be a string literal`);
  assert.ok(node.text.trim(), `${label} must not be empty`);
  return node.text;
}

function interfaceDeclaration(source, name) {
  const declaration = source.statements.find((statement) => ts.isInterfaceDeclaration(statement) && statement.name.text === name);
  assert.ok(declaration, `interface ${name} must exist`);
  return declaration;
}

function isExported(node) {
  return node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword) ?? false;
}

function jsxOpeningElements(source, tagName) {
  return descendants(source).filter((node) =>
    (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) && node.tagName.getText(source) === tagName,
  );
}

function jsxAttribute(opening, name) {
  return opening.attributes.properties.find((attribute) => ts.isJsxAttribute(attribute) && attribute.name.text === name);
}

function jsxExpression(attribute, label) {
  assert.ok(attribute?.initializer && ts.isJsxExpression(attribute.initializer) && attribute.initializer.expression, `${label} must use a JSX expression`);
  return attribute.initializer.expression;
}

function propertyChain(node) {
  if (!ts.isPropertyAccessExpression(node)) return undefined;
  const names = [];
  let current = node;
  while (ts.isPropertyAccessExpression(current)) {
    names.unshift(current.name.text);
    current = current.expression;
  }
  if (!ts.isIdentifier(current)) return undefined;
  names.unshift(current.text);
  return names.join('.');
}

function isIdentifier(node, text) {
  return ts.isIdentifier(node) && node.text === text;
}

function hasEnabledPriority(opening) {
  const priority = jsxAttribute(opening, 'priority');
  if (!priority) return false;
  if (!priority.initializer) return true;
  if (!ts.isJsxExpression(priority.initializer)) return false;
  return priority.initializer.expression?.kind === ts.SyntaxKind.TrueKeyword;
}

test('all twelve main-page WebP images are exact, valid, and lightweight', () => {
  const directory = join(root, 'public/images/main-pages');
  assert.ok(existsSync(directory), 'public/images/main-pages must exist');
  assert.ok(statSync(directory).isDirectory(), 'public/images/main-pages must be a directory');

  const webpFiles = readdirSync(directory)
    .filter((file) => file.endsWith('.webp') && statSync(join(directory, file)).isFile())
    .sort();
  assert.deepEqual(webpFiles, [...assetNames].sort(), 'main-page WebP filenames must match the 12-image contract exactly');

  for (const asset of assetNames) {
    const absolute = join(directory, asset);
    const size = statSync(absolute).size;
    const header = readFileSync(absolute).subarray(0, 12);
    assert.equal(header.subarray(0, 4).toString('ascii'), 'RIFF', `${asset} must have a RIFF header`);
    assert.equal(header.subarray(8, 12).toString('ascii'), 'WEBP', `${asset} must have a WEBP signature`);
    assert.ok(size > 20_000, `${asset} must exceed 20 KB`);
    assert.ok(size < 280_000, `${asset} must stay below 280 KB`);
  }
});

test('image registry is typed and maps exact semantic image metadata', () => {
  const source = parse('src/content/mainPageImages.ts');
  const editorial = interfaceDeclaration(source, 'EditorialImageData');
  assert.ok(isExported(editorial), 'EditorialImageData must be exported');
  const editorialMembers = editorial.members.filter(ts.isPropertySignature);
  for (const key of ['src', 'alt', 'caption']) {
    const member = editorialMembers.find((item) => nameOf(item.name) === key);
    assert.ok(member && member.type?.kind === ts.SyntaxKind.StringKeyword, `EditorialImageData.${key} must be a string`);
  }

  const imageSet = interfaceDeclaration(source, 'MainPageImageSet');
  exactKeys(imageSet.members.filter(ts.isPropertySignature), slots, 'MainPageImageSet');
  for (const member of imageSet.members) {
    assert.ok(ts.isPropertySignature(member) && ts.isTypeReferenceNode(member.type) && member.type.typeName.getText(source) === 'EditorialImageData', 'each MainPageImageSet slot must use EditorialImageData');
  }

  const declaration = source.statements
    .filter(ts.isVariableStatement)
    .flatMap((statement) => [...statement.declarationList.declarations])
    .find((item) => ts.isIdentifier(item.name) && item.name.text === 'mainPageImages');
  assert.ok(declaration?.initializer, 'mainPageImages must be initialized');
  assert.ok(isExported(declaration.parent.parent), 'mainPageImages must be exported');
  assert.ok(ts.isTypeReferenceNode(declaration.type) && declaration.type.typeName.getText(source) === 'Record', 'mainPageImages must use Record typing');
  const [pageType, setType] = declaration.type.typeArguments ?? [];
  assert.ok(ts.isUnionTypeNode(pageType), 'mainPageImages Record keys must be a page union');
  assert.deepEqual(pageType.types.map((item) => ts.isLiteralTypeNode(item) && ts.isStringLiteral(item.literal) ? item.literal.text : '').sort(), [...pages].sort(), 'mainPageImages Record must list exact page keys');
  assert.ok(ts.isTypeReferenceNode(setType) && setType.typeName.getText(source) === 'MainPageImageSet', 'mainPageImages Record values must use MainPageImageSet');

  const pageProperties = objectProperties(declaration.initializer, 'mainPageImages');
  exactKeys(pageProperties, pages, 'mainPageImages');
  for (const page of pages) {
    const slotProperties = objectProperties(property(pageProperties, page, 'mainPageImages').initializer, `mainPageImages.${page}`);
    exactKeys(slotProperties, slots, `mainPageImages.${page}`);
    for (const slot of slots) {
      const metadata = objectProperties(property(slotProperties, slot, `mainPageImages.${page}`).initializer, `mainPageImages.${page}.${slot}`);
      for (const key of ['src', 'alt', 'caption']) {
        assert.ok(metadata.some((item) => nameOf(item.name) === key), `mainPageImages.${page}.${slot}.${key} must exist`);
      }
      assert.equal(literalString(property(metadata, 'src', `mainPageImages.${page}.${slot}`).initializer, `${page}.${slot}.src`), `/images/main-pages/${page}-${slot}.webp`, `${page}.${slot}.src must use its semantic asset`);
      literalString(property(metadata, 'alt', `mainPageImages.${page}.${slot}`).initializer, `${page}.${slot}.alt`);
      literalString(property(metadata, 'caption', `mainPageImages.${page}.${slot}`).initializer, `${page}.${slot}.caption`);
    }
  }
  assert.doesNotMatch(readRequired('src/content/mainPageImages.ts'), /\b(?:cliente(?:s)?|caso(?:s)?|operaci[o\u00f3]n(?:es)?|env[i\u00ed]o(?:s)?|embarque(?:s)?|terminal(?:es)?)\s+real(?:es)?\b/i, 'registry must not present generated imagery as real evidence');
});

test('EditorialMedia wires next/image, priority, sizes, and caption in JSX', () => {
  const source = parse('src/components/sections/EditorialMedia.tsx');
  const imageImport = source.statements.find((statement) => ts.isImportDeclaration(statement) && ts.isStringLiteral(statement.moduleSpecifier) && statement.moduleSpecifier.text === 'next/image');
  const imageName = imageImport?.importClause?.name?.text;
  assert.ok(imageName, 'EditorialMedia must default-import next/image');

  const component = source.statements.find((statement) => ts.isFunctionDeclaration(statement) && statement.name?.text === 'EditorialMedia');
  assert.ok(component?.body, 'EditorialMedia component must exist');
  const priorityBinding = component.parameters[0]?.name;
  assert.ok(ts.isObjectBindingPattern(priorityBinding), 'EditorialMedia props must be destructured');
  const priorityElement = priorityBinding.elements.find((element) => nameOf(element.name) === 'priority');
  assert.ok(priorityElement?.initializer?.kind === ts.SyntaxKind.FalseKeyword, 'EditorialMedia must default priority to false');

  const images = jsxOpeningElements(component.body, imageName);
  assert.equal(images.length, 1, 'EditorialMedia must render one next/image element');
  const image = images[0];
  assert.ok(isIdentifier(jsxExpression(jsxAttribute(image, 'priority'), 'next/image priority'), 'priority'), 'next/image must receive priority={priority}');
  assert.ok(jsxAttribute(image, 'sizes'), 'next/image must receive sizes');

  const figures = jsxOpeningElements(component.body, 'figure');
  assert.equal(figures.length, 1, 'EditorialMedia must render one figure');
  const captions = jsxOpeningElements(component.body, 'figcaption');
  assert.equal(captions.length, 1, 'EditorialMedia must render one figcaption');
  const captionExpression = descendants(captions[0].parent).find((node) => ts.isJsxExpression(node) && propertyChain(node.expression) === 'image.caption');
  assert.ok(captionExpression, 'figcaption must render {image.caption}');
});

test('Hero renders editorial media conditionally and preserves the centered fallback', () => {
  const source = parse('src/components/sections/Hero.tsx');
  const props = interfaceDeclaration(source, 'HeroProps');
  const editorial = props.members.find((member) => ts.isPropertySignature(member) && nameOf(member.name) === 'editorialImage');
  assert.ok(editorial?.questionToken && ts.isTypeReferenceNode(editorial.type) && editorial.type.typeName.getText(source) === 'EditorialImageData', 'HeroProps.editorialImage must be optional EditorialImageData');

  const hero = source.statements.find((statement) => ts.isFunctionDeclaration(statement) && statement.name?.text === 'Hero');
  assert.ok(hero?.body, 'Hero component must exist');
  const branches = descendants(hero.body).filter((node) => ts.isConditionalExpression(node) && isIdentifier(node.condition, 'editorialImage'));
  assert.equal(branches.length, 1, 'Hero must have one editorialImage conditional branch');
  const branch = branches[0];
  const editorialMedia = jsxOpeningElements(branch.whenTrue, 'EditorialMedia');
  assert.equal(editorialMedia.length, 1, 'editorialImage branch must render EditorialMedia once');
  assert.ok(hasEnabledPriority(editorialMedia[0]), 'Hero editorial EditorialMedia must enable priority');
  assert.ok(isIdentifier(jsxExpression(jsxAttribute(editorialMedia[0], 'image'), 'Hero EditorialMedia image'), 'editorialImage'), 'Hero EditorialMedia must receive editorialImage');

  const centeredWrappers = jsxOpeningElements(branch.whenFalse, 'div').filter((opening) => {
    const className = jsxAttribute(opening, 'className');
    return className?.initializer && ts.isJsxExpression(className.initializer) && descendants(className.initializer).some((node) => ts.isConditionalExpression(node) && isIdentifier(node.condition, 'centered'));
  });
  assert.equal(centeredWrappers.length, 1, 'Hero fallback must retain its centered wrapper');
  assert.equal(jsxOpeningElements(hero.body, 'h1').length, 1, 'Hero must render exactly one h1');
});

test('each principal page wires exactly three registered images into real JSX components', () => {
  const routes = {
    home: 'src/app/(site)/page.tsx',
    services: 'src/app/(site)/servicios/page.tsx',
    trade: 'src/app/(site)/comercio-exterior/page.tsx',
    about: 'src/app/(site)/quienes-somos/page.tsx',
  };

  for (const [page, route] of Object.entries(routes)) {
    const source = parse(route);
    for (const slot of slots) {
      const target = `mainPageImages.${page}.${slot}`;
      const references = descendants(source).filter((node) => propertyChain(node) === target);
      assert.equal(references.length, 1, `${route} must reference ${target} exactly once`);
    }

    const hero = jsxOpeningElements(source, 'Hero').filter((opening) => propertyChain(jsxExpression(jsxAttribute(opening, 'editorialImage'), 'Hero editorialImage')) === `mainPageImages.${page}.hero`);
    assert.equal(hero.length, 1, `${route} must pass ${page}.hero to Hero.editorialImage exactly once`);
    for (const slot of ['middle', 'lower']) {
      const media = jsxOpeningElements(source, 'EditorialMedia').filter((opening) => propertyChain(jsxExpression(jsxAttribute(opening, 'image'), 'EditorialMedia image')) === `mainPageImages.${page}.${slot}`);
      assert.equal(media.length, 1, `${route} must pass ${page}.${slot} to EditorialMedia exactly once`);
    }
  }
});
