import { useQuery } from '@tanstack/react-query'
import { UtensilsIcon } from 'lucide-react'

import { getMonthOrdersAmount } from '@/api/get-month-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function MonthOrdersAmountCard() {
	const { data: monthOrdersAmount } = useQuery({
		queryKey: ['metrics', 'month-orders-amount'],
		queryFn: getMonthOrdersAmount,
	})

	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Pedidos (mês)</CardTitle>
				<UtensilsIcon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>

			<CardContent className="flex flex-col gap-1">
				{monthOrdersAmount ? (
					<>
						<strong className="text-2xl tracking-tight">
							{monthOrdersAmount.amount.toLocaleString('pt-BR')}
						</strong>

						<p className="text-xs text-muted-foreground">
							<span
								className={cn({
									'text-success': monthOrdersAmount.diffFromLastMonth > 0,
									'text-destructive': monthOrdersAmount.diffFromLastMonth < 0,
								})}
							>
								{monthOrdersAmount.diffFromLastMonth.toLocaleString('pt-BR', {
									signDisplay: 'exceptZero',
								})}
								%
							</span>{' '}
							em relação ao mês passado
						</p>
					</>
				) : (
					<>
						<Skeleton className="h-8 w-24" />
						<Skeleton className="h-4 w-54" />
					</>
				)}
			</CardContent>
		</Card>
	)
}
