import type { Chore } from '../data/chores-by-age'

export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const

export type PrintableChart = { title: string; columns: string[]; rows: { id: string; chore: string }[] }

export function buildPrintableChartModel(input: {
  ageBand: string
  chores: Chore[]
  childName?: string
  days?: readonly string[]
  /** Title noun, e.g. "Chore Chart" (default) or "Bedtime Routine". */
  titleNoun?: string
  /** Append " (ages N-M)" to the title. Default true (age-based charts). */
  showAges?: boolean
  /** First-column header. Default "Chore". */
  itemNoun?: string
  /** People names for 'people' column mode. */
  people?: string[]
  /** Column mode: 'days' (default) or 'people'. */
  columnMode?: 'days' | 'people'
}): PrintableChart {
  if (input.columnMode === 'people') {
    return {
      title: input.titleNoun ?? 'Chore Chart',
      columns: [input.itemNoun ?? 'Chore', ...(input.people ?? [])],
      rows: input.chores.map((c) => ({ id: c.id, chore: c.label })),
    }
  }

  const days = input.days ?? WEEK_DAYS
  const owner = input.childName?.trim() ? `${input.childName.trim()}'s` : 'My'
  const noun = input.titleNoun ?? 'Chore Chart'
  const ageSuffix = (input.showAges ?? true) ? ` (ages ${input.ageBand})` : ''
  return {
    title: `${owner} ${noun}${ageSuffix}`,
    columns: [input.itemNoun ?? 'Chore', ...days],
    // Each row carries the chore id so the chart can render a per-chore icon
    // (id → icon via chore-icons) in both the SSR pass and the island rebuild.
    rows: input.chores.map((c) => ({ id: c.id, chore: c.label })),
  }
}
