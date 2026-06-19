import { describe, it, expect } from 'vitest'
import { homeRows, featuredCards, groupByCategory, HOME_ROW_HUBS, FEATURED } from '../src/lib/home-rows'

const live = [
  { id: 'chore-charts-by-age', h1: 'Chore Charts by Age', type: 'category', category: null },
  { id: 'chore-chart-for-a-6-year-old', h1: 'Chore Chart for a 6-Year-Old', type: 'age', category: 'chore-charts-by-age', priority: 5, age: 6, hasImage: true },
  { id: 'chore-chart-for-a-5-year-old', h1: 'Chore Chart for a 5-Year-Old', type: 'age', category: 'chore-charts-by-age', priority: 5, age: 5, hasImage: true },
  { id: 'behavior-charts-for-kids', h1: 'Behavior Charts for Kids', type: 'category', category: null },
  { id: 'behavior-chart-for-classroom', h1: 'Classroom Behavior Chart', type: 'guide', category: 'behavior-charts-for-kids', priority: 5, hasImage: true },
  { id: 'reward-charts', h1: 'Reward Charts', type: 'category', category: null },
  { id: 'allowance-for-kids-by-age', h1: 'Allowance for Kids by Age', type: 'guide', category: null, hasImage: true },
]

describe('homeRows', () => {
  it('emits rows for live hubs in HOME_ROW_HUBS order, capped, with members sorted', () => {
    const rows = homeRows(live, { perRow: 4 })
    expect(rows.map((r) => r.hubId)).toEqual(['chore-charts-by-age', 'behavior-charts-for-kids'])
    expect(rows[0].title).toBe('Chore Charts by Age')
    expect(rows[0].slug).toBe('chore-charts-by-age')
    expect(rows[0].color).toEqual({ ink: 'var(--cat-age-ink)', fill: 'var(--cat-age-fill)' })
    expect(rows[0].cards.map((c) => c.slug)).toEqual(['chore-chart-for-a-5-year-old', 'chore-chart-for-a-6-year-old'])
    expect(rows[0].cards[0]).toMatchObject({ slug: 'chore-chart-for-a-5-year-old', label: 'BY AGE', categoryId: 'chore-charts-by-age', hasImage: true })
  })
  it('drops hubs with zero live members (reward-charts) and hubs not present', () => {
    const rows = homeRows(live, { perRow: 4 })
    expect(rows.find((r) => r.hubId === 'reward-charts')).toBeUndefined()
    expect(rows.find((r) => r.hubId === 'chore-chart-for-adhd')).toBeUndefined()
  })
  it('caps members per row', () => {
    const many = [
      { id: 'chore-charts-by-age', h1: 'By Age', type: 'category', category: null },
      ...Array.from({ length: 6 }, (_, i) => ({ id: `a${i}`, h1: `A${i}`, type: 'age', category: 'chore-charts-by-age', priority: 5, age: i, hasImage: true })),
    ]
    expect(homeRows(many, { perRow: 4 })[0].cards).toHaveLength(4)
  })
})

describe('featuredCards', () => {
  it('returns only live FEATURED slugs, in order, as cards', () => {
    const cards = featuredCards(live)
    expect(cards.map((c) => c.slug)).toEqual(['allowance-for-kids-by-age', 'chore-chart-for-a-6-year-old'])
    expect(cards[0]).toMatchObject({ slug: 'allowance-for-kids-by-age', label: 'POPULAR', hasImage: true })
  })
})

describe('groupByCategory (printables index = orphan guarantee)', () => {
  it('covers every non-hub live page exactly once across groups', () => {
    const groups = groupByCategory(live)
    const slugs = groups.flatMap((g) => g.items.map((i) => i.slug)).sort()
    const expected = live.filter((p) => p.type !== 'category').map((p) => p.id).sort()
    expect(slugs).toEqual(expected)
  })
  it('puts null-category guides under a "More" group', () => {
    const groups = groupByCategory(live)
    const more = groups.find((g) => g.categoryId === null)
    expect(more?.items.some((i) => i.slug === 'allowance-for-kids-by-age')).toBe(true)
  })
})

describe('constants', () => {
  it('feature allowance first; age hub leads the rows', () => {
    expect(FEATURED[0]).toBe('allowance-for-kids-by-age')
    expect(HOME_ROW_HUBS[0]).toBe('chore-charts-by-age')
  })
})
