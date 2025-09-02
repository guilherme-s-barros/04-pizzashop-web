import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import {
	type GetManagedRestaurantResponse,
	getManagedRestaurant,
} from '@/api/get-managed-restaurant'

export function useManagedRestaurantQuery(
	queryOptions?: UseQueryOptions<GetManagedRestaurantResponse>,
) {
	return useQuery({
		queryKey: ['managed-restaurant'],
		queryFn: getManagedRestaurant,
		refetchOnWindowFocus: false,
		...queryOptions,
	})
}
