import { Card, Descriptions, Spin, Typography } from 'antd'
import type { Diary } from '@/features/diaries/types'

const { Title, Paragraph } = Typography

interface DiaryDetailProps {
  diary: Diary
}

export function DiaryDetail({ diary }: DiaryDetailProps) {
  return (
    <Card>
      <Title level={3}>{diary.title}</Title>
      <Descriptions column={1} style={{ marginBottom: 16 }}>
        <Descriptions.Item label="Entry date">
          {new Date(diary.entryDate).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Created">
          {new Date(diary.createdAt).toLocaleString()}
        </Descriptions.Item>
        <Descriptions.Item label="Updated">
          {new Date(diary.updatedAt).toLocaleString()}
        </Descriptions.Item>
      </Descriptions>
      <Paragraph style={{ whiteSpace: 'pre-wrap' }}>{diary.content}</Paragraph>
    </Card>
  )
}

export function DiaryDetailLoading() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
      <Spin size="large" />
    </div>
  )
}
