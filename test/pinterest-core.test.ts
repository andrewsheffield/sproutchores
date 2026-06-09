import { describe, it, expect } from 'vitest'
import {
  boardForPage,
  pinTitle,
  pinDescription,
  pinWorklist,
  selectBatch,
  recordPinned,
} from '../scripts/pinterest/pinterest-core.mjs'

const page = {
  slug: 'chore-chart-for-a-6-year-old',
  h1: 'Chore Chart for a 6-Year-Old',
  meta_description: 'Make a free printable chore chart for your 6-year-old in seconds.',
  category: 'chore-charts-by-age',
  type: 'age',
}

describe('pinterest-core copy + boards', () => {
  it('maps a page to its topic board', () => {
    expect(boardForPage(page)).toBe('Chore Charts by Age')
    expect(boardForPage({ ...page, category: 'reward-charts-for-kids' })).toBe('Reward Charts for Kids')
    expect(boardForPage({ slug: 'bedtime-routine-chart', category: null })).toBe('Routines for Kids')
    expect(boardForPage({ slug: 'chore-chart-with-money', category: null })).toBe('Allowance & Money for Kids')
  })
  it('pinTitle front-loads the keyword and stays <=100 chars', () => {
    const t = pinTitle(page)
    expect(t.length).toBeLessThanOrEqual(100)
    expect(t.slice(0, 40).toLowerCase()).toContain('chore chart')
    expect(t).toContain('Free Printable')
  })
  it('pinDescription is non-empty and <=800 chars', () => {
    const d = pinDescription(page)
    expect(d.length).toBeGreaterThan(0)
    expect(d.length).toBeLessThanOrEqual(800)
    expect(d).toContain('Make a free printable')
  })
})

describe('pinterest-core worklist', () => {
  const pages = [
    { slug: 'a', category: 'chore-charts-by-age', h1: 'A', meta_description: 'a' },
    { slug: 'b', category: 'reward-charts-for-kids', h1: 'B', meta_description: 'b' },
  ]
  it('excludes pages already pinned for the variant + maps the board', () => {
    const wl = pinWorklist(pages, { a: [{ variant: 'a', pin_id: '1' }] }, 'a')
    expect(wl.map((w) => w.slug)).toEqual(['b'])
    expect(wl[0].boardName).toBe('Reward Charts for Kids')
  })
  it('a different variant is NOT considered already-pinned', () => {
    const wl = pinWorklist(pages, { a: [{ variant: 'a', pin_id: '1' }] }, 'b')
    expect(wl.map((w) => w.slug)).toEqual(['a', 'b'])
  })
  it('selectBatch caps the batch', () => {
    expect(selectBatch([1, 2, 3, 4], 2)).toEqual([1, 2])
    expect(selectBatch([1, 2], 5)).toEqual([1, 2])
  })
  it('recordPinned appends per-slug variant records immutably', () => {
    const prev = {}
    const out = recordPinned(prev, [{ slug: 'a', variant: 'a', pin_id: '9', board_id: 'b1', pinned_at: '2026-06-09' }])
    expect(out.a[0].pin_id).toBe('9')
    expect(prev).toEqual({}) // immutable
  })
})
