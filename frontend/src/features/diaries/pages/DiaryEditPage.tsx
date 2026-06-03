import { Alert, Button, Card, Space, Typography } from 'antd'
import { ArrowLeft } from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { DiaryForm } from '@/features/diaries/components/DiaryForm'
import { useDiary, useUpdateDiary } from '@/features/diaries/hooks/useDiaries'
import { ApiError } from '@/shared/types/api'
import { DiaryDetailLoading } from '@/features/diaries/components/DiaryDetail'

const { Title } = Typography

export function DiaryEditPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data, isLoading, error } = useDiary(id)
  const updateDiary = useUpdateDiary(id!)

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
    <Card>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Space>
          <Link to={`/diaries/${id}`}>
            <Button icon={<ArrowLeft size={16} />}>Back</Button>
          </Link>
          <Title level={3} style={{ margin: 0 }}>
            Edit diary
          </Title>
        </Space>
        {updateDiary.error instanceof ApiError && (
          <Alert type="error" message={updateDiary.error.message} />
        )}
        <DiaryForm
          initialValues={data.diary}
          loading={updateDiary.isPending}
          submitLabel="Update"
          onSubmit={async (values) => {
            await updateDiary.mutateAsync(values)
            navigate(`/diaries/${id}`)
          }}
        />
      </Space>
    </Card>
  )
}
