import { useQuery } from '@tanstack/react-query'
import { reportsApi } from '@/features/reports/api/reportsApi'
import type { ReportQuery } from '@/features/reports/types'
import { useAuth } from '@/shared/auth/AuthContext'

const REPORT_KEY = ['reports', 'simple'] as const

export function useSimpleReport(query?: ReportQuery) {
  const { token } = useAuth()

  return useQuery({
    queryKey: [...REPORT_KEY, query?.from ?? null, query?.to ?? null],
    queryFn: () => reportsApi.getSimpleReport(token!, query),
    enabled: Boolean(token),
  })
}
