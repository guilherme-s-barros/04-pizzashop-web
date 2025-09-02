import { BuildingIcon, ChevronDownIcon, LogOutIcon } from 'lucide-react'

import { useManagedRestaurantQuery } from '@/hooks/use-managed-restaurant-query'
import { useProfileQuery } from '@/hooks/use-profile-query'
import { StoreProfile } from './store-profile'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'

export function AccountMenu() {
	const { data: profile, isLoading: isLoadingProfile } = useProfileQuery()
	const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
		useManagedRestaurantQuery()

	return (
		<Dialog>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="group">
						{isLoadingManagedRestaurant ? (
							<Skeleton className="h-4 w-40" />
						) : (
							managedRestaurant?.name
						)}
						<ChevronDownIcon className="transition-transform group-data-[state=open]:rotate-180" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" className="w-56">
					<DropdownMenuLabel className="flex flex-col">
						{isLoadingProfile ? (
							<div className="space-y-1.5">
								<Skeleton className="h-4 w-24" />
								<Skeleton className="h-3 w-44" />
							</div>
						) : (
							<>
								<span>{profile?.name}</span>
								<span className="text-xs font-normal text-muted-foreground">
									{profile?.email}
								</span>
							</>
						)}
					</DropdownMenuLabel>

					<DropdownMenuSeparator />

					<DialogTrigger asChild>
						<DropdownMenuItem>
							<BuildingIcon />
							<span>Perfil da loja</span>
						</DropdownMenuItem>
					</DialogTrigger>

					<DropdownMenuItem className="text-destructive">
						<LogOutIcon />
						<span>Sair</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>

			<StoreProfile />
		</Dialog>
	)
}
