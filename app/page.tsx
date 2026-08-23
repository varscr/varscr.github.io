import { profile, selectedWork } from '@/lib/data'

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-8 text-xs font-semibold uppercase tracking-[0.18em] text-ink/45">
      {children}
    </h2>
  )
}

export default function Home() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20 sm:py-28">
      <header>
        <picture>
          <source srcSet={profile.photo.webp} type="image/webp" />
          <img
            src={profile.photo.jpg}
            alt={profile.photo.alt}
            width={112}
            height={112}
            className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
          />
        </picture>

        <h1 className="mt-8 text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
        <div aria-hidden className="mt-4 h-[2px] w-16 bg-mint" />
        <p className="mt-5 text-base text-ink/70">{profile.role}</p>
        <p className="mt-1 text-sm text-ink/50">{profile.keywords}</p>

        <p className="mt-10 text-lg leading-relaxed">{profile.lead}</p>
      </header>

      <section className="mt-16">
        <SectionHeading>Now</SectionHeading>
        <p className="text-[1.05rem] leading-relaxed">{profile.now}</p>
      </section>

      <section className="mt-16">
        <SectionHeading>Selected work</SectionHeading>
        <div className="space-y-10">
          {selectedWork.map((work) => (
            <article key={work.name}>
              <h3 className="text-lg font-semibold">
                {work.name}
                <span className="ml-2 text-sm font-normal text-ink/50">{work.context}</span>
              </h3>
              <p className="mt-2 leading-relaxed text-ink/85">{work.body}</p>
              <p className="mt-3 text-sm text-ink/45">{work.tags.join(' · ')}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <SectionHeading>Contact</SectionHeading>
        <ul className="space-y-2">
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
        </ul>
      </section>
    </main>
  )
}
