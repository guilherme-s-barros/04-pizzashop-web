import { HttpResponse, http } from 'msw'

import type { GetManagedRestaurantResponse } from '../get-managed-restaurant'

export const getManagedRestaurantMock = http.get<
	never,
	never,
	GetManagedRestaurantResponse
>('/managed-restaurant', () => {
	return HttpResponse.json({
		id: crypto.randomUUID(),
		name: 'Pizza Shop',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		managerId: crypto.randomUUID(),
		createdAt: new Date(),
		updatedAt: null,
	})
})
