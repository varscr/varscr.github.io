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
