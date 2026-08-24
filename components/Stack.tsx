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
