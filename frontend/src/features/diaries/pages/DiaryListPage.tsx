import { Alert, Card } from 'antd'
import { useState } from 'react'
import { DiaryListHeader, DiaryTable } from '@/features/diaries/components/DiaryTable'
import { useDeleteDiary, useDiaries } from '@/features/diaries/hooks/useDiaries'

export function DiaryListPage() {
  const { data, isLoading, error } = useDiaries()
  const deleteDiary = useDeleteDiary()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteDiary.mutateAsync(id)
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Card>
      <DiaryListHeader />
      {error instanceof Error && (
        <Alert type="error" message={error.message} style={{ marginBottom: 16 }} />
      )}
      <DiaryTable
        diaries={data?.diaries ?? []}
        loading={isLoading}
        onDelete={handleDelete}
        deletingId={deletingId}
      />
    </Card>
  )
}
