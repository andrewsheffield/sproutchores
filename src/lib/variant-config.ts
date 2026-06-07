// The A/B seam. No assignment engine yet (built when the research cycle proposes a test).
// A future variant = a theme token-set and/or a component variant; getVariant() will then
// assign per-visitor. For now there is exactly one variant: control.
export const THEMES = ['control'] as const
export type ThemeName = (typeof THEMES)[number]

export const ACTIVE_VARIANT: ThemeName = 'control'

export function getVariant(): ThemeName {
  return ACTIVE_VARIANT
}
