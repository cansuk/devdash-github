import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import type { LanguageStat } from '../../types/github'
import Card from '../ui/Card'
import Skeleton from '../ui/Skeleton'

interface LanguageChartProps {
  data: LanguageStat[] | undefined
  isLoading: boolean
}

export default function LanguageChart({ data, isLoading }: LanguageChartProps) {
  if (isLoading) return <Card title="Languages"><Skeleton className="h-64" /></Card>
  if (!data?.length) return null

  const top8 = data.slice(0, 8)

  return (
    <Card title="Languages">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie
              data={top8}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
              nameKey="name"
              aria-label="Language distribution chart"
            >
              {top8.map((entry) => (
                <Cell key={entry.name} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              formatter={(_, name, props) => [`${props.payload.percentage}%`, name]}
              contentStyle={{
                backgroundColor: 'var(--color-gray-900, #111)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="mt-2 flex flex-wrap gap-2 justify-center">
          {top8.map((lang) => (
            <div key={lang.name} className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-gray-400">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: lang.color }} />
              {lang.name} ({lang.percentage}%)
            </div>
          ))}
        </div>
      </motion.div>
    </Card>
  )
}
