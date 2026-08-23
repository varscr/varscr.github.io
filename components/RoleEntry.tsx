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
