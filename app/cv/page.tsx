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
    <main className="cv mx-auto max-w-3xl px-6 py-10">
      <header className="mb-7">
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

      <section className="mb-6">
        <Heading>Experience</Heading>
        <Timeline variant="cv" />
        <div className="mt-4 grid gap-1 text-[0.85rem] text-ink/60 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
          <span>{earlierCareer.label.replace('Earlier — ', '')}</span>
          <span>{earlierCareer.items.join(' · ')}</span>
        </div>
      </section>

      <section className="mb-6">
        <Heading>Education</Heading>
        <div className="space-y-2">
          {education.map((entry) => (
            <div
              key={`${entry.institution}-${entry.programme}`}
              className="grid break-inside-avoid gap-1 sm:grid-cols-[7.5rem_1fr] sm:gap-6"
            >
              <div className="tabular text-[0.85rem] leading-snug text-ink/55">
                <span className="block">{entry.start}</span>
                <span className="block">{entry.end}</span>
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
            <dt className="text-[0.85rem] text-ink/55">Spoken</dt>
            <dd className="text-[0.9rem]">{languages}</dd>
          </div>
        </dl>
      </section>
    </main>
  )
}
