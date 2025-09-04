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
	onPageChange(pageIndex: number): Promise<void> | void
}

export function Pagination({
	pageIndex,
	perPage,
	totalCount,
	onPageChange,
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
					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => onPageChange(0)}
						disabled={pageIndex === 0}
					>
						<ChevronsLeftIcon />
						<span className="sr-only">Ir à primeira página</span>
					</Button>

					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => onPageChange(pageIndex - 1)}
						disabled={pageIndex === 0}
					>
						<ChevronLeftIcon />
						<span className="sr-only">Ir à página anterior</span>
					</Button>

					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => onPageChange(pageIndex + 1)}
						disabled={pageIndex >= pages - 1}
					>
						<ChevronRightIcon />
						<span className="sr-only">Ir à próxima página</span>
					</Button>

					<Button
						variant="outline"
						size="icon-sm"
						onClick={() => onPageChange(pages - 1)}
						disabled={pageIndex >= pages - 1}
					>
						<ChevronsRightIcon />
						<span className="sr-only">Ir à última página</span>
					</Button>
				</div>
			</div>
		</div>
	)
}
