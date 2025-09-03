import { cn } from '@/lib/utils'

type OrderStatus =
	| 'pending'
	| 'canceled'
	| 'processing'
	| 'delivering'
	| 'delivered'

interface OrderStatusProps {
	status: OrderStatus
}

const orderStatusMapper = {
	pending: {
		text: 'Pendente',
		dotColor: 'order-status-dot-pending',
	},
	canceled: {
		text: 'Cancelado',
		dotColor: 'order-status-dot-canceled',
	},
	processing: {
		text: 'Em preparo',
		dotColor: 'order-status-dot-processing',
	},
	delivering: {
		text: 'Em entrega',
		dotColor: 'order-status-dot-delivering',
	},
	delivered: {
		text: 'Entregue',
		dotColor: 'order-status-dot-delivered',
	},
} satisfies Record<OrderStatus, { text: string; dotColor: string }>

export function OrderStatus({ status }: OrderStatusProps) {
	return (
		<span
			className={cn(
				'flex items-center gap-2 font-medium text-muted-foreground',
				orderStatusMapper[status].dotColor,
			)}
		>
			{orderStatusMapper[status].text}
		</span>
	)
}
