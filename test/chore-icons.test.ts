import { describe, it, expect } from 'vitest'
import { ICON_BODY, PICKER_ICONS, iconSvg, iconLabel, iconNameForChore } from '../src/lib/chore-icons'

describe('iconNameForChore', () => {
  it('uses the id fast-path for known dataset chores', () => {
    expect(iconNameForChore('make-bed', 'Make the bed')).toBe('bed')
    expect(iconNameForChore('take-out-trash', 'Take out the trash')).toBe('trash-2')
  })

  it('resolves arbitrary user-typed chores by keyword in the label', () => {
    expect(iconNameForChore('custom-1', 'Walk the dog')).toBe('dog')
    expect(iconNameForChore('custom-2', 'Take out recycling')).toBe('trash-2')
    expect(iconNameForChore('custom-3', 'Fold the laundry')).toBe('shirt')
    expect(iconNameForChore('custom-4', 'Water the garden')).toBe('sprout')
    expect(iconNameForChore('custom-5', 'Do your homework')).toBe('book-open')
    expect(iconNameForChore('custom-6', 'Clear the dinner table')).toBe('utensils')
    expect(iconNameForChore('custom-8', 'Brush teeth')).toBe('droplets')
    expect(iconNameForChore('custom-9', 'Practise piano')).toBe('book-open')
  })

  it('falls back to the friendly neutral star icon (never a bare dot) for no match', () => {
    expect(iconNameForChore('custom-7', 'Stack firewood')).toBe('star')
  })
})

describe('PICKER_ICONS', () => {
  it('has a curated 20–24 palette', () => {
    expect(PICKER_ICONS.length).toBeGreaterThanOrEqual(20)
    expect(PICKER_ICONS.length).toBeLessThanOrEqual(24)
  })
  it('every entry resolves to an ICON_BODY (no drift)', () => {
    for (const name of PICKER_ICONS) expect(ICON_BODY[name], name).toBeTruthy()
  })
  it('excludes UI-only icons', () => {
    for (const ui of ['trash-2', 'plus', 'x', 'printer', 'check', 'calendar-check'])
      expect(PICKER_ICONS).not.toContain(ui)
  })
  it('has no duplicates', () => {
    expect(new Set(PICKER_ICONS).size).toBe(PICKER_ICONS.length)
  })
  it('iconSvg renders a non-empty <svg> for each', () => {
    for (const name of PICKER_ICONS) {
      const svg = iconSvg(name)
      expect(svg.startsWith('<svg'), name).toBe(true)
      expect(svg).toContain('</svg>')
    }
  })
})

describe('iconLabel', () => {
  it('title-cases an icon name for aria-labels', () => {
    expect(iconLabel('gamepad-2')).toBe('Gamepad 2')
    expect(iconLabel('washing-machine')).toBe('Washing Machine')
    expect(iconLabel('star')).toBe('Star')
  })
})
