import { describe, it, expect } from 'vitest'
import { buildPrintableChartModel, WEEK_DAYS } from '../src/lib/printable-chart'

describe('buildPrintableChartModel', () => {
  const chores = [{ id: 'make-bed', label: 'Make the bed' }, { id: 'feed-pet', label: 'Feed a pet' }]
  it('builds a titled grid: one row per chore, day columns', () => {
    const m = buildPrintableChartModel({ childName: 'Sam', ageBand: '6-7', chores })
    expect(m.title).toBe("Sam's Chore Chart (ages 6-7)")
    expect(m.columns).toEqual(['Chore', ...WEEK_DAYS])
    expect(m.rows.map((r) => r.chore)).toEqual(['Make the bed', 'Feed a pet'])
  })
  it('falls back to a generic title without a child name', () => {
    expect(buildPrintableChartModel({ ageBand: '6-7', chores }).title).toBe('My Chore Chart (ages 6-7)')
  })
  it('supports custom days', () => {
    const m = buildPrintableChartModel({ ageBand: '6-7', chores, days: ['Sat', 'Sun'] })
    expect(m.columns).toEqual(['Chore', 'Sat', 'Sun'])
  })
})
