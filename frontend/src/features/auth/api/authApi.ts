import { apiClient } from '@/shared/api/client'
import type { AuthResponse, LoginRequest, RegisterRequest } from '@/features/auth/types'

export const authApi = {
  login: (payload: LoginRequest) =>
    apiClient.post<AuthResponse>('/auth/login', payload),

  register: (payload: RegisterRequest) =>
    apiClient.post<AuthResponse>('/auth/register', payload),
}
