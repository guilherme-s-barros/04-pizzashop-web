import { render } from '@testing-library/react'

import { OrderStatus } from './order-status'

describe('Order Status', () => {
	it('should display the right text and badge when order status is pending', () => {
		const wrapper = render(<OrderStatus status="pending" />)
		const statusText = wrapper.getByText('Pendente')

		expect(statusText).toBeVisible()
		expect(statusText).toBeInTheDocument()
		expect(statusText).toHaveClass('order-status-dot-pending')
	})

	it('should display the right text and badge when order status is canceled', () => {
		const wrapper = render(<OrderStatus status="canceled" />)
		const statusText = wrapper.getByText('Cancelado')

		expect(statusText).toBeVisible()
		expect(statusText).toBeInTheDocument()
		expect(statusText).toHaveClass('order-status-dot-canceled')
	})

	it('should display the right text and badge when order status is processing', () => {
		const wrapper = render(<OrderStatus status="processing" />)
		const statusText = wrapper.getByText('Em preparo')

		expect(statusText).toBeVisible()
		expect(statusText).toBeInTheDocument()
		expect(statusText).toHaveClass('order-status-dot-processing')
	})

	it('should display the right text and badge when order status is delivering', () => {
		const wrapper = render(<OrderStatus status="delivering" />)
		const statusText = wrapper.getByText('Em entrega')

		expect(statusText).toBeVisible()
		expect(statusText).toBeInTheDocument()
		expect(statusText).toHaveClass('order-status-dot-delivering')
	})

	it('should display the right text and badge when order status is delivered', () => {
		const wrapper = render(<OrderStatus status="delivered" />)
		const statusText = wrapper.getByText('Entregue')

		expect(statusText).toBeVisible()
		expect(statusText).toBeInTheDocument()
		expect(statusText).toHaveClass('order-status-dot-delivered')
	})
})
