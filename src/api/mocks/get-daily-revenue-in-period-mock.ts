import { HttpResponse, http } from 'msw'

import type { GetDailyRevenueInPeriodResponse } from '../get-daily-revenue-in-period'

export const getDailyRevenueInPeriodMock = http.get<
	never,
	never,
	GetDailyRevenueInPeriodResponse
>('/metrics/daily-receipt-in-period', () => {
	return HttpResponse.json([
		{ date: '01/01/2025', receipt: 22000 },
		{ date: '02/01/2025', receipt: 12000 },
		{ date: '03/01/2025', receipt: 6800 },
		{ date: '04/01/2025', receipt: 25000 },
		{ date: '05/01/2025', receipt: 12500 },
		{ date: '06/01/2025', receipt: 8423 },
		{ date: '07/01/2025', receipt: 26500 },
	])
})
