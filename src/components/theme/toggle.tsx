import { MoonIcon, SunIcon } from 'lucide-react'

import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { type Theme, useTheme } from './provider'

export function ThemeToggle() {
	const { theme, setTheme } = useTheme()

	function handleThemeChange(value: string) {
		setTheme(value as Theme)
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon">
					<SunIcon className="scale-100 rotate-0 transition-all duration-400 dark:scale-0 dark:rotate-90" />
					<MoonIcon className="absolute scale-0 rotate-90 transition-all duration-400 dark:scale-100 dark:rotate-0" />
					<span className="sr-only">Mudar tema</span>
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuRadioGroup value={theme} onValueChange={handleThemeChange}>
					<DropdownMenuRadioItem value="light">Claro</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="dark">Escuro</DropdownMenuRadioItem>
					<DropdownMenuRadioItem value="system">Sistema</DropdownMenuRadioItem>
				</DropdownMenuRadioGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
