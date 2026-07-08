import { describe, it, expect } from 'vitest'
import { CHART_COLORS, colorById, tint } from '../src/data/chart-colors'
import { CHART_ANIMALS, animalById } from '../src/data/chart-animals'

describe('CHART_COLORS', () => {
  it('are all valid 6-digit hex', () => {
    for (const c of CHART_COLORS) expect(c.hex).toMatch(/^#[0-9a-f]{6}$/i)
  })
  it('have unique ids and non-empty labels', () => {
    const ids = CHART_COLORS.map((c) => c.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const c of CHART_COLORS) expect(c.label.trim().length).toBeGreaterThan(0)
  })
})

describe('colorById', () => {
  it('finds a known color', () => expect(colorById('ocean')?.hex).toBe('#2563af'))
  it('returns undefined for unknown / the default sentinel', () => {
    expect(colorById('default')).toBeUndefined()
    expect(colorById('nope')).toBeUndefined()
  })
})

describe('tint', () => {
  it('returns the same color at fraction 0 and white at fraction 1', () => {
    expect(tint('#2f7d52', 0)).toBe('#2f7d52')
    expect(tint('#2f7d52', 1)).toBe('#ffffff')
  })
  it('mixes toward white (lighter than the source)', () => {
    // 86% toward white — a pale wash used for the soft header band.
    expect(tint('#000000', 0.86)).toBe('#dbdbdb')
  })
  it('accepts a hex without the leading # and clamps out-of-range fractions', () => {
    expect(tint('000000', 0)).toBe('#000000')
    expect(tint('#000000', 2)).toBe('#ffffff')
    expect(tint('#ffffff', -1)).toBe('#ffffff')
  })
  it('returns the input unchanged for malformed hex', () => {
    expect(tint('not-a-hex', 0.5)).toBe('not-a-hex')
  })
})

describe('CHART_ANIMALS', () => {
  it('has a non-trivial set with unique ids', () => {
    expect(CHART_ANIMALS.length).toBeGreaterThanOrEqual(6)
    const ids = CHART_ANIMALS.map((a) => a.id)
    expect(new Set(ids).size).toBe(ids.length)
  })
  it('every svg is currentColor-driven inline markup', () => {
    for (const a of CHART_ANIMALS) {
      expect(a.svg.startsWith('<svg')).toBe(true)
      expect(a.svg).toContain('currentColor')
      expect(a.label.trim().length).toBeGreaterThan(0)
    }
  })
})

describe('animalById', () => {
  it('finds a known animal', () => expect(animalById('fox')?.label).toBe('Fox'))
  it('returns undefined for none / null / undefined / unknown', () => {
    expect(animalById('none')).toBeUndefined()
    expect(animalById(null)).toBeUndefined()
    expect(animalById(undefined)).toBeUndefined()
    expect(animalById('dragon')).toBeUndefined()
  })
})
