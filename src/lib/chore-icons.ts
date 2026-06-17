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
  // Friendly neutral default for unmatched chores (warmer than a clipboard).
  star: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"/>',
  // Water / bath / teeth / hygiene.
  droplets:
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 16.3c2.2 0 4-1.83 4-4.05c0-1.16-.57-2.26-1.71-3.19S7.29 4.7 7 2.75c-.29 1.95-1.14 4.6-2.29 6.31S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05Z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/></g>',
  // Reading / books / study.
  'book-open':
    '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7v14m-9-3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4a4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3a3 3 0 0 0-3-3z"/>',
  // Dog / walking the dog.
  dog: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11.25 16.25h1.5L12 17zM16 14v.5"/><path d="M4.42 11.247A13.2 13.2 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.7 11.7 0 0 0-.493-3.309M8 14v.5"/><path d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5c-1.931.722-3.576-.297-3.656-1c-.113-.994 1.177-6.53 4-7c1.923-.321 3.651.845 3.651 2.235A7.5 7.5 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277c2.823.47 4.113 6.006 4 7c-.08.703-1.725 1.722-3.656 1c-1.261-.472-1.855-1.45-2.239-2.5"/></g>',
  // Nature / outdoors / gardening.
  leaf: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8c0 5.5-4.78 10-10 10"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></g>',
  // Achievement / reward.
  trophy: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978m7-7.318v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978M18 9h1.5a1 1 0 0 0 0-5H18M4 22h16"/><path d="M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm0 0H4.5a1 1 0 0 1 0-5H6"/></g>',
  // Love / kindness.
  heart: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676a.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',
  // Music practice.
  music: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></g>',
  // Games / screen time.
  "gamepad-2": '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 11h4M8 9v4m7-1h.01M18 10h.01m-.69-5H6.68a4 4 0 0 0-3.978 3.59l-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258q-.01-.075-.017-.151A4 4 0 0 0 17.32 5"/>',
  // Morning / daytime routine.
  sun: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></g>',
  // Bedtime / night routine.
  moon: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>',
  // Recycling / environment.
  recycle: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881a1.79 1.79 0 0 1-.004-1.784L7.196 9.5M11 19h8.203a1.83 1.83 0 0 0 1.556-.89a1.78 1.78 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16l-3 3l3 3m-5.707-8.404L7.196 9.5L3.1 10.598m6.244-4.787l1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.78 1.78 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633l4.096 1.098l1.097-4.096"/></g>',
  // Exercise / fitness.
  dumbbell: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829zM2.5 21.5l1.4-1.4M20.1 3.9l1.4-1.4M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829zM9.6 14.4l4.8-4.8"/>',
  // Car / transport.
  car: '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></g>',
  // Art / crafts / decorating.
  paintbrush: '<path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m14.622 17.897l-10.68-2.913M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0zM9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15"/>',
  // Generic broom (sweeping). Reuses a simple broom outline.
  broom:
    '<g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M19.4 4.6 21 6m-1-2L8 16m-3.5 4.5 1-3 6.5-6.5 2 2L7.5 19.5z"/></g>',
  dot: '<circle cx="12" cy="12" r="2.5" fill="currentColor"/>',
}

/** Map a chore id to a Lucide icon name (fast-path override for known ids). */
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

/**
 * Keyword → icon rules, evaluated in order against the lowercased chore LABEL.
 * This is what makes arbitrary user-typed chores resolve to a sensible icon
 * (the id-map above is only a fast-path for the built-in dataset ids).
 * First matching rule wins, so order more-specific words before generic ones.
 */
const KEYWORD_RULES: ReadonlyArray<readonly [readonly string[], string]> = [
  [['bed', 'sleep', 'nap', 'pillow', 'blanket', 'sheets', 'duvet'], 'bed'],
  [['dish', 'dishwasher', 'wash up', 'washing up'], 'washing-machine'],
  [['table', 'plate', 'cutlery', 'fork', 'spoon', 'meal', 'dinner', 'lunch', 'breakfast', 'snack', 'cook', 'bake', 'kitchen'], 'utensils'],
  [['dog', 'puppy', 'walk the'], 'dog'],
  [['pet', 'cat', 'fish', 'hamster', 'rabbit', 'feed', 'bird', 'litter', 'cage', 'kitten'], 'cat'],
  [['laundry', 'clothes', 'fold', 'hamper', 'socks', 'shirt', 'dress', 'wardrobe', 'closet', 'iron'], 'shirt'],
  [['recycl', 'trash', 'garbage', 'rubbish', 'compost', 'bins', 'bin '], 'trash-2'],
  [['vacuum', 'hoover', 'mop', 'dust', 'wipe', 'scrub', 'polish'], 'brush-cleaning'],
  [['sweep', 'broom'], 'broom'],
  [['clean', 'tidy', 'room', 'declutter', 'make tidy'], 'sparkles'],
  [['toy', 'play', 'sparkle', 'sort', 'organi', 'pack away', 'put away', 'lego'], 'sparkles'],
  [['water', 'plant', 'garden', 'flower', 'grow', 'weed', 'rake', 'leaves'], 'sprout'],
  [['bath', 'shower', 'teeth', 'brush teeth', 'wash hands', 'wash face', 'hygiene', 'hair'], 'droplets'],
  [['homework', 'read', 'book', 'study', 'practice', 'practise', 'piano', 'spelling', 'math'], 'book-open'],
  [['school', 'backpack', 'bag', 'lunchbox', 'pack '], 'backpack'],
  [['feed', 'water bowl'], 'cat'],
]

/**
 * Resolve an icon name from a chore. Prefers the id fast-path, then matches
 * keywords in the label, and falls back to a friendly neutral icon (a star,
 * never a bare dot) so custom chores always get a sensible, warm glyph.
 */
export function iconNameForChore(id: string, label?: string): string {
  const fast = CHORE_ICON[id]
  if (fast) return fast
  const haystack = (label ?? id).toLowerCase()
  for (const [words, icon] of KEYWORD_RULES) {
    if (words.some((w) => haystack.includes(w))) return icon
  }
  return 'star'
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

/** Convenience: the inline SVG for a chore, resolved from its id + label. */
export function choreIconSvg(id: string, label?: string, cls = ''): string {
  return iconSvg(iconNameForChore(id, label), cls)
}

/** Curated palette for the on-chart icon picker — a subset of ICON_BODY that
 *  excludes UI-only icons (trash/plus/x/printer/check/calendar). Order = display order. */
export const PICKER_ICONS: string[] = [
  'bed', 'utensils', 'cat', 'dog', 'sprout', 'leaf', 'shirt', 'washing-machine',
  'brush-cleaning', 'droplets', 'backpack', 'book-open', 'star', 'sparkles', 'trophy',
  'heart', 'music', 'gamepad-2', 'sun', 'moon', 'recycle', 'dumbbell', 'car', 'paintbrush',
]

/** Title-case an icon name for an accessible label (e.g. 'gamepad-2' → 'Gamepad 2'). */
export function iconLabel(name: string): string {
  return String(name).split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
}
