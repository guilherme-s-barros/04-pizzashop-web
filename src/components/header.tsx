import { HomeIcon, PizzaIcon, UtensilsCrossedIcon } from 'lucide-react'

import { NavLink } from './nav-link'
import { Separator } from './ui/separator'

export function Header() {
	return (
		<header className="border-b">
			<div className="flex h-16 items-center gap-6 px-6">
				<PizzaIcon className="h-6 w-6" />
				<Separator orientation="vertical" className="h-6" />

				<nav className="flex items-center space-x-4 lg:space-x-6">
					<NavLink to="/">
						<HomeIcon className="h-4 w-4" />
						Dashboard
					</NavLink>

					<NavLink to="/orders">
						<UtensilsCrossedIcon className="h-4 w-4" />
						Pedidos
					</NavLink>
				</nav>
			</div>
		</header>
	)
}
