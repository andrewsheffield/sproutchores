// Pure, dependency-free helpers for the Pinterest agent. Imported directly by
// make-pins.mjs (build) and post-pins.mjs (poster) — both plain Node, so no
// inlining/byte-sync needed. Follows skills/good-for-pinterest/SKILL.md.

// Topic boards (name + keyword-rich description for board creation).
export const BOARDS = {
  age: {
    key: 'age',
    name: 'Chore Charts by Age',
    description:
      'Free printable chore charts by age — age-appropriate chores and editable charts for toddlers, preschoolers, kids, and teens.',
  },
  reward: {
    key: 'reward',
    name: 'Reward Charts for Kids',
    description:
      'Free printable reward charts and sticker charts for kids — motivate good habits and track goals at home.',
  },
  routines: {
    key: 'routines',
    name: 'Routines for Kids',
    description:
      'Printable routine charts for kids — calming bedtime routines, morning routines, and visual schedules.',
  },
  money: {
    key: 'money',
    name: 'Allowance & Money for Kids',
    description:
      'Allowance and money charts for kids by age — teach chores, money, and responsibility (free printables).',
  },
}

// Map a page to its topic board (by slug signal first, then category).
export function boardForPage(page) {
  const s = (page && page.slug) || ''
  const c = (page && page.category) || ''
  if (/routine|bedtime|morning/.test(s)) return BOARDS.routines.name
  if (/reward|sticker|behavior/.test(s) || c === 'reward-charts-for-kids') return BOARDS.reward.name
  if (/money|allowance|app/.test(s) || c === 'chore-apps-and-allowance-for-kids') return BOARDS.money.name
  return BOARDS.age.name // chore-charts-by-age + default
}

// Pin title: the page H1 (already keyword-first), plus a "Free Printable" tag if
// it fits AND the H1 doesn't already say "printable" (avoid "...Free Printable —
// Free Printable"). <=100 chars; the keyword stays in the first ~40 (good-for-pinterest).
export function pinTitle(page) {
  const base = ((page && page.h1) || '').trim()
  if (!base) return ''
  if (/printable/i.test(base)) return base.slice(0, 100)
  const tagged = `${base} — Free Printable`
  return (tagged.length <= 100 ? tagged : base).slice(0, 100)
}

// Pin description: the page meta description + a save-for-later closer. <=800.
export function pinDescription(page) {
  const meta = ((page && page.meta_description) || '').trim()
  const closer = ' Save it for later — free and no sign-up needed. 🌱'
  return `${meta}${meta ? closer : ''}`.slice(0, 800)
}

// Worklist: pages not yet pinned for this variant → {slug, boardName, title, description}.
export function pinWorklist(pages, pinned = {}, variant = 'a') {
  return (pages || [])
    .filter((p) => !((pinned[p.slug] || []).some((r) => r.variant === variant)))
    .map((p) => ({ slug: p.slug, boardName: boardForPage(p), title: pinTitle(p), description: pinDescription(p) }))
}

// Take the first `max` items (cadence cap).
export function selectBatch(items, max) {
  return (items || []).slice(0, Math.max(0, max | 0))
}

// Append per-slug variant records immutably.
export function recordPinned(pinned, results) {
  const next = { ...pinned }
  for (const r of results || []) {
    next[r.slug] = [
      ...(next[r.slug] || []),
      { variant: r.variant, pin_id: r.pin_id, board_id: r.board_id, pinned_at: r.pinned_at },
    ]
  }
  return next
}
