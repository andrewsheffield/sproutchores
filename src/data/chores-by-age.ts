export type Chore = { id: string; label: string; icon?: string }
export type AgeBand = { band: string; ages: [number, number]; chores: Chore[] }

// Seed dataset. Realistic, age-appropriate chores. Bands cover the 6yo slice + neighbors
// for boundary tests; later cycles expand to the full 2–18 ladder.
export const CHORES_BY_AGE: AgeBand[] = [
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
