'use client'

import { useId, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCompact, formatNumber } from '@/lib/format'
import { monthlyMovements, movementYears } from '@/lib/monthly-movements'
import type { MovementSeriesPoint } from '@/lib/types'

const chartConfig: ChartConfig = {
  quantity: { label: 'Quantidade realizada', color: 'var(--chart-1)' },
}

export function MovementCharts({
  series,
  startDate,
  createdAt,
  className,
  title = 'Movimentações por mês',
}: {
  series: MovementSeriesPoint[]
  startDate?: string | null
  createdAt?: string | null
  className?: string
  title?: string
}) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, '')
  const [selectedYear, setSelectedYear] = useState<number>()
  const currentYear = new Date().getFullYear()
  const years = movementYears(series, startDate, createdAt, currentYear)
  const firstYear = years[years.length - 1]!
  const lastYear = years[0]!
  const year = Math.max(firstYear, Math.min(lastYear, selectedYear ?? currentYear))
  const data = monthlyMovements(series, year)
  const total = data.reduce((sum, month) => sum + month.quantity, 0)
  const count = data.reduce((sum, month) => sum + month.count, 0)
  const yearId = `movement-year-${id}`
  const gradientId = `fill-movement-year-${id}`

  return (
    <Card className={className}>
      <CardHeader className="flex flex-col gap-4 border-b sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <CardTitle className="text-base">{title}</CardTitle>
          <CardDescription>
            Soma das quantidades movimentadas de janeiro a dezembro de {year}
          </CardDescription>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <label htmlFor={yearId} className="text-muted-foreground text-sm">
            Ano
          </label>
          <Select value={String(year)} onValueChange={(value) => setSelectedYear(Number(value))}>
            <SelectTrigger id={yearId} className="w-28" aria-label="Ano das movimentações">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {years.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full aspect-auto sm:h-80">
          <AreaChart
            accessibilityLayer
            data={data}
            margin={{ left: 0, right: 12, top: 12, bottom: 4 }}
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-quantity)" stopOpacity={0.6} />
                <stop offset="95%" stopColor="var(--color-quantity)" stopOpacity={0.04} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              interval={0}
              tick={{ fontSize: 10 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              width={44}
              domain={[0, 'auto']}
              tickFormatter={(value: number) => formatCompact(value)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(label) =>
                    `${data.find((month) => month.month === label)?.name ?? label} de ${year}`
                  }
                  valueFormatter={(value) => formatNumber(Number(value))}
                />
              }
            />
            <Area
              dataKey="quantity"
              type="monotone"
              stroke="var(--color-quantity)"
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              fillOpacity={1}
              activeDot={{ r: 5 }}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center justify-between gap-2 border-t pt-4 text-sm">
        <span className="inline-flex items-center gap-2">
          <span className="size-2.5 rounded-sm bg-chart-1" />
          Total realizado em {year}:{' '}
          <strong className="font-mono tabular-nums">{formatNumber(total)}</strong>
        </span>
        <span className="text-muted-foreground">
          {count === 0 ? 'Nenhuma movimentação no ano' : `${formatNumber(count)} movimentação(ões)`}
        </span>
      </CardFooter>
    </Card>
  )
}
