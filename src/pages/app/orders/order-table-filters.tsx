import { zodResolver } from '@hookform/resolvers/zod'
import { SearchIcon, XIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router'
import z from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

const orderFiltersSchema = z.object({
	orderId: z.string().optional(),
	customerName: z.string().optional(),
	status: z
		.enum([
			'all',
			'pending',
			'canceled',
			'processing',
			'delivering',
			'delivered',
		])
		.default('all')
		.catch('all'),
})

type OrderFiltersSchema = z.infer<typeof orderFiltersSchema>

export function OrderTableFilters() {
	const [searchParams, setSearchParams] = useSearchParams()

	const orderId = searchParams.get('orderId')
	const customerName = searchParams.get('customerName')
	const status = searchParams.get('status')

	const parsedStatus = orderFiltersSchema.shape.status.parse(status)

	const { register, handleSubmit, control, reset } = useForm({
		resolver: zodResolver(orderFiltersSchema),
		defaultValues: {
			orderId: orderId ?? '',
			customerName: customerName ?? '',
			status: parsedStatus,
		},
	})

	function handleFilterOrders({
		orderId,
		customerName,
		status,
	}: OrderFiltersSchema) {
		setSearchParams((params) => {
			if (orderId) {
				params.set('orderId', orderId)
			} else {
				params.delete('orderId')
			}

			if (customerName) {
				params.set('customerName', customerName)
			} else {
				params.delete('customerName')
			}

			if (status) {
				params.set('status', status)
			} else {
				params.delete('status')
			}

			params.set('page', '1')

			return params
		})
	}

	function handleClearFilters() {
		setSearchParams((params) => {
			params.delete('orderId')
			params.delete('customerName')
			params.delete('status')
			params.set('page', '1')

			return params
		})

		reset()
	}

	return (
		<form
			className="flex items-center gap-2"
			onSubmit={handleSubmit(handleFilterOrders)}
		>
			<span className="text-sm font-semibold">Filtros: </span>

			<Input
				{...register('orderId')}
				placeholder="ID do pedido"
				className="h-8 w-auto"
			/>

			<Input
				{...register('customerName')}
				placeholder="Nome do cliente"
				className="h-8 w-[320px]"
			/>

			<Controller
				control={control}
				name="status"
				render={({ field }) => {
					const { onChange, ...props } = field

					return (
						<Select
							{...props}
							defaultValue={field.value}
							onValueChange={onChange}
						>
							<SelectTrigger className="w-[180px]" size="sm">
								<SelectValue />
							</SelectTrigger>

							<SelectContent>
								<SelectItem value="all">Todos os status</SelectItem>
								<SelectItem value="pending">Pendente</SelectItem>
								<SelectItem value="canceled">Cancelado</SelectItem>
								<SelectItem value="processing">Em preparo</SelectItem>
								<SelectItem value="delivering">Em entrega</SelectItem>
								<SelectItem value="delivered">Entregue</SelectItem>
							</SelectContent>
						</Select>
					)
				}}
			/>

			<Button type="submit" size="sm" variant="secondary">
				<SearchIcon />
				Filtrar pedidos
			</Button>

			<Button
				type="button"
				size="sm"
				variant="outline"
				onClick={handleClearFilters}
			>
				<XIcon />
				Remover filtros
			</Button>
		</form>
	)
}
