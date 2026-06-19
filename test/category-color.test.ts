import { describe, it, expect } from 'vitest'
import { categoryColor } from '../src/lib/category-color'

describe('categoryColor', () => {
  it('maps known hubs to their CSS-var pair', () => {
    expect(categoryColor('chore-charts-by-age')).toEqual({ ink: 'var(--cat-age-ink)', fill: 'var(--cat-age-fill)' })
    expect(categoryColor('behavior-charts-for-kids')).toEqual({ ink: 'var(--cat-behavior-ink)', fill: 'var(--cat-behavior-fill)' })
    expect(categoryColor('reward-charts')).toEqual({ ink: 'var(--cat-reward-ink)', fill: 'var(--cat-reward-fill)' })
    expect(categoryColor('chore-chart-for-adhd')).toEqual({ ink: 'var(--cat-adhd-ink)', fill: 'var(--cat-adhd-fill)' })
    expect(categoryColor('cleaning-schedules')).toEqual({ ink: 'var(--cat-cleaning-ink)', fill: 'var(--cat-cleaning-fill)' })
  })
  it('falls back to default for unknown or null', () => {
    const def = { ink: 'var(--cat-default-ink)', fill: 'var(--cat-default-fill)' }
    expect(categoryColor('something-else')).toEqual(def)
    expect(categoryColor(null)).toEqual(def)
    expect(categoryColor(undefined)).toEqual(def)
  })
})
