import type { Chore } from '../data/chores-by-age'

export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export type PrintableChart = { title: string; columns: string[]; rows: { id: string; chore: string }[] }

export function buildPrintableChartModel(input: {
  ageBand: string; chores: Chore[]; childName?: string; days?: readonly string[]
}): PrintableChart {
  const days = input.days ?? WEEK_DAYS
  const owner = input.childName?.trim() ? `${input.childName.trim()}'s` : 'My'
  return {
    title: `${owner} Chore Chart (ages ${input.ageBand})`,
    columns: ['Chore', ...days],
    // Each row carries the chore id so the chart can render a per-chore icon
    // (id → icon via chore-icons) in both the SSR pass and the island rebuild.
    rows: input.chores.map((c) => ({ id: c.id, chore: c.label })),
  }
}
