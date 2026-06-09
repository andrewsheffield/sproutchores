// Vertical 1000x1500 (2:3) Pinterest pin template — an SVG string rendered to PNG
// by make-pins.mjs (resvg + Inter). Brand indigo, a printable-chart motif up top,
// the page title (auto-wrapped) below, a "FREE PRINTABLE" pill, and the footer
// brand. Colors are hardcoded (this is an image, not the tokenized site UI).

const INDIGO = '#4338ca'
const INDIGO_DARK = '#312163'
const WHITE = '#ffffff'
const SOFT = '#e7e6fb'
const INK = '#1f2147'

const W = 1000
const H = 1500

// Greedy word-wrap to at most `maxChars` per line, capped at `maxLines`.
export function wrapTitle(title, maxChars = 17, maxLines = 4) {
  const words = String(title || '').trim().split(/\s+/)
  const lines = []
  let line = ''
  for (const w of words) {
    const next = line ? `${line} ${w}` : w
    if (next.length > maxChars && line) {
      lines.push(line)
      line = w
    } else {
      line = next
    }
  }
  if (line) lines.push(line)
  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines)
    kept[maxLines - 1] = `${kept[maxLines - 1]}…`
    return kept
  }
  return lines
}

const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export function pinSvg({ title }) {
  const lines = wrapTitle(title)
  const titleSize = lines.length >= 4 ? 70 : lines.length === 3 ? 80 : 92
  const lineH = titleSize * 1.16
  // Title block is vertically centered in the lower zone (y 820–1320).
  const blockH = lines.length * lineH
  const titleTop = 1075 - blockH / 2 + titleSize * 0.5
  const titleTspans = lines
    .map((l, i) => `<tspan x="${W / 2}" y="${Math.round(titleTop + i * lineH)}">${esc(l)}</tspan>`)
    .join('')

  // Printable-chart motif: a white card with a colored header bar + 5 rows, each
  // with an open tick box — signals "printable chart you fill in".
  const cardX = 110
  const cardY = 150
  const cardW = W - cardX * 2
  const cardH = 560
  const rowGap = 78
  const rows = Array.from({ length: 5 }, (_, i) => {
    const y = cardY + 150 + i * rowGap
    return `<rect x="${cardX + 40}" y="${y}" width="${cardW - 180}" height="6" rx="3" fill="#e6e8f0"/>
      <rect x="${cardX + cardW - 96}" y="${y - 22}" width="48" height="48" rx="10" fill="none" stroke="${INDIGO}" stroke-width="5"/>`
  }).join('')

  // Sprout glyph (from the brand mark), white, for the footer.
  const sprout = `<g transform="translate(${W / 2 - 220} 1392) scale(2.0)" fill="none">
      <path d="M12 21v-7" stroke="${WHITE}" stroke-width="2" stroke-linecap="round"/>
      <path d="M12 14c0-3 2.4-5.4 5.4-5.4 0 3-2.4 5.4-5.4 5.4Z" fill="${WHITE}"/>
      <path d="M12 12.5C12 9.9 9.9 7.8 7.2 7.8c0 2.7 2.1 4.7 4.8 4.7Z" fill="${WHITE}" opacity="0.78"/>
    </g>`

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" font-family="Inter">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${INDIGO}"/>
      <stop offset="1" stop-color="${INDIGO_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- printable-chart motif card -->
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="28" fill="${WHITE}"/>
  <rect x="${cardX}" y="${cardY}" width="${cardW}" height="92" rx="28" fill="${INDIGO}"/>
  <rect x="${cardX}" y="${cardY + 50}" width="${cardW}" height="42" fill="${INDIGO}"/>
  <rect x="${cardX + 40}" y="${cardY + 32}" width="280" height="28" rx="14" fill="${SOFT}"/>
  ${rows}

  <!-- FREE PRINTABLE pill -->
  <rect x="${W / 2 - 165}" y="770" width="330" height="64" rx="32" fill="${SOFT}"/>
  <text x="${W / 2}" y="812" text-anchor="middle" font-size="30" font-weight="700" letter-spacing="2" fill="${INK}">FREE PRINTABLE</text>

  <!-- title -->
  <text text-anchor="middle" font-size="${titleSize}" font-weight="800" fill="${WHITE}">${titleTspans}</text>

  <!-- footer brand -->
  ${sprout}
  <text x="${W / 2 + 12}" y="1422" text-anchor="middle" font-size="34" font-weight="700" fill="${WHITE}">sproutchores.com</text>
</svg>`
}
