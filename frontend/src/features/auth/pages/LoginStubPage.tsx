import { Typography } from 'antd'

const { Title, Paragraph } = Typography

export function LoginStubPage() {
  return (
    <div style={{ maxWidth: 480, margin: '48px auto', padding: 24 }}>
      <Title level={3}>Login</Title>
      <Paragraph>Authentication will be available in the next release.</Paragraph>
    </div>
  )
}
