import { Button, Card, Form, Input, Typography } from 'antd'
import { LogIn } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { authApi } from '@/features/auth/api/authApi'
import type { LoginRequest } from '@/features/auth/types'
import { useAuth } from '@/shared/auth/AuthContext'
import { ApiError } from '@/shared/types/api'

const { Title, Text } = Typography

export function LoginForm() {
  const [form] = Form.useForm<LoginRequest>()
  const navigate = useNavigate()
  const { setSession } = useAuth()

  const onFinish = async (values: LoginRequest) => {
    try {
      const response = await authApi.login(values)
      setSession(response.token, response.user)
      navigate('/diaries')
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : 'Login failed'
      form.setFields([{ name: 'password', errors: [message] }])
    }
  }

  return (
    <Card style={{ maxWidth: 420, margin: '48px auto' }}>
      <Title level={3}>Sign in</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
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
          <Input.Password autoComplete="current-password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block icon={<LogIn size={16} />}>
            Sign in
          </Button>
        </Form.Item>
      </Form>
      <Text>
        No account? <Link to="/register">Register</Link>
      </Text>
    </Card>
  )
}
