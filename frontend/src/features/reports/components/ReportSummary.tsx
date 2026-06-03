import { Col, Row, Statistic } from 'antd'
import { BookOpen, FileText, Hash } from 'lucide-react'
import type { ReportSummary as ReportSummaryType } from '@/features/reports/types'

interface ReportSummaryProps {
  summary: ReportSummaryType
}

export function ReportSummary({ summary }: ReportSummaryProps) {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={8}>
        <Statistic
          title="Total diaries"
          value={summary.totalDiaries}
          prefix={<BookOpen size={16} />}
        />
      </Col>
      <Col xs={24} sm={8}>
        <Statistic
          title="Total words"
          value={summary.totalWords}
          prefix={<FileText size={16} />}
        />
      </Col>
      <Col xs={24} sm={8}>
        <Statistic
          title="Average words per diary"
          value={summary.averageWordsPerDiary}
          prefix={<Hash size={16} />}
        />
      </Col>
    </Row>
  )
}
