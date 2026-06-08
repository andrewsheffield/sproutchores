export type Chore = { id: string; label: string; icon?: string }
export type AgeBand = { band: string; ages: [number, number]; chores: Chore[] }

// Seed dataset. Realistic, age-appropriate chores spanning toddler → teen. Bands are
// non-overlapping and ascending; each rung is genuinely differentiated (grounded in the
// SproutChores family's real experience: self-care first, contribution next, job-like by teen).
export const CHORES_BY_AGE: AgeBand[] = [
  { band: '2-3', ages: [2, 3], chores: [
    { id: 'put-toys-in-bin', label: 'Put toys in the bin' },
    { id: 'clothes-in-hamper', label: 'Put clothes in the hamper' },
    { id: 'wipe-spills', label: 'Wipe up small spills' },
    { id: 'feed-pet-help', label: 'Help feed a pet' },
    { id: 'books-away', label: 'Put books back on the shelf' },
  ] },
  { band: '4-5', ages: [4, 5], chores: [
    { id: 'put-toys-away', label: 'Put toys away' },
    { id: 'feed-pet', label: 'Help feed a pet' },
    { id: 'make-bed-help', label: 'Make the bed (with help)' },
    { id: 'put-clothes-hamper', label: 'Put dirty clothes in the hamper' },
  ] },
  { band: '6-7', ages: [6, 7], chores: [
    { id: 'make-bed', label: 'Make the bed' },
    { id: 'set-table', label: 'Set the table' },
    { id: 'feed-pet', label: 'Feed a pet' },
    { id: 'tidy-room', label: 'Tidy bedroom' },
    { id: 'water-plants', label: 'Water the plants' },
    { id: 'sort-laundry', label: 'Sort laundry by color' },
  ] },
  { band: '8-9', ages: [8, 9], chores: [
    { id: 'load-dishwasher', label: 'Load the dishwasher' },
    { id: 'take-out-trash', label: 'Take out the trash' },
    { id: 'vacuum', label: 'Vacuum a room' },
    { id: 'pack-backpack', label: 'Pack school backpack' },
  ] },
  { band: '10-12', ages: [10, 12], chores: [
    { id: 'run-dishwasher', label: 'Load and run the dishwasher' },
    { id: 'simple-meal', label: 'Make a simple meal or snack' },
    { id: 'fold-laundry', label: 'Wash and fold a load of laundry' },
    { id: 'clean-bathroom', label: 'Clean the bathroom' },
    { id: 'take-out-bins', label: 'Take out trash and recycling' },
    { id: 'yard-work', label: 'Help with yard work' },
  ] },
  { band: '13-17', ages: [13, 17], chores: [
    { id: 'cook-meal', label: 'Cook a full meal' },
    { id: 'own-laundry', label: 'Do their own laundry start to finish' },
    { id: 'deep-clean-room', label: 'Deep-clean their room' },
    { id: 'mow-lawn', label: 'Mow the lawn' },
    { id: 'grocery-help', label: 'Help with grocery shopping' },
    { id: 'wash-car', label: 'Wash the car' },
    { id: 'manage-schedule', label: 'Manage their own schedule and homework' },
  ] },
]

export function bandForAge(age: number): AgeBand {
  if (age <= CHORES_BY_AGE[0].ages[1]) return CHORES_BY_AGE[0]
  const last = CHORES_BY_AGE[CHORES_BY_AGE.length - 1]
  if (age >= last.ages[0]) {
    const hit = CHORES_BY_AGE.find((b) => age >= b.ages[0] && age <= b.ages[1])
    return hit ?? last
  }
  return CHORES_BY_AGE.find((b) => age >= b.ages[0] && age <= b.ages[1]) ?? CHORES_BY_AGE[0]
}
