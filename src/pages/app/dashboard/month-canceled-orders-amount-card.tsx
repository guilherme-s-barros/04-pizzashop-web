import { useQuery } from '@tanstack/react-query'
import { BanknoteArrowDownIcon } from 'lucide-react'

import { getMonthCanceledOrdersAmount } from '@/api/get-month-canceled-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function MonthCanceledOrdersAmountCard() {
	const { data: monthCanceledOrdersAmount } = useQuery({
		queryKey: ['metrics', 'month-canceled-orders-amount'],
		queryFn: getMonthCanceledOrdersAmount,
		staleTime: 1000 * 60, // 1 minute
	})

	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Cancelamentos (mês)</CardTitle>
				<BanknoteArrowDownIcon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>

			<CardContent className="flex flex-col gap-1">
				{monthCanceledOrdersAmount && (
					<>
						<strong className="text-2xl tracking-tight">
							{monthCanceledOrdersAmount.amount.toLocaleString('pt-BR')}
						</strong>

						<p className="text-xs text-muted-foreground">
							<span
								className={cn({
									'text-success':
										monthCanceledOrdersAmount.diffFromLastMonth < 0,
									'text-destructive':
										monthCanceledOrdersAmount.diffFromLastMonth > 0,
								})}
							>
								{monthCanceledOrdersAmount.diffFromLastMonth.toLocaleString(
									'pt-BR',
									{
										signDisplay: 'exceptZero',
									},
								)}
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
