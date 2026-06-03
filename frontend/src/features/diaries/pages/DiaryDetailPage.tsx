import { Alert, Button, Space, Typography } from 'antd'
import { ArrowLeft, Pencil } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { DiaryDetail, DiaryDetailLoading } from '@/features/diaries/components/DiaryDetail'
import { useDiary } from '@/features/diaries/hooks/useDiaries'
import { ApiError } from '@/shared/types/api'

const { Title } = Typography

export function DiaryDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { data, isLoading, error } = useDiary(id)

  if (isLoading) {
    return <DiaryDetailLoading />
  }

  if (error instanceof ApiError) {
    return <Alert type="error" message={error.message} />
  }

  if (!data?.diary) {
    return <Alert type="error" message="Diary not found" />
  }

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Space style={{ justifyContent: 'space-between', width: '100%' }}>
        <Space>
          <Link to="/diaries">
            <Button icon={<ArrowLeft size={16} />}>Back</Button>
          </Link>
          <Title level={3} style={{ margin: 0 }}>
            Diary detail
          </Title>
        </Space>
        <Link to={`/diaries/${id}/edit`}>
          <Button type="primary" icon={<Pencil size={16} />}>
            Edit
          </Button>
        </Link>
      </Space>
      <DiaryDetail diary={data.diary} />
    </Space>
  )
}
