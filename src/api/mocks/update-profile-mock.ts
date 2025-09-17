import { HttpResponse, http } from 'msw'

import type { UpdateProfileBody } from '../update-profile'

export const updateProfileMock = http.put<never, UpdateProfileBody>(
	'/profile',
	async ({ request }) => {
		const { name } = await request.json()

		if (name === 'Pizzza Shop') {
			return new HttpResponse(null, { status: 204 })
		}

		return new HttpResponse(null, { status: 400 })
	},
)
