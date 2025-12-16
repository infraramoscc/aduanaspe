# SEQ & UX Guidelines

## User Experience (UX)
The goal is to provide a seamless, high-performance experience that retains users.

### Core Web Vitals targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

### Mobile Responsiveness
- All pages must be fully functional on devices as small as 320px width.
- Touch targets (buttons, links) must be at least 44x44px.

## Technical SEO for UI
- **Headings**: Use one `H1` per page. Use `H2` through `H6` for hierarchy.
- **Links**: Use `next/link` for internal navigation. meaningful `href` text (avoid "click here").
- **Accessibility**:
  - Contrast ratio at least 4.5:1 for normal text.
  - Focus states must be visible.
