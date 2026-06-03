export interface ReportFilters {
  from: string | null
  to: string | null
}

export interface ReportSummary {
  totalDiaries: number
  totalWords: number
  averageWordsPerDiary: number
}

export interface DailyCount {
  date: string
  count: number
}

export interface RecentDiary {
  id: string
  title: string
  entryDate: string
  words: number
}

export interface SimpleReport {
  generatedAt: string
  filters: ReportFilters
  summary: ReportSummary
  dailyCounts: DailyCount[]
  recentDiaries: RecentDiary[]
}

export interface SimpleReportResponse {
  report: SimpleReport
}

export interface ReportQuery {
  from?: string
  to?: string
}
