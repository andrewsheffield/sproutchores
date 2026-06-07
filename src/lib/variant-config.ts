// The A/B seam. No assignment engine yet (built when the research cycle proposes a test).
// A future variant = a theme token-set and/or a component variant; getVariant() will then
// assign per-visitor. For now there is exactly one live variant: `modern` (the picked
// direction). It maps to the :root[data-theme="modern"] token block in tokens.css.
export const THEMES = ['modern'] as const
export type ThemeName = (typeof THEMES)[number]

export const ACTIVE_VARIANT: ThemeName = 'modern'

export function getVariant(): ThemeName {
  return ACTIVE_VARIANT
}
