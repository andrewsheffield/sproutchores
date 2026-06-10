// site/src/lib/embed.ts
// Pure generator for the "use this free chart" embed snippet. Branded anchor only
// (keyword-rich widget anchors at scale are link spam — see good-for-backlinks).
export function embedSnippet({ slug, h1, site }: { slug: string; h1: string; site: string }): string {
  const base = site.replace(/\/+$/, '')
  const page = `${base}/${slug}/`
  const img = `${base}/pins/${slug}.png`
  const alt = h1.replace(/"/g, '&quot;')
  return [
    `<a href="${page}">`,
    `  <img src="${img}" alt="${alt}" width="500">`,
    `</a>`,
    `<p>Free printable from <a href="${base}/">SproutChores</a></p>`,
  ].join('\n')
}
