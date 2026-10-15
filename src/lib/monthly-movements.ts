import type { MovementSeriesPoint } from './types'

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
]

function dateParts(value?: string | null) {
  const match = value?.match(/^(\d{4})-(\d{2})-/)
  if (!match) return null
  const year = Number(match[1])
  const month = Number(match[2])
  return year > 0 && month >= 1 && month <= 12 ? { year, month } : null
}

export function movementYears(
  series: MovementSeriesPoint[],
  startDate?: string | null,
  createdAt?: string | null,
  currentYear = new Date().getFullYear(),
) {
  const recordedYears = series.flatMap((point) => {
    const parts = dateParts(point.bucket)
    return parts ? [parts.year] : []
  })
  const firstYear =
    dateParts(startDate)?.year ??
    dateParts(createdAt)?.year ??
    (recordedYears.length ? Math.min(...recordedYears) : currentYear)
  const lastYear = Math.max(currentYear, firstYear, ...recordedYears)
  return Array.from({ length: lastYear - firstYear + 1 }, (_, index) => lastYear - index)
}

/** Read date-only buckets directly so UTC midnight never moves into the previous month. */
export function monthlyMovements(series: MovementSeriesPoint[], year: number) {
  const data = months.map((name, index) => ({
    month: name.slice(0, 3),
    name,
    monthNumber: index + 1,
    quantity: 0,
    count: 0,
  }))
  for (const point of series) {
    const parts = dateParts(point.bucket)
    if (!parts || parts.year !== year) continue
    const month = data[parts.month - 1]!
    month.quantity += point.quantity
    month.count += point.count
  }
  return data
}
