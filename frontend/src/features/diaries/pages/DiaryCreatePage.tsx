import { Alert, Card, Typography } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DiaryForm } from '@/features/diaries/components/DiaryForm'
import { useCreateDiary } from '@/features/diaries/hooks/useDiaries'

const { Title } = Typography

export function DiaryCreatePage() {
  const navigate = useNavigate()
  const createDiary = useCreateDiary()

  return (
    <Card>
      <Title level={3}>New diary entry</Title>
      {createDiary.error instanceof Error && (
        <Alert type="error" message={createDiary.error.message} style={{ marginBottom: 16 }} />
      )}
      <DiaryForm
        loading={createDiary.isPending}
        submitLabel="Create"
        onSubmit={async (values) => {
          const response = await createDiary.mutateAsync(values)
          navigate(`/diaries/${response.diary.id}`)
        }}
      />
    </Card>
  )
}
