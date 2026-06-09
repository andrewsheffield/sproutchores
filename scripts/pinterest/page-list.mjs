// Live pages for the pin generator + poster. A page is "live" (has a real public
// URL) iff it matches the site's own routing: published age/guide pages, and
// category hubs only once they have >=3 published members (the isHubLive rule in
// src/lib/hub.ts). This prevents pinning a suppressed hub or a future-dated page
// (whose URL would 404).
import { readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const DIR = join(process.cwd(), 'src', 'content', 'pages')
const MIN_HUB_MEMBERS = 3 // keep in sync with src/lib/hub.ts

// Missing/invalid/≤now date = published (mirrors src/lib/publish-gate.ts).
function isPublished(d, now) {
  if (!d) return true
  const t = new Date(d)
  if (Number.isNaN(t.getTime())) return true
  return t.getTime() <= now.getTime()
}

function readAll() {
  return readdirSync(DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => {
      const d = JSON.parse(readFileSync(join(DIR, f), 'utf8'))
      return {
        slug: f.replace(/\.json$/, ''),
        h1: d.h1,
        meta_description: d.meta_description,
        category: d.category,
        type: d.type,
        publish_date: d.publish_date,
      }
    })
}

export function livePages(now = new Date()) {
  const all = readAll()
  const publishedAgeByCat = {}
  for (const p of all) {
    if (p.type === 'age' && isPublished(p.publish_date, now)) {
      publishedAgeByCat[p.category] = (publishedAgeByCat[p.category] || 0) + 1
    }
  }
  return all.filter((p) => {
    if (!isPublished(p.publish_date, now)) return false
    if (p.type === 'category') return (publishedAgeByCat[p.slug] || 0) >= MIN_HUB_MEMBERS
    return true // age + guide pages
  })
}
