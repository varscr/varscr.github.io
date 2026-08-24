import { profile, projects, roles } from '@/lib/data'

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
      <header className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
        <picture className="shrink-0">
          <source srcSet={profile.photo.webp} type="image/webp" />
          <img
            src={profile.photo.jpg}
            alt={profile.photo.alt}
            width={176}
            height={176}
            className="h-32 w-32 rounded-full object-cover sm:h-44 sm:w-44"
          />
        </picture>

        <div>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">{profile.name}</h1>
          <div aria-hidden className="mt-4 h-[2px] w-16 bg-mint" />
          <p className="mt-5 text-base text-ink/70">{profile.role}</p>
          <p className="mt-1 text-sm text-ink/50">{profile.keywords}</p>
        </div>
      </header>

      <section className="reveal mt-16">
        <SectionHeading>About</SectionHeading>
        <p className="text-lg leading-relaxed">{profile.lead}</p>
        <p className="mt-4 text-ink/70">{profile.now}</p>
      </section>

      <section className="reveal mt-16">
        <SectionHeading>Experience</SectionHeading>
        <div className="space-y-7">
          {roles.map((role) => (
            <article key={`${role.org}-${role.start}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4">
                <h3 className="font-semibold">{role.org}</h3>
                <span className="tabular text-sm text-ink/50">
                  {role.start} – {role.end}
                </span>
              </div>
              <p className="text-sm text-ink/60">{role.title}</p>
              <p className="mt-2 leading-relaxed text-ink/85">{role.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal mt-16">
        <SectionHeading>Projects</SectionHeading>
        <div className="space-y-8">
          {projects.map((project) => (
            <article key={project.name}>
              <h3 className="font-semibold">{project.name}</h3>
              <p className="mt-2 leading-relaxed text-ink/85">{project.bullets[0]}</p>
              <p className="mt-3 text-sm text-ink/45">{project.stack}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="reveal mt-16">
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
      <div aria-hidden className="scroll-glow" />
    </main>
  )
}
