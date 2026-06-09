// Pinterest poster: ensure topic boards exist, then post the next batch of
// not-yet-pinned LIVE pages as pins, recording results in pinned.json.
//
// Uses curl for the API (works behind the corporate proxy locally AND in CI;
// node fetch ignores the proxy). Self-throttles from x-ratelimit headers.
// Posts to the owner's own account. NOTE: on Trial API access these pins are
// sandbox-only (creator-visible); Standard access is required for public reach.
//
//   node scripts/pinterest/post-pins.mjs            # live (needs token)
//   node scripts/pinterest/post-pins.mjs --dry-run  # assemble + log, no posting
import { execFileSync } from 'node:child_process'
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { livePages } from './page-list.mjs'
import { BOARDS, pinTitle, pinDescription, boardForPage, pinWorklist, selectBatch, recordPinned } from './pinterest-core.mjs'

const DRY = process.argv.includes('--dry-run')
const SITE = process.env.SITE_URL || 'https://sproutchores.com'
const VARIANT = 'a'
const MAX = parseInt(process.env.MAX_PINS_PER_RUN || '3', 10)
const API = 'https://api.pinterest.com/v5'
const STATE = join(process.cwd(), 'pinned.json')

function token() {
  if (process.env.PINTEREST_TOKEN) return process.env.PINTEREST_TOKEN.trim()
  const f = join(process.cwd(), '.secrets', 'pinterest-token')
  if (existsSync(f)) return readFileSync(f, 'utf8').trim()
  throw new Error('No PINTEREST_TOKEN env var or .secrets/pinterest-token file')
}
const TOKEN = DRY ? '(dry-run)' : token()

// curl-based API call → { status, remaining, json }. Dumps headers to parse the
// rate-limit signal; never throws on HTTP errors (caller inspects status).
function api(method, path, body) {
  const args = ['-sS', '-D', '-', '-o', '-', '-X', method, `${API}${path}`,
    '-H', `Authorization: Bearer ${TOKEN}`, '-H', 'Content-Type: application/json', '--max-time', '30']
  if (body) args.push('-d', JSON.stringify(body))
  // -w to separate headers+body from a final status marker
  args.push('-w', '\n__STATUS__%{http_code}')
  let out
  try { out = execFileSync('curl', args, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 }) }
  catch (e) { out = (e.stdout || '') + (e.stderr || '') }
  const status = parseInt((out.match(/__STATUS__(\d+)\s*$/) || [])[1] || '0', 10)
  const remaining = parseInt((out.match(/x-ratelimit-remaining:\s*(\d+)/i) || [])[1] ?? 'NaN', 10)
  const bodyText = out.replace(/\n__STATUS__\d+\s*$/, '').split('\r\n\r\n').slice(1).join('\r\n\r\n') || out
  let json = null
  try { json = JSON.parse(bodyText.slice(bodyText.indexOf('{'))) } catch {}
  return { status, remaining, json }
}

// Ensure each topic board exists; return { boardName -> id }.
function ensureBoards() {
  if (DRY) {
    const byName = {}
    for (const key of Object.keys(BOARDS)) { byName[BOARDS[key].name] = `dry-${key}`; console.log(`[dry-run] board: ${BOARDS[key].name}`) }
    return byName
  }
  const res = api('GET', '/boards?page_size=100')
  if (res.status !== 200) throw new Error(`GET /boards failed (${res.status}): ${JSON.stringify(res.json)}`)
  const byName = {}
  for (const b of res.json?.items || []) byName[b.name] = b.id
  for (const key of Object.keys(BOARDS)) {
    const b = BOARDS[key]
    if (byName[b.name]) continue
    const created = api('POST', '/boards', { name: b.name, description: b.description })
    if (created.status >= 200 && created.status < 300) { byName[b.name] = created.json.id; console.log(`created board: ${b.name}`) }
    else throw new Error(`create board "${b.name}" failed (${created.status}): ${JSON.stringify(created.json)}`)
  }
  return byName
}

function loadPinned() { try { return JSON.parse(readFileSync(STATE, 'utf8')) } catch { return {} } }

const pages = livePages()
const pinned = loadPinned()
const worklist = selectBatch(pinWorklist(pages, pinned, VARIANT), MAX)
console.log(`live pages: ${pages.length} | already pinned: ${Object.keys(pinned).length} | to post this run: ${worklist.length}${DRY ? ' (DRY-RUN)' : ''}`)

const boardIds = ensureBoards()
const now = new Date().toISOString()
const results = []
let throttled = false

for (const item of worklist) {
  const board_id = boardIds[item.boardName]
  const payload = {
    board_id,
    title: item.title,
    description: item.description,
    link: `${SITE}/${item.slug}/`,
    media_source: { source_type: 'image_url', url: `${SITE}/pins/${item.slug}.png` },
  }
  if (DRY) { console.log(`[dry-run] ${item.boardName} ← ${item.slug}\n  title: ${item.title}\n  link:  ${payload.link}\n  img:   ${payload.media_source.url}`); continue }
  const res = api('POST', '/pins', payload)
  if (res.status >= 200 && res.status < 300) {
    results.push({ slug: item.slug, variant: VARIANT, pin_id: res.json.id, board_id, pinned_at: now })
    console.log(`pinned ${item.slug} → ${item.boardName} (pin ${res.json.id})`)
  } else if (res.status === 429) {
    console.log(`rate-limited (429) on ${item.slug} — stopping run, will resume next time`); throttled = true; break
  } else {
    console.log(`SKIP ${item.slug}: pin failed (${res.status}): ${JSON.stringify(res.json)}`)
  }
  // Self-throttle: if the API says we're low on remaining calls, stop early.
  if (Number.isFinite(res.remaining) && res.remaining <= 2) { console.log(`low rate-limit remaining (${res.remaining}) — stopping run`); throttled = true; break }
}

if (!DRY && results.length) {
  writeFileSync(STATE, JSON.stringify(recordPinned(pinned, results), null, 2) + '\n')
}
const remaining = worklist.length - results.length
console.log(`done: posted ${results.length}, ${throttled ? 'throttle-stopped, ' : ''}${remaining} still queued for next run.`)
