# Operations

## Commands

| Command | Does |
|---|---|
| `npm run dev` | dev server at :3000 |
| `npm test` | data integrity + honesty guardrail tests |
| `npm run build` | static export to `out/` (includes the local CV) |
| `npm run verify` | tests + build + content checks |
| `npm run cv` | build + render `cv.pdf` + clipping check |
| `npm run serve` | serve `out/` at :4173, resolving URLs the way GitHub Pages does |
| `npm run deploy` | build + strip the CV + assert it is gone + publish |

## Deploy

    npm run deploy

Runs `next build`, then `prepare-deploy.mjs` (removes every CV artefact from
`out/`), then `check-build.mjs --deploy` (fails if `out/cv.html` survived), then
publishes `out/` to the `gh-pages` branch.

Live at https://varscr.github.io. `gh` is authenticated as `varscr`.
`public/.nojekyll` must stay or GitHub Pages will ignore `_next/`.

## Routing note

The static export writes `out/cv.html`, not `out/cv/index.html`. GitHub Pages
resolves the extensionless `/cv` to `cv.html`. `scripts/serve-out.mjs` mirrors
that resolution order — exact file, then `<path>.html`, then
`<path>/index.html` — so local review matches production.

## Before deploying

    npm run verify

Then look at `cv.pdf`. The checks catch missing content and leaked content; they
cannot tell you the document reads well.
