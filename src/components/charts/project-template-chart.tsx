'use client'

import { MovementCharts } from '@/components/charts/movement-charts'

export function ProjectTemplateChart() {
  const currentYear = new Date().getFullYear()
  const totals = [80, 120, 95, 180, 145, 210, 175, 260, 230, 310, 275, 350]
  const series = [currentYear - 2, currentYear - 1, currentYear].flatMap((year, index) =>
    totals.map((quantity, month) => ({
      bucket: `${year}-${String(month + 1).padStart(2, '0')}-01T00:00:00.000Z`,
      quantity: Math.round(quantity * (0.6 + index * 0.2)),
      count: (month % 3) + 1,
    })),
  )

  return (
    <div className="space-y-2">
      <MovementCharts
        title="Movimentações do projeto"
        series={series}
        startDate={`${currentYear - 2}-01-01`}
      />
      <p className="text-muted-foreground text-xs">
        Dados de exemplo. Use as movimentações e a data de início do projeto para preencher o
        gráfico.
      </p>
    </div>
  )
}
