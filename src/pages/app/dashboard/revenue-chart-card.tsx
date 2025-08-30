import { useId } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts'

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

const data = [
	{ date: '07/07', revenue: 600.89 },
	{ date: '08/07', revenue: 720.05 },
	{ date: '09/07', revenue: 520.123 },
	{ date: '10/07', revenue: 280.28 },
	{ date: '11/07', revenue: 1200.93 },
	{ date: '12/07', revenue: 786.5 },
	{ date: '13/07', revenue: 920.2 },
	{ date: '14/07', revenue: 560.6 },
	{ date: '15/07', revenue: 735.25 },
]

const randomChartColor = Math.floor(Math.random() * 5) + 1 // min: 1, max: 5

const chartConfig = {
	revenue: {
		label: 'Receita',
		color: `var(--chart-${randomChartColor})`,
	},
} satisfies ChartConfig

export function RevenueChartCard() {
	const revenueGradientId = useId()

	return (
		<Card className="col-span-6">
			<CardHeader className="flex items-center justify-between pb-8">
				<div className="space-y-1">
					<CardTitle>Receita no período</CardTitle>
					<CardDescription>Receita diária no período</CardDescription>
				</div>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig} className="h-[240px] w-full">
					<AreaChart accessibilityLayer data={data}>
						<defs>
							<linearGradient
								id={revenueGradientId}
								x1="0"
								y1="0"
								x2="0"
								y2="1"
							>
								<stop
									offset="0%"
									stopColor="var(--color-revenue)"
									stopOpacity={0.7}
								/>
								<stop
									offset="100%"
									stopColor="var(--color-revenue)"
									stopOpacity={0}
								/>
							</linearGradient>
						</defs>

						<Area
							type="monotone"
							dataKey="revenue"
							fill={`url(#${revenueGradientId})`}
							stroke="var(--color-revenue)"
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
							tickFormatter={(revenue: number) =>
								revenue.toLocaleString('pt-br', {
									style: 'currency',
									currency: 'BRL',
								})
							}
						/>

						<CartesianGrid vertical={false} />
						<ChartTooltip
							content={
								<ChartTooltipContent hideIndicator={true} hideLabel={true} />
							}
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
		</Card>
	)
}
