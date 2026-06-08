import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

// Presentation-agnostic page entries. Templates render these; entries carry no
// layout specifics, so UI/UX can be pivoted without re-authoring content.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/pages' }),
  schema: z.object({
    type: z.enum(['age', 'category']),
    target_keyword: z.string(),
    secondary_keywords: z.array(z.string()).default([]),
    title: z.string(),
    meta_description: z.string(),
    h1: z.string(),
    intro: z.string(),
    age: z.number().optional(), // age pages: representative age (band derived)
    sections: z.array(z.object({ heading: z.string(), body: z.string() })).default([]),
    faq: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    category: z.string().nullable().default(null),
    related: z.array(z.string()).default([]),
    publish_date: z.string(), // YYYY-MM-DD; gates publish
    og_image: z.string().optional(),
  }),
})

export const collections = { pages }
