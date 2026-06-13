import { describe, it, expect } from 'vitest'
import { HOUSEHOLD_CHORES } from '../src/data/household-chores'

describe('HOUSEHOLD_CHORES', () => {
  it('is a non-empty list of {id,label} household (not age-based) chores', () => {
    expect(Array.isArray(HOUSEHOLD_CHORES)).toBe(true)
    expect(HOUSEHOLD_CHORES.length).toBeGreaterThanOrEqual(8)
    for (const c of HOUSEHOLD_CHORES) {
      expect(typeof c.id).toBe('string')
      expect(c.id.length).toBeGreaterThan(0)
      expect(typeof c.label).toBe('string')
      expect(c.label.length).toBeGreaterThan(0)
    }
  })
  it('has unique ids', () => {
    const ids = HOUSEHOLD_CHORES.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
})
