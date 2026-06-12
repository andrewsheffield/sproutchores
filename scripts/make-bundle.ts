// site/scripts/make-bundle.ts
// Build step: render the "Age-by-Age Chore Chart Pack" → dist/downloads/<file>.pdf.
// One US-Letter landscape page per chart from bundleChartModels(), drawn with pdf-lib
// (Inter embedded via fontkit). Runs AFTER `astro build` (writes into dist/, like
// make-pins). Run from seo-test/site:  node --import tsx/esm scripts/make-bundle.ts
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { PDFDocument, rgb, type PDFFont, type PDFPage } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { bundleChartModels } from '../src/lib/bundle'
import type { PrintableChart } from '../src/lib/printable-chart'

// Brand palette (from src/styles/tokens.css :root).
const GREEN = rgb(0x2f / 255, 0x7d / 255, 0x52 / 255) // --color-primary
const INK = rgb(0x24 / 255, 0x30 / 255, 0x27 / 255) // --color-text
const MUTED = rgb(0x5c / 255, 0x6b / 255, 0x5f / 255) // --color-muted
const BORDER = rgb(0xe4 / 255, 0xdd / 255, 0xcf / 255) // --color-border
const TICK_FILL = rgb(0xfd / 255, 0xec / 255, 0xd9 / 255) // --color-accent-soft
const WHITE = rgb(1, 1, 1)

const PAGE_W = 792
const PAGE_H = 612 // US Letter, landscape
const MARGIN = 48

function centerText(page: PDFPage, text: string, x: number, w: number, y: number, size: number, font: PDFFont, color = INK) {
  const tw = font.widthOfTextAtSize(text, size)
  page.drawText(text, { x: x + (w - tw) / 2, y, size, font, color })
}

function drawChart(page: PDFPage, chart: PrintableChart, font: PDFFont, bold: PDFFont) {
  const cols = chart.columns // [itemNoun, Mon..Sun]
  const rows = chart.rows // [{ id, chore }]
  const top = PAGE_H - MARGIN

  // Title.
  page.drawText(chart.title, { x: MARGIN, y: top - 22, size: 22, font: bold, color: INK })

  const tableTop = top - 52
  const tableLeft = MARGIN
  const tableRight = PAGE_W - MARGIN
  const tableW = tableRight - tableLeft
  const choreColW = tableW * 0.28
  const dayColW = (tableW - choreColW) / (cols.length - 1)
  const headerH = 28
  const bottomLimit = MARGIN + 24 // leave room for the footer
  const rowH = Math.min(46, (tableTop - headerH - bottomLimit) / Math.max(rows.length, 1))

  // Header band.
  page.drawRectangle({ x: tableLeft, y: tableTop - headerH, width: tableW, height: headerH, color: GREEN })
  page.drawText(cols[0], { x: tableLeft + 10, y: tableTop - headerH + 9, size: 11, font: bold, color: WHITE })
  for (let c = 1; c < cols.length; c++) {
    const x = tableLeft + choreColW + (c - 1) * dayColW
    centerText(page, cols[c], x, dayColW, tableTop - headerH + 9, 11, bold, WHITE)
  }

  // Rows.
  let y = tableTop - headerH
  for (const row of rows) {
    y -= rowH
    page.drawLine({ start: { x: tableLeft, y }, end: { x: tableRight, y }, thickness: 1, color: BORDER })
    page.drawText(row.chore, { x: tableLeft + 10, y: y + rowH / 2 - 5, size: 11, font, color: INK })
    // pdf-lib drawText neither wraps nor truncates — warn at build time if a label
    // would overflow the chore column (e.g. data changed or a new band was added).
    if (font.widthOfTextAtSize(row.chore, 11) > choreColW - 20) {
      console.warn(`make-bundle: chore label may overflow the column: "${row.chore}"`)
    }
    for (let c = 1; c < cols.length; c++) {
      const x = tableLeft + choreColW + (c - 1) * dayColW
      const box = 14
      page.drawRectangle({
        x: x + dayColW / 2 - box / 2,
        y: y + rowH / 2 - box / 2,
        width: box,
        height: box,
        borderColor: GREEN,
        borderWidth: 1.5,
        color: TICK_FILL,
      })
    }
  }

  // Outer frame + the chore/day divider.
  page.drawRectangle({ x: tableLeft, y, width: tableW, height: tableTop - y, borderColor: BORDER, borderWidth: 1 })
  page.drawLine({ start: { x: tableLeft + choreColW, y }, end: { x: tableLeft + choreColW, y: tableTop }, thickness: 1, color: BORDER })

  // Footer.
  page.drawText('SproutChores  ·  sproutchores.com  ·  Free printable chore charts for families', {
    x: MARGIN,
    y: MARGIN - 12,
    size: 9,
    font,
    color: MUTED,
  })
}

const doc = await PDFDocument.create()
doc.registerFontkit(fontkit)
// Embed the repo's brand font so the PDF renders identically everywhere — the
// base-14 StandardFonts are NOT embedded and render blank in some viewers.
const interBytes = readFileSync('src/assets/fonts/Inter.ttf')
const font = await doc.embedFont(interBytes, { subset: true })
const bold = font // single Inter weight; size + the colored header band carry hierarchy

const charts = bundleChartModels()
for (const chart of charts) {
  const page = doc.addPage([PAGE_W, PAGE_H])
  drawChart(page, chart, font, bold)
}

const outDir = join('dist', 'downloads')
mkdirSync(outDir, { recursive: true })
const bytes = await doc.save()
writeFileSync(join(outDir, 'age-by-age-chore-chart-pack.pdf'), bytes)
console.log(`make-bundle: wrote ${charts.length}-page pack → ${outDir}/age-by-age-chore-chart-pack.pdf`)
