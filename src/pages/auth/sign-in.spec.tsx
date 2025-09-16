import { QueryClientProvider } from '@tanstack/react-query'
import { render } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import { MemoryRouter } from 'react-router'

import { queryClient } from '@/lib/react-query'
import { SignIn } from './sign-in'

describe('SignIn', () => {
	it('should set default email input value if email is present on search params', () => {
		const wrapper = render(<SignIn />, {
			wrapper({ children }) {
				return (
					<HelmetProvider>
						<QueryClientProvider client={queryClient}>
							<MemoryRouter
								initialEntries={['/sign-in?email=john.doe@example.com']}
							>
								{children}
							</MemoryRouter>
						</QueryClientProvider>
					</HelmetProvider>
				)
			},
		})

		const emailInput = wrapper.getByLabelText('Seu e-mail') as HTMLInputElement

		expect(emailInput.value).toEqual('john.doe@example.com')
	})
})
