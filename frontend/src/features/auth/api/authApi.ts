import type { AuthResponse, LoginRequest, RegisterRequest } from '@/features/auth/types'

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

async function post<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(typeof data.message === 'string' ? data.message : 'Request failed')
  }

  return data as T
}

export const authApi = {
  login: (payload: LoginRequest) => post<AuthResponse>('/auth/login', payload),

  register: (payload: RegisterRequest) =>
    post<AuthResponse>('/auth/register', payload),
}
