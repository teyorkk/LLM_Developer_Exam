import { apiClient } from '@/shared/api/client'
import type { ReportQuery, SimpleReportResponse } from '@/features/reports/types'

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
  getSimpleReport: (token: string, query?: ReportQuery) =>
    apiClient.get<SimpleReportResponse>(
      `/reports/simple${buildQueryString(query)}`,
      token,
    ),
}
