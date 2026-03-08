import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { motion } from 'framer-motion'
import type { GitHubRepo } from '../../types/github'
import { GITHUB_LANGUAGE_COLORS, DEFAULT_LANGUAGE_COLOR } from '../../utils/constants'
import Card from '../ui/Card'
import Skeleton from '../ui/Skeleton'

interface TopReposChartProps {
  repos: GitHubRepo[] | undefined
  isLoading: boolean
}

export default function TopReposChart({ repos, isLoading }: TopReposChartProps) {
  if (isLoading) return <Card title="Top Repositories"><Skeleton className="h-64" /></Card>
  if (!repos?.length) return null

  const top10 = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 10)
    .map((r) => ({
      name: r.name.length > 15 ? `${r.name.slice(0, 15)}...` : r.name,
      stars: r.stargazers_count,
      color: GITHUB_LANGUAGE_COLORS[r.language || ''] || DEFAULT_LANGUAGE_COLOR,
    }))

  return (
    <Card title="Top Repositories by Stars">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
        <ResponsiveContainer width="100%" height={top10.length * 36 + 20}>
          <BarChart data={top10} layout="vertical" margin={{ left: 0, right: 20 }}>
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-gray-900, #111)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
              }}
              formatter={(value) => [`${value} stars`]}
            />
            <Bar dataKey="stars" radius={[0, 4, 4, 0]} barSize={20}>
              {top10.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </Card>
  )
}
