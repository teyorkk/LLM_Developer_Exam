import { Button, DatePicker, Form, Input, Space } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import { Save } from 'lucide-react'
import { useEffect } from 'react'
import type { CreateDiaryRequest, Diary } from '@/features/diaries/types'

type DiaryFormValues = {
  title: string
  content: string
  entryDate?: Dayjs
}

interface DiaryFormProps {
  initialValues?: Diary
  loading?: boolean
  submitLabel?: string
  onSubmit: (values: CreateDiaryRequest) => Promise<void>
}

export function DiaryForm({
  initialValues,
  loading,
  submitLabel = 'Save',
  onSubmit,
}: DiaryFormProps) {
  const [form] = Form.useForm<DiaryFormValues>()

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        title: initialValues.title,
        content: initialValues.content,
        entryDate: dayjs(initialValues.entryDate),
      })
    }
  }, [form, initialValues])

  const handleFinish = async (values: DiaryFormValues) => {
    const payload = {
      title: values.title,
      content: values.content,
      entryDate: values.entryDate?.toISOString(),
    }

    await onSubmit(payload)
  }

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: 'Title is required' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: 'Content is required' }]}
      >
        <Input.TextArea rows={8} />
      </Form.Item>
      <Form.Item label="Entry date" name="entryDate">
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>
      <Form.Item>
        <Space>
          <Button type="primary" htmlType="submit" loading={loading} icon={<Save size={16} />}>
            {submitLabel}
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
}
