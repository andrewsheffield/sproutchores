// site/src/data/household-chores.ts
// Shared household chores for the multi-person "household" generator variant
// (chores × people). Not age-based — these are whole-home tasks adults/teens share.
export type HouseholdChore = { id: string; label: string }

export const HOUSEHOLD_CHORES: HouseholdChore[] = [
  { id: 'dishes', label: 'Wash / load the dishes' },
  { id: 'trash', label: 'Take out trash & recycling' },
  { id: 'laundry', label: 'Wash, dry & fold a load of laundry' },
  { id: 'vacuum', label: 'Vacuum / sweep floors' },
  { id: 'bathroom', label: 'Clean the bathroom' },
  { id: 'kitchen', label: 'Wipe kitchen counters & stovetop' },
  { id: 'cook', label: 'Cook / plan a meal' },
  { id: 'groceries', label: 'Grocery shopping' },
  { id: 'tidy', label: 'Tidy shared living areas' },
  { id: 'beds-linens', label: 'Change bed linens' },
]
