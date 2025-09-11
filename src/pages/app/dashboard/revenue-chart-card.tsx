import { useQuery } from '@tanstack/react-query'
import { subDays } from 'date-fns'
import { Loader2Icon } from 'lucide-react'
import { useId, useMemo, useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import type { DateRange } from 'react-day-picker'

import { getDailyRevenueInPeriod } from '@/api/get-daily-revenue-in-period'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { type ChartConfig, ChartContainer } from '@/components/ui/chart'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { Label } from '@/components/ui/label'

const randomChartColor = Math.floor(Math.random() * 5) + 1 // min: 1, max: 5

const chartConfig = {
	receipt: {
		label: 'Receita',
		color: `var(--chart-${randomChartColor})`,
	},
} satisfies ChartConfig

export function RevenueChartCard() {
	const receiptGradientId = useId()
	const [dateRange, setDateRange] = useState<DateRange | undefined>({
		from: subDays(new Date(), 7),
		to: new Date(),
	})

	const { data: dailyRevenueInPeriod } = useQuery({
		queryKey: ['metrics', 'daily-revenue-in-period', dateRange],
		queryFn: () =>
			getDailyRevenueInPeriod({
				from: dateRange?.from,
				to: dateRange?.to,
			}),
		staleTime: 1000 * 60, // 1 minute
	})

	const chartData = useMemo(
		() =>
			dailyRevenueInPeriod?.map((chartItem) => ({
				date: chartItem.date,
				receipt: chartItem.receipt / 100,
			})),
		[dailyRevenueInPeriod],
	)

	return (
		<Card className="col-span-6">
			<CardHeader className="flex items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle>Receita no período</CardTitle>
					<CardDescription>Receita diária no período</CardDescription>
				</div>

				<div className="flex items-center gap-3">
					<Label>Período</Label>
					<DateRangePicker date={dateRange} onDateChange={setDateRange} />
				</div>
			</CardHeader>
			<CardContent>
				{dailyRevenueInPeriod ? (
					<ChartContainer config={chartConfig} className="h-[240px] w-full">
						<AreaChart accessibilityLayer data={chartData}>
							<defs>
								<linearGradient
									id={receiptGradientId}
									x1="0"
									y1="0"
									x2="0"
									y2="1"
								>
									<stop
										offset="0%"
										stopColor="var(--color-receipt)"
										stopOpacity={0.7}
									/>
									<stop
										offset="100%"
										stopColor="var(--color-receipt)"
										stopOpacity={0}
									/>
								</linearGradient>
							</defs>

							<Area
								type="monotone"
								dataKey="receipt"
								fill={`url(#${receiptGradientId})`}
								stroke="var(--color-receipt)"
								strokeWidth={2}
							/>

							<XAxis
								dataKey="date"
								tickLine={false}
								axisLine={false}
								tickMargin={16}
							/>

							<YAxis
								tickLine={false}
								axisLine={false}
								tickMargin={10}
								width={80}
								tickFormatter={(receipt: number) =>
									receipt.toLocaleString('pt-br', {
										style: 'currency',
										currency: 'BRL',
									})
								}
							/>

							<CartesianGrid vertical={false} />
						</AreaChart>
					</ChartContainer>
				) : (
					<div className="flex h-[240px] w-full items-center justify-center">
						<Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
					</div>
				)}
			</CardContent>
		</Card>
	)
}
