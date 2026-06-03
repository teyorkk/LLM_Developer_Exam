import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginStubPage } from '@/features/auth/pages/LoginStubPage'
import { DiariesStubPage } from '@/features/diaries/pages/DiariesStubPage'
import { ReportsStubPage } from '@/features/reports/pages/ReportsStubPage'
import { useAuth } from '@/shared/auth/AuthContext'
import { AppLayout } from '@/shared/components/AppLayout'
import { ProtectedRoute } from '@/shared/components/ProtectedRoute'

function RootRedirect() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  return <Navigate to={isAuthenticated ? '/diaries' : '/login'} replace />
}

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RootRedirect />} />
      <Route path="/login" element={<LoginStubPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/diaries" element={<DiariesStubPage />} />
          <Route path="/reports" element={<ReportsStubPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
