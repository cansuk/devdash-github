import { motion } from 'framer-motion'
import type { GitHubUser } from '../../types/github'
import { formatDate, formatNumber } from '../../utils/formatters'
import Card from '../ui/Card'
import Skeleton from '../ui/Skeleton'

interface UserProfileProps {
  user: GitHubUser | undefined
  isLoading: boolean
}

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="text-center">
      <div className="text-lg font-bold text-gray-900 dark:text-white">{typeof value === 'number' ? formatNumber(value) : value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{label}</div>
    </div>
  )
}

export default function UserProfile({ user, isLoading }: UserProfileProps) {
  if (isLoading) {
    return (
      <Card>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Skeleton className="h-20 w-20 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-60" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </Card>
    )
  }

  if (!user) return null

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card>
        <div className="flex flex-col items-center gap-5 sm:flex-row">
          <a href={user.html_url} target="_blank" rel="noopener noreferrer">
            <img
              src={user.avatar_url}
              alt={`${user.login}'s avatar`}
              className="h-20 w-20 rounded-full ring-2 ring-gray-200 dark:ring-gray-700"
            />
          </a>
          <div className="flex-1 text-center sm:text-left">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              <a href={user.html_url} target="_blank" rel="noopener noreferrer" className="hover:text-primary-500">
                {user.name || user.login}
              </a>
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">@{user.login}</p>
            {user.bio && <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">{user.bio}</p>}
            <div className="mt-1 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400 justify-center sm:justify-start">
              {user.location && <span>📍 {user.location}</span>}
              {user.company && <span>🏢 {user.company}</span>}
              <span>📅 Joined {formatDate(user.created_at)}</span>
            </div>
          </div>
          <div className="flex gap-6 sm:gap-4">
            <StatItem label="Repos" value={user.public_repos} />
            <StatItem label="Followers" value={user.followers} />
            <StatItem label="Following" value={user.following} />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
