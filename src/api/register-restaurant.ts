import { api } from '@/lib/axios'

interface RegisterRestaurantBody {
	email: string
	managerName: string
	restaurantName: string
	phone: string
}

export async function registerRestaurant({
	managerName,
	restaurantName,
	email,
	phone,
}: RegisterRestaurantBody) {
	await api.post('/restaurants', {
		managerName,
		restaurantName,
		email,
		phone,
	})
}
