import { BuildingIcon, ChevronDownIcon, LogOutIcon } from 'lucide-react'

import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function AccountMenu() {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" className="group">
					Pizza Shop
					<ChevronDownIcon className="h-4 w-4 transition-transform group-data-[state=open]:rotate-180" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end" className="w-56">
				<DropdownMenuLabel className="flex flex-col">
					<span>João Silva</span>
					<span className="text-xs font-normal text-muted-foreground">
						joao.silva@example.com
					</span>
				</DropdownMenuLabel>

				<DropdownMenuSeparator />

				<DropdownMenuItem>
					<BuildingIcon className="h-4 w-4" />
					<span>Perfil da loja</span>
				</DropdownMenuItem>

				<DropdownMenuItem className="text-destructive">
					<LogOutIcon className="h-4 w-4" />
					<span>Sair</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
