// chart-colors.ts — curated, print-safe accent palette for the chore-chart generator.
//
// Every swatch is dark/saturated enough to (a) meet ~AA contrast on white paper and
// (b) print legibly (no pale pastels that vanish, no neons that muddy). Selecting a
// swatch sets `--chart-accent` (+ a computed `--chart-accent-tint`) on the generator
// root; the chart chrome reads those vars. Pure module — unit-tested in test/.

export interface ChartColor {
  /** Stable id used in data attributes + tests. */
  id: string
  /** Human label for the swatch aria-label. */
  label: string
  /** Accent hex (#rrggbb). */
  hex: string
}

export const CHART_COLORS: ChartColor[] = [
  { id: 'sprout', label: 'Sprout Green', hex: '#2f7d52' },
  { id: 'ocean', label: 'Ocean Blue', hex: '#2563af' },
  { id: 'grape', label: 'Grape', hex: '#6b3fa0' },
  { id: 'berry', label: 'Berry Red', hex: '#b4452f' },
  { id: 'tangerine', label: 'Tangerine', hex: '#c2620f' },
  { id: 'teal', label: 'Teal', hex: '#0f766e' },
  { id: 'slate', label: 'Slate', hex: '#334155' },
]

export function colorById(id: string): ChartColor | undefined {
  return CHART_COLORS.find((c) => c.id === id)
}

/**
 * Mix a #rrggbb hex toward white by `whiteFraction` (0–1) and return a #rrggbb hex.
 * Used to precompute the soft header-band tint in JS so print fidelity never depends
 * on CSS color-mix() support. tint('#2f7d52', 0.88) ≈ a very light green wash.
 */
export function tint(hex: string, whiteFraction: number): string {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!m) return hex
  const f = Math.min(1, Math.max(0, whiteFraction))
  const n = parseInt(m[1], 16)
  const mix = (c: number) => Math.round(c + (255 - c) * f)
  const r = mix((n >> 16) & 0xff)
  const g = mix((n >> 8) & 0xff)
  const b = mix(n & 0xff)
  return '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('')
}
