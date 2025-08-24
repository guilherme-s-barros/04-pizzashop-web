import { createBrowserRouter } from 'react-router'

import { Dashboard } from './pages/app/dashboard'
import { SignIn } from './pages/auth/sign-in'

export const router = createBrowserRouter([
	{ index: true, Component: Dashboard },
	{ path: 'sign-in', Component: SignIn },
])
