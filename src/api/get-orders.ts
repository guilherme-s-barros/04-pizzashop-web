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

interface GetOrdersResponse {
	orders: Order[]
	meta: Meta
}

interface GetOrdersQuery {
	pageIndex?: number | null
}

export async function getOrders({ pageIndex }: GetOrdersQuery) {
	const response = await api.get<GetOrdersResponse>('/orders', {
		params: {
			pageIndex,
		},
	})

	return response.data
}
