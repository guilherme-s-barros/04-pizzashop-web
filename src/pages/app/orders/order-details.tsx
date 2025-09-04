import { useQuery } from '@tanstack/react-query'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

import { getOrderDetails } from '@/api/get-order-details'
import {
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { OrderStatus } from './order-status'

interface OrderDetailsProps {
	orderId: string
	open: boolean
}

export function OrderDetails({ orderId, open }: OrderDetailsProps) {
	const { data: order } = useQuery({
		queryKey: ['order_details', orderId],
		queryFn: () => getOrderDetails({ orderId }),
		enabled: open,
		staleTime: 1000 * 60, // 1 minutes
	})

	const currencyFormatter = new Intl.NumberFormat('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	})

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Detalhes do pedido</DialogTitle>
				<DialogDescription>Identificador: {orderId}</DialogDescription>
			</DialogHeader>

			{order && (
				<div className="space-y-6">
					<Table>
						<TableBody>
							<TableRow>
								<TableCell className="text-muted-foreground">Status</TableCell>
								<TableCell className="flex justify-end">
									<OrderStatus status={order.status} />
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">Cliente</TableCell>
								<TableCell className="flex justify-end">
									{order.customer.name}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">
									Telefone
								</TableCell>
								<TableCell className="flex justify-end">
									{order.customer.phone ?? 'Não informado'}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">E-mail</TableCell>
								<TableCell className="flex justify-end">
									{order.customer.email}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell className="text-muted-foreground">
									Realizado há
								</TableCell>
								<TableCell className="flex justify-end">
									{formatDistanceToNow(order.createdAt, {
										addSuffix: true,
										locale: ptBR,
									})}
								</TableCell>
							</TableRow>
						</TableBody>
					</Table>

					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Produto</TableHead>
								<TableHead className="text-right">Qtd.</TableHead>
								<TableHead className="text-right">Preço</TableHead>
								<TableHead className="text-right">Subtotal</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{order.orderItems.map((item) => {
								return (
									<TableRow key={item.id}>
										<TableCell>{item.product.name}</TableCell>
										<TableCell className="text-right">
											{item.quantity}
										</TableCell>
										<TableCell className="text-right">
											{currencyFormatter.format(item.priceInCents / 100)}
										</TableCell>
										<TableCell className="text-right">
											{currencyFormatter.format(
												(item.priceInCents / 100) * item.quantity,
											)}
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
						<TableFooter>
							<TableRow>
								<TableCell colSpan={3}>Total do pedido</TableCell>
								<TableCell className="text-right">
									{currencyFormatter.format(order.totalInCents / 100)}
								</TableCell>
							</TableRow>
						</TableFooter>
					</Table>
				</div>
			)}
		</DialogContent>
	)
}
