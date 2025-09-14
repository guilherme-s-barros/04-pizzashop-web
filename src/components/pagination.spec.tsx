import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Pagination } from './pagination'

describe('Pagination', () => {
	it('should display the right amount of pages and results', () => {
		const wrapper = render(
			<Pagination
				pageIndex={0}
				perPage={10}
				totalCount={200}
				onPageChange={() => {}}
			/>,
		)

		const pagesCount = wrapper.getByText('Página 1 de 20')
		const ordersCount = wrapper.getByText('Total de 200 pedido(s)')

		expect(pagesCount).toBeInTheDocument()
		expect(pagesCount).toBeVisible()

		expect(ordersCount).toBeInTheDocument()
		expect(ordersCount).toBeVisible()
	})

	it('should be able to navigate to the next page', async () => {
		const user = userEvent.setup()
		const onPageChangeCallback = vi.fn()

		const wrapper = render(
			<Pagination
				pageIndex={0}
				perPage={10}
				totalCount={200}
				onPageChange={onPageChangeCallback}
			/>,
		)

		const nextPageButton = wrapper.getByRole('button', {
			name: 'Ir à próxima página',
		})

		await user.click(nextPageButton)

		expect(onPageChangeCallback).toHaveBeenCalledWith(1)
	})
})
