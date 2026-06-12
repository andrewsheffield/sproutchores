// site/src/lib/bundle.ts
// The lead-magnet bundle = the 6 charts in the "Age-by-Age Chore Chart Pack".
// Built from the SAME engine the site renders (bandForAge + buildPrintableChartModel
// + the generator variants) so the PDF never drifts from the live charts. Pure +
// tested; the PDF drawing itself lives in scripts/make-bundle.ts.
import { bandForAge } from '../data/chores-by-age'
import { buildPrintableChartModel, type PrintableChart } from './printable-chart'
import { GENERATOR_VARIANTS } from './generator-variants'

/** Representative ages — one per distinct band we want in the pack (4-5, 6-7, 8-9, 10-12). */
export const BUNDLE_AGES = [4, 6, 8, 10] as const

/** Fixed (non-age) variants must define their own rows; fail loudly if one doesn't,
 *  rather than letting a `!` assertion crash silently at PDF-build time. */
function variantItems(key: 'reward' | 'routine') {
  const items = GENERATOR_VARIANTS[key].defaultItems
  if (!items) throw new Error(`generator variant "${key}" is missing defaultItems`)
  return items
}

/** The ordered chart models that make up the printable bundle. */
export function bundleChartModels(): PrintableChart[] {
  const ageCharts = BUNDLE_AGES.map((age) => {
    const band = bandForAge(age)
    return buildPrintableChartModel({
      ageBand: band.band,
      chores: band.chores,
      titleNoun: 'Chore Chart',
      showAges: true,
    })
  })

  const reward = GENERATOR_VARIANTS.reward
  const rewardChart = buildPrintableChartModel({
    ageBand: '',
    chores: variantItems('reward'),
    titleNoun: reward.titleNoun,
    showAges: false,
    itemNoun: reward.itemNoun,
  })

  const routine = GENERATOR_VARIANTS.routine
  const routineChart = buildPrintableChartModel({
    ageBand: '',
    chores: variantItems('routine'),
    titleNoun: routine.titleNoun,
    showAges: false,
    itemNoun: routine.itemNoun,
  })

  return [...ageCharts, rewardChart, routineChart]
}
