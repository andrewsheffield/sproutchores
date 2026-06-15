import { describe, it, expect } from 'vitest'
import { affiliateEnabled, affiliateSearchUrl, gearForPage, AFFILIATE_PRODUCTS } from '../src/lib/affiliate'

describe('affiliateEnabled', () => {
  it('false for empty/undefined/whitespace', () => {
    expect(affiliateEnabled('')).toBe(false)
    expect(affiliateEnabled(undefined)).toBe(false)
    expect(affiliateEnabled('   ')).toBe(false)
  })
  it('true for a real tag', () => expect(affiliateEnabled('sprout-20')).toBe(true))
})

describe('affiliateSearchUrl', () => {
  it('builds an encoded, tagged Amazon search URL', () => {
    const u = affiliateSearchUrl('dry erase sleeves', 'sprout-20')
    expect(u).toContain('amazon.com/s?k=dry%20erase%20sleeves')
    expect(u).toContain('tag=sprout-20')
  })
})

describe('gearForPage', () => {
  it('hub → no gear', () => expect(gearForPage('chore-charts-by-age', { type: 'category' })).toEqual([]))
  it('reward variant → stickers first', () =>
    expect(gearForPage('reward-charts-for-kids', { type: 'guide', generator_variant: 'reward' })[0]).toBe('stickers'))
  it('behavior variant → includes stickers', () =>
    expect(gearForPage('behavior-chart-for-kids', { type: 'guide', generator_variant: 'behavior' })).toContain('stickers'))
  it('money variant → includes jar', () =>
    expect(gearForPage('chore-chart-with-money', { type: 'guide', generator_variant: 'money' })).toContain('jar'))
  it('allowance slug → includes jar', () =>
    expect(gearForPage('allowance-for-kids-by-age', { type: 'guide' })).toContain('jar'))
  it('age page → sleeves + magnets', () =>
    expect(gearForPage('chore-chart-for-a-6-year-old', { type: 'age' })).toEqual(['sleeves', 'magnets']))
  it('every returned key maps to a known product', () => {
    const sets = [
      gearForPage('chore-chart-for-a-6-year-old', { type: 'age' }),
      gearForPage('reward-charts-for-kids', { type: 'guide', generator_variant: 'reward' }),
      gearForPage('allowance-for-kids-by-age', { type: 'guide' }),
    ]
    for (const keys of sets) for (const k of keys) expect(AFFILIATE_PRODUCTS[k]).toBeTruthy()
  })
})
