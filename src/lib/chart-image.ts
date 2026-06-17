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

// ---- chartSvg: LANDSCAPE US-Letter (1650×1275) chart-grid → SVG string ----
// Matches the on-site generator (modern theme: indigo #4338ca header, white surface,
// near-black ink, light borders) so the preview looks like the real chart — and
// landscape because we tell users to print in landscape.
const CW = 1650
const CH = 1275
const INDIGO = '#4338ca' // --color-primary (modern) — header band + accents + checks
const INK = '#11151c' // --color-text (modern)
const MUTED = '#5c6b5f'
const BORDER = '#d6dae2' // --color-border (modern)
const SOFT = '#e7e6fb' // --color-accent-soft (modern) — pill
const WHITE = '#ffffff'
const ROW_ALT = '#f6f7fa' // faint zebra

const cesc = (s: unknown) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Greedy word-wrap for the chart title. */
function wrapChart(title: string, maxChars = 26, maxLines = 2): string[] {
  const words = String(title || '').trim().split(/\s+/)
  const lines: string[] = []
  let line = ''
  for (const w of words) {
    const next = line ? `${line} ${w}` : w
    if (next.length > maxChars && line) {
      lines.push(line)
      line = w
    } else line = next
  }
  if (line) lines.push(line)
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines)
    kept[maxLines - 1] = `${kept[maxLines - 1]}…`
    return kept
  }
  return lines
}

/** Deterministic "example" fill: ~80% of cells marked, with gaps. No randomness.
 *  rowIndex and colIndex are 0-based; colIndex=0 (the label column) is never passed by chartSvg. */
export function chartCellFilled(rowIndex: number, colIndex: number): boolean {
  return (rowIndex * 3 + colIndex * 2) % 5 !== 0
}

export function chartSvg(model: PrintableChart, opts: { title?: string; mark?: 'check' | 'star' } = {}): string {
  const title = opts.title ?? model.title
  const glyph = opts.mark === 'star' ? '★' : '✓'
  const cols = model.columns
  const rows = model.rows.slice(0, 8)
  const nCols = cols.length

  const margin = 70
  const tableTop = 240
  const tableLeft = margin
  const tableW = CW - margin * 2
  const itemColW = Math.round(tableW * 0.30)
  const cellColW = Math.round((tableW - itemColW) / Math.max(nCols - 1, 1))
  const headerH = 60
  const bottomLimit = CH - 80
  const rowH = Math.min(110, (bottomLimit - (tableTop + headerH)) / Math.max(rows.length, 1))

  const tSize = 56
  const titleTspans = wrapChart(title, 40, 2)
    .map((l, i) => `<tspan x="${margin}" y="${Math.round(150 + i * tSize * 1.12)}">${cesc(l)}</tspan>`)
    .join('')

  let head = `<rect x="${tableLeft}" y="${tableTop}" width="${tableW}" height="${headerH}" rx="10" fill="${INDIGO}"/>`
  head += `<text x="${tableLeft + 18}" y="${tableTop + headerH / 2 + 8}" font-size="26" font-weight="700" fill="${WHITE}">${cesc(cols[0])}</text>`
  for (let c = 1; c < nCols; c++) {
    const x = tableLeft + itemColW + (c - 1) * cellColW
    head += `<text x="${x + cellColW / 2}" y="${tableTop + headerH / 2 + 8}" text-anchor="middle" font-size="24" font-weight="700" fill="${WHITE}">${cesc(cols[c])}</text>`
  }

  let body = ''
  let y = tableTop + headerH
  rows.forEach((row, r) => {
    body += `<rect x="${tableLeft}" y="${y}" width="${tableW}" height="${rowH}" fill="${r % 2 ? ROW_ALT : WHITE}"/>`
    body += `<text x="${tableLeft + 18}" y="${y + rowH / 2 + 8}" font-size="25" fill="${INK}">${cesc(row.chore)}</text>`
    for (let c = 1; c < nCols; c++) {
      const cx = tableLeft + itemColW + (c - 1) * cellColW + cellColW / 2
      const cy = y + rowH / 2
      body += chartCellFilled(r, c)
        ? `<text x="${cx}" y="${cy + 11}" text-anchor="middle" font-size="34" fill="${INDIGO}">${glyph}</text>`
        : `<rect x="${cx - 18}" y="${cy - 18}" width="36" height="36" rx="7" fill="none" stroke="${BORDER}" stroke-width="3"/>`
    }
    y += rowH
  })

  let lines = ''
  for (let c = 1; c < nCols; c++) {
    const x = tableLeft + itemColW + (c - 1) * cellColW
    lines += `<line x1="${x}" y1="${tableTop}" x2="${x}" y2="${y}" stroke="${BORDER}" stroke-width="2"/>`
  }
  lines += `<rect x="${tableLeft}" y="${tableTop + headerH}" width="${tableW}" height="${y - tableTop - headerH}" fill="none" stroke="${BORDER}" stroke-width="2"/>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${CW} ${CH}" font-family="Inter">
  <rect width="${CW}" height="${CH}" fill="${WHITE}"/>
  <rect x="0" y="0" width="${CW}" height="12" fill="${INDIGO}"/>
  <rect x="${margin}" y="56" width="300" height="44" rx="22" fill="${SOFT}"/>
  <text x="${margin + 20}" y="84" font-size="22" font-weight="700" letter-spacing="1" fill="${INDIGO}">★ FREE PRINTABLE</text>
  <text font-size="${tSize}" font-weight="800" fill="${INK}">${titleTspans}</text>
  ${head}
  ${body}
  ${lines}
  <text x="${margin}" y="${CH - 34}" font-size="24" font-weight="700" fill="${INDIGO}">sproutchores.com</text>
  <text x="${CW - margin}" y="${CH - 34}" text-anchor="end" font-size="20" fill="${MUTED}">${glyph} = done · print in landscape</text>
</svg>`
}
