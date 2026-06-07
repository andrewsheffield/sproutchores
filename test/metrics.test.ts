import { describe, it, expect } from 'vitest'
import { createMetrics, EVENTS } from '../src/lib/metrics'

describe('metrics client', () => {
  it('tags every event with the active variant and the event name', () => {
    const sent: any[] = []
    const m = createMetrics({ send: (p) => sent.push(p), getVariant: () => 'control', now: () => 1000 })
    m.track(EVENTS.PDF_DOWNLOAD, { age: 6 })
    expect(sent).toHaveLength(1)
    expect(sent[0]).toMatchObject({ event: 'pdf_download', variant: 'control', age: 6, ts: 1000 })
  })
  it('exposes the agreed event names (north star + funnel)', () => {
    expect(EVENTS.GENERATOR_START).toBe('generator_start')
    expect(EVENTS.GENERATOR_COMPLETE).toBe('generator_complete')
    expect(EVENTS.PDF_DOWNLOAD).toBe('pdf_download')
  })
  it('never throws if a send fails (metrics must not break the page)', () => {
    const m = createMetrics({ send: () => { throw new Error('network') }, getVariant: () => 'control' })
    expect(() => m.track(EVENTS.GENERATOR_START)).not.toThrow()
  })
})
