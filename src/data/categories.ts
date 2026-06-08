// Category metadata for breadcrumbs + related-links. `hubSlug` is set only once
// a category-hub page exists at that route; until then the breadcrumb renders the
// label as plain text (no broken link). Derived from research/plan.json taxonomy.

export type CategoryMeta = { id: string; label: string; hubSlug?: string }

export const CATEGORIES: Record<string, CategoryMeta> = {
  'chore-charts-by-age': { id: 'chore-charts-by-age', label: 'Chore Charts by Age', hubSlug: 'chore-charts-by-age' },
  'free-printable-chore-charts': { id: 'free-printable-chore-charts', label: 'Free Printable Chore Charts' },
  'reward-charts-for-kids': { id: 'reward-charts-for-kids', label: 'Reward Charts for Kids' },
  'chore-apps-and-allowance-for-kids': { id: 'chore-apps-and-allowance-for-kids', label: 'Chore Apps & Allowance' },
}

export function categoryMeta(id: string | null | undefined): CategoryMeta | undefined {
  return id ? CATEGORIES[id] : undefined
}
