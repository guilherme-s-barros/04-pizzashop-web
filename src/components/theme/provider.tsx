import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark' | 'system'

interface ThemeProviderProps {
	children: React.ReactNode
	defaultTheme?: Theme
	storageKey?: string
}

interface ThemeState {
	theme: Theme
	setTheme(theme: Theme): void
}

export const ThemeContext = createContext({} as ThemeState)

export function ThemeProvider({
	children,
	defaultTheme = 'system',
	storageKey = 'vite-ui-theme',
}: ThemeProviderProps) {
	const [theme, setTheme] = useState<Theme>(
		() => (localStorage.getItem(storageKey) as Theme) || defaultTheme,
	)

	const value: ThemeState = {
		theme,
		setTheme: (theme: Theme) => {
			localStorage.setItem(storageKey, theme)
			setTheme(theme)
		},
	}

	useEffect(() => {
		const root = document.documentElement

		root.classList.remove('dark', 'light')

		if (theme === 'system') {
			const systemTheme = matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'

			root.classList.add(systemTheme)
			return
		}

		root.classList.add(theme)
	}, [theme])

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
	const context = useContext(ThemeContext)

	if (!context) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}

	return context
}
