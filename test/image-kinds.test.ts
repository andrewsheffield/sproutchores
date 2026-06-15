import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { IMAGE_KINDS, pinSvg } from '../src/lib/image-kinds'

describe('IMAGE_KINDS registry', () => {
  it('has chart + pin kinds with the right dimensions and dirs', () => {
    expect(IMAGE_KINDS.chart).toMatchObject({ dir: 'charts', width: 1275, height: 1650 })
    expect(IMAGE_KINDS.pin).toMatchObject({ dir: 'pins', width: 1000, height: 1500 })
    expect(typeof IMAGE_KINDS.chart.svg).toBe('function')
    expect(typeof IMAGE_KINDS.pin.svg).toBe('function')
  })
  it('pin kind renders for every page; chart kind only for eligible pages', () => {
    expect(IMAGE_KINDS.pin.eligible({ type: 'category' })).toBe(true)
    expect(IMAGE_KINDS.chart.eligible({ type: 'category' })).toBe(false)
    expect(IMAGE_KINDS.chart.eligible({ type: 'age', age: 6 })).toBe(true)
  })
  it('chart kind svg draws the chart grid for a page', () => {
    const svg = IMAGE_KINDS.chart.svg({ type: 'age', age: 6, h1: 'Chore Chart for a 6-Year-Old' })
    expect(svg).toContain('viewBox="0 0 1275 1650"')
    expect(svg).toContain('Make the bed')
  })
})

describe('pinSvg migration parity', () => {
  it('produces output byte-identical to the pre-migration golden', () => {
    const golden = readFileSync(join(process.cwd(), 'test/fixtures/pin-golden.svg'), 'utf8')
    expect(pinSvg({ title: 'Chore Chart for a 6-Year-Old' })).toBe(golden)
  })
})
