// Hub-liveness rule: a category/hub page only "exists" once it genuinely aggregates
// its cluster. Publishing a hub that lists one article is a thin, intent-missing
// page (bad for users and SEO), so we gate hub routes — AND the nav/breadcrumb links
// that point at them — on a minimum number of published member pages. The hub then
// self-publishes automatically once the cluster fills (the daily cron rebuilds).
import { isPublished } from './publish-gate'

export const MIN_HUB_MEMBERS = 3

type AnyEntry = { id: string; data: { type: string; category?: string | null; publish_date: string } }

export function publishedMemberCount(all: AnyEntry[], hubId: string): number {
  return all.filter(
    (e) => e.data.type === 'age' && e.data.category === hubId && isPublished(e.data.publish_date)
  ).length
}

// A hub is live only if its own entry is published AND it has enough published members.
export function isHubLive(all: AnyEntry[], hubId: string): boolean {
  const hub = all.find((e) => e.id === hubId && e.data.type === 'category')
  if (!hub || !isPublished(hub.data.publish_date)) return false
  return publishedMemberCount(all, hubId) >= MIN_HUB_MEMBERS
}
