import { motion } from 'framer-motion'
import type { GitHubRepo, RepoFilters } from '../../types/github'
import { getRelativeTime, formatRepoSize } from '../../utils/formatters'
import { getUniqueLanguages } from '../../utils/github-helpers'
import { GITHUB_LANGUAGE_COLORS } from '../../utils/constants'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import Input from '../ui/Input'
import Select from '../ui/Select'
import Skeleton from '../ui/Skeleton'
import EmptyState from '../ui/EmptyState'
import { useFilteredRepos } from '../../hooks/use-filtered-repos'

interface RepoListProps {
  repos: GitHubRepo[] | undefined
  isLoading: boolean
  filters: RepoFilters
  onFilterChange: (filters: Partial<RepoFilters>) => void
}

const sortOptions = [
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Recently Updated' },
  { value: 'name', label: 'Name' },
  { value: 'size', label: 'Size' },
]

function RepoCard({ repo }: { repo: GitHubRepo }) {
  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-lg border border-gray-100 p-4 transition-colors hover:border-primary-200 hover:bg-primary-50/50 dark:border-gray-800 dark:hover:border-primary-800 dark:hover:bg-primary-950/20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start justify-between gap-2">
        <h4 className="font-semibold text-primary-600 dark:text-primary-400">{repo.name}</h4>
        {repo.fork && <Badge>Fork</Badge>}
      </div>
      {repo.description && (
        <p className="mt-1 text-sm text-gray-600 line-clamp-2 dark:text-gray-400">{repo.description}</p>
      )}
      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
        {repo.language && (
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: GITHUB_LANGUAGE_COLORS[repo.language] || '#8b8b8b' }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && <span>⭐ {repo.stargazers_count}</span>}
        {repo.forks_count > 0 && <span>🔱 {repo.forks_count}</span>}
        <span>{formatRepoSize(repo.size)}</span>
        <span>Updated {getRelativeTime(repo.updated_at)}</span>
      </div>
      {repo.topics?.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {repo.topics.slice(0, 5).map((topic) => (
            <Badge key={topic}>{topic}</Badge>
          ))}
        </div>
      )}
    </motion.a>
  )
}

export default function RepoList({ repos, isLoading, filters, onFilterChange }: RepoListProps) {
  const filtered = useFilteredRepos(repos, filters)
  const languages = repos ? getUniqueLanguages(repos) : []

  if (isLoading) {
    return (
      <Card title="Repositories">
        <div className="space-y-3">
          <Skeleton className="h-24" count={3} />
        </div>
      </Card>
    )
  }

  return (
    <Card title={`Repositories (${filtered.length})`}>
      <div className="mb-4 flex flex-wrap gap-2">
        <Input
          placeholder="Filter repos..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          className="max-w-[200px]"
        />
        <Select
          options={sortOptions}
          value={filters.sort}
          onChange={(e) => onFilterChange({ sort: e.target.value as RepoFilters['sort'] })}
          aria-label="Sort by"
        />
        <Select
          options={[{ value: '', label: 'All Languages' }, ...languages.map((l) => ({ value: l, label: l }))]}
          value={filters.language || ''}
          onChange={(e) => onFilterChange({ language: e.target.value || null })}
          aria-label="Filter by language"
        />
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="No repositories found" description="Try adjusting your filters" />
      ) : (
        <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
          {filtered.map((repo) => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      )}
    </Card>
  )
}
