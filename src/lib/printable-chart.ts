import type { Chore } from '../data/chores-by-age'

export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export type PrintableChart = { title: string; columns: string[]; rows: { chore: string }[] }

export function buildPrintableChartModel(input: {
  ageBand: string; chores: Chore[]; childName?: string; days?: readonly string[]
}): PrintableChart {
  const days = input.days ?? WEEK_DAYS
  const owner = input.childName?.trim() ? `${input.childName.trim()}'s` : 'My'
  return {
    title: `${owner} Chore Chart (ages ${input.ageBand})`,
    columns: ['Chore', ...days],
    rows: input.chores.map((c) => ({ chore: c.label })),
  }
}
