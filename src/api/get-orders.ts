import { api } from '@/lib/axios'

interface Order {
	orderId: string
	customerName: string
	status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
	total: number
	createdAt: string
}

interface Meta {
	pageIndex: number
	perPage: number
	totalCount: number
}

export interface GetOrdersResponse {
	orders: Order[]
	meta: Meta
}

interface GetOrdersQuery {
	pageIndex?: number | null
	orderId?: string | null
	customerName?: string | null
	status?:
		| 'all'
		| 'pending'
		| 'canceled'
		| 'processing'
		| 'delivering'
		| 'delivered'
		| null
}

export async function getOrders({
	pageIndex,
	orderId,
	customerName,
	status,
}: GetOrdersQuery) {
	const response = await api.get<GetOrdersResponse>('/orders', {
		params: {
			pageIndex,
			orderId,
			customerName,
			status,
		},
	})

	return response.data
}
