import { UtensilsIcon } from 'lucide-react'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function DayOrdersAmountCard() {
	return (
		<Card>
			<CardHeader className="flex items-center justify-between">
				<CardTitle>Pedidos (dia)</CardTitle>
				<UtensilsIcon className="h-4 w-4 text-muted-foreground" />
			</CardHeader>

			<CardContent className="flex flex-col gap-1">
				<strong className="text-2xl tracking-tight">14</strong>

				<p className="text-xs text-muted-foreground">
					<span className="text-success">+ 3%</span> em relação a ontem
				</p>
			</CardContent>
		</Card>
	)
}
