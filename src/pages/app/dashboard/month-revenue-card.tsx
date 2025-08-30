import { DollarSignIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthRevenueCard() {
	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Receita total (mês)</CardTitle>
				<DollarSignIcon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>

			<CardContent className="flex flex-col gap-1">
				<strong className="text-2xl tracking-tight">R$ 1.280,60</strong>

				<p className="text-xs text-muted-foreground">
					<span className="text-success">+ 2%</span> em relação ao mês passado
				</p>
			</CardContent>
		</Card>
	)
}
