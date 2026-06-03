import { Navigate, Route, Routes } from 'react-router-dom'
import { LoginPage } from '@/features/auth/pages/LoginPage'
import { RegisterPage } from '@/features/auth/pages/RegisterPage'
import { DiaryCreatePage } from '@/features/diaries/pages/DiaryCreatePage'
import { DiaryDetailPage } from '@/features/diaries/pages/DiaryDetailPage'
import { DiaryEditPage } from '@/features/diaries/pages/DiaryEditPage'
import { DiaryListPage } from '@/features/diaries/pages/DiaryListPage'
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
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/diaries" element={<DiaryListPage />} />
          <Route path="/diaries/new" element={<DiaryCreatePage />} />
          <Route path="/diaries/:id" element={<DiaryDetailPage />} />
          <Route path="/diaries/:id/edit" element={<DiaryEditPage />} />
          <Route path="/reports" element={<ReportsStubPage />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
