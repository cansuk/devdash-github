import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { format, getDay } from 'date-fns'
import type { CommitDay } from '../../types/github'
import { HEATMAP_COLORS } from '../../utils/constants'
import { useThemeStore } from '../../stores/theme-store'
import Card from '../ui/Card'
import Skeleton from '../ui/Skeleton'

interface CommitHeatmapProps {
  data: CommitDay[] | undefined
  isLoading: boolean
}

export default function CommitHeatmap({ data, isLoading }: CommitHeatmapProps) {
  const isDark = useThemeStore((s) => s.isDark)
  const colors = isDark ? HEATMAP_COLORS.dark : HEATMAP_COLORS.light

  const weeks = useMemo(() => {
    if (!data) return []
    const result: CommitDay[][] = []
    let currentWeek: CommitDay[] = []

    const firstDayOfWeek = getDay(new Date(data[0].date))
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: '', count: 0, level: -1 })
    }

    for (const day of data) {
      currentWeek.push(day)
      if (currentWeek.length === 7) {
        result.push(currentWeek)
        currentWeek = []
      }
    }
    if (currentWeek.length > 0) result.push(currentWeek)
    return result
  }, [data])

  if (isLoading) return <Card title="Contribution Activity"><Skeleton className="h-32" /></Card>
  if (!data?.length) return null

  const totalCommits = data.reduce((sum, d) => sum + d.count, 0)

  return (
    <Card title="Contribution Activity" action={<span className="text-xs text-gray-500">{totalCommits} contributions</span>}>
      <motion.div
        className="overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex gap-[3px]" role="img" aria-label={`${totalCommits} contributions in the last year`}>
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[3px]">
              {week.map((day, di) => (
                <div
                  key={di}
                  className="h-[11px] w-[11px] rounded-sm"
                  style={{ backgroundColor: day.level < 0 ? 'transparent' : colors[day.level] }}
                  title={day.date ? `${format(new Date(day.date), 'MMM d, yyyy')}: ${day.count} contributions` : ''}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="mt-2 flex items-center justify-end gap-1 text-xs text-gray-500">
          <span>Less</span>
          {colors.map((color, i) => (
            <div key={i} className="h-[11px] w-[11px] rounded-sm" style={{ backgroundColor: color }} />
          ))}
          <span>More</span>
        </div>
      </motion.div>
    </Card>
  )
}
