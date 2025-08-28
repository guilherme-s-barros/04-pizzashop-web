import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

export function Orders() {
	return (
		<>
			<Helmet title="Pedidos" />

			<div className="flex flex-col gap-4">
				<h1 className="text-3xl font-bold tracking-tight">Pedidos</h1>
			</div>

			<div className="space-y-2.5">
				<form className="flex items-center gap-2">
					<span className="text-sm font-semibold">Filtros: </span>
					<Input placeholder="Nome do cliente" className="h-8 w-[320px]" />
				</form>

				<div className="border rounded-md">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="w-[64px]"></TableHead>
								<TableHead className="w-[140px]">Identificador</TableHead>
								<TableHead className="w-[180px]">Realizado há</TableHead>
								<TableHead className="w-[140px]">Status</TableHead>
								<TableHead>Cliente</TableHead>
								<TableHead className="w-[140px]">Total do pedido</TableHead>
								<TableHead className="w-[164px]"></TableHead>
								<TableHead className="w-[132px]"></TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{Array.from({ length: 10 }).map(() => {
								return (
									<TableRow key={Date.now()}>
										<TableCell>
											<Button variant="outline" size="icon-sm">
												<SearchIcon className="h-3 w-3" />
												<span className="sr-only">Detalhes do pedido</span>
											</Button>
										</TableCell>
										<TableCell className="font-mono text-xs font-medium">
											neoroifjfjdsl
										</TableCell>
										<TableCell className="text-muted-foreground">
											Há 15 minutos
										</TableCell>
										<TableCell>
											<span className="flex items-center gap-2 font-medium text-muted-foreground order-status-dot-pending">
												Pendente
											</span>
										</TableCell>
										<TableCell className="font-medium">John Doe</TableCell>
										<TableCell className="font-medium">R$ 149,90</TableCell>
										<TableCell>
											<Button variant="outline" size="sm">
												<ArrowRightIcon className="h-3 w-3" />
												Aprovar
											</Button>
										</TableCell>
										<TableCell>
											<Button variant="ghost" size="sm">
												<XIcon className="h-3 w-3" />
												Cancelar
											</Button>
										</TableCell>
									</TableRow>
								)
							})}
						</TableBody>
					</Table>
				</div>
			</div>
		</>
	)
}
