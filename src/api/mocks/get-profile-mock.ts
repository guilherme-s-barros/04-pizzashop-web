import { HttpResponse, http } from 'msw'

import type { GetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, GetProfileResponse>(
	'/me',
	() => {
		return HttpResponse.json({
			id: crypto.randomUUID(),
			name: 'John Doe',
			email: 'john.doe@example.com',
			role: 'manager',
			phone: '99999999999',
			createdAt: new Date(),
			updatedAt: null,
		})
	},
)
