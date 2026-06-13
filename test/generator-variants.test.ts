import { describe, it, expect } from 'vitest'
import { GENERATOR_VARIANTS } from '../src/lib/generator-variants'

describe('household variant', () => {
  const v = GENERATOR_VARIANTS.household
  it('exists and uses the people column mode', () => {
    expect(v).toBeDefined()
    expect(v.columnMode).toBe('people')
    expect(v.ageBased).toBe(false)
    expect(Array.isArray(v.defaultPeople)).toBe(true)
    expect(v.defaultPeople!.length).toBeGreaterThanOrEqual(2)
    expect((v.defaultItems || []).length).toBeGreaterThan(0)
  })
  it('existing day-based variants default to columnMode days', () => {
    expect(GENERATOR_VARIANTS.chore.columnMode ?? 'days').toBe('days')
  })
})
