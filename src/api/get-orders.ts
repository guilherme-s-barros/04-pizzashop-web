import { api } from '@/lib/axios'

export type Status =
	| 'pending'
	| 'canceled'
	| 'processing'
	| 'delivering'
	| 'delivered'

export interface Order {
	orderId: string
	customerName: string
	status: Status
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
	status?: 'all' | Status | null
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
