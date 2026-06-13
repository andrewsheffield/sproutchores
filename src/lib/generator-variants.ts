import { HOUSEHOLD_CHORES } from '../data/household-chores'

// Generator variants. The chore-chart generator is a grid of items × days with a
// per-cell mark; each variant tweaks the defaults/labels/marks so one component
// serves several keyword pages (chore chart, bedtime routine, reward chart, money
// chart) without bespoke tools. Age-based variants (chore, money) draw their
// default rows from the age dataset; fixed variants (routine, reward) ship their own.
export type GeneratorVariant = 'chore' | 'routine' | 'reward' | 'money' | 'household'

export type VariantItem = { id: string; label: string }

export type VariantConfig = {
  /** First-column header + the noun used when adding a row. */
  itemNoun: string
  /** Title noun, e.g. "Chore Chart" / "Bedtime Routine". */
  titleNoun: string
  /** Cell mark: a tick box (chore/routine/money) or a star (reward). */
  mark: 'check' | 'star'
  /** Show the per-row money column + weekly total. */
  money: boolean
  /** Uses the age picker + age-based default rows (chore, money). */
  ageBased: boolean
  /** Fixed default rows for non-age variants. */
  defaultItems?: VariantItem[]
  /** Placeholder for the add-a-row input. */
  addPlaceholder: string
  /** Column axis: 'days' (Mon–Sun, default) or 'people' (editable person columns). */
  columnMode?: 'days' | 'people'
  /** People-mode only: default editable column headers (person names). */
  defaultPeople?: string[]
}

export const GENERATOR_VARIANTS: Record<GeneratorVariant, VariantConfig> = {
  chore: {
    itemNoun: 'Chore',
    titleNoun: 'Chore Chart',
    mark: 'check',
    money: false,
    ageBased: true,
    addPlaceholder: 'Type a chore and press Enter…',
  },
  money: {
    itemNoun: 'Chore',
    titleNoun: 'Chore Chart',
    mark: 'check',
    money: true,
    ageBased: true,
    addPlaceholder: 'Type a chore and press Enter…',
  },
  routine: {
    itemNoun: 'Step',
    titleNoun: 'Bedtime Routine',
    mark: 'check',
    money: false,
    ageBased: false,
    addPlaceholder: 'Add a routine step…',
    defaultItems: [
      { id: 'tidy-toys', label: 'Tidy up toys' },
      { id: 'bath', label: 'Bath or wash up' },
      { id: 'pajamas', label: 'Put on pajamas' },
      { id: 'brush-teeth', label: 'Brush teeth' },
      { id: 'story', label: 'Story time' },
      { id: 'lights-out', label: 'Lights out' },
    ],
  },
  reward: {
    itemNoun: 'Goal',
    titleNoun: 'Reward Chart',
    mark: 'star',
    money: false,
    ageBased: false,
    addPlaceholder: 'Add a goal to reward…',
    defaultItems: [
      { id: 'kind', label: 'Be kind and helpful' },
      { id: 'listen', label: 'Listen the first time' },
      { id: 'chores', label: 'Finish my chores' },
      { id: 'ready', label: 'Get ready on time' },
      { id: 'teeth', label: 'Brush teeth morning and night' },
    ],
  },
  household: {
    itemNoun: 'Chore',
    titleNoun: 'Family Chore Chart',
    mark: 'check',
    money: false,
    ageBased: false,
    columnMode: 'people',
    defaultPeople: ['Mom', 'Dad', 'Kid 1', 'Kid 2'],
    defaultItems: HOUSEHOLD_CHORES,
    addPlaceholder: 'Add a household chore…',
  },
}
