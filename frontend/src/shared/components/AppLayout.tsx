import { Layout, Menu, Typography } from 'antd'
import { BookOpen, BarChart3, LogOut } from 'lucide-react'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/shared/auth/AuthContext'

const { Header, Sider, Content } = Layout
const { Text } = Typography

const menuItems = [
  {
    key: '/diaries',
    icon: <BookOpen size={16} />,
    label: <Link to="/diaries">Diaries</Link>,
  },
  {
    key: '/reports',
    icon: <BarChart3 size={16} />,
    label: <Link to="/reports">Reports</Link>,
  },
]

export function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const selectedKey = menuItems.find((item) =>
    location.pathname.startsWith(item.key),
  )?.key

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider breakpoint="lg" collapsedWidth={0}>
        <div style={{ padding: '16px 24px' }}>
          <Text strong style={{ color: '#fff', fontSize: 16 }}>
            Diary App
          </Text>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={selectedKey ? [selectedKey] : []}
          items={[
            ...menuItems,
            {
              key: 'logout',
              icon: <LogOut size={16} />,
              label: 'Logout',
              onClick: () => {
                logout()
                navigate('/login')
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
        >
          <Text>{user?.name ?? user?.email}</Text>
        </Header>
        <Content style={{ margin: 24 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  )
}
