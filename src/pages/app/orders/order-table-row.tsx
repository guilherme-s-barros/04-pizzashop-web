import { useMutation, useQueryClient } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

import { approveOrder } from '@/api/approve-order'
import { cancelOrder } from '@/api/cancel-order'
import { deliverOrder } from '@/api/deliver-order'
import { dispatchOrder } from '@/api/dispatch-order'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { OrderDetails } from './order-details'
import { OrderStatus } from './order-status'

import type { GetOrdersResponse } from '@/api/get-orders'

type Status = 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'

interface Order {
	orderId: string
	customerName: string
	status: Status
	total: number
	createdAt: string
}

interface OrderTableRowProps {
	order: Order
}

export function OrderTableRow({ order }: OrderTableRowProps) {
	const [isDetailsOpen, setIsDetailsOpen] = useState(false)
	const queryClient = useQueryClient()

	const { mutateAsync: cancelOrderFn, isPending: isCancelling } = useMutation({
		mutationFn: cancelOrder,
		onSuccess(_, { orderId }) {
			updateOrderStatusOnCache(orderId, 'canceled')
		},
	})

	const { mutateAsync: approveOrderFn, isPending: isApproving } = useMutation({
		mutationFn: approveOrder,
		onSuccess(_, { orderId }) {
			updateOrderStatusOnCache(orderId, 'processing')
		},
	})

	const { mutateAsync: dispatchOrderFn, isPending: isDispatching } =
		useMutation({
			mutationFn: dispatchOrder,
			onSuccess(_, { orderId }) {
				updateOrderStatusOnCache(orderId, 'delivering')
			},
		})

	const { mutateAsync: deliverOrderFn, isPending: isDelivering } = useMutation({
		mutationFn: deliverOrder,
		onSuccess(_, { orderId }) {
			updateOrderStatusOnCache(orderId, 'delivered')
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

	function updateOrderStatusOnCache(orderId: string, status: Status) {
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
								status,
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

		queryClient.invalidateQueries({
			queryKey: ['order_details'],
			stale: false,
		})
	}

	async function handleCancelOrder() {
		try {
			await cancelOrderFn({ orderId: order.orderId })

			toast.success('Pedido cancelado com sucesso.')
		} catch {
			toast.error('Não foi possível cancelar o pedido. Tente novamente.')
		}
	}

	async function handleApproveOrder() {
		try {
			await approveOrderFn({ orderId: order.orderId })

			toast.success('Pedido aceito e atualizado para "Em preparo".')
		} catch {
			toast.error('Não foi possível aceitar o pedido. Tente novamente.')
		}
	}

	async function handleDispatchOrder() {
		try {
			await dispatchOrderFn({ orderId: order.orderId })

			toast.success('Pedido atualizado para “Em entrega”.')
		} catch {
			toast.error(
				'Não foi possível atualizar o status do pedido. Tente novamente.',
			)
		}
	}

	async function handleDeliverOrder() {
		try {
			await deliverOrderFn({ orderId: order.orderId })

			toast.success('Pedido finalizado e atualizado para "Entregue".')
		} catch {
			toast.error('Não foi possível finalizar o pedido. Tente novamente.')
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
				{order.status === 'pending' && (
					<Button
						variant="outline"
						size="sm"
						onClick={handleApproveOrder}
						disabled={isApproving}
					>
						<ArrowRightIcon />
						Aprovar
					</Button>
				)}

				{order.status === 'processing' && (
					<Button
						variant="outline"
						size="sm"
						onClick={handleDispatchOrder}
						disabled={isDispatching}
					>
						<ArrowRightIcon />
						Em entrega
					</Button>
				)}

				{order.status === 'delivering' && (
					<Button
						variant="outline"
						size="sm"
						onClick={handleDeliverOrder}
						disabled={isDelivering}
					>
						<ArrowRightIcon />
						Entregue
					</Button>
				)}
			</TableCell>
			<TableCell>
				{['pending', 'processing'].includes(order.status) && (
					<Button
						variant="ghost"
						size="sm"
						disabled={isCancelling}
						onClick={handleCancelOrder}
					>
						<XIcon />
						Cancelar
					</Button>
				)}
			</TableCell>
		</TableRow>
	)
}
