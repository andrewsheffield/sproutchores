// Single source of truth for author identity / E-E-A-T byline + bio.
// One place to change attribution site-wide (pivot-able). The bio is published
// and indexed; per the locked Batch-2 corpus permission it carries the owner's
// approved E-E-A-T credibility stack (veteran, foster, homeschool, blended family),
// paraphrased — owner self-filters what's public.

export const author = {
  name: 'Andrew',
  byline: 'By Andrew — dad of four (ages 9–18)',
  /** Brand illustration (a cartoon, not a photo) of the family. */
  image: '/images/family.jpg',
  imageAlt: 'A cartoon illustration of the SproutChores family — two parents and their four kids',
  bioParagraphs: [
    "I'm Andrew, and along with my wife I'm one half of the SproutChores family. We're raising four kids — ages 9 to 18 — and we've run chore charts at home for more than 15 years, through every stage from toddler to teen.",
    "As foster parents, we've also seen first-hand how much a consistent routine helps a child settle in, build trust, and learn to self-regulate. Everything on this site comes from what's actually worked (and plenty that hasn't) in our own home.",
    "Between us we bring a Marine Corps background, years of homeschooling, foster care, and a big blended family — so the advice here has been tested across a lot of different kids and seasons, not just one tidy household.",
  ],
  // For schema.org author markup (Person).
  person: {
    '@type': 'Person',
    name: 'Andrew',
    description: 'Parent of four, foster parent, and Marine Corps veteran; founder of the SproutChores family.',
  },
} as const
