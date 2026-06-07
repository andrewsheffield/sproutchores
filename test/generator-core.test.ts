import { describe, it, expect } from 'vitest'
import { chartForAge } from '../src/lib/generator-core'

describe('chartForAge', () => {
  it('returns the band, age range, and a non-empty chore list for age 6', () => {
    const r = chartForAge(6)
    expect(r.ageBand).toBe('6-7')
    expect(r.ages).toEqual([6, 7])
    expect(r.chores.length).toBeGreaterThan(0)
    expect(r.chores[0]).toHaveProperty('id')
    expect(r.chores[0]).toHaveProperty('label')
  })
  it('maps a boundary age (5) to the 4-5 band', () => {
    expect(chartForAge(5).ageBand).toBe('4-5')
  })
  it('clamps out-of-range ages to nearest band', () => {
    expect(chartForAge(1).ageBand).toBe('4-5')
    expect(chartForAge(50).ageBand).toBe('8-9')
  })
  it('throws on non-finite age', () => {
    expect(() => chartForAge(NaN)).toThrow()
  })
})
