import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { TableCell, TableRow } from '@/components/ui/table'
import { OrderDetails } from './order-details'

export function OrderTableRow() {
	return (
		<TableRow>
			<TableCell>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant="outline" size="icon-sm">
							<SearchIcon />
							<span className="sr-only">Detalhes do pedido</span>
						</Button>
					</DialogTrigger>
					<OrderDetails />
				</Dialog>
			</TableCell>
			<TableCell className="font-mono text-xs font-medium">
				neoroifjfjdsl
			</TableCell>
			<TableCell className="text-muted-foreground">15 minutos atrás</TableCell>
			<TableCell>
				<span className="flex items-center gap-2 font-medium text-muted-foreground order-status-dot-pending">
					Pendente
				</span>
			</TableCell>
			<TableCell className="font-medium">John Doe</TableCell>
			<TableCell className="font-medium">R$ 149,90</TableCell>
			<TableCell>
				<Button variant="outline" size="sm">
					<ArrowRightIcon />
					Aprovar
				</Button>
			</TableCell>
			<TableCell>
				<Button variant="ghost" size="sm">
					<XIcon />
					Cancelar
				</Button>
			</TableCell>
		</TableRow>
	)
}
