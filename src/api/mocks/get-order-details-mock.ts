import { HttpResponse, http } from 'msw'

import type {
	GetOrderDetailsParams,
	GetOrderDetailsResponse,
} from '../get-order-details'

export const getOrderDetailsMock = http.get<
	GetOrderDetailsParams,
	never,
	GetOrderDetailsResponse
>('/orders/:orderId', ({ params }) => {
	return HttpResponse.json({
		id: params.orderId,
		customer: {
			email: 'john.doe@example.com',
			name: 'John Doe',
			phone: null,
		},
		status: 'pending',
		orderItems: [
			{
				id: crypto.randomUUID(),
				product: { name: 'Item 1' },
				priceInCents: 4500,
				quantity: 1,
			},
			{
				id: crypto.randomUUID(),
				product: { name: 'Item 2' },
				priceInCents: 3500,
				quantity: 2,
			},
		],
		createdAt: new Date().toISOString(),
		totalInCents: 11500,
	})
})
