# Portfolio rebuild — design

Date: 2026-08-23
Repo: `varscr/varscr.github.io` (public, GitHub Pages, live at https://varscr.github.io)

## Goal

Rebuild the site as a typographic, text-only portfolio whose content is Fabio's
career path, plus a printable CV page at `/cv`. A recruiter gives it about
thirty seconds; nothing on the page should compete with the Janover work.

The URL is printed on the paper CV, so the rebuild happens in place. Same repo,
same URL.

## Positioning

The angle is **AI engineer**, not generalist. The Janover multi-agent work and
the Udacity AI master's lead. The Teleperformance and PBS operations work is
real and stays, but it supports the arc rather than competing with it.

## Non-goals

- **No projects section.** Those repos were deleted and are not coming back.
  Manasara and any personal tooling appear as work *within* a role, never as
  standalone showcase pieces.
- No 3D, WebGL, canvas, or scroll-driven animation.
- No contact form. No analytics. No cookie banner.
- No blog, no CMS, no dark-mode toggle (the site is light-only by design).

## Career data

Verified against source documents in `~/Documents/Archive/`, not from memory.
Where the current CV PDF and the archive disagree, the archive wins and the
discrepancy is noted below.

### Roles

| Period | Org | Title |
|---|---|---|
| Jan 2026 – present | Independent Contractor (remote) | Software Engineer |
| Jun 2025 – Jan 2026 | Janover — Florida, US | Full-Stack / AI Engineer |
| Jun 2024 – Jun 2025 | Teleperformance — Bogotá | Application Support Engineer |
| Jan 2024 – May 2024 | PBS Group / Infotrans Colombia | Bilingual Application Analyst |
| Feb 2021 – Dec 2021 | ACIEM | Graphic Designer |
| Feb 2020 – Aug 2020 | Cámara de Comercio de Bogotá | Junior Graphic Designer |

**Independent Contractor** — Manasara, a luxury real estate site for a client in
Indonesia, on Cloudflare Workers. Responsive, cross-browser and iOS tested via
BrowserStack.

**Janover** — Burrito, a multi-agent conversational AI platform: FastAPI and
Azure OpenAI, 12+ specialised chatbots with dynamic routing and fallback. An
AgentFactory pattern for dynamic agent instantiation. MongoDB distributed
locking for concurrent AI sessions. Context compaction to stay inside token
limits across long multi-turn conversations. Also the core fintech platform in
Nuxt, Nitro, TypeScript and MongoDB, with Auth0/JWT and GitHub Actions CI/CD.

**Teleperformance** — production Linux and IIS servers for critical database
systems. Database performance and integrity. Diagnosed application crashes from
logs with clients and dev teams. Scripted away repetitive operational tasks.
Wrote internal documentation to centralise recurring issues.

**PBS Group / Infotrans** — databases, IIS servers, Tomcat, and Avaya IVR
deployments. Contract of record is with Infotrans Colombia SAS with
Teleperformance named as `empresa usuaria`; the CV names the role PBS Group.
Displayed as **PBS Group**, which is how Fabio has always referred to it. This
role makes Jan 2024 → present continuous.

### Earlier career — design

The two design roles are rendered as one **condensed block** at the foot of the
timeline, not as full entries. They are dated and honest but must not read as a
competing career:

> **Earlier — graphic design & multimedia**
> Cámara de Comercio de Bogotá (2020) · ACIEM (2021)

The CCB role was Fabio's SENA apprenticeship in the Web area of External
Communications: graphic pieces for conferences, web portal, news and forums,
plus video production and editing. ACIEM was mid-level: design projects
end to end, campaign strategy, and running the association's WordPress site.

### Education

| Period | Institution | Programme |
|---|---|---|
| Jan 2026 – Jun 2027 (expected) | Udacity | MS, Artificial Intelligence |
| Feb 2021 – Nov 2023 | Fundación Universitaria Horizonte | Ingeniería de Software (acta de grado April 2026) |
| Jun 2023 – Aug 2023 | Fundación Universitaria Horizonte | Diplomado en Ciberseguridad |
| Feb 2019 – Aug 2020 | SENA | Tecnólogo en Producción Multimedia |
| Feb 2016 – Nov 2018 | SENA | Técnico en Programación de Software |

Languages: Spanish native, English advanced (B2/C1).

### Excluded, deliberately

- **The teaching role** listed on older CVs (Colegio San Luis / Colegio de
  Fátima de la Policía). Excluded at Fabio's request — it was an assistant
  position and not engineering work. Jul–Dec 2023 is covered by the
  cybersecurity diploma and the final semester at UniHorizonte, so removing it
  leaves no visible gap.
- **RobinFood** (Data Entry Specialist, Nov 2022 – Apr 2023, the UniHorizonte
  apprenticeship). Real, verified by a university letter dated Oct 2022, but
  excluded by Fabio's choice — it is not engineering work.
- **Foundever.** No document anywhere in the archive mentions it. Nothing is
  invented; it stays off until Fabio supplies details.

### Stack

- Languages: TypeScript, JavaScript, Python, Java
- Frameworks: FastAPI, Nuxt, Next, NestJS, Node, Tailwind
- Data: MongoDB, PostgreSQL, MySQL, SQL Server, Drizzle, Prisma
- Infrastructure: Docker, Linux, Git, GitHub Actions, Cloudflare Workers, Auth0, JWT
- AI: multi-agent systems, LLM orchestration, Azure OpenAI, context compaction, token management

### Contact

`fhvargas.work@gmail.com` (the work address, not the personal one) ·
github.com/varscr · linkedin.com/in/fabio-vargas · varscr.github.io

## Architecture

### One data source, two layouts

`lib/data.ts` is the single typed source of career content. No career text is
hardcoded in a component. Home renders each role's `summary`; `/cv` renders its
`bullets`. Editing a role once updates both pages.

```ts
type Role = {
  org: string
  title: string
  location?: string
  start: string          // 'Jan 2026'
  end: string | 'present'
  summary: string        // one or two sentences, home page
  bullets: string[]      // CV page
  tags?: string[]
}

type Education = { institution: string; programme: string; start: string; end: string; note?: string }
type Profile = { name: string; role: string; lead: string; email: string; links: Link[] }

export const profile: Profile
export const roles: Role[]              // reverse chronological
export const earlierCareer: { label: string; items: string[] }
export const education: Education[]
export const stack: Record<string, string[]>
```

### Routes

Both routes are statically exported; `output: 'export'` in `next.config.ts` is
unchanged.

- `app/page.tsx` — home. Name, one lead sentence, timeline, stack, contact.
- `app/cv/page.tsx` — the printable CV.

### Components

Deleted: `components/sections/Projects.tsx`, `Hero.tsx`, `About.tsx`,
`Experience.tsx`, `Skills.tsx`, `Contact.tsx`, `components/ui/Card.tsx`,
`components/ui/GradientDivider.tsx`.

Added:

- `components/RoleEntry.tsx` — takes `variant: 'web' | 'cv'`. The `web` variant
  renders the summary; `cv` renders the bullets. This is the only component
  that knows how a role is shaped.
- `components/Timeline.tsx` — the year column plus a list of `RoleEntry`.
- `components/Stack.tsx` — labelled groups of comma-separated terms.

Each component has one job and can be read without reading the others.

### Home page structure

1. Name, and role line "AI & Full-Stack Engineer".
2. **One sentence**, no summary paragraph — leads with the AI work and names
   Janover.
3. Timeline of roles, most recent first, each one or two lines.
4. Earlier-career condensed block.
5. Education.
6. Stack.
7. Contact links, and a link to `/cv`.

## Visual system

Light only. Ink `#111111` on warm off-white `#faf9f7`.

**Type.** Inter, variable, via `next/font` — self-hosted at build time, so no
runtime font request and no layout shift. Hierarchy comes from weight and size
alone. No boxes, no cards, no shadows, no gradients, no icons.

**The layout device** is a two-column timeline: years in a narrow left column
set in tabular-lining figures (`font-variant-numeric: tabular-nums`) so the
digits align down the page, roles in the right column. That vertical alignment
is the design. On viewports below 640px the year moves above its role and the
columns collapse to one.

**Accent.** Fabio's existing brand mint `#64ffda`, extracted from his logo
files. Two important constraints:

1. It fails contrast against off-white and can never carry text.
2. `#64ffda` on dark navy is the most-cloned developer-portfolio palette on the
   web. Used the usual way it signals *template*, which defeats the restraint.

So the mint's job changes: it appears in exactly two places — a 2px rule
beneath the name, and the marker in the year column for the current role.
Everything else is ink on off-white. The secondary brand yellow `#f2d562` is
unused.

**Links** are ink with a 1px underline at 40% opacity, going to full opacity on
hover. No colour change, no transitions beyond opacity.

## Print

`/cv` carries an `@media print` block:

- `@page { size: A4; margin: 18mm; }`
- `break-inside: avoid` on every role entry and education row, so no entry is
  split across a page boundary.
- Navigation, the `/cv` link, and hover affordances are hidden.
- The mint rule becomes a hairline grey — mint prints badly and wastes ink.
- Link URLs are printed inline after their text via `a::after { content: " (" attr(href) ")" }`,
  scoped to external links only, so a printed copy stays usable.
- Ink is pure black on white for print, not the screen off-white.

Target: two A4 pages.

## Dependencies

Remove `framer-motion` (~50KB, and the design has no animation). Keep Next 16,
React 19, Tailwind 4, TypeScript. Nothing is added.

## Verification

1. `npm run build` completes with no errors and no ESLint failures.
2. `out/index.html` and `out/cv/index.html` both exist.
3. Every `org` string in `roles` appears in both output files — this catches a
   role silently dropped by a render bug, which is the failure mode that would
   otherwise ship unnoticed.
4. The excluded strings — the teaching role, RobinFood, Foundever — appear in
   neither output file.
5. `/cv` rendered to PDF headless, checked to be two pages, and shown to Fabio.

Nothing is pushed to GitHub Pages until Fabio has seen the PDF.

## Deployment

`npm run deploy` (existing script: `next build && gh-pages -d out -b gh-pages`).
`public/.nojekyll` is retained. `gh` is authenticated as `varscr`.

## Out of scope for this spec

*Superseded August 23 2026.* `Career/` was restructured from this session, with
the obsidian session's agreement — see `personal-obsidian-vault/Career/` and its
`Portfolio-and-CV.md`, which is now the source of truth for what this site says.
