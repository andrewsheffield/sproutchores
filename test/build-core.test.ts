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
