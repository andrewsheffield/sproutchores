import { describe, it, expect } from 'vitest'
import { chartEligible, chartModelForPage, chartMarkForPage, chartImageName, chartSvg, chartCellFilled } from '../src/lib/chart-image'

describe('chartEligible', () => {
  it('excludes hubs', () => expect(chartEligible({ type: 'category' })).toBe(false))
  it('includes age pages', () => expect(chartEligible({ type: 'age', age: 6 })).toBe(true))
  it('includes variant pages', () => expect(chartEligible({ type: 'guide', generator_variant: 'reward' })).toBe(true))
  it('excludes chart-less guides', () => expect(chartEligible({ type: 'guide' })).toBe(false))
})

describe('chartModelForPage', () => {
  it('age page → age-band chores, Chore + 7 day columns', () => {
    const m = chartModelForPage({ type: 'age', age: 6 })
    expect(m.columns[0]).toBe('Chore')
    expect(m.columns.length).toBe(8)
    expect(m.rows.map((r) => r.chore)).toContain('Make the bed')
  })
  it('reward variant → Goal column + Reward Chart title', () => {
    const m = chartModelForPage({ type: 'guide', generator_variant: 'reward' })
    expect(m.columns[0]).toBe('Goal')
    expect(m.title).toContain('Reward Chart')
  })
  it('household variant → people columns', () => {
    const m = chartModelForPage({ type: 'guide', generator_variant: 'household', people: ['A', 'B'] })
    expect(m.columns).toEqual(['Chore', 'A', 'B'])
  })
  it('money variant without age → default age band (8 columns)', () => {
    const m = chartModelForPage({ type: 'guide', generator_variant: 'money' })
    expect(m.columns.length).toBe(8)
  })
  it('blank variant → zero rows', () => {
    const m = chartModelForPage({ type: 'guide', generator_variant: 'blank' })
    expect(m.rows).toHaveLength(0)
  })
})

describe('chartMarkForPage', () => {
  it('star for reward + behavior', () => {
    expect(chartMarkForPage({ generator_variant: 'reward' })).toBe('star')
    expect(chartMarkForPage({ generator_variant: 'behavior' })).toBe('star')
  })
  it('check otherwise', () => expect(chartMarkForPage({ type: 'age', age: 6 })).toBe('check'))
})

describe('chartImageName', () => {
  it('= slug.png', () => expect(chartImageName('chore-chart-for-a-6-year-old')).toBe('chore-chart-for-a-6-year-old.png'))
})

describe('chartSvg', () => {
  const m = chartModelForPage({ type: 'age', age: 6 })
  it('is deterministic (same input → identical output)', () => {
    expect(chartSvg(m, { title: 'Chore Chart for a 6-Year-Old', mark: 'check' }))
      .toBe(chartSvg(m, { title: 'Chore Chart for a 6-Year-Old', mark: 'check' }))
  })
  it('renders the title, a chore row, the brand + landscape viewBox', () => {
    const svg = chartSvg(m, { title: 'Chore Chart for a 6-Year-Old', mark: 'check' })
    expect(svg).toContain('viewBox="0 0 1650 1275"')
    expect(svg).toContain('6-Year-Old')
    expect(svg).toContain('Make the bed')
    expect(svg).toContain('sproutchores.com')
  })
  it('uses the star glyph for star charts', () => {
    expect(chartSvg(chartModelForPage({ type: 'guide', generator_variant: 'reward' }), { mark: 'star' })).toContain('★')
  })
  it('escapes angle brackets in the title', () => {
    expect(chartSvg(m, { title: 'a < b', mark: 'check' })).toContain('a &lt; b')
  })
  it('falls back to model.title when no opts.title is given', () => {
    expect(chartSvg(m)).toContain(m.title)
  })
})

describe('chartCellFilled', () => {
  it('is a deterministic mix (some filled, some empty)', () => {
    expect(chartCellFilled(0, 1)).toBe(true)   // (0*3 + 1*2) % 5 = 2
    expect(chartCellFilled(1, 1)).toBe(false)  // (1*3 + 1*2) % 5 = 0
  })
})
