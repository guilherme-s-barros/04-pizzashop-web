import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { Pagination } from './pagination'

const onPageChangeCallback = vi.fn()

describe('Pagination', () => {
	beforeEach(() => {
		onPageChangeCallback.mockClear()
	})

	it('should display the right amount of pages and results', () => {
		const wrapper = render(
			<Pagination
				pageIndex={0}
				perPage={10}
				totalCount={200}
				onPageChange={onPageChangeCallback}
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

	it('should be able to navigate to the previous page', async () => {
		const user = userEvent.setup()

		const wrapper = render(
			<Pagination
				pageIndex={5}
				perPage={10}
				totalCount={200}
				onPageChange={onPageChangeCallback}
			/>,
		)

		const previousPageButton = wrapper.getByRole('button', {
			name: 'Ir à página anterior',
		})

		await user.click(previousPageButton)

		expect(onPageChangeCallback).toHaveBeenCalledWith(4)
	})

	it('should be able to navigate to the last page', async () => {
		const user = userEvent.setup()

		const wrapper = render(
			<Pagination
				pageIndex={5}
				perPage={10}
				totalCount={200}
				onPageChange={onPageChangeCallback}
			/>,
		)

		const lastPageButton = wrapper.getByRole('button', {
			name: 'Ir à última página',
		})

		await user.click(lastPageButton)

		expect(onPageChangeCallback).toHaveBeenCalledWith(19)
	})

	it('should be able to navigate to the first page', async () => {
		const user = userEvent.setup()

		const wrapper = render(
			<Pagination
				pageIndex={5}
				perPage={10}
				totalCount={200}
				onPageChange={onPageChangeCallback}
			/>,
		)

		const firstPageButton = wrapper.getByRole('button', {
			name: 'Ir à primeira página',
		})

		await user.click(firstPageButton)

		expect(onPageChangeCallback).toHaveBeenCalledWith(0)
	})
})
