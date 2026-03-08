import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGitHubUser, useGitHubRepos, useLanguageStats, useCommitHeatmap, useActivityTimeline } from '../hooks/use-github-data'
import { useDashboardStore } from '../stores/dashboard-store'
import SearchBar from '../components/features/SearchBar'
import UserProfile from '../components/features/UserProfile'
import StatsGrid from '../components/features/StatsGrid'
import RepoList from '../components/features/RepoList'
import LanguageChart from '../components/charts/LanguageChart'
import CommitHeatmap from '../components/charts/CommitHeatmap'
import TopReposChart from '../components/charts/TopReposChart'
import ActivityChart from '../components/charts/ActivityChart'
import RepoSizeChart from '../components/charts/RepoSizeChart'
import ErrorMessage from '../components/ui/ErrorMessage'

export default function DashboardPage() {
  const { username = '' } = useParams<{ username: string }>()
  const { filters, setFilters } = useDashboardStore()

  const userQuery = useGitHubUser(username)
  const reposQuery = useGitHubRepos(username)
  const languageQuery = useLanguageStats(username)
  const heatmapQuery = useCommitHeatmap(username)
  const activityQuery = useActivityTimeline(username)

  const hasError = userQuery.error

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <SearchBar initialValue={username} />
      </div>

      {hasError && (
        <ErrorMessage
          title={userQuery.error?.message?.includes('not found') ? 'User Not Found' : 'Error'}
          message={userQuery.error?.message || 'Failed to fetch user data'}
          onRetry={() => userQuery.refetch()}
        />
      )}

      {!hasError && (
        <motion.div className="space-y-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <UserProfile user={userQuery.data} isLoading={userQuery.isLoading} />
          <StatsGrid user={userQuery.data} repos={reposQuery.data} />
          <CommitHeatmap data={heatmapQuery.data} isLoading={heatmapQuery.isLoading} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <LanguageChart data={languageQuery.data} isLoading={languageQuery.isLoading} />
            <TopReposChart repos={reposQuery.data} isLoading={reposQuery.isLoading} />
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ActivityChart data={activityQuery.data} isLoading={activityQuery.isLoading} />
            <RepoSizeChart repos={reposQuery.data} isLoading={reposQuery.isLoading} />
          </div>

          <RepoList
            repos={reposQuery.data}
            isLoading={reposQuery.isLoading}
            filters={filters}
            onFilterChange={setFilters}
          />
        </motion.div>
      )}
    </div>
  )
}
