import RoleEntry from '@/components/RoleEntry'
import { roles } from '@/lib/data'

export default function Timeline({ variant }: { variant: 'web' | 'cv' }) {
  return (
    <div className={variant === 'cv' ? 'space-y-4' : 'space-y-10'}>
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
