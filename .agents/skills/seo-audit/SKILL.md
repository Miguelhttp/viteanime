---
name: seo-audit
description: Audits a web project for SEO best practices, identifying what is already implemented and what needs improvement. Use when the user wants to analyze, verify, or improve the SEO of a web project — including checking meta tags, Open Graph, semantic HTML, Core Web Vitals, structured data, sitemap, robots.txt, and accessibility. Also use when the user shares HTML, React/Next.js components, or a project structure and wants to know if SEO is correct. Always generate a complete report with a score and prioritized recommendations at the end.
---

# SEO Audit Skill

Audit a web project for SEO techniques and resources, identify what is already implemented correctly, what is missing, and what can be improved. Generate a complete report at the end.

## How to perform the audit

Before starting, identify what the user provided:

- Source code (HTML, JSX, TSX, components)
- Project URL (live site)
- Stack (Next.js, React, Vite, plain HTML, etc.)
- Project type (blog, e-commerce, portfolio, SaaS, landing page)

If none of the above was provided, ask for at least one before proceeding. For Next.js/React projects, request `_document.tsx`, `layout.tsx`, `Head` components, and main pages.

## Audit checklist

Evaluate each item with a status:

- ✅ **Implemented** — present and correct
- ⚠️ **Partial** — exists but has issues
- ❌ **Missing** — not found
- 🔵 **N/A** — not applicable to this project

### Essential meta tags

- `<title>` unique per page — is it present? Between 50–60 characters?
- `<meta name="description">` — is it present? Between 150–160 characters?
- `<meta name="robots">` — correct for pages that should be indexed?
- `<meta name="viewport">` — `width=device-width, initial-scale=1` present?
- `<meta charset="UTF-8">` — declared?
- `<html lang="...">` — language correctly defined?
- Canonical URL `<link rel="canonical">` — preventing duplicate content?

### Open Graph & Twitter Cards

- `og:title` — present and relevant?
- `og:description` — present?
- `og:image` — image with minimum dimensions 1200x630px?
- `og:url` — correct canonical URL?
- `og:type` — `website`, `article`, etc. defined?
- `twitter:card` — `summary_large_image` or equivalent?
- `twitter:title` / `twitter:description` — present?

### Semantic HTML structure

- Heading hierarchy (`h1` → `h6`) — only 1 `<h1>` per page? Logical hierarchy?
- Semantic tags — `<header>`, `<main>`, `<footer>`, `<nav>`, `<article>`, `<section>` in use?
- `alt` attribute on images — all images with descriptive `alt`?
- Links with descriptive text — avoiding "click here" / "learn more"?

### Performance & Core Web Vitals

- LCP (Largest Contentful Paint) — hero image with `loading="eager"` + `fetchpriority="high"`?
- CLS (Cumulative Layout Shift) — explicit dimensions on images/videos?
- FID/INP (Interaction) — blocking JavaScript minimized?
- Lazy loading — `loading="lazy"` on below-the-fold images?
- Image compression — WebP/AVIF in use?
- Asset minification — CSS/JS minified in production?
- Cache headers — configured on server/CDN?

### Links & navigation

- Internal links — coherent internal linking structure?
- `rel="noopener noreferrer"` — on external links with `target="_blank"`?
- Breadcrumbs — implemented on sites with hierarchy?
- Broken links — no 404 links?

### Crawl files

- `robots.txt` — exists and correctly configured?
- `sitemap.xml` — generated and referenced in robots.txt?
- `manifest.json` — present for PWA/mobile?
- `favicon` — `.ico` + versions for different devices?

### Structured data (Schema.org)

- JSON-LD implemented — `<script type="application/ld+json">` present?
- Type appropriate to the project — `WebSite`, `Article`, `Product`, `Organization`, `BreadcrumbList`?
- Validation — no errors in the [Rich Results Test](https://search.google.com/test/rich-results)?

### URLs & routing

- Friendly URLs — no unnecessary parameters, with keywords?
- HTTPS — site served over HTTPS?
- www → non-www redirect (or vice versa) — configured consistently?
- Custom 404 — custom error page?

### Accessibility (SEO impact)

- Color contrast — minimum ratio 4.5:1 for normal text?
- Keyboard navigation — site navigable without mouse?
- ARIA labels — `aria-label` on interactive elements without visible text?
- `<button>` vs clickable `<div>` — interactive elements semantically correct?

## Adjustments by project type

After the checklist, tailor recommendations to the identified project type:

- **Blog/Content:** Focus on `Article` schema, `og:article`, heading structure, articles sitemap.
- **E-commerce:** Focus on `Product` schema, price/availability structured data, breadcrumbs, canonical for variants.
- **Portfolio/Landing Page:** Focus on `Person`/`Organization` schema, Open Graph for sharing, mobile performance.
- **SaaS/App:** Focus on `WebApplication` schema, meta robots per route (avoid indexing `/dashboard`), sitemap of public pages.

## How to generate the final report

After completing the audit, produce the report in this exact structure:

```
## 📊 SEO Audit Report — [Project Name]

**Date:** [current date]
**Stack:** [identified stack]
**Type:** [project type]

---

### Score

Overall: [X/100]

| Category                | Score  | Bar          |
|-------------------------|--------|--------------|
| Essential Meta Tags     | XX/10  | ████████░░   |
| Open Graph & Social     | XX/10  | ██████░░░░   |
| Semantic Structure      | XX/10  | ███████░░░   |
| Performance             | XX/10  | █████░░░░░   |
| Links & Navigation      | XX/10  | ████████░░   |
| Crawl Files             | XX/10  | ███░░░░░░░   |
| Structured Data         | XX/10  | ██░░░░░░░░   |
| URLs & HTTPS            | XX/10  | █████████░   |
| Accessibility           | XX/10  | ██████░░░░   |
| Project Type Fit        | XX/10  | ████░░░░░░   |

---

### ✅ What is good

- [correctly implemented item]
- [correctly implemented item]

### ⚠️ Needs improvement (medium impact)

- [problem] → [suggested fix with code snippet if applicable]

### ❌ Critical — fix now (high ranking impact)

- [critical problem] → [fix with code example]

### 🚀 Quick wins (easy + high return)

1. [quick action with highest impact]
2. [quick action with highest impact]
3. [quick action with highest impact]

### 💡 Advanced recommendations

- [long-term improvements / advanced optimizations]

### 🔧 Suggested monitoring tools

- Google Search Console — indexing and errors
- PageSpeed Insights — Core Web Vitals
- Rich Results Test — Structured Data
- Screaming Frog / Ahrefs — large-scale audit

---

**Next recommended step:** [1 objective and immediate action]
```

## Rules for providing feedback

- Be direct — point out problems without hedging, but stay constructive.
- Show code — when suggesting a fix, include the correct snippet.
- Prioritize by impact — order recommendations by ranking impact, not ease of implementation.
- Match the stack — for Next.js use `next/head` or `metadata` API (App Router); for React use `react-helmet`; for plain HTML, direct tags.
- Do not invent data — if there is not enough information to evaluate an item, mark it as `🔵 N/A` and state what would need to be checked.
- Fair scoring — calculate the score based on verifiable items only. N/A items neither penalize nor add points.

## Code fix examples

Use these as reference when suggesting corrections.

**Generic or missing `<title>`:**

```html
<!-- Bad -->
<title>Home</title>

<!-- Good -->
<title>My Project | Front-End Developer React & TypeScript</title>
```

**Incomplete Open Graph (Next.js App Router):**

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  title: "My Project",
  description: "Clear description with main keyword.",
  openGraph: {
    title: "My Project",
    description: "Clear description with main keyword.",
    url: "https://myproject.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "My Project",
    description: "Clear description with main keyword.",
    images: ["/og-image.png"],
  },
};
```

**Image missing `alt`:**

```html
<!-- Bad -->
<img src="/hero.png" />

<!-- Good -->
<img
  src="/hero.png"
  alt="Financial management system dashboard"
  width="800"
  height="450"
/>
```

**Missing JSON-LD:**

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "My Project",
    "url": "https://myproject.com"
  }
</script>
```
