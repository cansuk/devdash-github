import { Treemap, ResponsiveContainer, Tooltip } from 'recharts'
import { motion } from 'framer-motion'
import type { GitHubRepo } from '../../types/github'
import { GITHUB_LANGUAGE_COLORS, DEFAULT_LANGUAGE_COLOR } from '../../utils/constants'
import { formatRepoSize } from '../../utils/formatters'
import Card from '../ui/Card'
import Skeleton from '../ui/Skeleton'

interface RepoSizeChartProps {
  repos: GitHubRepo[] | undefined
  isLoading: boolean
}

interface TreemapContentProps {
  x: number
  y: number
  width: number
  height: number
  name: string
  color: string
}

function CustomContent({ x, y, width, height, name, color }: TreemapContentProps) {
  if (width < 40 || height < 25) return null
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill={color} rx={4} opacity={0.85} />
      <text x={x + width / 2} y={y + height / 2} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize={width > 80 ? 11 : 9}>
        {name.length > 12 ? `${name.slice(0, 12)}..` : name}
      </text>
    </g>
  )
}

export default function RepoSizeChart({ repos, isLoading }: RepoSizeChartProps) {
  if (isLoading) return <Card title="Repository Sizes"><Skeleton className="h-64" /></Card>
  if (!repos?.length) return null

  const treemapData = repos
    .filter((r) => r.size > 0)
    .sort((a, b) => b.size - a.size)
    .slice(0, 20)
    .map((r) => ({
      name: r.name,
      size: r.size,
      color: GITHUB_LANGUAGE_COLORS[r.language || ''] || DEFAULT_LANGUAGE_COLOR,
    }))

  return (
    <Card title="Repository Sizes">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
        <ResponsiveContainer width="100%" height={240}>
          <Treemap
            data={treemapData}
            dataKey="size"
            nameKey="name"
            content={<CustomContent x={0} y={0} width={0} height={0} name="" color="" />}
          >
            <Tooltip
              formatter={(value) => [formatRepoSize(value as number)]}
              contentStyle={{
                backgroundColor: 'var(--color-gray-900, #111)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
              }}
            />
          </Treemap>
        </ResponsiveContainer>
      </motion.div>
    </Card>
  )
}
