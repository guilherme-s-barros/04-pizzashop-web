import { ArrowRightIcon, SearchIcon, XIcon } from 'lucide-react'
import { useId } from 'react'

import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { TableCell, TableRow } from '@/components/ui/table'

export function OrderTableSkeleton() {
	return Array.from<string>({ length: 10 })
		.fill(useId())
		.map((id) => {
			return (
				<TableRow key={id}>
					<TableCell>
						<Button disabled variant="outline" size="icon-sm">
							<SearchIcon />
							<span className="sr-only">Detalhes do pedido</span>
						</Button>
					</TableCell>
					<TableCell>
						<Skeleton className="h-4 w-[172px]" />
					</TableCell>
					<TableCell>
						<Skeleton className="h-4 w-[80px]" />
					</TableCell>
					<TableCell>
						<Skeleton className="h-4 w-[110px]" />
					</TableCell>
					<TableCell>
						<Skeleton className="h-4 w-[200px]" />
					</TableCell>
					<TableCell>
						<Skeleton className="h-4 w-[64px]" />
					</TableCell>
					<TableCell>
						<Skeleton className="h-4 w-[92px]" />
					</TableCell>
					<TableCell>
						<Skeleton className="h-4 w-[92px]" />
					</TableCell>
				</TableRow>
			)
		})
}

// <div>
// 	<Skeleton className="h-4 w-[80px]" />
// </div>
