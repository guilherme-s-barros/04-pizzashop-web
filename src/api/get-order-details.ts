import { api } from '@/lib/axios'

interface GetOrderDetailsParams {
	orderId: string
}

interface Customer {
	name: string
	email: string
	phone: string | null
}

interface Item {
	id: string
	priceInCents: number
	quantity: number
	product: {
		name: string
	}
}

interface GetOrderDetailsResponse {
	id: string
	status: 'pending' | 'canceled' | 'processing' | 'delivering' | 'delivered'
	totalInCents: number
	customer: Customer
	orderItems: Item[]
	createdAt: string
}

export async function getOrderDetails({ orderId }: GetOrderDetailsParams) {
	const response = await api.get<GetOrderDetailsResponse>(`/orders/${orderId}`)

	return response.data
}
