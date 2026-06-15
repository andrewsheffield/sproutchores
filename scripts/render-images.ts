// Build step (replaces make-pins.mjs): render every image KIND for every live page
// via resvg + Inter, and write the image sitemap. Runs AFTER `astro build` so the
// PNGs deploy with the site. Run from seo-test/site:
//   node --import tsx/esm scripts/render-images.ts
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { initWasm, Resvg } from '@resvg/resvg-wasm'
import { livePages } from './pinterest/page-list.mjs'
import { IMAGE_KINDS } from '../src/lib/image-kinds'
import { buildImageSitemap, type ImageSitemapItem } from '../src/lib/image-sitemap'

const SITE = 'https://sproutchores.com' // mirrors astro.config.mjs `site`

await initWasm(readFileSync('node_modules/@resvg/resvg-wasm/index_bg.wasm'))
const inter = readFileSync('src/assets/fonts/Inter.ttf')

const pages = livePages()
const counts: Record<string, number> = {}
const imageItems: ImageSitemapItem[] = []

for (const [name, kind] of Object.entries(IMAGE_KINDS)) {
  const outDir = join('dist', kind.dir)
  mkdirSync(outDir, { recursive: true })
  counts[name] = 0
  for (const page of pages) {
    if (!kind.eligible(page)) continue
    const svg = kind.svg(page)
    const r = new Resvg(svg, {
      fitTo: { mode: 'width', value: kind.width },
      font: { fontBuffers: [inter], defaultFontFamily: 'Inter', loadSystemFonts: false },
    })
    writeFileSync(join(outDir, `${page.slug}.png`), r.render().asPng())
    counts[name]++
    if (name === 'chart') {
      imageItems.push({
        pageUrl: `${SITE}/${page.slug}/`,
        imageUrl: `${SITE}/${kind.dir}/${page.slug}.png`,
        caption: page.h1,
      })
    }
  }
}

writeFileSync(join('dist', 'image-sitemap.xml'), buildImageSitemap(imageItems))
console.log(`render-images: ${JSON.stringify(counts)} + image-sitemap (${imageItems.length} images)`)
