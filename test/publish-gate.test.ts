import { describe, it, expect } from 'vitest'
import { isPublished } from '../src/lib/publish-gate'

describe('isPublished', () => {
  const now = new Date('2026-06-06T12:00:00Z')
  it('is true when the publish date is in the past', () => {
    expect(isPublished('2026-06-01', now)).toBe(true)
  })
  it('is false when the publish date is in the future', () => {
    expect(isPublished('2026-06-10', now)).toBe(false)
  })
  it('is true exactly at the publish moment', () => {
    expect(isPublished('2026-06-06T12:00:00Z', now)).toBe(true)
  })
  it('treats a missing/invalid date as published (no gate)', () => {
    expect(isPublished(undefined as unknown as string, now)).toBe(true)
  })
})
