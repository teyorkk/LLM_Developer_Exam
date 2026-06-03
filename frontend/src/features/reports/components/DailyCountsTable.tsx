import { Empty, Table, Typography } from 'antd'
import type { DailyCount } from '@/features/reports/types'

const { Title } = Typography

interface DailyCountsTableProps {
  dailyCounts: DailyCount[]
}

export function DailyCountsTable({ dailyCounts }: DailyCountsTableProps) {
  return (
    <>
      <Title level={4}>Daily counts</Title>
      {dailyCounts.length === 0 ? (
        <Empty description="No entries in this range" />
      ) : (
        <Table
          rowKey="date"
          dataSource={dailyCounts}
          pagination={false}
          columns={[
            {
              title: 'Date',
              dataIndex: 'date',
              key: 'date',
            },
            {
              title: 'Entries',
              dataIndex: 'count',
              key: 'count',
            },
          ]}
        />
      )}
    </>
  )
}
