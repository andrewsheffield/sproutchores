// A standalone Google image sitemap: each page URL with the chart image it hosts.
// Self-contained (the harness owns it) so we don't depend on @astrojs/sitemap
// internals. Referenced from public/robots.txt.
export type ImageSitemapItem = { pageUrl: string; imageUrl: string; caption?: string }

const xesc = (s: string) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export function buildImageSitemap(items: ImageSitemapItem[]): string {
  const urls = items
    .map((it) => {
      const cap = it.caption ? `\n      <image:caption>${xesc(it.caption)}</image:caption>` : ''
      return `  <url>\n    <loc>${xesc(it.pageUrl)}</loc>\n    <image:image>\n      <image:loc>${xesc(it.imageUrl)}</image:loc>${cap}\n    </image:image>\n  </url>`
    })
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls}\n</urlset>\n`
}
