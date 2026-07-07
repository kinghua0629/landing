# Project Memory: landing (AstroPaper)

## Project Overview

Personal blog/profile site for Ziwen Hua (Oscar Hua). Based on AstroPaper template.

- **Website**: https://oscarhua0629.com/
- **Author**: Ziwen Hua
- **GitHub**: https://github.com/kinghua0629/

## Tech Stack

- **Framework**: Astro 7.0.6 + React 19 + MDX
- **Styling**: Tailwind CSS 4.3 (via Vite plugin)
- **Package Manager**: pnpm
- **Search**: Pagefind (static search)
- **Comments**: Giscus
- **Deployment**: Docker (Nginx) or static deployment
- **Language**: TypeScript

## Build Commands

```bash
# Development
pnpm dev

# Production build (includes type checking)
pnpm build
# Equivalent to: astro check && astro build && pagefind --site dist && cp -r dist/pagefind public/

# Type checking only
astro check
```

## Architecture

### Directory Structure

```
src/
├── pages/           # Route pages (index, about, CV, posts, tags, archives)
├── layouts/         # Layout components (Layout, Main, PostDetails, AboutLayout)
├── components/      # UI components (Header, Footer, Card, Comments, etc.)
├── data/blog/       # Blog content (Markdown/MDX)
│   ├── _Announcements/
│   ├── _Application/
│   ├── _CS50/
│   └── _GRE/
├── utils/           # Utility functions
├── assets/          # Static resources (icons, images)
├── styles/          # Global CSS + Tailwind
└── config.ts        # Site configuration
```

### Key Files

- `astro.config.ts` - Astro configuration (plugins, Markdown, fonts, Shiki)
- `src/config.ts` - Site settings (website, author, pagination, theme)
- `src/constants.ts` - Social links, share links, Giscus config
- `src/content.config.ts` - Blog post schema (frontmatter fields)

## Discovered Durable Knowledge

### Shiki Type Incompatibility (2026-07-07)

**Issue**: `@shikijs/transformers` (v4.3.1) type incompatibility with `@shikijs/types` (v4.2.0)

**Root Cause**: `@shikijs/transformers` depends on `@shikijs/types@4.3.1` while Astro internally uses `@shikijs/types@4.2.0`. The `ShikiTransformer` type's `preprocess` method signature differs between versions.

**Resolution**: Use `as any` type assertion in `astro.config.ts` for the transformers array.

**Affected Code**:
```typescript
// astro.config.ts line 42-44
transformers: [
  transformerNotationHighlight(),
  transformerNotationWordHighlight(),
  transformerNotationDiff(),
] as any  // Bypasses type checking for version mismatch
```

**Future Consideration**: Monitor for Astro or @shikijs/transformers updates that resolve the version conflict.

### Content Collections

Blog posts use Markdown/MDX with frontmatter schema:
- `author` (string, defaults to SITE.author)
- `pubDatetime` (date, required)
- `modDatetime` (date, optional)
- `title` (string, required)
- `featured` (boolean, optional)
- `draft` (boolean, optional)
- `tags` (string array, defaults to ["others"])
- `ogImage` (image or string, optional)
- `description` (string, required)

Directories prefixed with `_` (e.g., `_Announcements/`) are excluded from glob loader - posts must be manually referenced.

### Deployment

Docker multi-stage build:
1. **Build stage**: Node LTS + pnpm → `pnpm run build`
2. **Runtime stage**: Nginx Alpine → serves static files from `/usr/share/nginx/html`

## Patterns

- Posts organized by category folders under `src/data/blog/`
- Featured posts displayed separately on homepage
- Pagination for post lists (configurable via `SITE.postPerPage`)
- Dynamic OG image generation per post
- Theme switching (light/dark) with system preference detection

## Gotchas

- Build command includes `astro check` - TypeScript errors will fail the build
- Pagefind runs after build and copies to `public/` - ensure `dist/pagefind` exists
- Content prefixed with `_` in blog directories won't be auto-loaded by glob loader
