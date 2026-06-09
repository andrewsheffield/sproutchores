// Build step: render one vertical pin PNG per published page → dist/pins/<slug>.png
// (resvg + bundled Inter). Run after `astro build` so the pins deploy with the site.
// Run from seo-test/site:  node scripts/make-pins.mjs
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { initWasm, Resvg } from '@resvg/resvg-wasm'
import { livePages } from './pinterest/page-list.mjs'
import { pinSvg } from './pinterest/pin-template.mjs'

await initWasm(readFileSync('node_modules/@resvg/resvg-wasm/index_bg.wasm'))
const inter = readFileSync('src/assets/fonts/Inter.ttf')

const outDir = join('dist', 'pins')
mkdirSync(outDir, { recursive: true })

const pages = livePages()
let n = 0
for (const page of pages) {
  // Image headline = the bare H1 (the "FREE PRINTABLE" pill already conveys that);
  // the SEO-rich pin *title field* with the suffix is set by the poster.
  const svg = pinSvg({ title: page.h1 })
  const r = new Resvg(svg, {
    fitTo: { mode: 'width', value: 1000 },
    font: { fontBuffers: [inter], defaultFontFamily: 'Inter', loadSystemFonts: false },
  })
  writeFileSync(join(outDir, `${page.slug}.png`), r.render().asPng())
  n++
}
console.log(`make-pins: rendered ${n} pin(s) → ${outDir}/`)
