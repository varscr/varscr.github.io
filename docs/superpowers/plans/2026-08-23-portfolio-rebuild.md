# Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild varscr.github.io as a typographic, text-only career site with a printable CV at `/cv`, both rendered from one typed data source.

**Architecture:** `lib/data.ts` is the single source of career content. A shared `RoleEntry` component renders a role two ways — `variant="web"` shows a one-line summary, `variant="cv"` shows bullets — so a role is edited once and both pages update. Both routes are statically exported. A build-verification script asserts every org reaches the HTML and every deliberately-excluded string does not.

**Tech Stack:** Next 16 (`output: 'export'`), React 19, Tailwind 4, TypeScript, `next/font` (Inter), Vitest (dev only), Playwright Chromium for the PDF check (dev only).

**Spec:** `docs/superpowers/specs/2026-08-23-portfolio-rebuild-design.md`

## Global Constraints

- Ink `#111111`, paper `#faf9f7`, accent mint `#64ffda`. Mint appears in exactly two places: a 2px rule under the name and the current-role marker in the year column. It never carries text.
- Secondary brand yellow `#f2d562` is unused.
- Light only. No dark mode, no theme toggle.
- No projects section, anywhere, on either page.
- No 3D, WebGL, canvas, scroll animation, or entrance animation.
- No contact form, no analytics, no cookie banner.
- No boxes, cards, shadows, gradients, or icons.
- Font: Inter only, via `next/font` (self-hosted at build time). No runtime font request.
- Contact address is `fhvargas.work@gmail.com` — the work address. The personal address must never appear.
- No runtime dependency is added. `framer-motion` is removed. Vitest and Playwright are devDependencies and must not appear in `dependencies`.
- `output: 'export'` and `public/.nojekyll` stay as they are.
- These strings must not appear in any built HTML: `San Luis`, `Fátima`, `Fatima`, `Robin`, `Foundever`, `Monitor and Instructor`, `robotics`.
- Nothing is pushed to GitHub Pages until Fabio has seen the rendered PDF.

---

### Task 1: Career data source

**Files:**
- Create: `lib/data.ts`
- Create: `lib/data.test.ts`
- Modify: `package.json` (add vitest devDependency and `test` script)
- Create: `vitest.config.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: `Role`, `Education`, `Link`, `Profile` types; `profile`, `roles`, `earlierCareer`, `education`, `stack` exports. Every later task reads from these and adds no career text of its own.

- [ ] **Step 1: Add the test toolchain**

```bash
npm install -D vitest@^3
```

Add to `package.json` scripts:

```json
"test": "vitest run",
"verify": "npm run test && npm run build && node scripts/check-build.mjs"
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: { environment: 'node', include: ['lib/**/*.test.ts'] },
})
```

- [ ] **Step 2: Write the failing test**

Create `lib/data.test.ts`:

```ts
import { describe, expect, it } from 'vitest'
import { earlierCareer, education, profile, roles, stack } from './data'

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

function sortKey(value: string): number {
  if (value === 'present') return Number.MAX_SAFE_INTEGER
  const [month, year] = value.split(' ')
  const monthIndex = MONTHS.indexOf(month)
  expect(monthIndex, `unparseable month in "${value}"`).toBeGreaterThan(-1)
  return Number(year) * 12 + monthIndex
}

describe('roles', () => {
  it('is reverse chronological', () => {
    const keys = roles.map((role) => sortKey(role.start))
    expect(keys).toEqual([...keys].sort((a, b) => b - a))
  })

  it('gives every role the fields both layouts need', () => {
    for (const role of roles) {
      expect(role.org.length, `${role.org} org`).toBeGreaterThan(0)
      expect(role.title.length, `${role.org} title`).toBeGreaterThan(0)
      expect(role.summary.length, `${role.org} summary`).toBeGreaterThan(0)
      expect(role.bullets.length, `${role.org} bullets`).toBeGreaterThan(0)
      expect(sortKey(role.end)).toBeGreaterThan(sortKey(role.start))
    }
  })

  it('has exactly one current role, and it is first', () => {
    const current = roles.filter((role) => role.end === 'present')
    expect(current).toHaveLength(1)
    expect(roles[0].end).toBe('present')
  })

  it('runs continuously from Jan 2024 with no gap', () => {
    const recent = roles.filter((role) => sortKey(role.start) >= sortKey('Jan 2024'))
    for (let i = 0; i < recent.length - 1; i += 1) {
      const gap = sortKey(recent[i].start) - sortKey(recent[i + 1].end)
      expect(gap, `gap before ${recent[i].org}`).toBeLessThanOrEqual(1)
    }
  })
})

describe('excluded history', () => {
  const EXCLUDED = ['San Luis', 'Fátima', 'Fatima', 'Robin', 'Foundever', 'Monitor and Instructor', 'robotics']

  it('appears nowhere in the data', () => {
    const serialised = JSON.stringify({ profile, roles, earlierCareer, education, stack })
    for (const term of EXCLUDED) {
      expect(serialised, `"${term}" must not appear`).not.toContain(term)
    }
  })
})

describe('profile', () => {
  it('uses the work email, never the personal one', () => {
    expect(profile.email).toBe('fhvargas.work@gmail.com')
    expect(JSON.stringify(profile)).not.toContain('vargassanchezfabio01')
  })
})
```

- [ ] **Step 3: Run the test and watch it fail**

Run: `npm test`
Expected: FAIL — `lib/data.ts` does not export these bindings yet.

- [ ] **Step 4: Write `lib/data.ts`**

Replace the file entirely with:

```ts
export type Link = { label: string; href: string; display: string }

export type Role = {
  org: string
  title: string
  location?: string
  start: string
  end: string | 'present'
  summary: string
  bullets: string[]
  tags?: string[]
}

export type Education = {
  institution: string
  programme: string
  start: string
  end: string
  note?: string
}

export type Profile = {
  name: string
  role: string
  lead: string
  email: string
  links: Link[]
}

export const profile: Profile = {
  name: 'Fabio Vargas',
  role: 'AI & Full-Stack Engineer',
  lead: 'I work on multi-agent AI systems. At Janover I built features across Burrito — a conversational platform routing 12+ specialised agents on FastAPI and Azure OpenAI.',
  email: 'fhvargas.work@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/varscr', display: 'github.com/varscr' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/fabio-vargas', display: 'linkedin.com/in/fabio-vargas' },
  ],
}

export const roles: Role[] = [
  {
    org: 'Independent Contractor',
    title: 'Software Engineer',
    location: 'Remote',
    start: 'Jan 2026',
    end: 'present',
    summary:
      'Building Manasara, a luxury real estate platform for a client in Indonesia, on Cloudflare Workers.',
    bullets: [
      'Built and shipped Manasara, a luxury real estate site for a client in Indonesia, running on Cloudflare Workers.',
      'Verified responsive layouts across browsers and iOS devices with BrowserStack.',
    ],
    tags: ['Cloudflare Workers', 'TypeScript'],
  },
  {
    org: 'Janover',
    title: 'Full-Stack Software Developer',
    location: 'Florida, United States',
    start: 'Jun 2025',
    end: 'Jan 2026',
    summary:
      'Built features across Burrito, a multi-agent conversational AI platform routing 12+ specialised agents, and the core fintech product.',
    bullets: [
      'Developed features for Burrito, a multi-agent conversational AI platform on FastAPI and Azure OpenAI serving 12+ specialised chatbots with dynamic routing and fallback.',
      'Worked on the AgentFactory pattern for dynamic agent instantiation.',
      'Implemented MongoDB distributed locking to keep concurrent AI sessions from corrupting shared state.',
      'Contributed context compaction to hold long multi-turn conversations inside model token limits.',
      'Developed features in the core fintech platform — Nuxt, Nitro, TypeScript and MongoDB — with Auth0 and JWT authentication and GitHub Actions CI/CD.',
    ],
    tags: ['FastAPI', 'Azure OpenAI', 'Nuxt', 'MongoDB'],
  },
  {
    org: 'Teleperformance',
    title: 'Application Support Engineer',
    location: 'Bogotá, Colombia',
    start: 'Jun 2024',
    end: 'Jun 2025',
    summary: 'Ran production Linux and IIS servers behind critical database systems.',
    bullets: [
      'Managed production Linux and IIS servers for critical database systems, owning stability and performance.',
      'Diagnosed application crashes from logs alongside clients and development teams.',
      'Automated repetitive operational tasks with scripting.',
      'Wrote internal documentation centralising recurring issues for the team.',
    ],
    tags: ['Linux', 'IIS', 'SQL Server'],
  },
  {
    org: 'PBS Group',
    title: 'Bilingual Application Analyst',
    location: 'Bogotá, Colombia',
    start: 'Jan 2024',
    end: 'May 2024',
    summary:
      'Databases, IIS and Tomcat servers, and Avaya IVR deployments for internal applications.',
    bullets: [
      'Administered databases, maintaining their integrity and availability.',
      'Maintained IIS servers and deployed applications to Tomcat, including Avaya IVRs.',
      'Troubleshot internal applications to improve stability and performance.',
    ],
    tags: ['IIS', 'Tomcat', 'Avaya'],
  },
]

export const earlierCareer = {
  label: 'Earlier — graphic design & multimedia',
  items: ['Cámara de Comercio de Bogotá (2020)', 'ACIEM (2021)'],
}

export const education: Education[] = [
  {
    institution: 'Udacity',
    programme: 'MS, Artificial Intelligence',
    start: 'Jan 2026',
    end: 'Jun 2027',
    note: 'expected',
  },
  {
    institution: 'Fundación Universitaria Horizonte',
    programme: 'Ingeniería de Software',
    start: 'Feb 2021',
    end: 'Nov 2023',
    note: 'acta de grado April 2026',
  },
  {
    institution: 'Fundación Universitaria Horizonte',
    programme: 'Diplomado en Ciberseguridad',
    start: 'Jun 2023',
    end: 'Aug 2023',
  },
  {
    institution: 'SENA',
    programme: 'Tecnólogo en Producción Multimedia',
    start: 'Feb 2019',
    end: 'Aug 2020',
  },
  {
    institution: 'SENA',
    programme: 'Técnico en Programación de Software',
    start: 'Feb 2016',
    end: 'Nov 2018',
  },
]

export const stack: Record<string, string[]> = {
  Languages: ['TypeScript', 'JavaScript', 'Python', 'Java'],
  Frameworks: ['FastAPI', 'Nuxt', 'Next', 'NestJS', 'Node', 'Tailwind'],
  Data: ['MongoDB', 'PostgreSQL', 'MySQL', 'SQL Server', 'Drizzle', 'Prisma'],
  Infrastructure: ['Docker', 'Linux', 'Git', 'GitHub Actions', 'Cloudflare Workers', 'Auth0', 'JWT'],
  AI: ['Multi-agent systems', 'LLM orchestration', 'Azure OpenAI', 'Context compaction', 'Token management'],
  Tools: ['Cursor', 'Claude Code', 'BrowserStack', 'Postman'],
}

export const languages = 'Spanish (native) · English (advanced, B2/C1)'
```

- [ ] **Step 5: Run the test and watch it pass**

Run: `npm test`
Expected: PASS, 6 tests.

- [ ] **Step 6: Commit**

```bash
git add lib/data.ts lib/data.test.ts vitest.config.ts package.json package-lock.json
git commit -m "feat: single typed source for career data"
```

---

### Task 2: Strip the old site

**Files:**
- Delete: `components/sections/Projects.tsx`, `Hero.tsx`, `About.tsx`, `Experience.tsx`, `Skills.tsx`, `Contact.tsx`
- Delete: `components/ui/Card.tsx`, `components/ui/GradientDivider.tsx`, `components/ui/Section.tsx`
- Delete: `public/vercel.svg`, `public/next.svg`, `public/globe.svg`, `public/window.svg`, `public/file.svg`
- Modify: `app/page.tsx` (temporary placeholder)
- Modify: `package.json` (remove `framer-motion`)

**Interfaces:**
- Consumes: nothing.
- Produces: a repo that builds clean with no legacy components. Tasks 4–7 write into the emptied `components/` directory.

- [ ] **Step 1: Delete the old components and unused assets**

```bash
git rm components/sections/Projects.tsx components/sections/Hero.tsx \
       components/sections/About.tsx components/sections/Experience.tsx \
       components/sections/Skills.tsx components/sections/Contact.tsx \
       components/ui/Card.tsx components/ui/GradientDivider.tsx components/ui/Section.tsx \
       public/vercel.svg public/next.svg public/globe.svg public/window.svg public/file.svg
```

`public/.nojekyll` and `app/favicon.ico` stay.

- [ ] **Step 2: Remove framer-motion**

```bash
npm uninstall framer-motion
```

Confirm it is gone from both `dependencies` and `node_modules`:

```bash
grep -c framer package.json
```

Expected: `0`.

- [ ] **Step 3: Reduce `app/page.tsx` to a placeholder**

```tsx
import { profile } from '@/lib/data'

export default function Home() {
  return <main>{profile.name}</main>
}
```

- [ ] **Step 4: Verify the build is green**

Run: `npm run build`
Expected: build succeeds, `out/index.html` written, no module-not-found errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "chore: remove old sections, cards, and framer-motion"
```

---

### Task 3: Type system and global styles

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: CSS custom properties `--ink`, `--paper`, `--mint`, `--rule`; utility classes `.tabular` and `.measure`; the `--font-inter` variable bound to `<body>`. Every later component uses these names and defines no colours of its own.

- [ ] **Step 1: Replace `app/globals.css`**

```css
@import "tailwindcss";

:root {
  --ink: #111111;
  --paper: #faf9f7;
  --mint: #64ffda;
  --rule: rgba(17, 17, 17, 0.14);
}

@theme inline {
  --color-ink: var(--ink);
  --color-paper: var(--paper);
  --color-mint: var(--mint);
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;
}

html {
  -webkit-text-size-adjust: 100%;
}

body {
  background: var(--paper);
  color: var(--ink);
  font-synthesis-weight: none;
  text-rendering: optimizeLegibility;
}

/* The year column depends on digits sharing one advance width. */
.tabular {
  font-variant-numeric: tabular-nums lining-nums;
}

.measure {
  max-width: 64ch;
}

a {
  color: inherit;
  text-decoration: underline;
  text-decoration-color: var(--rule);
  text-underline-offset: 3px;
  transition: text-decoration-color 120ms ease;
}

a:hover {
  text-decoration-color: var(--ink);
}
```

- [ ] **Step 2: Update `app/layout.tsx` metadata and font**

```tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://varscr.github.io'),
  title: 'Fabio Vargas — AI & Full-Stack Engineer',
  description:
    'AI and full-stack engineer. Multi-agent conversational platforms on FastAPI and Azure OpenAI, production TypeScript, and Linux operations.',
  openGraph: {
    title: 'Fabio Vargas — AI & Full-Stack Engineer',
    description:
      'AI and full-stack engineer. Multi-agent conversational platforms on FastAPI and Azure OpenAI, production TypeScript, and Linux operations.',
    url: 'https://varscr.github.io',
    siteName: 'Fabio Vargas',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>{children}</body>
    </html>
  )
}
```

- [ ] **Step 2b: Confirm the font is self-hosted, not fetched at runtime**

Run: `npm run build && grep -ro "fonts.googleapis.com\|fonts.gstatic.com" out/ | head`
Expected: no output. `next/font` inlines the font files at build time; any hit here means the font would load over the network and shift layout.

- [ ] **Step 3: Verify**

Run: `npm run build`
Expected: succeeds. Open `out/index.html` and confirm a `<style>` block carries `--ink` and `--paper`.

- [ ] **Step 4: Commit**

```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: typographic base — ink on paper, Inter, tabular figures"
```

---

### Task 4: RoleEntry

**Files:**
- Create: `components/RoleEntry.tsx`

**Interfaces:**
- Consumes: `Role` from `@/lib/data`.
- Produces: `export default function RoleEntry({ role, variant }: { role: Role; variant: 'web' | 'cv' })`. Task 5 and Task 7 both render it. It is the only component that knows a role's shape.

- [ ] **Step 1: Write the component**

```tsx
import type { Role } from '@/lib/data'

export default function RoleEntry({ role, variant }: { role: Role; variant: 'web' | 'cv' }) {
  return (
    <article className="role break-inside-avoid">
      <h3 className={variant === 'cv' ? 'text-base font-semibold' : 'text-lg font-semibold'}>
        {role.org}
      </h3>
      <p className="text-sm text-ink/70">
        {role.title}
        {role.location ? ` · ${role.location}` : ''}
      </p>

      {variant === 'web' ? (
        <p className="measure mt-2 text-[0.95rem] leading-relaxed text-ink/85">{role.summary}</p>
      ) : (
        <ul className="mt-2 list-disc space-y-1 pl-4 text-[0.9rem] leading-snug">
          {role.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </article>
  )
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/RoleEntry.tsx
git commit -m "feat: RoleEntry renders a role for web or cv"
```

---

### Task 5: Timeline

**Files:**
- Create: `components/Timeline.tsx`

**Interfaces:**
- Consumes: `roles` from `@/lib/data`, `RoleEntry` from Task 4.
- Produces: `export default function Timeline({ variant }: { variant: 'web' | 'cv' })`.

- [ ] **Step 1: Write the component**

The two-column grid is the design. Below `sm`, the year stacks above its role.

```tsx
import RoleEntry from '@/components/RoleEntry'
import { roles } from '@/lib/data'

export default function Timeline({ variant }: { variant: 'web' | 'cv' }) {
  return (
    <div className={variant === 'cv' ? 'space-y-5' : 'space-y-10'}>
      {roles.map((role) => (
        <div
          key={`${role.org}-${role.start}`}
          className="grid break-inside-avoid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
        >
          <div className="tabular pt-1 text-sm text-ink/55">
            <span className="relative">
              {role.end === 'present' && (
                <span
                  aria-hidden
                  className="absolute -left-4 top-[0.55em] hidden h-[6px] w-[6px] rounded-full bg-mint sm:block print:hidden"
                />
              )}
              {role.start}
            </span>
            <span className="mx-1 sm:hidden">–</span>
            <span className="sm:block">{role.end === 'present' ? 'present' : role.end}</span>
          </div>
          <RoleEntry role={role} variant={variant} />
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify it type-checks**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add components/Timeline.tsx
git commit -m "feat: two-column timeline with tabular year gutter"
```

---

### Task 6: Home page

**Files:**
- Modify: `app/page.tsx`
- Create: `components/Stack.tsx`

**Interfaces:**
- Consumes: `profile`, `earlierCareer`, `education`, `stack`, `languages` from `@/lib/data`; `Timeline` from Task 5.
- Produces: the rendered home route. Task 9's checker asserts every org string appears in `out/index.html`.

- [ ] **Step 1: Write `components/Stack.tsx`**

```tsx
import { stack } from '@/lib/data'

export default function Stack() {
  return (
    <dl className="space-y-3">
      {Object.entries(stack).map(([group, items]) => (
        <div key={group} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
          <dt className="text-sm text-ink/55">{group}</dt>
          <dd className="measure text-[0.95rem] leading-relaxed">{items.join(', ')}</dd>
        </div>
      ))}
    </dl>
  )
}
```

- [ ] **Step 2: Write `app/page.tsx`**

```tsx
import Link from 'next/link'
import Stack from '@/components/Stack'
import Timeline from '@/components/Timeline'
import { earlierCareer, education, languages, profile } from '@/lib/data'

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
      {children}
    </h2>
  )
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
      <header>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{profile.name}</h1>
        <div aria-hidden className="mt-3 h-[2px] w-16 bg-mint" />
        <p className="mt-4 text-base text-ink/70">{profile.role}</p>
        <p className="measure mt-8 text-lg leading-relaxed">{profile.lead}</p>
      </header>

      <section className="mt-20">
        <SectionHeading>Experience</SectionHeading>
        <Timeline variant="web" />
        <p className="mt-10 grid gap-1 text-sm text-ink/55 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
          <span>{earlierCareer.label.replace('Earlier — ', '')}</span>
          <span>{earlierCareer.items.join(' · ')}</span>
        </p>
      </section>

      <section className="mt-20">
        <SectionHeading>Education</SectionHeading>
        <div className="space-y-4">
          {education.map((entry) => (
            <div
              key={`${entry.institution}-${entry.programme}`}
              className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
            >
              <div className="tabular text-sm text-ink/55">
                {entry.start}
                <span className="mx-1 sm:hidden">–</span>
                <span className="sm:block">{entry.end}</span>
              </div>
              <div>
                <p className="text-[0.95rem]">{entry.programme}</p>
                <p className="text-sm text-ink/60">
                  {entry.institution}
                  {entry.note ? ` · ${entry.note}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 grid gap-1 text-sm text-ink/55 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
          <span>Languages</span>
          <span>{languages}</span>
        </p>
      </section>

      <section className="mt-20">
        <SectionHeading>Stack</SectionHeading>
        <Stack />
      </section>

      <section className="mt-20">
        <SectionHeading>Contact</SectionHeading>
        <ul className="space-y-2 text-[0.95rem]">
          <li>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </li>
          {profile.links.map((link) => (
            <li key={link.href}>
              <a href={link.href} rel="me noopener">
                {link.display}
              </a>
            </li>
          ))}
          <li>
            <Link href="/cv">Curriculum vitae</Link>
          </li>
        </ul>
      </section>
    </main>
  )
}
```

- [ ] **Step 3: Verify visually**

Run: `npm run dev` and open `http://localhost:3000`.
Check: the year column aligns down the page; the mint rule sits under the name and the mint dot marks only the current role; nothing else is coloured; at a 375px viewport the columns collapse and nothing overflows horizontally.

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx components/Stack.tsx
git commit -m "feat: home page — lead sentence, timeline, education, stack, contact"
```

---

### Task 7: CV page

**Files:**
- Create: `app/cv/page.tsx`

**Interfaces:**
- Consumes: `profile`, `earlierCareer`, `education`, `stack`, `languages`, `Timeline`.
- Produces: the `/cv` route, exported to `out/cv/index.html`.

- [ ] **Step 1: Write `app/cv/page.tsx`**

Denser than home: tighter rhythm, contact details in the header where a CV expects them, bullets instead of summaries.

```tsx
import type { Metadata } from 'next'
import Timeline from '@/components/Timeline'
import { earlierCareer, education, languages, profile, stack } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fabio Vargas — Curriculum Vitae',
  description: 'Curriculum vitae of Fabio Vargas, AI and full-stack engineer.',
}

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 border-b border-ink/15 pb-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-ink/50">
      {children}
    </h2>
  )
}

export default function Cv() {
  return (
    <main className="cv mx-auto max-w-3xl px-6 py-14">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">{profile.name}</h1>
        <p className="mt-1 text-sm text-ink/70">{profile.role}</p>
        <p className="mt-3 text-sm text-ink/70">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          {profile.links.map((link) => (
            <span key={link.href}>
              {' · '}
              <a href={link.href}>{link.display}</a>
            </span>
          ))}
          {' · '}
          <a href="https://varscr.github.io">varscr.github.io</a>
        </p>
        <p className="measure mt-4 text-[0.9rem] leading-snug">{profile.lead}</p>
      </header>

      <section className="mb-7">
        <Heading>Experience</Heading>
        <Timeline variant="cv" />
        <p className="mt-4 grid gap-1 text-[0.85rem] text-ink/60 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
          <span>{earlierCareer.label.replace('Earlier — ', '')}</span>
          <span>{earlierCareer.items.join(' · ')}</span>
        </p>
      </section>

      <section className="mb-7">
        <Heading>Education</Heading>
        <div className="space-y-2">
          {education.map((entry) => (
            <div
              key={`${entry.institution}-${entry.programme}`}
              className="grid break-inside-avoid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
            >
              <div className="tabular text-[0.85rem] text-ink/55">
                {entry.start} – {entry.end}
              </div>
              <div>
                <p className="text-[0.9rem]">{entry.programme}</p>
                <p className="text-[0.85rem] text-ink/60">
                  {entry.institution}
                  {entry.note ? ` · ${entry.note}` : ''}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Heading>Stack</Heading>
        <dl className="space-y-1.5">
          {Object.entries(stack).map(([group, items]) => (
            <div key={group} className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
              <dt className="text-[0.85rem] text-ink/55">{group}</dt>
              <dd className="text-[0.9rem] leading-snug">{items.join(', ')}</dd>
            </div>
          ))}
          <div className="grid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
            <dt className="text-[0.85rem] text-ink/55">Languages</dt>
            <dd className="text-[0.9rem]">{languages}</dd>
          </div>
        </dl>
      </section>
    </main>
  )
}
```

- [ ] **Step 2: Verify**

Run: `npm run build`
Expected: `out/cv/index.html` exists.

- [ ] **Step 3: Commit**

```bash
git add app/cv/page.tsx
git commit -m "feat: /cv page rendering the same data as bullets"
```

---

### Task 8: Print stylesheet

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: the `.cv` and `.role` class hooks placed in Tasks 4 and 7.
- Produces: an A4 print rendering of `/cv`.

- [ ] **Step 1: Append the print block to `app/globals.css`**

```css
@media print {
  @page {
    size: A4;
    margin: 18mm;
  }

  :root {
    --ink: #000000;
    --paper: #ffffff;
    --rule: rgba(0, 0, 0, 0.25);
  }

  body {
    background: #ffffff;
    color: #000000;
    font-size: 10.5pt;
  }

  .cv {
    max-width: none;
    padding: 0;
  }

  /* No entry may straddle a page boundary. */
  .role,
  .break-inside-avoid {
    break-inside: avoid;
  }

  a {
    text-decoration: none;
  }

  /* A printed copy has no hover and no click — the URL has to be on the paper.
     Scoped to external links so mailto: and internal hrefs stay clean. */
  a[href^="http"]::after {
    content: " (" attr(href) ")";
    font-size: 0.85em;
    color: rgba(0, 0, 0, 0.55);
    word-break: break-all;
  }

  .print\:hidden {
    display: none !important;
  }
}
```

- [ ] **Step 2: Verify in the browser**

Run: `npm run dev`, open `http://localhost:3000/cv`, print preview (Ctrl+P).
Check: two pages; no role split across the break; mint dot absent; URLs printed after link text; black on white.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "feat: A4 print stylesheet for /cv"
```

---

### Task 9: Build verification script

**Files:**
- Create: `scripts/check-build.mjs`

**Interfaces:**
- Consumes: `out/index.html`, `out/cv/index.html`.
- Produces: `npm run verify` exits non-zero when content is missing or excluded content leaked.

- [ ] **Step 1: Write the checker**

The failure this guards against: a render bug silently drops a role and the site ships without it, or an excluded entry finds its way back in. Neither is visible from a green build.

```js
import { readFileSync, existsSync } from 'node:fs'

const PAGES = ['out/index.html', 'out/cv/index.html']
const REQUIRED = ['Independent Contractor', 'Janover', 'Teleperformance', 'PBS Group', 'Udacity', 'SENA']
const EXCLUDED = ['San Luis', 'Fátima', 'Fatima', 'Robin', 'Foundever', 'Monitor and Instructor', 'robotics']
const failures = []

for (const page of PAGES) {
  if (!existsSync(page)) {
    failures.push(`missing: ${page}`)
    continue
  }
  const html = readFileSync(page, 'utf8')
  for (const term of REQUIRED) {
    if (!html.includes(term)) failures.push(`${page}: missing "${term}"`)
  }
  for (const term of EXCLUDED) {
    if (html.includes(term)) failures.push(`${page}: leaked "${term}"`)
  }
  if (html.includes('vargassanchezfabio01')) failures.push(`${page}: leaked personal email`)
  if (!html.includes('fhvargas.work@gmail.com')) failures.push(`${page}: missing work email`)
}

if (failures.length) {
  console.error('check-build FAILED\n' + failures.map((f) => `  - ${f}`).join('\n'))
  process.exit(1)
}
console.log(`check-build passed — ${PAGES.length} pages, ${REQUIRED.length} orgs present`)
```

- [ ] **Step 2: Prove the checker actually catches a drop**

A checker that has never failed is not known to work. Temporarily truncate the data:

```bash
npm run build
node scripts/check-build.mjs                      # expect: passed
sed -i 's/PBS Group/PBS GroupX/' out/index.html
node scripts/check-build.mjs; echo "exit=$?"      # expect: FAILED, exit=1
npm run build                                     # restore
```

- [ ] **Step 3: Run the full gate**

Run: `npm run verify`
Expected: tests pass, build succeeds, checker prints `check-build passed`.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-build.mjs
git commit -m "test: assert every org reaches the HTML and excluded history does not"
```

---

### Task 10: PDF render and review gate

**Files:**
- Create: `scripts/render-cv-pdf.mjs`

**Interfaces:**
- Consumes: the exported `out/` directory.
- Produces: `cv.pdf` for Fabio's review. **This task ends at a human gate — nothing deploys until he approves.**

- [ ] **Step 1: Write the renderer**

```js
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFileSync, existsSync } from 'node:fs'
import { extname, join } from 'node:path'

const TYPES = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.ico': 'image/x-icon' }

const server = createServer((req, res) => {
  let path = join('out', decodeURIComponent(req.url.split('?')[0]))
  if (!existsSync(path) || !extname(path)) path = join(path, 'index.html')
  if (!existsSync(path)) {
    res.writeHead(404).end('not found')
    return
  }
  res.writeHead(200, { 'content-type': TYPES[extname(path)] ?? 'application/octet-stream' })
  res.end(readFileSync(path))
})

await new Promise((resolve) => server.listen(4321, resolve))

const browser = await chromium.launch()
const page = await browser.newPage()
await page.goto('http://localhost:4321/cv/', { waitUntil: 'networkidle' })
await page.emulateMedia({ media: 'print' })
await page.pdf({ path: 'cv.pdf', format: 'A4', margin: { top: '18mm', bottom: '18mm', left: '18mm', right: '18mm' }, printBackground: false })

await browser.close()
server.close()

// Playwright writes an uncompressed page tree, so counting /Type /Page is reliable
// here. If it ever returns 0 the count is wrong, not the PDF — fail loudly rather
// than let a silent 0 pass the gate.
const pages = readFileSync('cv.pdf').toString('latin1').match(/\/Type\s*\/Page[^s]/g)?.length ?? 0
console.log(`cv.pdf written — ${pages} page(s)`)
if (pages === 0) {
  console.error('FAILED: could not count pages — inspect cv.pdf by hand before trusting it')
  process.exit(1)
}
if (pages > 2) {
  console.error(`FAILED: expected at most 2 pages, got ${pages}`)
  process.exit(1)
}
```

- [ ] **Step 2: Install Playwright as a devDependency**

```bash
npm install -D playwright && npx playwright install chromium
```

- [ ] **Step 3: Render and check the page count**

Run: `npm run build && node scripts/render-cv-pdf.mjs`
Expected: `cv.pdf written — 2 page(s)` (1 is also fine; 3+ fails and the CV layout needs tightening).

- [ ] **Step 4: Add `cv.pdf` to `.gitignore`**

It is a build artefact, regenerated on demand.

```bash
echo "cv.pdf" >> .gitignore
```

- [ ] **Step 5: Commit**

```bash
git add scripts/render-cv-pdf.mjs .gitignore package.json package-lock.json
git commit -m "test: render /cv to PDF and assert the page count"
```

- [ ] **Step 6: STOP — show Fabio the PDF**

Do not proceed to Task 11. Show `cv.pdf` and wait for his explicit approval.

---

### Task 11: Deploy

**Files:**
- Modify: `README.md`
- Create: `docs/README.md`

**Blocked on Task 10 Step 6.** Do not start until Fabio has approved the PDF.

- [ ] **Step 1: Rewrite `README.md`**

```markdown
# varscr.github.io

Personal site and CV for Fabio Vargas. Next.js, statically exported to GitHub Pages.

All career content lives in `lib/data.ts`. The home page and `/cv` render the same
data two ways — edit a role once and both update. Nothing else contains career text.

## Commands

    npm run dev      # local dev server
    npm test         # data integrity tests
    npm run verify   # tests + build + assert every role reached the HTML
    npm run deploy   # build and publish to the gh-pages branch

## Docs

See `docs/README.md`.
```

- [ ] **Step 2: Write `docs/README.md`**

```markdown
# Docs

- `superpowers/specs/2026-08-23-portfolio-rebuild-design.md` — design and the
  career data behind it, with the source documents each fact came from.
- `superpowers/plans/2026-08-23-portfolio-rebuild.md` — the implementation plan.

## Updating the CV

Edit `lib/data.ts`. Run `npm run verify`, then
`node scripts/render-cv-pdf.mjs` to regenerate `cv.pdf`, then `npm run deploy`.
```

- [ ] **Step 3: Final gate**

Run: `npm run verify`
Expected: green.

- [ ] **Step 4: Merge and deploy**

```bash
git add README.md docs/README.md
git commit -m "docs: how the site is built and how to update the CV"
git checkout main && git merge --no-ff portfolio-rebuild
npm run deploy
```

- [ ] **Step 5: Confirm the live site**

Run: `curl -s https://varscr.github.io | grep -c Janover`
Expected: at least `1`. Allow a minute or two for Pages to rebuild.

---

## Open questions for Fabio

Answered 2026-08-23:

1. **Janover title** — real title, *Full-Stack Software Developer*. The Burrito
   bullets carry the AI weight.
2. **Vitest and Playwright** — both approved as devDependencies.
3. **Ownership language** — Fabio collaborated on Burrito and built features
   within it; he did not build it alone. Every Janover bullet is scoped to
   contribution, not ownership. Cursor and Claude Code appear under Tools in
   the stack, not in the lead sentence.
