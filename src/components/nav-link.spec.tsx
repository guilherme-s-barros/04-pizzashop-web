import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router'

import { NavLink } from './nav-link'

describe('NavLink', () => {
	it('should highlight the nav link based on current page', () => {
		const { getByText } = render(
			<>
				<NavLink to="/">Home</NavLink>
				<NavLink to="/about">About</NavLink>
			</>,
			{
				wrapper({ children }) {
					return (
						<MemoryRouter initialEntries={['/about']}>{children}</MemoryRouter>
					)
				},
			},
		)

		expect(getByText('About')).toHaveAttribute('aria-current', 'page')
		expect(getByText('About')).toHaveClass('text-foreground')

		expect(getByText('Home')).not.toHaveAttribute('aria-current', 'page')
		expect(getByText('Home')).not.toHaveClass('text-foreground')
		expect(getByText('Home')).toHaveClass('text-muted-foreground')
	})
})
