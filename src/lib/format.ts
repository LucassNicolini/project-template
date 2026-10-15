const numberFormatter = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 })
const compactFormatter = new Intl.NumberFormat('pt-BR', {
  notation: 'compact',
  maximumFractionDigits: 1,
})

export function formatNumber(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '-'
  return numberFormatter.format(value)
}

export function formatCompact(value: number | null | undefined): string {
  if (value === null || value === undefined || Number.isNaN(value)) return '-'
  if (Math.abs(value) < 10000) return numberFormatter.format(value)
  return compactFormatter.format(value)
}
