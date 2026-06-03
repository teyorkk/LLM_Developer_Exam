import { Empty, Table, Typography } from 'antd'
import { Link } from 'react-router-dom'
import type { RecentDiary } from '@/features/reports/types'

const { Title } = Typography

interface RecentDiariesTableProps {
  recentDiaries: RecentDiary[]
}

export function RecentDiariesTable({ recentDiaries }: RecentDiariesTableProps) {
  return (
    <>
      <Title level={4}>Recent diaries</Title>
      {recentDiaries.length === 0 ? (
        <Empty description="No recent entries" />
      ) : (
        <Table
          rowKey="id"
          dataSource={recentDiaries}
          pagination={false}
          columns={[
            {
              title: 'Title',
              dataIndex: 'title',
              key: 'title',
              render: (title: string, record) => (
                <Link to={`/diaries/${record.id}`}>{title}</Link>
              ),
            },
            {
              title: 'Entry date',
              dataIndex: 'entryDate',
              key: 'entryDate',
              render: (value: string) => new Date(value).toLocaleDateString(),
            },
            {
              title: 'Words',
              dataIndex: 'words',
              key: 'words',
            },
          ]}
        />
      )}
    </>
  )
}
