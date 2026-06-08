// Single source of truth for author identity / E-E-A-T byline + bio.
// One place to change attribution site-wide (pivot-able). The bio is published
// and indexed, so it carries only what the owner approved: first name + the
// "SproutChores family" framing, with a general, respectful foster-care note.

export const author = {
  name: 'Andrew',
  byline: 'By Andrew — dad of four (ages 9–18)',
  bioParagraphs: [
    "I'm Andrew, and along with my wife I'm one half of the SproutChores family. We're raising four kids — ages 9 to 18 — and we've run chore charts at home for more than 15 years, through every stage from toddler to teen.",
    "As foster parents, we've also seen first-hand how much a consistent routine helps a child settle in, build trust, and learn to self-regulate. Everything on this site comes from what's actually worked (and plenty that hasn't) in our own home.",
  ],
  // For schema.org author markup (Person).
  person: {
    '@type': 'Person',
    name: 'Andrew',
    description: 'Parent of four and foster parent; founder of the SproutChores family.',
  },
} as const
