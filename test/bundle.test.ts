// site/test/bundle.test.ts
import { describe, it, expect } from 'vitest'
import { bundleChartModels, BUNDLE_AGES } from '../src/lib/bundle'

describe('bundleChartModels', () => {
  const charts = bundleChartModels()

  it('produces one chart per bundle age plus reward + routine (6 total)', () => {
    expect(charts).toHaveLength(BUNDLE_AGES.length + 2)
    expect(charts).toHaveLength(6)
  })

  it('starts with age-banded chore charts (first = ages 4-5)', () => {
    expect(charts[0].title).toContain('Chore Chart')
    expect(charts[0].title).toContain('ages 4-5')
    expect(charts[0].columns[0]).toBe('Chore')
    // 8 columns: the item column + 7 weekday columns.
    expect(charts[0].columns).toHaveLength(8)
  })

  it('includes a Reward Chart and a Bedtime Routine with their own item nouns', () => {
    const reward = charts.find((c) => c.title.includes('Reward Chart'))
    const routine = charts.find((c) => c.title.includes('Bedtime Routine'))
    expect(reward).toBeDefined()
    expect(routine).toBeDefined()
    expect(reward!.columns[0]).toBe('Goal')
    expect(routine!.columns[0]).toBe('Step')
    // Fixed variants don't append an age suffix.
    expect(reward!.title).not.toContain('ages')
  })

  it('every chart has at least one row', () => {
    for (const c of charts) expect(c.rows.length).toBeGreaterThan(0)
  })
})
