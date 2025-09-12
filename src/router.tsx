import { createBrowserRouter } from 'react-router'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { NotFound } from './pages/404'
import { Dashboard } from './pages/app/dashboard'
import { Orders } from './pages/app/orders'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { ErrorPage } from './pages/error'

export const router = createBrowserRouter([
	{
		path: '/',
		Component: AppLayout,
		ErrorBoundary: ErrorPage,
		children: [
			{ index: true, Component: Dashboard },
			{ path: '/orders', Component: Orders },
		],
	},
	{
		path: '/',
		Component: AuthLayout,
		children: [
			{ path: 'sign-in', Component: SignIn },
			{ path: 'sign-up', Component: SignUp },
		],
	},
	{
		path: '*',
		Component: NotFound,
	},
])
