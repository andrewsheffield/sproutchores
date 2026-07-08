// chart-animals.ts — selectable two-tone cartoon animals for the top of the chart.
//
// Each SVG is authored to adopt the chart's chosen accent: outlines use
// stroke="currentColor" and the body shapes use fill="currentColor" fill-opacity=".15",
// so setting `color: var(--chart-accent)` on the wrapper tints the whole character.
// 24×24 viewBox, no fixed width/height — the wrapper sizes it. Pure module (tested).

export interface ChartAnimal {
  /** Stable id used in data attributes + tests. */
  id: string
  /** Human label for the picker aria-label. */
  label: string
  /** Inline SVG markup (two-tone, currentColor-driven). */
  svg: string
}

const A = 'viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"'

export const CHART_ANIMALS: ChartAnimal[] = [
  {
    id: 'cat',
    label: 'Cat',
    svg: `<svg ${A}><path d="M6.5 9 5.8 3.5 10.6 6.2Z" fill="currentColor" fill-opacity=".15"/><path d="M17.5 9 18.2 3.5 13.4 6.2Z" fill="currentColor" fill-opacity=".15"/><circle cx="12" cy="13.5" r="6.6" fill="currentColor" fill-opacity=".15"/><path d="M9.6 12.6h.01M14.4 12.6h.01" stroke-width="2.2"/><path d="M11.2 15.2 12 16.1 12.8 15.2"/><path d="M5.5 13.8 8.6 14.2M5.5 15.8 8.6 15.4M18.5 13.8 15.4 14.2M18.5 15.8 15.4 15.4"/></svg>`,
  },
  {
    id: 'dog',
    label: 'Dog',
    svg: `<svg ${A}><path d="M5.5 9C4 10 4 14 6 14.5L7.2 9.5Z" fill="currentColor" fill-opacity=".15"/><path d="M18.5 9C20 10 20 14 18 14.5L16.8 9.5Z" fill="currentColor" fill-opacity=".15"/><circle cx="12" cy="13.5" r="6.3" fill="currentColor" fill-opacity=".15"/><path d="M9.7 12.8h.01M14.3 12.8h.01" stroke-width="2.2"/><circle cx="12" cy="15" r="1.1" fill="currentColor" stroke="none"/><path d="M12 16.1v1.1M10.4 17c1 .8 2.2 .8 3.2 0"/></svg>`,
  },
  {
    id: 'bunny',
    label: 'Bunny',
    svg: `<svg ${A}><path d="M9 8.5C8.2 4 8.4 2 9.7 2S11.2 4 10.6 8.5Z" fill="currentColor" fill-opacity=".15"/><path d="M15 8.5C15.8 4 15.6 2 14.3 2S12.8 4 13.4 8.5Z" fill="currentColor" fill-opacity=".15"/><circle cx="12" cy="14.5" r="5.6" fill="currentColor" fill-opacity=".15"/><path d="M10 13.8h.01M14 13.8h.01" stroke-width="2.2"/><circle cx="12" cy="16" r=".9" fill="currentColor" stroke="none"/><path d="M12 16.9v.9"/></svg>`,
  },
  {
    id: 'bear',
    label: 'Bear',
    svg: `<svg ${A}><circle cx="6.7" cy="7.5" r="2.4" fill="currentColor" fill-opacity=".15"/><circle cx="17.3" cy="7.5" r="2.4" fill="currentColor" fill-opacity=".15"/><circle cx="12" cy="13.5" r="6.6" fill="currentColor" fill-opacity=".15"/><path d="M9.6 12.4h.01M14.4 12.4h.01" stroke-width="2.2"/><circle cx="12" cy="15.5" r="2.6" fill="currentColor" fill-opacity=".15"/><circle cx="12" cy="14.6" r="1" fill="currentColor" stroke="none"/></svg>`,
  },
  {
    id: 'fox',
    label: 'Fox',
    svg: `<svg ${A}><path d="M4.5 8 8 5.5 9.5 8.5Z" fill="currentColor" fill-opacity=".15"/><path d="M19.5 8 16 5.5 14.5 8.5Z" fill="currentColor" fill-opacity=".15"/><path d="M5 9C7 7.5 9.5 7 12 7s5 .5 7 2c0 4-3 7.5-7 11-4-3.5-7-7-7-11Z" fill="currentColor" fill-opacity=".15"/><path d="M9.6 11.8h.01M14.4 11.8h.01" stroke-width="2.2"/><path d="M12 15v1.6M10.8 16.4 12 17.2 13.2 16.4"/></svg>`,
  },
  {
    id: 'owl',
    label: 'Owl',
    svg: `<svg ${A}><path d="M12 3C7.5 3 5 6.5 5 11.5S8 21 12 21s7-4.5 7-9.5S16.5 3 12 3Z" fill="currentColor" fill-opacity=".15"/><path d="M6.5 4.5 8.5 6.8M17.5 4.5 15.5 6.8"/><circle cx="9.2" cy="10.5" r="2.4"/><circle cx="14.8" cy="10.5" r="2.4"/><path d="M9.2 10.5h.01M14.8 10.5h.01" stroke-width="2.2"/><path d="M11.2 12.8 12 14.4 12.8 12.8Z" fill="currentColor" stroke="none"/></svg>`,
  },
  {
    id: 'penguin',
    label: 'Penguin',
    svg: `<svg ${A}><path d="M12 2.5C8.7 2.5 6.5 5.5 6.5 11c0 6 2.4 10.5 5.5 10.5s5.5-4.5 5.5-10.5c0-5.5-2.2-8.5-5.5-8.5Z" fill="currentColor" fill-opacity=".15"/><path d="M12 6.5C10.3 6.5 9.5 8 9.5 11c0 5 1 8.5 2.5 8.5s2.5-3.5 2.5-8.5c0-3-.8-4.5-2.5-4.5Z" fill="#fff" stroke="none"/><path d="M9.7 8h.01M14.3 8h.01" stroke-width="2.2"/><path d="M11 10 12 11.4 13 10Z" fill="currentColor" stroke="none"/><path d="M9.5 21.5 7.8 22.8M14.5 21.5 16.2 22.8"/></svg>`,
  },
  {
    id: 'frog',
    label: 'Frog',
    svg: `<svg ${A}><circle cx="8" cy="8.5" r="2.6" fill="currentColor" fill-opacity=".15"/><circle cx="16" cy="8.5" r="2.6" fill="currentColor" fill-opacity=".15"/><path d="M4 14.5C4 11 7.2 9.5 12 9.5s8 1.5 8 5-3.2 5.5-8 5.5-8-2-8-5.5Z" fill="currentColor" fill-opacity=".15"/><path d="M8 8.5h.01M16 8.5h.01" stroke-width="2.2"/><path d="M8 15.5c2.2 1.6 5.8 1.6 8 0"/></svg>`,
  },
]

export function animalById(id: string | null | undefined): ChartAnimal | undefined {
  if (!id) return undefined
  return CHART_ANIMALS.find((a) => a.id === id)
}
