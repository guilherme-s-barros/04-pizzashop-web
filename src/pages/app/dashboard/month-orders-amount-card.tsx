import { UtensilsIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function MonthOrdersAmountCard() {
	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Pedidos (mês)</CardTitle>
				<UtensilsIcon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>

			<CardContent className="flex flex-col gap-1">
				<strong className="text-2xl tracking-tight">247</strong>

				<p className="text-xs text-muted-foreground">
					<span className="text-destructive">- 4%</span> em relação ao mês
					passado
				</p>
			</CardContent>
		</Card>
	)
}
