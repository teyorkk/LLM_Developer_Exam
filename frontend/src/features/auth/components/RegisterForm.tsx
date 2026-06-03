import { Button, Card, Form, Input, Typography } from 'antd'
import { UserPlus } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '@/features/auth/api/authApi'
import type { RegisterRequest } from '@/features/auth/types'
import { useAuth } from '@/shared/auth/AuthContext'
import { ApiError } from '@/shared/types/api'

const { Title, Text } = Typography

export function RegisterForm() {
  const [form] = Form.useForm<RegisterRequest>()
  const navigate = useNavigate()
  const { setSession } = useAuth()

  const onFinish = async (values: RegisterRequest) => {
    try {
      const response = await authApi.register(values)
      setSession(response.token, response.user)
      navigate('/diaries')
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Registration failed'
      form.setFields([{ name: 'email', errors: [message] }])
    }
  }

  return (
    <Card style={{ maxWidth: 420, margin: '48px auto' }}>
      <Title level={3}>Create account</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Name" name="name">
          <Input autoComplete="name" />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Enter a valid email' },
          ]}
        >
          <Input autoComplete="email" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Password is required' }]}
        >
          <Input.Password autoComplete="new-password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block icon={<UserPlus size={16} />}>
            Register
          </Button>
        </Form.Item>
      </Form>
      <Text>
        Already have an account? <Link to="/login">Sign in</Link>
      </Text>
    </Card>
  )
}
