import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
// site/base are set for GitHub Pages project hosting; final values confirmed when the repo exists.
export default defineConfig({
  output: 'static',
  site: 'https://sproutchores.com',
  // Permanent redirects for any URL we retire. The static build emits an HTML
  // meta-refresh + canonical page so old links and any existing equity survive.
  // Rule: once a route ships we never delete it — we redirect it.
  redirects: {
    '/chores-for-a-6-year-old': '/chore-chart-for-a-6-year-old',
  },
  integrations: [
    // astro-icon inlines SVG at build time (zero client JS). Icons are pulled
    // from the locally-installed @iconify-json/lucide pack.
    icon({ include: { lucide: ['*'] } }),
    // Lists every built route. Only the home + live chore page exist today.
    sitemap(),
  ],
})
