// One-off: rasterize the sprout SVG to a square PNG app icon (opaque indigo bg).
// Run: node scripts/make-icon.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { initWasm, Resvg } from '@resvg/resvg-wasm'

await initWasm(readFileSync('node_modules/@resvg/resvg-wasm/index_bg.wasm'))

// A full-bleed square icon (larger sprout, no rounded corners) so it reads well
// as an app icon and is fully opaque — no transparency edge cases on Pinterest.
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#4338ca"/>
  <g transform="translate(80 80) scale(14.6)" fill="none">
    <path d="M12 21v-7" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    <path d="M12 14c0-3 2.4-5.4 5.4-5.4 0 3-2.4 5.4-5.4 5.4Z" fill="#ffffff"/>
    <path d="M12 12.5C12 9.9 9.9 7.8 7.2 7.8c0 2.7 2.1 4.7 4.8 4.7Z" fill="#ffffff" opacity="0.78"/>
  </g>
</svg>`

const sizes = [512, 1024]
for (const size of sizes) {
  const r = new Resvg(svg, { fitTo: { mode: 'width', value: size }, background: '#4338ca' })
  const png = r.render().asPng()
  writeFileSync(`public/icon-${size}.png`, png)
  console.log(`wrote public/icon-${size}.png (${png.length} bytes)`)
}
