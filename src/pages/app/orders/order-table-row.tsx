import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { cancelOrder } from '@/api/cancel-order'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

import type { GetOrdersResponse } from '@/api/get-orders'

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
	const queryClient = useQueryClient()

	const { mutateAsync: cancelOrderFn, isPending } = useMutation({
		mutationFn: cancelOrder,
		onSuccess(_, { orderId }) {
			queryClient.setQueriesData<GetOrdersResponse>(
				{
					queryKey: ['orders'],
				},
				(cacheData) => {
					if (!cacheData) {
						return
					}

					return {
						...cacheData,
						orders: cacheData.orders.map((order) => {
							if (order.orderId === orderId) {
								return {
									...order,
									status: 'canceled',
								}
							}

							return order
						}),
					}
				},
			)

			queryClient.invalidateQueries({
				queryKey: ['orders'],
				stale: false,
			})
		},
	})

	const requestedAt = formatDistanceToNow(order.createdAt, {
		addSuffix: true,
		locale: ptBR,
	})

	const total = (order.total / 100).toLocaleString('pt-br', {
		style: 'currency',
		currency: 'BRL',
	})

	async function handleCancelOrder() {
		try {
			await cancelOrderFn({ orderId: order.orderId })

			toast.success('Pedido cancelado com sucesso!')
		} catch {
			toast.error('Erro ao cancelar pedido. Tente novamente mais tarde.')
		}
	}

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
				<Button
					variant="ghost"
					size="sm"
					disabled={
						!['pending', 'processing'].includes(order.status) || isPending
					}
					onClick={handleCancelOrder}
				>
					<XIcon />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
