import { describe, it, expect } from 'vitest'
import { pageKind } from '../../src/build-core.mjs'

describe('pageKind — scale variants', () => {
  it('maps household generator variants to "household"', () => {
    for (const variant of ['couples', 'family', 'multikid', 'household']) {
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
