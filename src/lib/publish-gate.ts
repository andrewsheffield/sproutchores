// A page/post is live when its publishDate is at or before `now`. Missing/invalid date = live.
// The scheduled-publish Action rebuilds the site so future-dated pages flip live on time.
export function isPublished(publishDate: string | Date | undefined, now: Date = new Date()): boolean {
  if (publishDate == null) return true
  const d = publishDate instanceof Date ? publishDate : new Date(publishDate)
  if (Number.isNaN(d.getTime())) return true
  return d.getTime() <= now.getTime()
}
