import { describe, it, expect } from 'vitest'
import { isMailerLiteConfigured, subscribeEndpoint } from '../src/lib/mailerlite'

describe('subscribeEndpoint', () => {
  it('builds the MailerLite subscribe URL from account + form IDs', () => {
    expect(subscribeEndpoint('2426314', '190088912719316874')).toBe(
      'https://assets.mailerlite.com/jsonp/2426314/forms/190088912719316874/subscribe',
    )
  })
})

describe('isMailerLiteConfigured', () => {
  it('is true only when BOTH IDs are present', () => {
    expect(isMailerLiteConfigured('2426314', '190088912719316874')).toBe(true)
  })
  it('is false when either ID is missing or empty', () => {
    expect(isMailerLiteConfigured(undefined, '1')).toBe(false)
    expect(isMailerLiteConfigured('1', undefined)).toBe(false)
    expect(isMailerLiteConfigured('', '')).toBe(false)
    expect(isMailerLiteConfigured(undefined, undefined)).toBe(false)
  })
})
