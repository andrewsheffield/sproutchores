import { defineConfig } from 'astro/config'
import sitemap from '@astrojs/sitemap'
import icon from 'astro-icon'
// site/base are set for GitHub Pages project hosting; final values confirmed when the repo exists.
export default defineConfig({
  output: 'static',
  site: 'https://sproutchores.com',
  integrations: [
    // astro-icon inlines SVG at build time (zero client JS). Icons are pulled
    // from the locally-installed @iconify-json/lucide pack.
    icon({ include: { lucide: ['*'] } }),
    // Lists every built route. Only the home + live chore page exist today.
    sitemap(),
  ],
})
