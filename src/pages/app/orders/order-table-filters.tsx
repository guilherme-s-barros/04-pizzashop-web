import { SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export function OrderTableFilters() {
	return (
		<form className="flex items-center gap-2">
			<span className="text-sm font-semibold">Filtros: </span>
			<Input placeholder="ID do pedido" className="h-8 w-auto" />
			<Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
			<Select defaultValue="all">
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

			<Button type="submit" size="sm" variant="secondary">
				<SearchIcon />
				Filtrar pedidos
			</Button>

			<Button type="reset" size="sm" variant="outline">
				<XIcon />
				Remover filtros
			</Button>
		</form>
	)
}
