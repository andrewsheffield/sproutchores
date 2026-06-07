import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
// site/base are set for GitHub Pages project hosting; final values confirmed when the repo exists.
export default defineConfig({
  output: 'static',
  site: 'https://sproutchores.com',
  // The sitemap integration lists every built route. For the skeleton that's
  // just the live page + home, which is fine. TODO: the content build cycle
  // will add a `filter` here to exclude noindex / future-dated routes so we
  // never advertise not-yet-live pages as canonical live URLs in the sitemap.
  integrations: [sitemap()],
})
