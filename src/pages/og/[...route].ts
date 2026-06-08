// Build-time Open Graph image generator. Produces a 1200×630 PNG per page at
// /og/<key>.png using astro-og-canvas (pure-WASM Skia — runs in CI, no browser,
// no external service). Keys: 'home' + each static trust page + every content
// entry id. BaseLayout points each page's og:image/twitter:image here, so every
// shared link unfurls with a branded card — automatically, including future pages.
//
// Note: entries are read via eager import.meta.glob (synchronous) rather than
// getCollection (async) — a top-level await here breaks Astro's getStaticPaths
// detection for the dynamic route.
import { OGImageRoute } from 'astro-og-canvas'

const entryFiles = import.meta.glob('../../content/pages/*.json', { eager: true }) as Record<
  string,
  { default: { h1: string; meta_description: string } }
>

const pages: Record<string, { title: string; description: string }> = {
  home: {
    title: 'SproutChores',
    description: 'Free printable chore charts for kids of every age — from a real family of six.',
  },
  about: { title: 'About SproutChores', description: 'A real family behind the charts — Andrew & the SproutChores family.' },
  contact: { title: 'Contact SproutChores', description: 'Questions, feedback, or a chore idea that worked? Get in touch.' },
  privacy: { title: 'Privacy Policy', description: 'How SproutChores handles your data — privacy-first, consent-based analytics.' },
  terms: { title: 'Terms of Use', description: 'The simple terms for using SproutChores.' },
  disclosure: { title: 'Disclosure', description: 'Our honest advertising & affiliate disclosure.' },
}

for (const [path, mod] of Object.entries(entryFiles)) {
  const id = path.split('/').pop()!.replace(/\.json$/, '')
  pages[id] = { title: mod.default.h1, description: mod.default.meta_description }
}

const _og = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: (_path, page) => ({
    title: page.title,
    description: page.description,
    // Local OFL font (Inter) so no network fetch at build time — works offline + in CI.
    fonts: ['./src/assets/fonts/Inter.ttf'],
    bgGradient: [
      [67, 56, 202],
      [37, 33, 99],
    ],
    padding: 70,
    font: {
      title: { color: [255, 255, 255], size: 70, weight: 'Bold', lineHeight: 1.1 },
      description: { color: [226, 232, 240], size: 32, weight: 'Normal', lineHeight: 1.4 },
    },
  }),
})

// OGImageRoute is async — must be awaited, or getStaticPaths is undefined.
export const getStaticPaths = _og.getStaticPaths
export const GET = _og.GET
