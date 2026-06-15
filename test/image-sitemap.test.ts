import { describe, it, expect } from 'vitest'
import { buildImageSitemap } from '../src/lib/image-sitemap'

describe('buildImageSitemap', () => {
  const xml = buildImageSitemap([
    { pageUrl: 'https://sproutchores.com/chore-chart-for-a-6-year-old/', imageUrl: 'https://sproutchores.com/charts/chore-chart-for-a-6-year-old.png', caption: 'Chore Chart for a 6-Year-Old' },
  ])
  it('declares the image sitemap namespace', () => {
    expect(xml).toContain('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"')
  })
  it('nests the image under its page URL', () => {
    expect(xml).toContain('<loc>https://sproutchores.com/chore-chart-for-a-6-year-old/</loc>')
    expect(xml).toContain('<image:loc>https://sproutchores.com/charts/chore-chart-for-a-6-year-old.png</image:loc>')
    expect(xml).toContain('<image:caption>Chore Chart for a 6-Year-Old</image:caption>')
  })
  it('escapes ampersands in URLs/captions', () => {
    const x = buildImageSitemap([{ pageUrl: 'https://x/a?b&c', imageUrl: 'https://x/i.png', caption: 'A & B' }])
    expect(x).toContain('a?b&amp;c')
    expect(x).toContain('A &amp; B')
  })
})
