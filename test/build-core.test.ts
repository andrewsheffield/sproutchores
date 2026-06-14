import { describe, it, expect } from 'vitest'
import { pageKind, categoryForId, householdEntryConfig } from '../../src/build-core.mjs'

describe('pageKind — scale variants', () => {
  it('maps household generator variants to "household"', () => {
    for (const variant of ['couples', 'family', 'multi_child', 'household']) {
      expect(pageKind({ type: 'item', build_data: { generator_config: { variant } } })).toBe('household')
    }
  })
  it('treats ANY category page as a buildable hub (not only age_picker)', () => {
    expect(pageKind({ type: 'category', build_data: { generator_config: { variant: 'adult' } } })).toBe('hub')
    expect(pageKind({ type: 'category', build_data: { generator_config: { entry: 'age_picker' } } })).toBe('hub')
  })
  it('still classifies existing kinds', () => {
    expect(pageKind({ type: 'item', build_data: { generator_config: { variant: 'reward' } } })).toBe('guide-reward')
    expect(pageKind({ type: 'item', build_data: { generator_config: { variant: 'routine' } } })).toBe('guide-routine')
  })
})

describe('categoryForId — hub-slug alignment', () => {
  const taxo = [{ id: 'chore-chart-for-adults', members: ['chore-chart-for-couples', 'family-chore-chart', 'chore-chart-for-multiple-kids'] }]
  it('returns the hub page slug for a member', () => {
    expect(categoryForId(taxo, 'chore-chart-for-couples')).toBe('chore-chart-for-adults')
  })
})

describe('householdEntryConfig', () => {
  it('household items get the household generator + per-variant people', () => {
    expect(householdEntryConfig('household', { variant: 'couples' })).toEqual({ generatorVariant: 'household', people: ['Partner 1', 'Partner 2'] })
    expect(householdEntryConfig('household', { variant: 'multi_child' })).toEqual({ generatorVariant: 'household', people: ['Kid 1', 'Kid 2', 'Kid 3'] })
    // family uses the variant default (no people override)
    expect(householdEntryConfig('household', { variant: 'family' })).toEqual({ generatorVariant: 'household', people: undefined })
  })
  it('the adults hub uses the household generator (default people)', () => {
    expect(householdEntryConfig('hub', { variant: 'adult' })).toEqual({ generatorVariant: 'household', people: undefined })
  })
  it('other kinds get nothing', () => {
    expect(householdEntryConfig('age', {})).toEqual({ generatorVariant: undefined, people: undefined })
    expect(householdEntryConfig('hub', { entry: 'age_picker' })).toEqual({ generatorVariant: undefined, people: undefined })
  })
})

describe('pageKind — behavior + blank', () => {
  it('maps behavior and blank item variants', () => {
    expect(pageKind({ type: 'item', build_data: { generator_config: { variant: 'behavior' } } })).toBe('behavior')
    expect(pageKind({ type: 'item', build_data: { generator_config: { variant: 'blank' } } })).toBe('blank')
  })
})
describe('householdEntryConfig — behavior hub', () => {
  it('the behavior hub uses the behavior generator', () => {
    expect(householdEntryConfig('hub', { variant: 'behavior' })).toEqual({ generatorVariant: 'behavior', people: undefined })
  })
})

import { entryToPlanPage } from '../../src/build-core.mjs'
describe('entryToPlanPage (corpus refresh reverse-map)', () => {
  const cases = [
    ['chore-chart-for-a-6-year-old', { type: 'age', age: 6, target_keyword: 'x', publish_date: '2026-06-01' }, 'age'],
    ['reward-charts-for-kids', { type: 'guide', generator_variant: 'reward', target_keyword: 'x', publish_date: '2026-06-21' }, 'guide-reward'],
    ['bedtime-routine-chart', { type: 'guide', generator_variant: 'routine', target_keyword: 'x', publish_date: '2026-06-25' }, 'guide-routine'],
    ['chore-chart-with-money', { type: 'guide', generator_variant: 'money', target_keyword: 'x', publish_date: '2026-06-17' }, 'guide-money'],
    ['chore-charts-by-age', { type: 'category', target_keyword: 'x', publish_date: '2026-06-07' }, 'hub'],
    ['allowance-for-kids-by-age', { type: 'guide', target_keyword: 'x', publish_date: '2026-06-09' }, 'guide-allowance'],
    ['chore-apps-for-kids', { type: 'guide', target_keyword: 'x', publish_date: '2026-06-27' }, 'guide-roundup'],
    ['montessori-chore-chart', { type: 'guide', age: 6, target_keyword: 'x', publish_date: '2026-06-19' }, 'guide-montessori'],
  ]
  for (const [slug, entry, expectedKind] of cases) {
    it(`${slug} -> kind ${expectedKind}, preserving id/keyword/date/status`, () => {
      const p = entryToPlanPage(slug, entry)
      expect(p.id).toBe(slug)
      expect(p.target_keyword).toBe('x')
      expect(p.publish_date).toBe(entry.publish_date)
      expect(p.status).toBe('planned')
      expect(pageKind(p)).toBe(expectedKind)
    })
  }
})
