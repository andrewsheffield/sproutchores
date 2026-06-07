import { bandForAge, type AgeBand, type Chore } from '../data/chores-by-age'

export type Chart = { ageBand: string; ages: [number, number]; chores: Chore[] }

export function chartForAge(age: number): Chart {
  if (!Number.isFinite(age)) throw new Error(`age must be a finite number, got ${age}`)
  const band: AgeBand = bandForAge(age)
  return { ageBand: band.band, ages: band.ages, chores: band.chores }
}
