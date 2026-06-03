import { apiClient } from '@/shared/api/client'
import type {
  CreateDiaryRequest,
  DeleteDiaryResponse,
  DiariesListResponse,
  DiaryResponse,
  UpdateDiaryRequest,
} from '@/features/diaries/types'

export const diariesApi = {
  list: (token: string) =>
    apiClient.get<DiariesListResponse>('/diaries', token),

  get: (id: string, token: string) =>
    apiClient.get<DiaryResponse>(`/diaries/${id}`, token),

  create: (payload: CreateDiaryRequest, token: string) =>
    apiClient.post<DiaryResponse>('/diaries', payload, token),

  update: (id: string, payload: UpdateDiaryRequest, token: string) =>
    apiClient.put<DiaryResponse>(`/diaries/${id}`, payload, token),

  remove: (id: string, token: string) =>
    apiClient.delete<DeleteDiaryResponse>(`/diaries/${id}`, token),
}
