// Honest affiliate layer: physical gear that makes the free printable work better.
// Links are tagged Amazon SEARCH URLs (we endorse the category, not a specific brand
// we haven't tested). Everything is inert until PUBLIC_AMAZON_ASSOCIATE_TAG is set.
// No fabricated brands/prices — consistent with the lived-experience corpus rule.

export type AffiliateProduct = { key: string; label: string; blurb: string; searchKeyword: string }

export const AFFILIATE_PRODUCTS: Record<string, AffiliateProduct> = {
  sleeves: {
    key: 'sleeves',
    label: 'Reusable dry-erase sleeves',
    blurb:
      "Slip the printable into a dry-erase sleeve and it becomes a wipe-clean chart you reprint once a year instead of every week.",
    searchKeyword: 'dry erase sleeves reusable',
  },
  magnets: {
    key: 'magnets',
    label: 'Magnetic dry-erase pocket',
    blurb:
      "A magnetic sleeve keeps the chart on the fridge at kid eye-level — the one spot it actually gets looked at.",
    searchKeyword: 'magnetic dry erase pocket',
  },
  stickers: {
    key: 'stickers',
    label: 'Reward / star stickers',
    blurb:
      "Plain star or smiley stickers do for a young kid what a flashy app promises — and they get to stick them on themselves.",
    searchKeyword: 'reward star stickers for kids',
  },
  jar: {
    key: 'jar',
    label: 'Clear allowance jars',
    blurb:
      "A clear jar — or three, for spend / save / give — makes saving visible, which is the whole lesson at this age.",
    searchKeyword: 'clear allowance jars for kids',
  },
}

/** True only when a non-empty associate tag is configured. */
export function affiliateEnabled(tag?: string): boolean {
  return typeof tag === 'string' && tag.trim().length > 0
}

/** A tagged Amazon search URL for a product category. */
export function affiliateSearchUrl(keyword: string, tag: string): string {
  return `https://www.amazon.com/s?k=${encodeURIComponent(keyword)}&tag=${encodeURIComponent(tag)}`
}

/** Deterministic per-page product selection (evaluated in order). */
export function gearForPage(
  slug: string,
  d: { type: string; generator_variant?: string | null }
): string[] {
  if (d.type === 'category') return []
  const v = d.generator_variant
  if (v === 'money' || /allowance|money/.test(slug)) return ['jar', 'sleeves']
  if (v === 'reward' || v === 'behavior') return ['stickers', 'sleeves', 'magnets']
  return ['sleeves', 'magnets']
}
