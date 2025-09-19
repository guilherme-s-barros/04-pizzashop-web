import { HttpResponse, http } from 'msw'

import type { GetOrdersResponse, Order, Status } from '../get-orders'

const statuses: Status[] = [
	'pending',
	'canceled',
	'processing',
	'delivering',
	'delivered',
]

const orders: Order[] = Array.from({ length: 60 }, () => {
	return {
		orderId: crypto.randomUUID(),
		customerName: `Customer-${crypto.randomUUID()}`,
		status: statuses[Math.floor(Math.random() * statuses.length)],
		total: Math.floor(Math.random() * 25000),
		createdAt: new Date().toISOString(),
	}
})

export const getOrdersMock = http.get<never, never, GetOrdersResponse>(
	'/orders',
	({ request }) => {
		const { searchParams } = new URL(request.url)

		const pageIndex = searchParams.get('pageIndex')
			? Number(searchParams.get('pageIndex'))
			: 0

		const orderId = searchParams.get('orderId')
		const customerName = searchParams.get('customerName')
		const status = searchParams.get('status')

		const perPage = 10
		const totalCount = orders.length

		let filteredOrders = Array.from(orders)

		if (orderId) {
			filteredOrders = filteredOrders.filter((order) =>
				order.orderId.includes(orderId),
			)
		}

		if (customerName) {
			filteredOrders = filteredOrders.filter((order) =>
				order.customerName.includes(customerName),
			)
		}

		if (status) {
			filteredOrders = filteredOrders.filter((order) => order.status === status)
		}

		const paginatedOrders = filteredOrders.slice(
			pageIndex * perPage,
			pageIndex * perPage + perPage,
		)

		return HttpResponse.json({
			orders: paginatedOrders,
			meta: {
				pageIndex,
				perPage,
				totalCount,
			},
		})
	},
)
