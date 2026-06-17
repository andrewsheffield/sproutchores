import { describe, it, expect } from 'vitest'
import { newPrintablesEmail, buildCampaignPayload } from '../../src/mailerlite.mjs'

describe('newPrintablesEmail', () => {
  const e = newPrintablesEmail({
    site: 'https://sproutchores.com',
    pages: [
      { slug: 'chore-chart-for-adhd-kids', h1: 'Chore Chart for ADHD Kids' },
      { slug: 'daily-chore-chart-for-kids', h1: 'Daily Chore Chart for Kids' },
    ],
  })
  it('subject reflects the count', () => expect(e.subject).toMatch(/2/))
  it('links each page by absolute URL + title', () => {
    expect(e.html).toContain('https://sproutchores.com/chore-chart-for-adhd-kids/')
    expect(e.html).toContain('Chore Chart for ADHD Kids')
    expect(e.html).toContain('https://sproutchores.com/daily-chore-chart-for-kids/')
  })
  it('escapes HTML in titles + uses singular subject for one page', () => {
    const x = newPrintablesEmail({ site: 'https://x', pages: [{ slug: 's', h1: 'A & <b>' }] })
    expect(x.html).toContain('A &amp; &lt;b&gt;')
    expect(x.subject).toMatch(/a new free printable/i)
  })
})

describe('buildCampaignPayload', () => {
  const p = buildCampaignPayload({ subject: 'Subj', fromName: 'SproutChores', fromEmail: 'hello@sproutchores.com', html: '<p>hi</p>', groupId: '123' })
  it('is a regular campaign to the group with the email content', () => {
    expect(p.type).toBe('regular')
    expect(p.groups).toEqual(['123'])
    expect(p.emails[0]).toMatchObject({ subject: 'Subj', from_name: 'SproutChores', from: 'hello@sproutchores.com' })
    expect(p.emails[0].content.html).toContain('hi')
    expect(p.emails[0].content.plain_text).toContain('hi')
  })
})
