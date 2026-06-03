import type { ReportQuery, SimpleReportResponse } from '@/features/reports/types'

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

function buildQueryString(query?: ReportQuery) {
  if (!query?.from && !query?.to) {
    return ''
  }

  const params = new URLSearchParams()

  if (query.from) {
    params.set('from', query.from)
  }

  if (query.to) {
    params.set('to', query.to)
  }

  return `?${params.toString()}`
}

export const reportsApi = {
  getSimpleReport: async (token: string, query?: ReportQuery) => {
    const response = await fetch(
      `${baseUrl}/reports/simple${buildQueryString(query)}`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const data = await response.json()

    if (!response.ok) {
      throw new Error(typeof data.message === 'string' ? data.message : 'Request failed')
    }

    return data as SimpleReportResponse
  },
}
