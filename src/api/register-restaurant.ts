import { api } from '@/lib/axios'

interface RegisterRestaurantBody {
	email: string
	managerName: string
	restaurantName: string
	phone: string
}

export async function registerRestaurant(body: RegisterRestaurantBody) {
	await api.post('/restaurants', body)
}
