import { describe, it, expect } from 'vitest'
import { iconNameForChore } from '../src/lib/chore-icons'

describe('iconNameForChore', () => {
  it('uses the id fast-path for known dataset chores', () => {
    expect(iconNameForChore('make-bed', 'Make the bed')).toBe('bed')
    expect(iconNameForChore('take-out-trash', 'Take out the trash')).toBe('trash-2')
  })

  it('resolves arbitrary user-typed chores by keyword in the label', () => {
    expect(iconNameForChore('custom-1', 'Walk the dog')).toBe('cat')
    expect(iconNameForChore('custom-2', 'Take out recycling')).toBe('trash-2')
    expect(iconNameForChore('custom-3', 'Fold the laundry')).toBe('shirt')
    expect(iconNameForChore('custom-4', 'Water the garden')).toBe('sprout')
    expect(iconNameForChore('custom-5', 'Do your homework')).toBe('backpack')
    expect(iconNameForChore('custom-6', 'Clear the dinner table')).toBe('utensils')
  })

  it('falls back to a real neutral icon (never a bare dot) for no match', () => {
    expect(iconNameForChore('custom-7', 'Practise piano')).toBe('clipboard-list')
  })
})
