import { useQuery } from '@tanstack/react-query'
import { DollarSignIcon } from 'lucide-react'

import { getMonthRevenue } from '@/api/get-month-revenue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function MonthRevenueCard() {
	const { data: monthRevenue } = useQuery({
		queryKey: ['metrics', 'month-revenue'],
		queryFn: getMonthRevenue,
	})

	console.log

	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Receita total (mês)</CardTitle>
				<DollarSignIcon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>

			<CardContent className="flex flex-col gap-1">
				{monthRevenue && (
					<>
						<strong className="text-2xl tracking-tight">
							{(monthRevenue.receipt / 100).toLocaleString('pt-BR', {
								style: 'currency',
								currency: 'BRL',
							})}
						</strong>

						<p className="text-xs text-muted-foreground">
							<span
								className={cn({
									'text-success': monthRevenue.diffFromLastMonth > 0,
									'text-destructive': monthRevenue.diffFromLastMonth < 0,
								})}
							>
								{monthRevenue.diffFromLastMonth.toLocaleString('pt-BR', {
									signDisplay: 'exceptZero',
								})}
								%
							</span>{' '}
							em relação ao mês passado
						</p>
					</>
				)}
			</CardContent>
		</Card>
	)
}
