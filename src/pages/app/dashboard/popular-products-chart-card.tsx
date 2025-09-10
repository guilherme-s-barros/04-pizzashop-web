import { useQuery } from '@tanstack/react-query'
import { BarChart } from 'lucide-react'
import { Cell, Pie, PieChart } from 'recharts'

import { getPopularProducts } from '@/api/get-popular-products'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	type ChartConfig,
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'

const chartConfig = {
	amount: {
		label: 'Produto',
	},
} satisfies ChartConfig

const COLORS = [
	'var(--chart-1)',
	'var(--chart-2)',
	'var(--chart-3)',
	'var(--chart-4)',
	'var(--chart-5)',
]

export function PopularProductsChartCard() {
	const { data: popularProducts } = useQuery({
		queryKey: ['metrics', 'popular-products'],
		queryFn: getPopularProducts,
	})

	return (
		<Card className="col-span-3">
			<CardHeader className="flex items-center justify-between pb-8">
				<CardTitle>Produtos populares</CardTitle>
				<BarChart className="h-4 w-4 text-muted-foreground" />
			</CardHeader>
			<CardContent>
				{popularProducts && (
					<ChartContainer config={chartConfig} className="h-[240px] w-full">
						<PieChart accessibilityLayer>
							<Pie
								dataKey="amount"
								data={popularProducts}
								nameKey="product"
								outerRadius={76}
								innerRadius={64}
								paddingAngle={8}
								label={({
									cx,
									cy,
									midAngle,
									innerRadius,
									outerRadius,
									value,
									index,
								}) => {
									const RADIAN = Math.PI / 180
									const radius = outerRadius + (outerRadius - innerRadius)
									const x = cx + radius * Math.cos(-midAngle * RADIAN)
									const y = cy + radius * Math.sin(-midAngle * RADIAN)

									return (
										<text
											x={x}
											y={y}
											className="fill-muted-foreground text-xs"
											textAnchor={x > cx ? 'start' : 'end'}
											dominantBaseline="central"
										>
											{popularProducts[index].product.length > 12
												? popularProducts[index].product
														.substring(0, 12)
														.concat('...')
												: popularProducts[index].product}
											{''}({value})
										</text>
									)
								}}
								labelLine={false}
							>
								{popularProducts.map((entry, index) => {
									const colorIndex = index % COLORS.length // from 1 to 5

									return (
										<Cell
											key={`cell-${entry.product}`}
											fill={COLORS[colorIndex]}
											className="hover:opacity-80"
										/>
									)
								})}
							</Pie>

							<ChartTooltip
								content={<ChartTooltipContent hideIndicator={true} />}
							/>
						</PieChart>
					</ChartContainer>
				)}
			</CardContent>
		</Card>
	)
}
