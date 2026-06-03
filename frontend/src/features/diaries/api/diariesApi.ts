import type {
  CreateDiaryRequest,
  DeleteDiaryResponse,
  DiariesListResponse,
  DiaryResponse,
  UpdateDiaryRequest,
} from '@/features/diaries/types'

const baseUrl = import.meta.env.VITE_API_BASE_URL ?? ''

async function request<T>(
  path: string,
  token: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  })

  const data = await response.json()

  if (!response.ok) {
    throw new Error(typeof data.message === 'string' ? data.message : 'Request failed')
  }

  return data as T
}

export const diariesApi = {
  list: (token: string) => request<DiariesListResponse>('/diaries', token),

  get: (id: string, token: string) =>
    request<DiaryResponse>(`/diaries/${id}`, token),

  create: (payload: CreateDiaryRequest, token: string) =>
    request<DiaryResponse>('/diaries', token, {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  update: (id: string, payload: UpdateDiaryRequest, token: string) =>
    request<DiaryResponse>(`/diaries/${id}`, token, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  remove: (id: string, token: string) =>
    request<DeleteDiaryResponse>(`/diaries/${id}`, token, { method: 'DELETE' }),
}
