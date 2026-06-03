import { Navigate } from 'react-router-dom'
import { RegisterForm } from '@/features/auth/components/RegisterForm'
import { useAuth } from '@/shared/auth/AuthContext'

export function RegisterPage() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (isAuthenticated) {
    return <Navigate to="/diaries" replace />
  }

  return <RegisterForm />
}
