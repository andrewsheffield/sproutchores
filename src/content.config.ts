import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// Presentation-agnostic page entries. Templates render these; entries carry no
// layout specifics, so UI/UX can be pivoted without re-authoring content.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.object({
    type: z.enum(['age', 'category', 'guide']),
    target_keyword: z.string(),
    secondary_keywords: z.array(z.string()).default([]),
    title: z.string(),
    meta_description: z.string(),
    h1: z.string(),
    intro: z.string(),
    age: z.number().optional(), // age pages: representative age (band derived)
    generator_variant: z.enum(['chore', 'money', 'routine', 'reward', 'household', 'behavior', 'blank']).optional(),
    people: z.array(z.string()).optional(),
    sections: z.array(z.object({ heading: z.string(), body: z.string() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    category: z.string().nullable().default(null),
    related: z.array(z.string()).default([]),
    // Curated cross-links honored FIRST by the relinker (src/relink.mjs) before
    // the same-category auto-fill — the only way to force an editorial link, e.g.
    // a cross-category bridge or to keep a page from starving in an age-less
    // cluster. Output lands in `related`; this stays the durable input.
    pinned_related: z.array(z.string()).default([]),
    publish_date: z.string(), // YYYY-MM-DD; gates publish
    og_image: z.string().optional(),
    // Reserved seam for a future photo / AI-illustration layer (rendering + source
    // designed in a later brainstorm). Unused today; harmless placeholder.
    images: z
      .array(z.object({
        src: z.string(),
        alt: z.string(),
        kind: z.enum(['photo', 'illustration']).optional(),
        caption: z.string().optional(),
      }))
      .optional(),
  }),
})

export const collections = { pages }
