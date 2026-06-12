// site/src/lib/mailerlite.ts
// Build-time helpers for the email-capture form. The form POSTs directly to
// MailerLite's own subscribe endpoint (CORS-enabled), so NO API key ships to the
// browser — only the PUBLIC account + form IDs (committed in .env, like PUBLIC_GA4_ID).

/** True only when BOTH public MailerLite IDs are present — the component renders
 *  nothing otherwise (mirrors the PUBLIC_GA4_ID gate). */
export function isMailerLiteConfigured(account?: string, form?: string): boolean {
  return Boolean(account && form)
}

/** The subscribe endpoint for a given account + form (mirrors the embed snippet's
 *  <form action>). */
export function subscribeEndpoint(account: string, form: string): string {
  return `https://assets.mailerlite.com/jsonp/${account}/forms/${form}/subscribe`
}
