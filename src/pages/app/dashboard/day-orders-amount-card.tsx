import { useQuery } from '@tanstack/react-query'
import { UtensilsIcon } from 'lucide-react'

import { getDayOrdersAmount } from '@/api/get-day-orders-amount'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export function DayOrdersAmountCard() {
	const { data: dayOrdersAmount } = useQuery({
		queryKey: ['metrics', 'day-orders-amount'],
		queryFn: getDayOrdersAmount,
		staleTime: 1000 * 60, // 1 minute
	})

	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Pedidos (dia)</CardTitle>
				<UtensilsIcon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>

			<CardContent className="flex flex-col gap-1">
				{dayOrdersAmount && (
					<>
						<strong className="text-2xl tracking-tight">
							{dayOrdersAmount.amount.toLocaleString('pt-BR')}
						</strong>

						<p className="text-xs text-muted-foreground">
							<span
								className={cn({
									'text-success': dayOrdersAmount.diffFromYesterday > 0,
									'text-destructive': dayOrdersAmount.diffFromYesterday < 0,
								})}
							>
								{dayOrdersAmount.diffFromYesterday.toLocaleString('pt-BR', {
									signDisplay: 'exceptZero',
								})}
								%
							</span>{' '}
							em relação a ontem
						</p>
					</>
				)}
			</CardContent>
		</Card>
	)
}
