# Architecture

Next 16 (App Router), React 19, Tailwind 4, TypeScript. Statically exported
(`output: 'export'`) and served by GitHub Pages from the `gh-pages` branch.

No runtime dependencies beyond React and Next. No animation library, no
analytics, no fonts fetched at runtime — `next/font` inlines Inter at build time.

## Two documents, one data source

| | Portfolio (`/`) | CV (`/cv`) |
|---|---|---|
| Audience | anyone who lands on the URL | a recruiter reading an attachment |
| Public? | yes | **no — never deployed** |
| In git? | yes | **no — `app/cv/` is gitignored** |
| Content | About, Experience, Projects, Contact | full record: about, experience, projects, education, stack, certifications, references |
| Shape | one column, generous | two columns, dense, two fixed A4 sheets |

Both render from `lib/data.ts`. No career text is hardcoded in a component, so
a role is edited once and both documents update.

## Why the CV is not in the repo

Fabio asked for the CV to exist only on his machine. Two independent guards
enforce that:

1. `app/cv/` is in `.gitignore`, so the source is never committed.
2. `npm run deploy` runs `scripts/prepare-deploy.mjs`, which deletes every CV
   artefact from `out/`, then `scripts/check-build.mjs --deploy`, which **fails
   the deploy** if `out/cv.html` still exists.

### The trap this creates

Tailwind v4 skips gitignored files during automatic source detection. Ignoring
`app/cv/` silently stopped Tailwind generating any utility used *only* on the CV
page — margins, the photo ring and the heading letterspacing all vanished from
the built CSS with no error. `app/globals.css` therefore carries an explicit
`@source "../app/cv";`, which is scanned regardless of gitignore.

**If you add a directory to `.gitignore`, check whether Tailwind still needs to
scan it.**

## Files

```
app/
  layout.tsx        root layout, metadata, Inter via next/font
  page.tsx          portfolio
  globals.css       tokens, scroll animations, CV sheet + print rules
  cv/page.tsx       the CV — gitignored, local only
  favicon.ico       built from the brand isotipo
  icon.png, apple-icon.png
components/
  RoleEntry.tsx     one role, web or cv variant
  Timeline.tsx      year gutter + roles
  Stack.tsx         labelled stack groups
  PrintButton.tsx   the only client component — calls window.print()
lib/
  data.ts           every career fact
  data.test.ts      the guards described in 02-content.md
scripts/
  check-build.mjs      asserts what must and must not be in the output
  prepare-deploy.mjs   strips the CV before publishing
  render-cv-pdf.mjs    renders /cv to cv.pdf and checks for clipping
  serve-out.mjs        serves out/ the way GitHub Pages would
```
