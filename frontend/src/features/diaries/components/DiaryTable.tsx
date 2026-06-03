import { Button, Popconfirm, Space, Table, Typography } from 'antd'
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Diary } from '@/features/diaries/types'

const { Text } = Typography

interface DiaryTableProps {
  diaries: Diary[]
  loading?: boolean
  onDelete: (id: string) => void
  deletingId?: string | null
}

export function DiaryTable({ diaries, loading, onDelete, deletingId }: DiaryTableProps) {
  return (
    <Table
      rowKey="id"
      loading={loading}
      dataSource={diaries}
      pagination={{ pageSize: 10 }}
      columns={[
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: 'Entry date',
          dataIndex: 'entryDate',
          key: 'entryDate',
          render: (value: string) => new Date(value).toLocaleDateString(),
        },
        {
          title: 'Updated',
          dataIndex: 'updatedAt',
          key: 'updatedAt',
          render: (value: string) => new Date(value).toLocaleString(),
        },
        {
          title: 'Actions',
          key: 'actions',
          render: (_, record) => (
            <Space>
              <Link to={`/diaries/${record.id}`}>
                <Button size="small" icon={<Eye size={14} />}>
                  View
                </Button>
              </Link>
              <Link to={`/diaries/${record.id}/edit`}>
                <Button size="small" icon={<Pencil size={14} />}>
                  Edit
                </Button>
              </Link>
              <Popconfirm
                title="Delete this diary entry?"
                description={<Text type="secondary">This action cannot be undone.</Text>}
                okText="Delete"
                cancelText="Cancel"
                onConfirm={() => onDelete(record.id)}
              >
                <Button
                  size="small"
                  danger
                  loading={deletingId === record.id}
                  icon={<Trash2 size={14} />}
                >
                  Delete
                </Button>
              </Popconfirm>
            </Space>
          ),
        },
      ]}
    />
  )
}

export function DiaryListHeader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
      <Typography.Title level={3} style={{ margin: 0 }}>
        Diaries
      </Typography.Title>
      <Link to="/diaries/new">
        <Button type="primary" icon={<Plus size={16} />}>
          New entry
        </Button>
      </Link>
    </div>
  )
}
