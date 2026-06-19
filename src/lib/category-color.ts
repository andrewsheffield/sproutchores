export interface CatColor { ink: string; fill: string }

const MAP: Record<string, CatColor> = {
  'chore-charts-by-age': { ink: 'var(--cat-age-ink)', fill: 'var(--cat-age-fill)' },
  'behavior-charts-for-kids': { ink: 'var(--cat-behavior-ink)', fill: 'var(--cat-behavior-fill)' },
  'reward-charts': { ink: 'var(--cat-reward-ink)', fill: 'var(--cat-reward-fill)' },
  'chore-chart-for-adhd': { ink: 'var(--cat-adhd-ink)', fill: 'var(--cat-adhd-fill)' },
  'cleaning-schedules': { ink: 'var(--cat-cleaning-ink)', fill: 'var(--cat-cleaning-fill)' },
}
const DEFAULT: CatColor = { ink: 'var(--cat-default-ink)', fill: 'var(--cat-default-fill)' }

/** CSS-var color pair for a category/hub id. Unknown/null → neutral default. */
export function categoryColor(id?: string | null): CatColor {
  return (id && MAP[id]) || DEFAULT
}
