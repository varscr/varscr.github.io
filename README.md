# varscr.github.io

Personal site of **Fabio Vargas** — AI & Full-Stack Engineer.
Live at **[varscr.github.io](https://varscr.github.io)**.

Typographic and text-only: ink on paper, one accent, no animation library. It loads instantly
and prints cleanly.

## Stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · statically exported to
GitHub Pages. No runtime dependencies beyond React and Next — no animation library, no analytics,
and fonts are inlined at build time rather than fetched.

Scroll reveals and the gradient at the foot of the page are CSS scroll-driven animations, wrapped
in `@supports` so a browser without scroll timelines renders the page fully visible.

## Content

Every career fact lives in one typed file, `lib/data.ts`. No component contains career text, so a
role is edited once. `lib/data.test.ts` guards it — roles stay in order, no employment gap opens
up, and nothing deliberately excluded can creep back in.

## Commands

```bash
npm run dev       # dev server
npm test          # data integrity tests
npm run verify    # tests + build + assert what must and must not be in the output
npm run serve     # serve out/ the way GitHub Pages resolves URLs
npm run deploy    # build and publish to the gh-pages branch
```

`public/.nojekyll` must stay — without it GitHub Pages ignores `_next/`, which holds all the
JavaScript and CSS.

## Docs

See [`docs/`](docs/) — architecture, the content model, and operations.

## License

© 2026 Fabio Vargas. All rights reserved.
