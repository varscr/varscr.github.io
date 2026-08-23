import { describe, expect, it } from 'vitest'
import { earlierCareer, education, profile, roles, selectedWork, stack } from './data'

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

  it('puts the current roles first', () => {
    // NeuralSeek and TechD run concurrently, so "current" is not a single row.
    const current = roles.filter((role) => role.end === 'present')
    expect(current.length).toBeGreaterThan(0)
    expect(roles.slice(0, current.length).every((role) => role.end === 'present')).toBe(true)
  })

  it('covers every month from Jan 2024 to now with no gap', () => {
    // Concurrent roles overlap, so check month coverage rather than adjacency.
    const now = sortKey('Apr 2026')
    const covered = new Set<number>()
    for (const role of roles) {
      const end = role.end === 'present' ? now : sortKey(role.end)
      for (let m = sortKey(role.start); m <= end; m += 1) covered.add(m)
    }
    for (let m = sortKey('Jan 2024'); m <= now; m += 1) {
      expect(covered.has(m), `no role covers month index ${m}`).toBe(true)
    }
  })
})

describe('excluded history', () => {
  const EXCLUDED = ['San Luis', 'Fátima', 'Fatima', 'Robin', 'Foundever', 'Monitor and Instructor', 'robotics']

  it('appears nowhere in the data', () => {
    const serialised = JSON.stringify({ profile, roles, selectedWork, earlierCareer, education, stack })
    for (const term of EXCLUDED) {
      expect(serialised, `"${term}" must not appear`).not.toContain(term)
    }
  })
})

describe('selected work', () => {
  it('names each piece and says something about it', () => {
    expect(selectedWork.length).toBeGreaterThan(0)
    for (const work of selectedWork) {
      expect(work.name.length, 'name').toBeGreaterThan(0)
      expect(work.context.length, `${work.name} context`).toBeGreaterThan(0)
      expect(work.body.length, `${work.name} body`).toBeGreaterThan(80)
    }
  })

  it('only describes work that a role on the timeline accounts for', () => {
    const orgs = new Set([...roles.map((r) => r.org), 'Independent'])
    for (const work of selectedWork) {
      expect(orgs.has(work.context), `${work.name} context "${work.context}"`).toBe(true)
    }
  })
})

describe('profile', () => {
  it('uses the work email, never the personal one', () => {
    expect(profile.email).toBe('fhvargas.work@gmail.com')
    expect(JSON.stringify(profile)).not.toContain('vargassanchezfabio01')
  })
})
