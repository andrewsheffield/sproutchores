import { describe, it, expect } from 'vitest'
import { CHORES_BY_AGE, bandForAge, type AgeBand } from '../src/data/chores-by-age'

describe('chores-by-age dataset', () => {
  it('has non-overlapping, ascending bands each with chores', () => {
    let prevMax = -Infinity
    for (const b of CHORES_BY_AGE) {
      expect(b.ages[0]).toBeLessThanOrEqual(b.ages[1])
      expect(b.ages[0]).toBeGreaterThan(prevMax)
      expect(b.chores.length).toBeGreaterThan(0)
      const ids = b.chores.map((c) => c.id)
      expect(new Set(ids).size).toBe(ids.length) // unique ids within band
      prevMax = b.ages[1]
    }
  })
  it('bandForAge returns the band containing the age', () => {
    const b = bandForAge(6) as AgeBand
    expect(b.ages[0]).toBeLessThanOrEqual(6)
    expect(b.ages[1]).toBeGreaterThanOrEqual(6)
  })
  it('bandForAge clamps below/above the supported range to the nearest band', () => {
    expect(bandForAge(1).band).toBe(CHORES_BY_AGE[0].band)
    expect(bandForAge(99).band).toBe(CHORES_BY_AGE[CHORES_BY_AGE.length - 1].band)
  })
})
