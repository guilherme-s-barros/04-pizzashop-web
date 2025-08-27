import { NavLink as Link, type LinkProps } from 'react-router'

import { cn } from '@/lib/utils'

interface NavLinkProps extends LinkProps {}

export function NavLink(props: NavLinkProps) {
	return (
		<Link
			{...props}
			className={({ isActive }) =>
				cn(
					'flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground',
					{
						'text-foreground': isActive,
					},
				)
			}
		/>
	)
}
