import { HttpResponse, http } from 'msw'

import type { SignInBody } from '../sign-in'

export const signInMock = http.post<never, SignInBody>(
	'/authenticate',
	async ({ request }) => {
		const { email } = await request.json()

		if (email === 'john.doe@example.com') {
			return new HttpResponse(null, {
				status: 200,
				headers: {
					'Set-Cookie': 'auth=sample-jwt-ey5kl4jlhlfgkljkljkldjls',
				},
			})
		}

		return new HttpResponse(null, { status: 401 })
	},
)
