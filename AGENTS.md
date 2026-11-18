# Front-End Template Standard — HTML, CSS, Tailwind or Bootstrap

Single source of truth for AI coding agents building sellable front-end templates. Save it as `AGENTS.md` (or `@`-import it from `CLAUDE.md`) in the project root. Everything below is mandatory unless `PROJECT_SPEC` (Appendix A) lists an approved exception.

## 1. Goal and scope
Build a premium, fast, SEO-ready, source-editable website template made of static pages: HTML, CSS and vanilla JS, styled with **Tailwind CSS or Bootstrap** (one per project). The buyer is usually a developer, agency or site owner who edits the files directly or adapts them to another platform.

Quality bar: every file should look like it was written by one senior developer who cares: consistent, minimal, readable, fast. If a senior reviewer would not merge it, fix it.

Optional modules, enabled only in the spec: **dark mode** (section 15) and **blog** (section 16).

Out of scope unless the brief says so: CMS themes, backends, databases, SaaS apps, framework apps (React, Vue and similar).

## 2. Priority and workflow
Priority: explicit current instructions > this file > `PROJECT_SPEC` > sensible defaults. A rule here may be waived only by an entry under "Approved exceptions" in the spec. If requirements conflict or change scope, stack, design, dependencies or delivery, state the conflict and ask.

1. **Reading the standard:** change nothing. Reply in 10 lines or fewer (understanding, conflicts, questions), then wait for the brief.
2. **New template:** after the brief, complete or propose the spec (Appendix A) and present a plan: stack choice with reason, page inventory, SEO structure (URL plan, title pattern, heading outline, schema map), design direction and tokens, performance budget, shared components, whether blog and dark mode are in scope, risks. Ask only essential questions.
3. **Roadmap:** turn the approved plan into `ROADMAP.md` (section 2.1, template in Appendix C). **Do not code until both the plan and the roadmap are approved.**
4. **Building:** follow the roadmap in order: shared layout first (tokens, header, footer, base styles), then review, then pages in groups, then QA. Keep existing work; ask before broad or destructive changes.
5. **Small changes** (fixes, copy, one-file edits): do them directly and report.

### 2.1 Roadmap
Before any code, break the whole project into tasks and write them to `ROADMAP.md` in the project root. It is an internal file and never ships.
- Cover everything from setup to the final package, in phases: 0 setup and tooling; 1 design system and tokens; 2 shared layout (header, footer, base components); 3 pages (one task per page or component group, including blog and dark mode when in scope); 4 JavaScript behavior; 5 SEO files and schema; 6 performance pass; 7 accessibility and RTL pass; 8 QA; 9 docs and packaging; 10 final report.
- Every task has an ID, a short title, dependencies, the files it touches and a measurable "done when". Keep each task small enough to finish and verify in one sitting.
- Work in roadmap order. Mark a task `[x]` only after its "done when" was actually verified. Add newly discovered tasks instead of silently doing them. Scope changes need approval and go in the decision log.
- Stop for review after phase 2 (shared layout) and again before phase 8 (QA).
- When a session starts or resumes, read `AGENTS.md` and `ROADMAP.md` first and continue from the first unchecked task.

## 3. Choosing the stack
Decide in the plan, once, and never mix.

| | Tailwind CSS | Bootstrap |
|---|---|---|
| Best for | a custom, distinctive design; smallest CSS | familiar grid and components; quick adaptation by buyers |
| Risk | needs a build step; class-heavy markup | the generic "Bootstrap look"; heavy CSS if used whole |
| Rule | default choice for a unique, fast result | customize deeply and import only what is used |

Use the **current stable major version** at project start, confirmed from the official docs, and pin it. Follow that version's official setup (for example Tailwind's CSS-first or config-file setup depending on the major). Never mix conventions of two majors.

No CDN builds in production (no Tailwind Play CDN, no Bootstrap CDN). No jQuery.

## 4. Project and package structure
Working repository (the buyer never sees this part):
```text
repo/
├── AGENTS.md
├── PROJECT_SPEC.md
├── ROADMAP.md
├── source/          # build inputs, config, package.json, lockfile
└── release/         # the clean customer package
```

Customer package (plain files that open straight from disk, no build needed to view):
```text
index.html
404.html
pages/
assets/
├── css/             # compiled, minified style file
├── js/
├── images/
├── fonts/
robots.txt
sitemap.xml
docs/                # how to edit, rebuild, replace placeholders
source/              # only when a build step exists
LICENSES.txt
CHANGELOG.md
```

Rules:
- Relative paths only, so the template works from any folder and from `file://`.
- Lowercase ASCII file names with hyphens (`about-us.html`, `hero-bg.webp`). No spaces, no Persian or uppercase names.
- Do not create empty folders or files without a purpose.
- With a build step, `source/` holds `package.json`, a lockfile, configs, `npm run dev` and `npm run build` scripts and an `engines` or `.nvmrc` entry. The released CSS and JS are compiled outputs and the buyer can rebuild from `source/`.

## 5. Code quality
- **Clean code:** one responsibility per file, function and component. Small units, clear names, no dead code, no duplication, no leftovers (unused CSS, JS, images, fonts, dependencies).
- **Naming:** descriptive and consistent. HTML IDs and classes in lowercase kebab-case. Custom component classes follow BEM (`card`, `card__title`, `card--featured`). JS names in camelCase, constants in UPPER_SNAKE only for real constants.
- **DRY with tokens:** colors, type scale, spacing, radii, shadows, z-index and breakpoints exist once as design tokens. No magic numbers.
- **Formatting:** consistent indentation and line length across the project; run Prettier (with the Tailwind class-sorting plugin when Tailwind is used), Stylelint and ESLint whenever a build exists. Optional but recommended: html-validate or the W3C validator.
- **Modern but safe:** use web platform features that are Baseline widely available. Check support before using anything newer; use newer features only as progressive enhancement.
- **No over-engineering:** no frameworks, no abstraction layers, no clever tricks that need explanation.

## 6. Comments
Comment like a working developer: rarely, briefly, plainly.
- **English only. Never Persian, Arabic or any other non-English text in a code comment.**
- Short (one line wherever possible). Explain **why** (a workaround, a browser quirk, a non-obvious decision, a required order), never what the code already says.
- Allowed: short section markers (`<!-- Hero -->`, `/* Header */`) and a plain license line on third-party files.
- Not allowed: commented-out code, leftover TODO or FIXME, banner or ASCII-art dividers, emoji, author or date stamps, change-log comments, narration such as "This function handles…", long paragraphs, comments that restate the code.
- Visible content (headings, text, `alt`, `title`, meta) may be Persian when the project language is Persian. That is content, not a comment.

## 7. HTML
- HTML5 with correct `lang` and `dir` on `<html>`, `<meta charset="utf-8">` first in `<head>`, and `<meta name="viewport" content="width=device-width, initial-scale=1">`. Never block zoom (`user-scalable=no`, `maximum-scale=1`).
- Semantic landmarks: `header`, `nav`, `main` (one per page), `section` with a heading, `article`, `aside`, `footer`. No `div` where a semantic element exists.
- One `h1` per page, then `h2` and `h3` in order without skipping levels. Headings describe content, not size.
- `<a>` navigates, `<button>` acts. Descriptive link text (never "click here"). External links that open a new tab carry `rel="noopener noreferrer"`.
- Forms: a `<label>` for every control, correct `type`, `name`, `autocomplete` and `inputmode`, visible error text linked with `aria-describedby`. No placeholder-only labels.
- Prefer native elements: `<details>`, `<dialog>`, `<picture>`, `<button>`.
- Unique IDs, valid nesting, no inline `style`, no inline event handlers, no deprecated tags or attributes, no needless wrappers.
- Essential content is in the HTML, never injected by JS.
- Every page has the same header, footer and navigation markup, easy to find and copy.
- The `<head>` follows the pattern in Appendix B.

## 8. CSS
General:
- Mobile-first. Fluid where it helps (`clamp()`, `min()`, `max()`), Grid and Flexbox with `gap`, `aspect-ratio` for media.
- Logical properties (`margin-inline`, `padding-block`, `inset-inline-start`) instead of left and right.
- Low specificity: class selectors only, no IDs for styling, nesting no deeper than 3, no `!important` except to beat third-party inline styles (and then commented).
- Use `rem` for type and spacing, `px` for hairlines and borders, unitless `line-height`.
- No `@import` chains in shipped CSS (extra requests). One compiled, minified stylesheet is the default.
- No manual vendor prefixes (let the build's autoprefixing do it). No unused rules, resets or utilities.
- Always provide `:focus-visible` styles, `prefers-reduced-motion` handling, and hover, active and disabled states for interactive items.
- Dark mode follows section 15.

Tailwind:
- Put brand tokens (colors, fonts, spacing, radii, breakpoints) in the theme configuration. No scattered arbitrary values such as `w-[437px]`; extend the theme instead.
- Class order is enforced by the Prettier plugin. A pattern repeated three or more times becomes a component class, partial or macro, not a longer class list. Use `@apply` sparingly and only inside the components layer.
- Class names are written in full (no dynamic string assembly). Source scanning covers every HTML and JS file.
- Use logical utilities (`ms-`, `me-`, `ps-`, `pe-`, `start-`, `end-`) and `rtl:` or `ltr:` variants for direction.
- Remove unused plugins and presets. Output is purged and minified.

Bootstrap:
- Use the Sass source, not the prebuilt CSS. Override variables, import only the components, utilities and JS plugins that are actually used, and compile with Dart Sass into one stylesheet.
- Customize deeply (type, color, radius, spacing, components) so the result does not look like default Bootstrap.
- Override through Sass variables and `--bs-*` custom properties, never with `!important` or deep selectors. Put custom components in their own partials.
- RTL projects use Bootstrap's RTL build or RTLCSS output with `dir="rtl"`.

## 9. JavaScript
- Vanilla ES modules or one small file, loaded with `defer` (or `type="module"`), at the end of `<head>` or `<body>`. No jQuery, no polyfills for features that are Baseline widely available.
- `const` and `let` only. Small functions with clear names. No globals; no inline handlers. Hook behavior to `data-*` attributes, not styling classes.
- One entry file initializes each module only if its element exists, so every script is safe on pages that lack the component.
- Use event delegation, passive listeners for scroll and touch, `IntersectionObserver` instead of scroll handlers, and `requestAnimationFrame` for visual updates. No long tasks and no forced reflow.
- Progressive enhancement: pages read and navigate without JS; JS adds behavior.
- Never use `eval`, `document.write` or `innerHTML` with dynamic strings (use `textContent` or DOM methods).
- Never fake a backend. Forms and widgets without a real endpoint are labeled demo-only in the docs.
- Keep the console clean: no errors, warnings or stray logs.
- Bootstrap projects import only the plugins in use. No dependency is added without a clear reason.

## 10. SEO
Technical SEO built into every page, and a planned structure for the whole site.

### 10.1 Per page
- Unique `<title>` (about 50–60 characters, main topic first, brand last) and unique `<meta name="description">` (about 120–160 characters, written for humans). No keyword stuffing and no `meta keywords`.
- `<link rel="canonical">` with the page's own absolute URL; `lang`; viewport; Open Graph and Twitter card tags (`og:image` 1200×630); favicon set.
- Correct heading outline, semantic landmarks, descriptive anchor text, meaningful `alt` (empty `alt=""` for decorative images), descriptive ASCII image file names, `width` and `height` on every image.
- Indexable content lives in HTML. Add `noindex` only to pages that must not be indexed (for example a thanks page).
- Structured data as JSON-LD that matches visible content: `WebSite` and `Organization` (home), `BreadcrumbList` (inner pages), `Article` or `BlogPosting` (posts), `Product` and `Offer` (products), `LocalBusiness` (local sites). Mark up an FAQ only if it is visible on the page (it gives structure, not guaranteed rich results). Never invent business data; placeholders are listed in the docs.

### 10.2 Site structure (decide in the plan)
- **URL plan:** short, lowercase, hyphenated, descriptive, stable. Default naming is `pages/about-us.html` for portability from disk; document how to switch to clean URLs with server rewrites. Canonical, sitemap and internal links use one consistent form.
- Flat hierarchy: every page reachable within three clicks, no orphan pages, a logical navigation, breadcrumbs on inner pages, contextual internal links with descriptive anchors, a useful footer.
- **Heading outline** and **title and description pattern** defined per page type before coding.
- A `404.html` that keeps navigation. `robots.txt` (allow all, with a `Sitemap:` line) and `sitemap.xml` listing every indexable page. `hreflang` only for real multilingual pages. Placeholder domain `https://example.com/` appears in canonicals, Open Graph, schema, robots and sitemap, and the docs show how to replace it everywhere.

## 11. Performance
Aim for excellent speed by default, using fewer bytes, fewer requests and less JS.

Targets (measured on a served build with compression, mobile Lighthouse throttling): Performance, Accessibility and Best Practices ≥ 95, SEO = 100; LCP ≤ 2.5 s (aim for ≤ 1.8 s), INP ≤ 200 ms, CLS ≤ 0.1, TBT ≤ 200 ms.

Default budgets for the home page (the spec may change them): compiled CSS ≤ 60 KB minified; JS ≤ 50 KB gzipped in total; hero image ≤ 150 KB; any other image ≤ 100 KB and sized to its display; fonts ≤ 150 KB in total; total transfer ≤ 1 MB.

- **Critical path:** one render-blocking stylesheet at most, `defer` on scripts, no synchronous scripts (the tiny theme-init snippet in section 15 is the only exception), no third-party blocking, no `@import` in CSS.
- **LCP:** the hero uses a real `<img>` (not a CSS background) with `fetchpriority="high"`, never `loading="lazy"`, and preload only when measurement shows a gain.
- **CLS:** every image, video and embed has dimensions or an `aspect-ratio`; reserve space for late content; match fallback-font metrics where possible; animate only `transform` and `opacity`.
- **Images:** AVIF or WebP with a fallback inside `<picture>`, `srcset` and `sizes`, never larger than about 2× the displayed size, quality tuned (roughly 70–80), `decoding="async"`, `loading="lazy"` below the fold. SVGs are optimized. Short motion uses muted looping `<video>` with a poster, not GIF.
- **Fonts:** self-hosted WOFF2, subset to the scripts used, variable fonts when possible, at most two families and three files, `font-display: swap`, at most two preloaded, a system-font fallback stack. No icon fonts; use inline SVG or a sprite.
- **CSS:** purge unused styles, minify, avoid expensive selectors. `content-visibility: auto` with `contain-intrinsic-size` on long below-the-fold sections is welcome as progressive enhancement.
- **JS:** minified, tree-shaken, no heavy libraries, nothing runs before it is needed.
- **Third parties:** none by default (no CDN, remote fonts, tag managers, chat widgets or analytics). Video and map embeds use click-to-load facades. A third party needs a reason in the spec.
- **Delivery:** document server settings (Brotli or gzip, long-lived caching for versioned assets, HTTP/2 or 3) and the cache-busting method.
- **Measuring:** report only numbers that were measured. If a number was not measured, say so.

## 12. Accessibility
Target WCAG 2.2 AA.
- Skip link; logical focus order; visible focus on everything interactive; full keyboard operation.
- Contrast ≥ 4.5:1 for text and ≥ 3:1 for large text and UI parts; never color alone as a signal.
- Touch targets at least 24×24 CSS px (prefer 44 px for primary controls).
- Use ARIA only when native elements cannot do it. Accordions use `<details>` or a button with `aria-expanded`; modals use `<dialog>`; carousels can be paused; menus work by keyboard and touch.
- Respect `prefers-reduced-motion`. No autoplaying sound.
- Set `lang` on foreign-language fragments. Provide error messages that name the problem and the fix.

## 13. Responsive and RTL
- Mobile-first. Check 360, 390, 768, 1024, 1280 and 1536 px. No horizontal scroll, clipping, overlap or unreadable text. Recompose layouts per breakpoint instead of shrinking the desktop layout.
- For RTL or Persian projects: `<html lang="fa" dir="rtl">`, logical properties or direction-aware utilities, mirrored directional icons, tested mixed Persian and English text, numbers, phone numbers, emails and punctuation.
- Persian typography: no `letter-spacing` or `text-transform` on Persian text, generous line height, self-hosted fonts whose license allows redistribution, proper half-spaces (ZWNJ) and Persian ی and ک. Choose Persian or Latin digits once. Use the Jalali calendar only when the spec asks.

## 14. Design and originality
- Before coding, define audience, positioning, tone, primary action, visual concept, palette, type scale, spacing rhythm, grid, imagery and icon style, motion principles, and how it adapts to mobile. Present this in the plan.
- Build a coherent token-based system: one brand color, one accent, neutrals, semantic colors; a modular type scale; a 4 or 8 px spacing scale; consistent radii, shadows and borders; one icon family (inline SVG).
- Give each page a focal point and a rhythm that varies by content. Avoid the generic template look: identical card grids, gratuitous gradients, glows or blobs, excessive rounded panels, random decorative icons, meaningless animation.
- Motion is subtle and purposeful, and communicates state or hierarchy.
- Do not copy a reference pixel for pixel or lift code, text or imagery from other templates. Every asset is licensed for commercial redistribution and recorded in `LICENSES.txt`.

## 15. Dark mode
Only when the spec includes it. Default is light only. When included, it is part of the design system, not a late color inversion.
- **Semantic tokens:** components use tokens only (`--color-bg`, `--color-surface`, `--color-text`, `--color-muted`, `--color-border`, `--color-primary` and so on), never raw hex values. Define the dark values once, in one partial or mixin, and reuse them for both the attribute and the system-preference rule.

```css
:root {
  color-scheme: light;
  --color-bg: #ffffff;
  --color-text: #111827;
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --color-bg: #0b0f14;
  --color-text: #e5e7eb;
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme]) {
    color-scheme: dark;
    --color-bg: #0b0f14;
    --color-text: #e5e7eb;
  }
}
```

- **Resolution order:** saved user choice, then system preference, then light. Without JS the system preference still applies through the media query.
- **No flash:** a tiny inline script (about 8 lines, Appendix B) placed before the stylesheet sets `data-theme` before first paint. It is the only allowed inline script and is documented in `docs/`. Wrap storage access in `try/catch`.
- **Toggle:** a real `<button>` in the header with an accessible name and `aria-pressed`, keyboard operable, visible focus. Persist the choice in `localStorage` (no cookies). When no choice is saved, follow system changes through `matchMedia`. The spec decides two states (light, dark) or three (system, light, dark).
- **Stack:** Tailwind's dark variant follows the same attribute or class as the tokens (configure it per the installed major version's docs); with tokens, `dark:` utilities should be rare. Bootstrap uses its built-in color modes (`data-bs-theme`) with the custom tokens mapped onto them.
- **Design:** pick dark surfaces deliberately. Avoid pure black with pure white text; use near-black and off-white. Show elevation with lighter surfaces and borders rather than shadows; soften saturated accents. Check contrast (WCAG AA) in both modes for text, borders, focus rings, disabled states, form fields and code blocks.
- **Media:** logos and icons use `currentColor` or token fills. Raster images that fail on dark get a dark variant swapped through the theme attribute (a `<picture>` media query ignores the manual toggle). No white boxes around transparent images.
- **Meta:** `<meta name="color-scheme" content="light dark">` and two `theme-color` tags with `media` conditions.
- **Performance:** no `transition: all`, no theme flicker, no layout shift, no separate dark stylesheet.

## 16. Blog
Only when the spec includes it. Use real pages and real links so everything is crawlable.
- **Pages:** blog index, post template, category archives (one static page per category, not a JS filter), optional author page. Structure: `blog/index.html`, `blog/post-slug.html`, `blog/category-slug.html`, `blog/page-2.html`. Slugs are lowercase ASCII with hyphens, descriptive and stable.
- **Index:** a featured post, then a grid or list of cards (image with dimensions, category, title link as `h2`, excerpt, `<time datetime>`, reading time). Paginate with `<nav aria-label="Pagination">`, real links and `aria-current="page"`. No infinite scroll, no slider.
- **Post template:** `<article>`, one `h1`, byline with author and `<time datetime>` for published and updated dates, a hero image (the LCP element, so `fetchpriority="high"`), a table of contents for long posts (anchor links, heading IDs, `scroll-margin-top` under sticky headers), prev and next links, three related posts, an author box.
- **Reading typography:** measure of about 60 to 75 characters, line height about 1.6 to 1.8, a defined vertical rhythm. Styled `blockquote`, `figure` and `figcaption`, lists, callouts, `pre code` (horizontal scroll, `tabindex="0"`; syntax highlighting only if done at build time, never a runtime library), and tables inside a scrollable wrapper.
- **Sharing and comments:** share links are plain `<a>` elements with no third-party widgets or scripts. No comment system by default; the docs explain how to add one.
- **SEO:** `BlogPosting` JSON-LD (headline, datePublished, dateModified, author, image, mainEntityOfPage) plus `BreadcrumbList`; unique title, description and canonical; Open Graph `article` tags; posts in the sitemap with an accurate `lastmod`; optional Atom feed linked with `<link rel="alternate" type="application/atom+xml">`; internal links through related posts, categories and in-content references.
- **Content integrity:** include at least one long, realistic sample post to test typography, clearly marked as placeholder content with no invented facts.
- **Accessibility:** heading order inside posts, descriptive link text, a labeled `nav` for the table of contents, scrollable code and table containers reachable by keyboard.

## 17. Content integrity
Never invent testimonials, credentials, statistics, prices, addresses, awards or business claims. Mark placeholder text and data clearly and list them in the docs. Use realistic content structure so the layout is tested with real-length text.

## 18. Security and privacy
`rel="noopener noreferrer"` on external new-tab links; no secrets or server details in files; no `eval` or inline handlers (CSP-friendly); no trackers or cookies by default (add a consent banner only if the spec requires one); forms never imply a working endpoint.

## 19. Customer package and docs
- The package is the structure in section 4 with no AI, planning or QA files (including `ROADMAP.md`), no `node_modules`, caches, `.git` or debug files.
- `docs/` explains: structure, how to edit content, colors and fonts, how to rebuild (when a build exists), how to replace every placeholder (domain, meta, schema, social images), the demo-only features, performance and server tips, browser support, and credits.
- `LICENSES.txt` lists every third-party font, icon, image and library with its source and license. `CHANGELOG.md` records versions.
- Open the final ZIP, check its contents, and run `npm ci && npm run build` from a clean copy (when a build exists).

## 20. QA checklist
Mark only checks that were actually run.

**Scope**
- [ ] Matches the approved plan; no unapproved stack, dependency or scope changes.
- [ ] No leftovers: unused CSS, JS, images, fonts, dependencies.

**Code**
- [ ] HTML validates; structure, headings and IDs are correct.
- [ ] Lint and format tools pass when a build exists.
- [ ] Comments follow section 6 (English only, few, short, none commented-out).
- [ ] No console errors or warnings in the main flows.

**SEO**
- [ ] Unique title, description and canonical on every page.
- [ ] One `h1` per page; heading order correct.
- [ ] Schema validates and matches visible content.
- [ ] `robots.txt`, `sitemap.xml` and `404.html` present; placeholder domain replacement documented.

**Performance**
- [ ] Lighthouse mobile run on a served, compressed build, with real numbers recorded.
- [ ] LCP, INP and CLS within targets.
- [ ] Image formats, sizes, dimensions and lazy-loading verified; no render-blocking extras.
- [ ] Fonts self-hosted and subset; no third-party requests.

**Accessibility and responsive**
- [ ] Keyboard path, visible focus and contrast checked.
- [ ] Reduced motion respected.
- [ ] 360 to 1536 px checked; no overflow or overlap.
- [ ] RTL checks done when applicable.

**Package**
- [ ] Opens from disk; relative paths resolve; no CDN.
- [ ] Docs, `LICENSES.txt` and `CHANGELOG.md` included.
- [ ] No internal files; ZIP contents inspected.

**Roadmap**
- [ ] Every roadmap task is verified done, or explicitly deferred or dropped with a note in the decision log.

**Dark mode (if in scope)**
- [ ] No flash on load; saved choice and system preference both work; works without JS.
- [ ] Contrast checked in both modes; both modes checked at every breakpoint.
- [ ] Toggle is keyboard operable and announces its state.

**Blog (if in scope)**
- [ ] Index, post, category and pagination pages have real links, unique titles and canonicals.
- [ ] `BlogPosting` and breadcrumb schema validate; posts are in the sitemap.
- [ ] Long-post typography, code blocks, tables and the table of contents checked on mobile.

## 21. Final report
Roadmap status (done, deferred, blocked); pages and components; stack and dependencies with versions; how to open, edit and rebuild; SEO structure delivered; measured results (and anything not measured); demo-only behavior; license notes; known limits.

## 22. Non-negotiable
- No coding before the plan and `ROADMAP.md` are approved on a new template.
- `ROADMAP.md` is kept current: tasks are checked only after verification.
- No Persian or other non-English comments; no commented-out code.
- No CDN, third-party scripts or jQuery.
- No claimed scores or tests that were not run.
- No invented business facts.
- No copied code, text or design.

---

## Appendix A — PROJECT_SPEC template
Mark unknowns as `TBD`; do not invent answers.

```markdown
# Project Specification

## Overview
- Template name, category, target buyers:
- Main use and conversion goal:
- Language and direction (LTR or RTL):

## Stack
- Tailwind or Bootstrap (and why), build tools needed:
- Browser range:
- Blog (yes or no, scope):
- Dark mode (yes or no, two or three state toggle):

## Pages
| Page | Purpose | Unique sections and interactions |
|---|---|---|

## SEO structure
- URL plan:
- Title and description pattern per page type:
- Heading outline per page type:
- Schema types per page type:
- Placeholder business data:

## Design
- Tone, audience, references, things to avoid:
- Palette, fonts (with licenses), image and icon style:

## Functionality
| Feature | Expected behavior | Demo only or real |
|---|---|---|

## Performance budget
- Defaults from section 11, or changes:

## Assets and licenses
- Supplied, to create, attribution:

## Approved exceptions to the standard
-

## Acceptance
- [ ] Section 20 QA checklist completed honestly.
- [ ] Package matches section 4 and section 19.
```

## Appendix B — `<head>` pattern
Replace placeholders; keep the order.

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Page Title | Brand</title>
  <meta name="description" content="Unique description, 120 to 160 characters.">
  <link rel="canonical" href="https://example.com/pages/page-name.html">
  <meta name="theme-color" content="#0f172a">

  <link rel="icon" href="../assets/images/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="../assets/images/apple-touch-icon.png">

  <meta property="og:type" content="website">
  <meta property="og:title" content="Page Title | Brand">
  <meta property="og:description" content="Same idea as the description.">
  <meta property="og:url" content="https://example.com/pages/page-name.html">
  <meta property="og:image" content="https://example.com/assets/images/og-image.jpg">
  <meta name="twitter:card" content="summary_large_image">

  <link rel="preload" href="../assets/fonts/main.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="../assets/css/style.min.css">
  <script src="../assets/js/main.js" defer></script>

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://example.com/" },
      { "@type": "ListItem", "position": 2, "name": "Page Name" }
    ]
  }
  </script>
</head>
```

On the home page the relative paths drop the `../`. On an RTL project set `lang` and `dir` accordingly.

When dark mode is in scope, add this before the stylesheet and replace the single `theme-color` tag with the two below:

```html
<meta name="color-scheme" content="light dark">
<meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)">
<meta name="theme-color" content="#0b0f14" media="(prefers-color-scheme: dark)">
<script>
  try {
    var saved = localStorage.getItem('theme');
    var dark = saved ? saved === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
  } catch (e) {}
</script>
```

## Appendix C — ROADMAP.md template
Created by the agent after plan approval and kept current.

```markdown
# Roadmap: <project name>

Legend: [ ] todo, [~] in progress, [x] done and verified, [!] blocked
Last updated: YYYY-MM-DD

## Decisions
- Stack:
- Blog: yes or no
- Dark mode: yes or no
- Languages and direction:

## Phase 0: Setup and tooling
- [ ] T0.1 Repository, folders, build scripts, lint and format config
  - Depends on: none
  - Files: source/package.json, configs
  - Done when: `npm run build` works from a clean copy

## Phase 1: Design system and tokens
- [ ] T1.1 Tokens (color, type, spacing, radius, shadow, breakpoints)
  - Done when: tokens documented and used by the base styles

## Phase 2: Shared layout
- [ ] T2.1 Base styles and header
- [ ] T2.2 Footer and shared components
  - Review checkpoint after this phase

## Phase 3: Pages
- [ ] T3.1 index.html
- [ ] T3.2 <page> ...
- [ ] T3.x blog index, post, category pages (if in scope)
- [ ] T3.x 404.html

## Phase 4: JavaScript behavior
- [ ] T4.1 Navigation, accordions, forms, dark-mode toggle (if in scope)

## Phase 5: SEO files and schema
- [ ] T5.1 Titles, descriptions, canonicals, Open Graph
- [ ] T5.2 JSON-LD, robots.txt, sitemap.xml

## Phase 6: Performance pass
- [ ] T6.1 Images, fonts, CSS and JS budgets, Lighthouse run (real numbers)

## Phase 7: Accessibility and RTL pass
- [ ] T7.1 Keyboard, focus, contrast, reduced motion, RTL checks

## Phase 8: QA
- [ ] T8.1 Section 20 checklist
  - Review checkpoint before this phase

## Phase 9: Docs and packaging
- [ ] T9.1 docs/, LICENSES.txt, CHANGELOG.md
- [ ] T9.2 Build the release package and inspect the ZIP

## Phase 10: Final report
- [ ] T10.1 Report with measured results

## Decision log
- YYYY-MM-DD: decision and reason

## Open questions
-
```

---

# Project addendum — سازه‌پاد صنعت

This repository implements the standard above as a Persian (RTL) industrial-construction
template. Read `PROJECT_SPEC.md` and `ROADMAP.md` before changing anything.

## Layout
- `source/` — build tooling: Tailwind v4 input CSS, JS modules, image pipeline, lint configs.
- `release/` — the customer package. This is the site; edit HTML here.
- `Idea/` — reference material (screenshot and the reference page source). Never copy code,
  text or imagery from it; it is only a structural reference.

## Commands (run inside `source/`)
- `npm run dev` — Tailwind watch + esbuild watch + Vite on http://127.0.0.1:5173
- `npm run build` — compile `release/assets/css/style.min.css` and `release/assets/js/main.js`
- `npm run format` / `npm run format:check`
- `npm run lint:css` / `npm run lint:js`
- `npm run images` — regenerate image variants from `source/scripts/images.mjs`

## Non-negotiables for this project
- Persian visible copy, English code comments only, no Persian identifiers.
- Brand tokens live in `source/src/styles/main.css` under `@theme`; never hard-code hex
  values in markup.
- Every page repeats the same header, mobile menu and footer markup; keep them identical.
- All content is placeholder business data. Do not invent certificates, awards or real
  statistics; list new placeholders in `release/docs/placeholders.md`.
- Forms stay demo-only unless an endpoint is provided; no third-party scripts or CDNs.
