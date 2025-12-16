# Component Guidelines

## Core Principles
1. **Mobile First**: Design for small screens then enhance for desktop.
2. **SEO Optimized**: Use semantic HTML tags (`<nav>`, `<article>`, `<aside>`).
3. **Performance**: Minimize client-side JavaScript. Use Server Components where possible.

## Standard Components

### Button
- **Usage**: Primary actions (CTAs).
- **SEO**: Ensure `aria-label` is present if the button text isn't descriptive enough.

### Image
- **Usage**: All images must use `next/image`.
- **Requirements**:
  - `alt`: Mandatory descriptive text.
  - `width/height`: Must be specified to prevent Layout Shift (CLS).
  - `priority`: Use for LCP (Largest Contentful Paint) images (e.g., Hero image).

### Cards (Service/Feature)
- **Structure**:
  ```tsx
  <article>
    <h3>Title</h3>
    <p>Description</p>
    <a href="...">Read more</a>
  </article>
  ```
