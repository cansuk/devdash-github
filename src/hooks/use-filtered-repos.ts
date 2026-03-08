import { useMemo } from 'react'
import type { GitHubRepo, RepoFilters } from '../types/github'

export function useFilteredRepos(repos: GitHubRepo[] | undefined, filters: RepoFilters) {
  return useMemo(() => {
    if (!repos) return []

    let filtered = [...repos]

    if (filters.search) {
      const query = filters.search.toLowerCase()
      filtered = filtered.filter(
        (r) =>
          r.name.toLowerCase().includes(query) ||
          r.description?.toLowerCase().includes(query),
      )
    }

    if (filters.language) {
      filtered = filtered.filter((r) => r.language === filters.language)
    }

    const sortFns: Record<string, (a: GitHubRepo, b: GitHubRepo) => number> = {
      stars: (a, b) => b.stargazers_count - a.stargazers_count,
      forks: (a, b) => b.forks_count - a.forks_count,
      updated: (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      name: (a, b) => a.name.localeCompare(b.name),
      size: (a, b) => b.size - a.size,
    }

    filtered.sort(sortFns[filters.sort] || sortFns.stars)
    if (filters.direction === 'asc') filtered.reverse()

    return filtered
  }, [repos, filters])
}
