import { categoryColor, type CatColor } from './category-color'

/** Hubs the homepage may feature, in display order. Add new hubs here. */
export const HOME_ROW_HUBS = [
  'chore-charts-by-age',
  'behavior-charts-for-kids',
  'reward-charts',
  'chore-chart-for-adhd',
] as const

/** Curated above-the-fold stars (incl. the non-hub allowance breakout).
 *  Slots 2–3 hold our two closest-to-page-1 pages to concentrate homepage
 *  link equity on them (bedtime ~pos 19; autistic-child ~pos 22, best CTR). */
export const FEATURED = [
  'allowance-for-kids-by-age',
  'chore-chart-for-autistic-child',
  'bedtime-routine-chart',
  'chore-chart-for-a-6-year-old',
  'chore-chart-for-adhd',
] as const

/** Short uppercase card label per category. */
export const LABELS: Record<string, string> = {
  'chore-charts-by-age': 'BY AGE',
  'behavior-charts-for-kids': 'BEHAVIOR',
  'reward-charts': 'REWARD',
  'chore-chart-for-adhd': 'ADHD',
  'cleaning-schedules': 'CLEANING',
}

export interface LivePage {
  id: string
  h1: string
  type: string
  category?: string | null
  priority?: number
  age?: number
  hasImage?: boolean
}
export interface Card { slug: string; title: string; label: string; categoryId: string | null; hasImage: boolean }
export interface Row { hubId: string; title: string; slug: string; color: CatColor; cards: Card[] }

const labelFor = (id?: string | null) => (id && LABELS[id]) || 'PRINTABLE'

function toCard(p: LivePage, categoryId: string | null, label: string): Card {
  return { slug: p.id, title: p.h1, label, categoryId, hasImage: Boolean(p.hasImage) }
}

function membersOf(pages: LivePage[], hubId: string): LivePage[] {
  return pages
    .filter((p) => p.category === hubId && p.type !== 'category')
    .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0) || (a.age ?? 999) - (b.age ?? 999))
}

/** Curated, capped, ordered category rows for live hubs that have members. */
export function homeRows(pages: LivePage[], { perRow = 4 }: { perRow?: number } = {}): Row[] {
  const byId = new Map(pages.map((p) => [p.id, p]))
  const rows: Row[] = []
  for (const hubId of HOME_ROW_HUBS) {
    const hub = byId.get(hubId)
    if (!hub) continue // hub absent => not live
    const members = membersOf(pages, hubId)
    if (!members.length) continue
    rows.push({
      hubId,
      title: hub.h1,
      slug: hub.id,
      color: categoryColor(hubId),
      cards: members.slice(0, perRow).map((m) => toCard(m, hubId, labelFor(hubId))),
    })
  }
  return rows
}

/** Live FEATURED slugs, in order, as cards (labelled POPULAR). */
export function featuredCards(pages: LivePage[]): Card[] {
  const byId = new Map(pages.map((p) => [p.id, p]))
  return FEATURED.map((slug) => byId.get(slug))
    .filter((p): p is LivePage => Boolean(p))
    .map((p) => toCard(p, p.category ?? null, 'POPULAR'))
}

export interface Group { categoryId: string | null; title: string; color: CatColor; items: Card[] }

/** Every non-hub live page grouped by category (the /printables index). Hubs
 *  supply group titles; null-category guides land in a "More" group last. */
export function groupByCategory(pages: LivePage[]): Group[] {
  const byId = new Map(pages.map((p) => [p.id, p]))
  const items = pages.filter((p) => p.type !== 'category')
  const order: (string | null)[] = []
  const buckets = new Map<string | null, Card[]>()
  for (const p of items) {
    const cat = p.category ?? null
    if (!buckets.has(cat)) { buckets.set(cat, []); order.push(cat) }
    buckets.get(cat)!.push(toCard(p, cat, labelFor(cat)))
  }
  order.sort((a, b) => (a === null ? 1 : 0) - (b === null ? 1 : 0))
  return order.map((cat) => ({
    categoryId: cat,
    title: cat === null ? 'Guides & more' : byId.get(cat)?.h1 ?? labelFor(cat),
    color: categoryColor(cat),
    items: buckets.get(cat)!,
  }))
}
