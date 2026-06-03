import { DatePicker, Space, Typography } from 'antd'
import dayjs, { type Dayjs } from 'dayjs'
import { Filter } from 'lucide-react'

const { RangePicker } = DatePicker
const { Text } = Typography

interface DateRangeFilterProps {
  from?: string
  to?: string
  onChange: (from?: string, to?: string) => void
}

export function DateRangeFilter({ from, to, onChange }: DateRangeFilterProps) {
  const value: [Dayjs, Dayjs] | null =
    from && to ? [dayjs(from), dayjs(to)] : null

  return (
    <Space direction="vertical" size={4}>
      <Space>
        <Filter size={16} />
        <Text strong>Date range</Text>
      </Space>
      <RangePicker
        value={value}
        onChange={(dates) => {
          if (!dates || !dates[0] || !dates[1]) {
            onChange(undefined, undefined)
            return
          }

          onChange(dates[0].startOf('day').toISOString(), dates[1].endOf('day').toISOString())
        }}
        allowClear
      />
    </Space>
  )
}
