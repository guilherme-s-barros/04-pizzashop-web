import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

interface Order {
	orderId: string
	customerName: string
	status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
	total: number
	createdAt: string
}

interface OrderTableRowProps {
	order: Order
}

export function OrderTableRow({ order }: OrderTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)

	const requestedAt = formatDistanceToNow(order.createdAt, {
		addSuffix: true,
		locale: ptBR,
	})

	const total = (order.total / 100).toLocaleString('pt-br', {
		style: 'currency',
		currency: 'BRL',
	})

	return (
		<TableRow>
			<TableCell>
				<Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" size="icon-sm">
							<SearchIcon />
							<span className="sr-only">Detalhes do pedido</span>
						</Button>
					</DialogTrigger>

					<OrderDetails orderId={order.orderId} open={isDetailsOpen} />
				</Dialog>
			</TableCell>
			<TableCell className="font-mono text-xs font-medium">
				{order.orderId}
			</TableCell>
			<TableCell className="text-muted-foreground">{requestedAt}</TableCell>
			<TableCell>
				<OrderStatus status={order.status} />
			</TableCell>
			<TableCell className="font-medium">{order.customerName}</TableCell>
			<TableCell className="font-medium">{total}</TableCell>
			<TableCell>
				<Button variant="outline" size="sm">
					<ArrowRightIcon />
					Aprovar
				</Button>
			</TableCell>
			<TableCell>
				<Button variant="ghost" size="sm">
					<XIcon />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
