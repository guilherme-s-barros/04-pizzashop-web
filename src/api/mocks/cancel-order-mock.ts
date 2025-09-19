import { HttpResponse, http } from 'msw'

import type { CancelOrderParams } from '../cancel-order'

export const cancelOrderMock = http.patch<CancelOrderParams, never, never>(
	'/orders/:orderId/cancel',
	({ params }) => {
		if (params.orderId === 'error-order-id') {
			return new HttpResponse(null, { status: 400 })
		}

		return new HttpResponse(null, { status: 204 })
	},
)
