import { defineConfig } from 'astro/config'
// site/base are set for GitHub Pages project hosting; final values confirmed when the repo exists.
export default defineConfig({
  output: 'static',
  site: 'https://sproutchores.com',
})
