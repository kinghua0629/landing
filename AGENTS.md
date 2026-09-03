# AGENTS.md

This file gives coding agents repository-specific guidance. Keep changes focused and preserve unrelated work in the working tree.

## Project Overview

This is Ziwen Hua's personal site and blog, forked from AstroPaper. It is an Astro 7 static site using TypeScript, React 19 for the Giscus comments island, Tailwind CSS 4, Markdown/MDX, Pagefind search, and generated Open Graph images.

- Package manager: pnpm 11 (`packageManager` is pinned in `package.json`)
- TypeScript: strict Astro configuration with the `@/*` alias mapped to `src/*`
- Output: static files in `dist/`
- Deployment: Cloudflare Pages or a multi-stage Docker image served by Nginx

## Commands

Run commands from the repository root.

```bash
pnpm install      # Install dependencies
pnpm dev          # Start the Astro dev server at localhost:4321
pnpm build        # astro check → astro build → Pagefind index → copy index to public/
pnpm preview      # Preview the production build
pnpm sync         # Generate Astro/content collection types
pnpm format       # Format the entire repository with Prettier
pnpm format:check # Check formatting without changing files
pnpm lint         # Run ESLint, including TypeScript and Astro rules
```

`pnpm build` performs type-checking first, so TypeScript or Astro diagnostics fail the build. To inspect build output independently of type errors, use `pnpm astro build && pnpm pagefind --site dist && cp -r dist/pagefind public/`.

The production Docker image builds with pnpm and serves `dist/` from Nginx on port 80. `docker-compose.yml` is intended for development and exposes the Astro server on port 4321.

## Architecture

### Routes (`src/pages/`)

| Route | Source | Purpose |
| --- | --- | --- |
| `/` | `index.astro` | Profile hero, education, featured posts, and recent posts |
| `/about/` | `about.md` | Bilingual about page with Markdown, code, and math |
| `/CV/` | `CV.mdx` | Embedded `public/cv-1.pdf` viewer |
| `/posts/` | `posts/[...page].astro` | Paginated post listing |
| `/posts/[slug]/` | `posts/[...slug]/index.astro` | Static blog post pages |
| `/posts/[slug]/index.png` | `posts/[...slug]/index.png.ts` | Per-post dynamic OG images |
| `/tags/` | `tags/index.astro` | Tag index |
| `/tags/[tag]/` | `tags/[tag]/[...page].astro` | Paginated posts for a tag |
| `/search/` | `search.astro` | Pagefind search UI |
| `/archives/` | `archives/index.astro` | Complete post archive, controlled by `SITE.showArchives` |
| `/404` | `404.astro` | Custom not-found page |
| `/rss.xml` | `rss.xml.ts` | RSS feed |
| `/robots.txt` | `robots.txt.ts` | Robots metadata |
| `/og.png` | `og.png.ts` | Generated site-wide OG image |

### Important Files

- `src/config.ts`: `SITE` settings such as canonical URL, author, pagination, scheduled-post margin, archive/back-button/edit links, dynamic OG images, language, direction, and timezone.
- `src/constants.ts`: social links, share targets, and Giscus repository/category configuration.
- `src/content.config.ts`: the `blog` content collection loader and frontmatter schema.
- `astro.config.ts`: sitemap, React, MDX, Markdown math/TOC/collapse processing, Shiki transformers, Tailwind Vite integration, responsive images, environment schema, and Google font configuration.
- `src/utils/`: post filtering/sorting, tags and paths, slugs, OG generation, and Shiki helpers.
- `src/styles/global.css`: Tailwind 4 CSS-first theme, light/dark color tokens, and shared layout utilities.
- `src/styles/typography.css`: prose and Markdown-content styling.

### Layout and Component Structure

`src/layouts/Layout.astro` is the base HTML shell. It owns metadata, canonical/OG/Twitter tags, JSON-LD, fonts, view transitions, Google site verification, and the early theme script.

- `Main.astro`: standard content wrapper with header, footer, and optional breadcrumb.
- `AboutLayout.astro`: wrapper used by the Markdown about page.
- `PostDetails.astro`: post metadata/content, tags, edit/share controls, Giscus comments, previous/next navigation, reading progress, heading anchors, and code-copy behavior.
- `src/components/Comments.tsx`: the React client island; most other UI components are Astro components.

## Blog Content

Posts live under `src/data/blog/` and may be grouped in subdirectories. The collection glob is `**/[^_]*.md`: it accepts Markdown files whose **filename** does not begin with `_`; underscores in parent directory names do not exclude their contents. Blog collection entries are Markdown only, not MDX.

Supported frontmatter:

```yaml
author: string # defaults to SITE.author
pubDatetime: date # required
modDatetime: date | null # optional
title: string # required
featured: boolean # optional
draft: boolean # optional
tags: string[] # defaults to ["others"]
ogImage: local image | URL # optional
description: string # required
canonicalURL: string # optional
hideEditPost: boolean # optional
timezone: string # optional
```

Post behavior to preserve:

- `getSortedPosts` removes drafts, respects scheduled publication outside development, and sorts by `modDatetime` falling back to `pubDatetime`.
- Development shows future scheduled posts; production uses `SITE.scheduledPostMargin`.
- Static post paths exclude drafts. Generated per-post OG routes also exclude drafts and posts with an explicit `ogImage`.
- Post URLs should be built through `getPath`; tags should be normalized through the slug utilities.

## Styling and Client Behavior

- Tailwind 4 is configured in CSS via `@import "tailwindcss"` and `@theme inline`; there is no `tailwind.config` file.
- Light/dark mode uses `data-theme` on `<html>`, system preference, and `localStorage`. The inline head script prevents a flash before `src/scripts/theme.ts` loads.
- Theme colors are CSS custom properties: light uses blue as the accent and dark uses orange.
- Astro's `ClientRouter` is enabled. Client scripts that must rerun after navigation should use Astro lifecycle events or the appropriate `data-astro-rerun` behavior.
- Searchable post content is marked with `data-pagefind-body`; navigation-only areas use `data-pagefind-ignore`.

## Markdown and Code Blocks

Markdown supports generated/collapsible tables of contents, remark math, and KaTeX rendering. Shiki uses paired GitHub light/dark themes plus filename, highlight, word-highlight, and diff transformers.

The `as any` casts around Shiki transformers and `rehypeKatex` in `astro.config.ts` are deliberate compatibility workarounds for dependency type mismatches. Do not remove them unless the relevant package versions and a full build confirm the workaround is no longer needed.

## Environment and Generated Files

- `PUBLIC_GOOGLE_SITE_VERIFICATION` is an optional public client environment variable declared in `astro.config.ts`; when set, `Layout.astro` emits the verification meta tag.
- `dist/`, `.astro/`, and `public/pagefind/` are generated. ESLint ignores them (or the relevant generated subset), and TypeScript excludes build/search output.
- The build copies the generated Pagefind index into `public/pagefind/`; avoid hand-editing that directory.

## Validation

For normal source changes, run the narrowest relevant checks first, then use:

```bash
pnpm format:check
pnpm lint
pnpm build
```

The full build is the final authority because it combines Astro diagnostics, static generation, OG image routes, and Pagefind indexing.
