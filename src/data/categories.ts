// Category metadata for breadcrumbs + related-links. `hubSlug` points at the hub
// route; the breadcrumb only renders it as a link when the hub is actually live
// (isHubLive gates it at render time), so setting hubSlug here is always safe.
// Ids must match member pages' `category` field AND the hub page's slug/id.
// Derived from research/plan.json taxonomy + the 2026-08-11 taxonomy reconcile.

export type CategoryMeta = { id: string; label: string; hubSlug?: string }

export const CATEGORIES: Record<string, CategoryMeta> = {
  'chore-charts-by-age': { id: 'chore-charts-by-age', label: 'Chore Charts by Age', hubSlug: 'chore-charts-by-age' },
  'free-printable-chore-charts': { id: 'free-printable-chore-charts', label: 'Free Printable Chore Charts', hubSlug: 'free-printable-chore-charts' },
  'chore-charts-for-adults': { id: 'chore-charts-for-adults', label: 'Chore Charts for Adults', hubSlug: 'chore-charts-for-adults' },
  'family-chore-charts': { id: 'family-chore-charts', label: 'Family Chore Charts', hubSlug: 'family-chore-charts' },
  'reward-charts': { id: 'reward-charts', label: 'Reward Charts for Kids', hubSlug: 'reward-charts' },
  'behavior-charts-for-kids': { id: 'behavior-charts-for-kids', label: 'Behavior Charts for Kids', hubSlug: 'behavior-charts-for-kids' },
  'routine-charts': { id: 'routine-charts', label: 'Routine Charts for Kids', hubSlug: 'routine-charts' },
  'cleaning-schedules': { id: 'cleaning-schedules', label: 'Cleaning Schedules', hubSlug: 'cleaning-schedules' },
  'chore-chart-for-adhd': { id: 'chore-chart-for-adhd', label: 'Chore Charts for ADHD', hubSlug: 'chore-chart-for-adhd' },
}

export function categoryMeta(id: string | null | undefined): CategoryMeta | undefined {
  return id ? CATEGORIES[id] : undefined
}
