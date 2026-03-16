import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'
import type { ActivityPoint } from '../../types/github'
import Card from '../ui/Card'
import Skeleton from '../ui/Skeleton'

interface ActivityChartProps {
  data: ActivityPoint[] | undefined
  isLoading: boolean
}

export default function ActivityChart({ data, isLoading }: ActivityChartProps) {
  if (isLoading) return <Card title="Activity Timeline"><Skeleton className="h-64" /></Card>
  if (!data?.length) return null

  return (
    <Card title="Activity Timeline">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
        <ResponsiveContainer width="100%" height={240}>
          <AreaChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
            <defs>
              <linearGradient id="commitGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="eventGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} width={30} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-gray-900, #111)',
                border: 'none',
                borderRadius: '8px',
                color: '#fff',
                fontSize: '13px',
              }}
            />
            <Area type="monotone" dataKey="commits" stroke="#3b82f6" fill="url(#commitGradient)" strokeWidth={2} />
            <Area type="monotone" dataKey="events" stroke="#10b981" fill="url(#eventGradient)" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </Card>
  )
}
