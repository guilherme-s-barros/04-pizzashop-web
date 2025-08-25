import { createBrowserRouter } from 'react-router'

import { AppLayout } from './pages/_layouts/app'
import { AuthLayout } from './pages/_layouts/auth'
import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'

export const router = createBrowserRouter([
	{
		path: '/',
		Component: AppLayout,
		children: [{ index: true, Component: Dashboard }],
	},
	{
		path: '/auth',
		Component: AuthLayout,
		children: [
			{ path: 'sign-in', Component: SignIn },
			{ path: 'sign-up', Component: SignUp },
		],
	},
])
