export interface User {
  id: string
  email: string
  name: string | null
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name?: string
}

export interface AuthResponse {
  message: string
  token: string
  user: User
}
