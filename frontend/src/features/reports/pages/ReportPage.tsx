import { Alert, Card, Space, Spin, Typography } from 'antd'
import { useState } from 'react'
import { DailyCountsTable } from '@/features/reports/components/DailyCountsTable'
import { DateRangeFilter } from '@/features/reports/components/DateRangeFilter'
import { RecentDiariesTable } from '@/features/reports/components/RecentDiariesTable'
import { ReportSummary } from '@/features/reports/components/ReportSummary'
import { useSimpleReport } from '@/features/reports/hooks/useReport'
import { ApiError } from '@/shared/types/api'

const { Title, Text } = Typography

export function ReportPage() {
  const [from, setFrom] = useState<string | undefined>()
  const [to, setTo] = useState<string | undefined>()
  const { data, isLoading, error } = useSimpleReport({ from, to })

  const handleDateChange = (nextFrom?: string, nextTo?: string) => {
    setFrom(nextFrom)
    setTo(nextTo)
  }

  return (
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={3} style={{ margin: 0 }}>
          Writing report
        </Title>

        <DateRangeFilter from={from} to={to} onChange={handleDateChange} />

        {error instanceof ApiError && <Alert type="error" message={error.message} />}

        {isLoading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
            <Spin size="large" />
          </div>
        ) : (
          data?.report && (
            <>
              <Text type="secondary">
                Generated at {new Date(data.report.generatedAt).toLocaleString()}
              </Text>
              <ReportSummary summary={data.report.summary} />
              <DailyCountsTable dailyCounts={data.report.dailyCounts} />
              <RecentDiariesTable recentDiaries={data.report.recentDiaries} />
            </>
          )
        )}
      </Space>
    </Card>
  )
}
