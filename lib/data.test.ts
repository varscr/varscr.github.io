import { describe, expect, it } from 'vitest'
import { certifications, earlierCareer, education, profile, projects, roles, stack } from './data'

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
  const EXCLUDED = [
    'San Luis',
    'Fátima',
    'Fatima',
    'Robin',
    'Foundever',
    'Monitor and Instructor',
    'robotics',
  ]

  it('appears nowhere in the data', () => {
    const serialised = JSON.stringify({ profile, roles, projects, earlierCareer, education, stack })
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

describe('stack', () => {
  it('no longer lists C# or .NET anywhere', () => {
    const serialised = JSON.stringify({ profile, roles, projects, stack, certifications })
    expect(serialised).not.toMatch(/C#/)
    expect(serialised).not.toMatch(/\.NET/i)
  })
})

describe('projects', () => {
  // The infra notes are full of domains, IPs, hostnames and a real client's name.
  // None of it belongs in a document that gets uploaded to job boards.
  const LEAKS = [
    'clinicadelauto',
    'varscr.com',
    '192.168',
    '100.105',
    'tail663b5f',
    'Clínica del Auto',
    'immich.',
    'portainer.',
    'dozzle.',
    'finance.varscr',
  ]

  it('describes the work without leaking infrastructure detail', () => {
    const serialised = JSON.stringify(projects)
    for (const leak of LEAKS) {
      expect(serialised, `"${leak}" must not reach a public document`).not.toContain(leak)
    }
  })

  it('says something substantive about each project', () => {
    expect(projects.length).toBeGreaterThan(0)
    for (const project of projects) {
      expect(project.name.length, 'name').toBeGreaterThan(0)
      expect(project.stack.length, `${project.name} stack`).toBeGreaterThan(0)
      expect(project.bullets.length, `${project.name} bullets`).toBeGreaterThan(0)
    }
  })
})

describe('honesty guardrails', () => {
  // Career/Positioning.md in the personal vault is the source of truth:
  // Fabio contributed to Burrito as a team member. He did not architect its agentic
  // layer and did not implement its Azure OpenAI integration, and he has only light
  // Azure exposure — so "Azure OpenAI" must never appear as one of his skills.
  it('never claims Azure OpenAI as a personal skill', () => {
    expect(JSON.stringify(stack)).not.toContain('Azure')
    expect(profile.lead).not.toContain('Azure')
  })

  it('says contributed to Burrito, never built or created it', () => {
    const janover = roles.find((role) => role.org === 'Janover')
    const text = JSON.stringify(janover) + profile.lead
    expect(text).toMatch(/Contributed to Burrito|contributed to Burrito/)
    expect(text).not.toMatch(/[Bb]uilt Burrito|[Cc]reated Burrito|[Aa]rchitected/)
  })
})
