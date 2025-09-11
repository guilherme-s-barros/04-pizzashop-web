import { api } from '@/lib/axios'

type DailyRevenueResponse = Array<{
	date: string
	receipt: number
}>

interface GetDailyRevenueInPeriodQuery {
	from?: Date
	to?: Date
}

export async function getDailyRevenueInPeriod({
	from,
	to,
}: GetDailyRevenueInPeriodQuery) {
	const response = await api.get<DailyRevenueResponse>(
		'/metrics/daily-receipt-in-period',
		{
			params: {
				from,
				to,
			},
		},
	)

	return response.data
}
