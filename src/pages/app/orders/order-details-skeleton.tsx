import { useId } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'

export function OrderDetailsSkeleton() {
	return (
		<div className="space-y-6">
			<Table>
				<TableBody>
					<TableRow>
						<TableCell className="text-muted-foreground">Status</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-5 w-[92px]" />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-muted-foreground">Cliente</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-5 w-[164px]" />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-muted-foreground">Telefone</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-5 w-[140px]" />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-muted-foreground">E-mail</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-5 w-[200px]" />
						</TableCell>
					</TableRow>
					<TableRow>
						<TableCell className="text-muted-foreground">
							Realizado há
						</TableCell>
						<TableCell className="flex justify-end">
							<Skeleton className="h-5 w-[80px]" />
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>

			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Produto</TableHead>
						<TableHead className="text-right">Qtd.</TableHead>
						<TableHead className="text-right">Preço</TableHead>
						<TableHead className="text-right">Subtotal</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{Array.from<string>({ length: 2 })
						.fill(useId())
						.map((id) => {
							return (
								<TableRow key={id}>
									<TableCell>
										<Skeleton className="h-5 w-[200px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="ml-auto h-5 w-[24px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="ml-auto h-5 w-[48px]" />
									</TableCell>
									<TableCell>
										<Skeleton className="ml-auto h-5 w-[48px]" />
									</TableCell>
								</TableRow>
							)
						})}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total do pedido</TableCell>
						<TableCell>
							<Skeleton className="ml-auto h-5 w-[56px]" />
						</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	)
}
