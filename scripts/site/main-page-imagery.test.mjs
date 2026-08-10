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

function jsxOpeningElements(node, tagName) {
  return descendants(node).filter((child) =>
    (ts.isJsxOpeningElement(child) || ts.isJsxSelfClosingElement(child)) && child.tagName.getText() === tagName,
  );
}

function jsxAttribute(opening, name) {
  return opening.attributes.properties.find((attribute) => ts.isJsxAttribute(attribute) && attribute.name.text === name);
}

function jsxExpression(attribute, label) {
  assert.ok(attribute?.initializer && ts.isJsxExpression(attribute.initializer) && attribute.initializer.expression, `${label} must use a JSX expression`);
  return attribute.initializer.expression;
}

function jsxStringAttribute(opening, name, label) {
  const attribute = jsxAttribute(opening, name);
  assert.ok(attribute?.initializer && ts.isStringLiteral(attribute.initializer), `${label} must use a string literal`);
  return attribute.initializer.text;
}

function logicalAndExpression(node, condition, label) {
  const expression = descendants(node).find((child) =>
    ts.isBinaryExpression(child)
    && child.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
    && isIdentifier(child.left, condition),
  );
  assert.ok(expression, `${label} must be conditionally rendered by ${condition}`);
  return expression;
}

function assertCnClasses(opening, baseClass, condition, conditionalClass, label) {
  const expression = jsxExpression(jsxAttribute(opening, 'className'), `${label} className`);
  assert.ok(ts.isCallExpression(expression) && isIdentifier(expression.expression, 'cn'), `${label} must use cn`);
  assert.equal(literalString(expression.arguments[0], `${label} base class`), baseClass, `${label} must retain its base classes`);
  const conditional = expression.arguments[1];
  assert.ok(
    ts.isBinaryExpression(conditional)
      && conditional.operatorToken.kind === ts.SyntaxKind.AmpersandAmpersandToken
      && isIdentifier(conditional.left, condition),
    `${label} must retain its ${condition} class condition`,
  );
  assert.equal(literalString(conditional.right, `${label} conditional class`), conditionalClass, `${label} must retain its conditional classes`);
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
  exactKeys(editorialMembers, ['src', 'alt', 'caption', 'objectPosition'], 'EditorialImageData');
  for (const key of ['src', 'alt', 'caption']) {
    const member = editorialMembers.find((item) => nameOf(item.name) === key);
    assert.ok(member && !member.questionToken && member.type?.kind === ts.SyntaxKind.StringKeyword, `EditorialImageData.${key} must be a required string`);
  }
  const objectPosition = editorialMembers.find((item) => nameOf(item.name) === 'objectPosition');
  assert.ok(objectPosition?.questionToken && objectPosition.type?.kind === ts.SyntaxKind.StringKeyword, 'EditorialImageData.objectPosition must be an optional string');

  const imageSet = interfaceDeclaration(source, 'MainPageImageSet');
  exactKeys(imageSet.members.filter(ts.isPropertySignature), slots, 'MainPageImageSet');
  for (const member of imageSet.members) {
    assert.ok(ts.isPropertySignature(member) && !member.questionToken && ts.isTypeReferenceNode(member.type) && member.type.typeName.getText(source) === 'EditorialImageData', 'each MainPageImageSet slot must be required EditorialImageData');
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

test('EditorialMedia wires next/image, responsive sizing, reduced motion, and caption in JSX', () => {
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

  const figures = jsxOpeningElements(component.body, 'figure');
  assert.equal(figures.length, 1, 'EditorialMedia must render one figure');
  const figure = figures[0].parent;
  const images = jsxOpeningElements(figure, imageName);
  assert.equal(images.length, 1, 'EditorialMedia must render one next/image element');
  const image = images[0];
  assert.equal(propertyChain(jsxExpression(jsxAttribute(image, 'src'), 'next/image src')), 'image.src', 'next/image must receive src={image.src}');
  assert.equal(propertyChain(jsxExpression(jsxAttribute(image, 'alt'), 'next/image alt')), 'image.alt', 'next/image must receive alt={image.alt}');
  assert.ok(isIdentifier(jsxExpression(jsxAttribute(image, 'priority'), 'next/image priority'), 'priority'), 'next/image must receive priority={priority}');
  assert.equal(
    jsxStringAttribute(image, 'sizes', 'next/image sizes'),
    '(min-width: 1280px) 560px, (min-width: 1024px) 46vw, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)',
    'next/image sizes must match the responsive container widths',
  );
  const imageClasses = jsxStringAttribute(image, 'className', 'next/image className').split(/\s+/);
  assert.ok(imageClasses.includes('motion-safe:transition-transform'), 'image transform transition must be motion-safe');
  assert.ok(imageClasses.includes('motion-safe:duration-700'), 'image transition duration must be motion-safe');
  assert.ok(imageClasses.includes('motion-safe:ease-out'), 'image transition easing must be motion-safe');
  assert.ok(imageClasses.includes('motion-safe:group-hover:scale-[1.015]'), 'image hover scaling must be motion-safe');
  assert.ok(!imageClasses.includes('transition-transform'), 'image must not enable an ungated transform transition');
  assert.ok(!imageClasses.includes('group-hover:scale-[1.015]'), 'image must not enable ungated hover scaling');

  const captions = jsxOpeningElements(figure, 'figcaption');
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
  const heroContent = descendants(hero.body).find((node) => ts.isVariableDeclaration(node) && isIdentifier(node.name, 'heroContent'));
  assert.ok(heroContent?.initializer, 'Hero must define shared heroContent');
  const badge = logicalAndExpression(heroContent.initializer, 'badge', 'hero badge');
  const badgeSpans = jsxOpeningElements(badge.right, 'span');
  assert.equal(badgeSpans.length, 1, 'hero badge must render one span');
  assert.equal(jsxStringAttribute(badgeSpans[0], 'className', 'hero badge className'), 'section-badge animate-fade-in-up', 'hero badge must retain its classes');

  const headings = jsxOpeningElements(heroContent.initializer, 'h1');
  assert.equal(headings.length, 1, 'heroContent must contain one h1');
  assert.equal(
    jsxStringAttribute(headings[0], 'className', 'hero h1 className'),
    'animate-fade-in-up text-4xl font-extrabold leading-[1.05] tracking-tight text-slate-950 md:text-6xl lg:text-7xl',
    'hero h1 must retain its animation and typography classes',
  );

  const subtitle = logicalAndExpression(heroContent.initializer, 'subtitle', 'hero subtitle');
  const subtitleParagraphs = jsxOpeningElements(subtitle.right, 'p');
  assert.equal(subtitleParagraphs.length, 1, 'hero subtitle must render one paragraph');
  assertCnClasses(
    subtitleParagraphs[0],
    'mt-6 animate-fade-in-up text-lg leading-8 text-slate-600 md:text-xl',
    'centered',
    'mx-auto max-w-3xl',
    'hero subtitle',
  );

  const children = logicalAndExpression(heroContent.initializer, 'children', 'hero children');
  const childrenWrappers = jsxOpeningElements(children.right, 'div');
  assert.equal(childrenWrappers.length, 1, 'hero children must render one flex wrapper');
  assertCnClasses(
    childrenWrappers[0],
    'mt-8 flex flex-wrap gap-4 animate-fade-in-up',
    'centered',
    'justify-center',
    'hero children wrapper',
  );

  const stats = logicalAndExpression(heroContent.initializer, 'showStats', 'hero stats');
  const statsWrappers = jsxOpeningElements(stats.right, 'div');
  assert.ok(statsWrappers.length > 0, 'hero stats must render a grid wrapper');
  assertCnClasses(
    statsWrappers[0],
    'mt-10 grid gap-4 animate-fade-in-up sm:grid-cols-3',
    'centered',
    'mx-auto max-w-3xl',
    'hero stats grid',
  );
  assert.ok(descendants(stats.right).some((node) => ts.isCallExpression(node) && propertyChain(node.expression) === 'defaultStats.map'), 'hero stats grid must render defaultStats');

  assert.equal(jsxOpeningElements(hero.body, 'h1').length, 1, 'Hero must render exactly one h1');
  const branches = descendants(hero.body).filter((node) => ts.isConditionalExpression(node) && isIdentifier(node.condition, 'editorialImage'));
  assert.equal(branches.length, 1, 'Hero must have one editorialImage conditional branch');
  const branch = branches[0];
  const editorialMedia = jsxOpeningElements(branch.whenTrue, 'EditorialMedia');
  assert.equal(editorialMedia.length, 1, 'editorialImage branch must render EditorialMedia once');
  assert.ok(hasEnabledPriority(editorialMedia[0]), 'Hero editorial EditorialMedia must enable priority');
  assert.ok(isIdentifier(jsxExpression(jsxAttribute(editorialMedia[0], 'image'), 'Hero EditorialMedia image'), 'editorialImage'), 'Hero EditorialMedia must receive editorialImage');
  for (const [label, content] of [['editorial', branch.whenTrue], ['fallback', branch.whenFalse]]) {
    assert.ok(descendants(content).some((node) => ts.isJsxExpression(node) && isIdentifier(node.expression, 'heroContent')), `Hero ${label} branch must render {heroContent}`);
  }

  const centeredWrappers = jsxOpeningElements(branch.whenFalse, 'div').filter((opening) => {
    const className = jsxAttribute(opening, 'className');
    return className?.initializer && ts.isJsxExpression(className.initializer) && descendants(className.initializer).some((node) => ts.isConditionalExpression(node) && isIdentifier(node.condition, 'centered'));
  });
  assert.equal(centeredWrappers.length, 1, 'Hero fallback must retain its centered wrapper');
  const fallbackClasses = jsxExpression(jsxAttribute(centeredWrappers[0], 'className'), 'Hero fallback className');
  assert.ok(ts.isCallExpression(fallbackClasses) && isIdentifier(fallbackClasses.expression, 'cn'), 'Hero fallback wrapper must use cn');
  assert.equal(literalString(fallbackClasses.arguments[0], 'Hero fallback base class'), 'relative', 'Hero fallback wrapper must remain relative');
  const centeredClasses = fallbackClasses.arguments[1];
  assert.ok(ts.isConditionalExpression(centeredClasses) && isIdentifier(centeredClasses.condition, 'centered'), 'Hero fallback wrapper must retain its centered conditional');
  assert.equal(literalString(centeredClasses.whenTrue, 'Hero centered classes'), 'mx-auto max-w-4xl text-center', 'Hero centered fallback classes must be preserved');
  assert.equal(literalString(centeredClasses.whenFalse, 'Hero default classes'), 'max-w-3xl', 'Hero default fallback classes must be preserved');
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
