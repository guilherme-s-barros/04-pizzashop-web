import { HttpResponse, http } from 'msw'

import type { GetPopularProductsResponse } from '../get-popular-products'

export const getPopularProductsMock = http.get<
	never,
	never,
	GetPopularProductsResponse
>('/metrics/popular-products', () => {
	return HttpResponse.json([
		{ product: 'Pizza Margherita', amount: 125 },
		{ product: 'Hambúrguer Clássico', amount: 98 },
		{ product: 'Sanduíche de Frango', amount: 75 },
		{ product: 'Batata Frita Grande', amount: 62 },
		{ product: 'Coca-Cola 350ml', amount: 45 },
	])
})
