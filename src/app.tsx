import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router'

import { router } from './router'
import './index.css'

import { ThemeProvider } from './components/theme/provider'
import { Toaster } from './components/ui/sonner'

export function App() {
	return (
		<HelmetProvider>
			<Helmet titleTemplate="%s | pizza.shop" />

			<ThemeProvider storageKey="pizza-shop-theme">
				<RouterProvider router={router} />
				<Toaster richColors />
			</ThemeProvider>
		</HelmetProvider>
	)
}
