import { describe, it, expect } from 'vitest'
import { ACTIVE_VARIANT, THEMES, getVariant } from '../src/lib/variant-config'

describe('variant config (A/B seam, no engine yet)', () => {
  it('exposes a single active variant that is a known theme', () => {
    expect(ACTIVE_VARIANT).toBe('control')
    expect(THEMES).toContain(ACTIVE_VARIANT)
  })
  it('getVariant returns the active variant', () => {
    expect(getVariant()).toBe('control')
  })
})
