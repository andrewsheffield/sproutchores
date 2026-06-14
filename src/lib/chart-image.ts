// Pure derivation of a page's printable-chart image: which pages get one
// (chartEligible), the chart model to draw (chartModelForPage — generalizes
// bundle.ts to ANY chart page), the cell mark, and the file name. The SVG template
// (chartSvg) lives in this file too (added in Task 2). No I/O here.
import { bandForAge } from '../data/chores-by-age'
import { buildPrintableChartModel, type PrintableChart } from './printable-chart'
import { GENERATOR_VARIANTS, type GeneratorVariant } from './generator-variants'

/** Minimal page shape this module needs — satisfied by both the content entry
 *  `entry.data` and the extended `livePages()` objects. */
export type ChartPageData = {
  type?: string
  age?: number
  generator_variant?: GeneratorVariant | null
  people?: string[]
  h1?: string
}

/** Representative age for age-based variant pages that carry no explicit age.
 *  8 is mid-range: the 8–9 band has a solid spread of real chores. */
export const DEFAULT_AGE = 8

/** A page gets a chart image iff the page itself shows a chart generator:
 *  non-hub AND (has an age OR declares a generator variant). Mirrors the
 *  `showGenerator` predicate in [...slug].astro so we never emit an <img> for a
 *  page that has no chart (hubs, round-up guides like chore-apps). */
export function chartEligible(d: ChartPageData): boolean {
  if (d.type === 'category') return false
  return typeof d.age === 'number' || d.generator_variant != null
}

/** ✓ for tick-box charts, ★ for reward/behavior. */
export function chartMarkForPage(d: ChartPageData): 'check' | 'star' {
  const v = d.generator_variant
  return v && GENERATOR_VARIANTS[v].mark === 'star' ? 'star' : 'check'
}

export function chartImageName(slug: string): string {
  return `${slug}.png`
}

/** Build the PrintableChart to draw — the same engine the page/bundle use. */
export function chartModelForPage(d: ChartPageData): PrintableChart {
  const v = d.generator_variant ?? undefined
  const cfg = v ? GENERATOR_VARIANTS[v] : undefined

  // People-column variants (household): editable person columns.
  if (cfg?.columnMode === 'people') {
    return buildPrintableChartModel({
      ageBand: '',
      chores: cfg.defaultItems ?? [],
      titleNoun: cfg.titleNoun,
      itemNoun: cfg.itemNoun,
      columnMode: 'people',
      people: d.people ?? cfg.defaultPeople,
    })
  }

  // Fixed (non-age) variants ship their own rows: routine, reward, behavior, blank.
  if (cfg && !cfg.ageBased) {
    return buildPrintableChartModel({
      ageBand: '',
      chores: cfg.defaultItems ?? [],
      titleNoun: cfg.titleNoun,
      showAges: false,
      itemNoun: cfg.itemNoun,
    })
  }

  // Age-based: an age page, or an age-based variant (chore/money). Use the page's
  // age, or DEFAULT_AGE when a variant page carries none.
  const age = typeof d.age === 'number' ? d.age : DEFAULT_AGE
  const band = bandForAge(age)
  return buildPrintableChartModel({
    ageBand: band.band,
    chores: band.chores,
    titleNoun: cfg?.titleNoun ?? 'Chore Chart',
    showAges: true,
  })
}
