import {
	ChevronLeftIcon,
	ChevronRightIcon,
	ChevronsLeftIcon,
	ChevronsRightIcon,
} from 'lucide-react'

import { Button } from './ui/button'

interface PaginationProps {
	pageIndex: number
	totalCount: number
	perPage: number
}

export function Pagination({
	pageIndex,
	perPage,
	totalCount,
}: PaginationProps) {
	const pages = Math.ceil(totalCount / (perPage || 1))

	return (
		<div className="flex items-center justify-between">
			<span className="text-sm text-muted-foreground">
				Total de {totalCount} pedido(s)
			</span>

			<div className="flex items-center gap-6 lg:gap-8">
				<span className="text-sm font-medium">
					Página {pageIndex + 1} de {pages}
				</span>

				<div className="flex items-center gap-2">
					<Button variant="outline" size="icon-sm">
						<ChevronsLeftIcon />
						<span className="sr-only">Ir à primeira página</span>
					</Button>

					<Button variant="outline" size="icon-sm">
						<ChevronLeftIcon />
						<span className="sr-only">Ir à página anterior</span>
					</Button>

					<Button variant="outline" size="icon-sm">
						<ChevronRightIcon />
						<span className="sr-only">Ir à próxima página</span>
					</Button>

					<Button variant="outline" size="icon-sm">
						<ChevronsRightIcon />
						<span className="sr-only">Ir à última página</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
