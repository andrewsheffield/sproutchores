// site/test/embed.test.ts
import { describe, it, expect } from 'vitest'
import { embedSnippet } from '../src/lib/embed'

describe('embedSnippet', () => {
  it('builds embed HTML with canonical link, pin image, and BRANDED anchor', () => {
    const html = embedSnippet({ slug: 'chore-chart-for-a-6-year-old', h1: 'Chore Chart for a 6-Year-Old', site: 'https://sproutchores.com' })
    expect(html).toContain('href="https://sproutchores.com/chore-chart-for-a-6-year-old/"')
    expect(html).toContain('src="https://sproutchores.com/pins/chore-chart-for-a-6-year-old.png"')
    expect(html).toContain('alt="Chore Chart for a 6-Year-Old"')
    expect(html).toContain('>SproutChores</a>')          // branded anchor, not keyword-stuffed
  })

  it('escapes double quotes in the h1 alt text', () => {
    const html = embedSnippet({ slug: 's', h1: 'A "Quoted" Title', site: 'https://sproutchores.com' })
    expect(html).toContain('alt="A &quot;Quoted&quot; Title"')
  })

  it('normalizes a trailing slash on site', () => {
    const a = embedSnippet({ slug: 's', h1: 'H', site: 'https://sproutchores.com/' })
    expect(a).not.toContain('com//')
  })
})
