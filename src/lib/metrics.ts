export const EVENTS = {
  GENERATOR_START: 'generator_start',
  GENERATOR_COMPLETE: 'generator_complete',
  PDF_DOWNLOAD: 'pdf_download',
  AFFILIATE_CLICK: 'affiliate_click', // hook, dormant
  AD_VIEWABLE: 'ad_viewable',         // hook, dormant
} as const

type Send = (payload: Record<string, unknown>) => void
type Deps = { send: Send; getVariant: () => string; now?: () => number }

export function createMetrics({ send, getVariant, now = () => Date.now() }: Deps) {
  return {
    track(event: string, props: Record<string, unknown> = {}) {
      try {
        send({ event, variant: getVariant(), ts: now(), ...props })
      } catch {
        /* metrics must never break the page */
      }
    },
  }
}

// Real destination: GA4 via gtag if a measurement-ID is configured; otherwise a no-op.
// (Wired in BaseLayout, Task 8. Pure here; network/DOM injected so tests stay offline.)
export function gaSend(measurementId: string | undefined): Send {
  if (!measurementId || typeof window === 'undefined') return () => {}
  return (payload) => {
    const w = window as unknown as { gtag?: (...a: unknown[]) => void }
    w.gtag?.('event', String(payload.event), payload)
  }
}
