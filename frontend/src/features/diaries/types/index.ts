export interface Diary {
  id: string
  title: string
  content: string
  entryDate: string
  createdAt: string
  updatedAt: string
  userId: string
}

export interface CreateDiaryRequest {
  title: string
  content: string
  entryDate?: string
}

export interface UpdateDiaryRequest {
  title?: string
  content?: string
  entryDate?: string
}

export interface DiariesListResponse {
  diaries: Diary[]
}

export interface DiaryResponse {
  diary: Diary
  message?: string
}

export interface DeleteDiaryResponse {
  message: string
}
