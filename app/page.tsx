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
        <div className="mt-10 grid gap-1 text-sm text-ink/55 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
          <span>{earlierCareer.label.replace('Earlier — ', '')}</span>
          <span>{earlierCareer.items.join(' · ')}</span>
        </div>
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
        <div className="mt-6 grid gap-1 text-sm text-ink/55 sm:grid-cols-[7.5rem_1fr] sm:gap-6">
          <span>Languages</span>
          <span>{languages}</span>
        </div>
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
