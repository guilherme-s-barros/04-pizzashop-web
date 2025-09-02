import { type UseQueryOptions, useQuery } from '@tanstack/react-query'

import { type GetProfileResponse, getProfile } from '@/api/get-profile'

export function useProfileQuery(
	queryOptions?: UseQueryOptions<GetProfileResponse>,
) {
	return useQuery({
		queryKey: ['profile'],
		queryFn: getProfile,
		refetchOnWindowFocus: false,
		...queryOptions,
	})
}
