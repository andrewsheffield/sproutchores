// chore-icons.ts — shared inline-SVG icon set for the generator.
//
// WHY a hand-rolled map instead of astro-icon's <Icon> everywhere:
// the generator's island rebuilds the chart rows and chore chips in plain DOM
// on every interaction, so it needs the SAME icon markup the SSR pass uses.
// astro-icon's <Icon> only resolves at build time, so we expose the icon bodies
// here as raw strings that BOTH the .astro frontmatter (SSR via set:html) and
// the island <script> import. The bodies are copied verbatim from the locally
// installed @iconify-json/lucide pack (Lucide, 24x24, currentColor strokes), so
// there is NO client-side icon runtime — just static SVG inlined at build.
//
// Icons are decorative: every chore/control already has a visible text label or
// aria-label, so each <svg> is rendered aria-hidden and focusable="false".

/** Raw Lucide icon bodies (inner markup of a 0 0 24 24 viewBox). */
export const ICON_BODY: Record<string, string> = {
  bed: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9"/>',
  utensils:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2M7 2v20m14-7V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2zm0 0v7"/>',
  cat: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M12 5c.67 0 1.35.09 2 .26c1.78-2 5.03-2.84 6.42-2.26c1.4.58-.42 7-.42 7c.57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44c0 0-1.89-6.42-.5-7s4.72.23 6.5 2.23A9 9 0 0 1 12 5m-4 9v.5m8-.5v.5"/><path d="M11.25 16.25h1.5L12 17z"/></g>',
  sparkles:
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594zM20 2v4m2-2h-4"/></g>',
  sprout:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4a4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3M4 9a5 5 0 0 1 8 4a5 5 0 0 1-8-4m1 12h14"/>',
  shirt:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23"/>',
  'trash-2':
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11v6m4-6v6m5-11v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>',
  backpack:
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm4 0h8m-8 8h8"/><path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"/></g>',
  'washing-machine':
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M3 6h3m11 0h.01"/><rect width="18" height="20" x="3" y="2" rx="2"/><circle cx="12" cy="13" r="5"/><path d="M12 18a2.5 2.5 0 0 0 0-5a2.5 2.5 0 0 1 0-5"/></g>',
  'brush-cleaning':
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="m16 22l-1-4m4-4a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2h-3a1 1 0 0 1-1-1V4a2 2 0 0 0-4 0v5a1 1 0 0 1-1 1H6a2 2 0 0 0-2 2v1a1 1 0 0 0 1 1"/><path d="M19 14H5l-1.973 6.767A1 1 0 0 0 4 22h16a1 1 0 0 0 .973-1.233zM8 22l1-4"/></g>',
  'clipboard-list':
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2m4 7h4m-4 5h4m-8-5h.01M8 16h.01"/></g>',
  'calendar-check':
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M8 2v4m8-4v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18M9 16l2 2l4-4"/></g>',
  plus: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14m-7-7v14"/>',
  x: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 6L6 18M6 6l12 12"/>',
  printer:
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"/><rect width="12" height="8" x="6" y="14" rx="1"/></g>',
  check:
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 6L9 17l-5-5"/>',
  dot: '<circle cx="12" cy="12" r="2.5" fill="currentColor"/>',
}

/** Map a chore id to a Lucide icon name. Unknown ids fall back to `dot`. */
export const CHORE_ICON: Record<string, string> = {
  // 4-5 band
  'put-toys-away': 'sparkles',
  'feed-pet': 'cat',
  'make-bed-help': 'bed',
  'put-clothes-hamper': 'shirt',
  // 6-7 band
  'make-bed': 'bed',
  'set-table': 'utensils',
  'tidy-room': 'sparkles',
  'water-plants': 'sprout',
  'sort-laundry': 'shirt',
  // 8-9 band
  'load-dishwasher': 'washing-machine',
  'take-out-trash': 'trash-2',
  vacuum: 'brush-cleaning',
  'pack-backpack': 'backpack',
}

/** Resolve the icon name for a chore id (custom/unknown ids → a neutral dot). */
export function iconNameForChore(id: string): string {
  return CHORE_ICON[id] ?? 'dot'
}

/**
 * Build a complete inline <svg> string for a named icon.
 * Decorative: aria-hidden + focusable="false"; colour comes from currentColor.
 * `cls` is appended to the class list so callers can size/colour per context.
 */
export function iconSvg(name: string, cls = ''): string {
  const body = ICON_BODY[name] ?? ICON_BODY.dot
  const classAttr = cls ? ` ${cls}` : ''
  return (
    `<svg class="icon${classAttr}" viewBox="0 0 24 24" width="24" height="24" ` +
    `aria-hidden="true" focusable="false">${body}</svg>`
  )
}

/** Convenience: the inline SVG for a chore id. */
export function choreIconSvg(id: string, cls = ''): string {
  return iconSvg(iconNameForChore(id), cls)
}
