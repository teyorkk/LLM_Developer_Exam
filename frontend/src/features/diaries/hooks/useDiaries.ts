import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { diariesApi } from '@/features/diaries/api/diariesApi'
import type { CreateDiaryRequest, UpdateDiaryRequest } from '@/features/diaries/types'
import { useAuth } from '@/shared/auth/AuthContext'

const DIARIES_KEY = ['diaries'] as const

export function useDiaries() {
  const { token } = useAuth()

  return useQuery({
    queryKey: DIARIES_KEY,
    queryFn: () => diariesApi.list(token!),
    enabled: Boolean(token),
  })
}

export function useDiary(id: string | undefined) {
  const { token } = useAuth()

  return useQuery({
    queryKey: [...DIARIES_KEY, id],
    queryFn: () => diariesApi.get(id!, token!),
    enabled: Boolean(token && id),
  })
}

export function useCreateDiary() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateDiaryRequest) =>
      diariesApi.create(payload, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DIARIES_KEY })
    },
  })
}

export function useUpdateDiary(id: string) {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateDiaryRequest) =>
      diariesApi.update(id, payload, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DIARIES_KEY })
      queryClient.invalidateQueries({ queryKey: [...DIARIES_KEY, id] })
    },
  })
}

export function useDeleteDiary() {
  const { token } = useAuth()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => diariesApi.remove(id, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: DIARIES_KEY })
    },
  })
}
