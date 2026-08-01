# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start Astro dev server (localhost)
pnpm build        # Full production build: astro check → astro build → pagefind index → copy to public/
pnpm preview      # Preview production build locally
pnpm sync         # Generate Astro content collection types
pnpm format       # Prettier (entire project)
pnpm format:check # Check formatting without writing
pnpm lint         # ESLint (flat config, typescript-eslint + eslint-plugin-astro)
```

**Note**: `pnpm build` includes TypeScript type-checking via `astro check` — TS errors will fail the build. To build skipping type-check, run `astro build && pagefind --site dist && cp -r dist/pagefind public/`.

## Architecture

**Astro 7 blog** (forked from AstroPaper template) for Ziwen Hua. Static site deployed via Docker (Nginx) or Cloudflare Pages.

### File-based Routing (`src/pages/`)

| Path | File |
|---|---|
| `/` | `index.astro` — hero + featured/recent posts |
| `/about/` | `about.md` — bilingual English/Chinese, LaTeX, code blocks |
| `/CV/` | `CV.mdx` — embedded PDF viewer |
| `/posts/` | `posts/[...page].astro` — paginated post list |
| `/posts/[slug]/` | `posts/[...slug]/index.astro` — individual post |
| `/tags/` | `tags/index.astro` — all tags |
| `/tags/[tag]/` | `tags/[tag]/[...page].astro` — posts by tag |
| `/search/` | `search.astro` — Pagefind static search |
| `/archives/` | `archives/index.astro` — all posts |
| `/rss.xml` / `/robots.txt` / `/og.png` | Generated endpoints |

### Key Source Files

- **`src/config.ts`** — Site-wide settings (URL, author, pagination count, theme, timezone)
- **`src/constants.ts`** — Social links, share links, Giscus comment config
- **`src/content.config.ts`** — Zod schema for blog post frontmatter (author, pubDatetime, title, featured, draft, tags, ogImage, description)
- **`astro.config.ts`** — Integrations (sitemap, react, mdx), Markdown plugins (remark-toc, remark-math, rehype-katex), Shiki highlighting, Tailwind v4 via Vite plugin, fonts

### Content Organization

Blog posts live in category subdirectories under `src/data/blog/`:
- `_Announcements/`, `_Application/`, `_CS50/`, `_GRE/`
- Directories starting with `_` are excluded from the content collection glob (`**/[^_]*.md`), but individual `.md` files within them still match — only files starting with `_` are excluded, not directories.
- Post frontmatter: `author`, `pubDatetime`, `modDatetime?`, `title`, `featured?`, `draft?`, `tags`, `ogImage?`, `description`

### Theme System

Light/dark mode via `data-theme` attribute on `<html>`, toggled by system preference + localStorage. Inline script in `<head>` prevents FOUC. CSS custom properties define accent colors (blue for light, orange for dark). Tailwind v4 configuration is CSS-first (`@theme inline` in `src/styles/global.css`, no `tailwind.config`).

### Known Issues

- **Shiki type mismatch**: `@shikijs/transformers` types diverge from Astro's bundled `@shikijs/types`. The `transformers` array in `astro.config.ts` uses `as any` as a workaround.

### Layout Hierarchy

`Layout.astro` (base HTML: head, meta, OG, fonts, theme script) → `PostDetails.astro` / `Main.astro` / `AboutLayout.astro` wrap page-specific content. `Main.astro` includes breadcrumb navigation.
