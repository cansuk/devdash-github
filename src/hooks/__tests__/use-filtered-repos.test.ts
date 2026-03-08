import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useFilteredRepos } from '../use-filtered-repos'
import type { GitHubRepo, RepoFilters } from '../../types/github'

function makeRepo(overrides: Partial<GitHubRepo>): GitHubRepo {
  return {
    id: 1, name: 'test', full_name: 'user/test', html_url: '', description: null,
    fork: false, created_at: '', updated_at: '2024-01-01T00:00:00Z', pushed_at: '',
    homepage: null, size: 100, stargazers_count: 0, watchers_count: 0, language: null,
    forks_count: 0, open_issues_count: 0, default_branch: 'main', topics: [],
    ...overrides,
  }
}

const defaultFilters: RepoFilters = { sort: 'stars', direction: 'desc', language: null, search: '' }

describe('useFilteredRepos', () => {
  it('returns empty array for undefined repos', () => {
    const { result } = renderHook(() => useFilteredRepos(undefined, defaultFilters))
    expect(result.current).toEqual([])
  })

  it('filters by search term', () => {
    const repos = [
      makeRepo({ id: 1, name: 'react-app' }),
      makeRepo({ id: 2, name: 'vue-app' }),
    ]
    const { result } = renderHook(() => useFilteredRepos(repos, { ...defaultFilters, search: 'react' }))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].name).toBe('react-app')
  })

  it('filters by language', () => {
    const repos = [
      makeRepo({ id: 1, name: 'a', language: 'TypeScript' }),
      makeRepo({ id: 2, name: 'b', language: 'Python' }),
    ]
    const { result } = renderHook(() => useFilteredRepos(repos, { ...defaultFilters, language: 'TypeScript' }))
    expect(result.current).toHaveLength(1)
    expect(result.current[0].language).toBe('TypeScript')
  })

  it('sorts by stars descending by default', () => {
    const repos = [
      makeRepo({ id: 1, name: 'low', stargazers_count: 5 }),
      makeRepo({ id: 2, name: 'high', stargazers_count: 100 }),
    ]
    const { result } = renderHook(() => useFilteredRepos(repos, defaultFilters))
    expect(result.current[0].name).toBe('high')
  })

  it('reverses order when direction is asc', () => {
    const repos = [
      makeRepo({ id: 1, name: 'low', stargazers_count: 5 }),
      makeRepo({ id: 2, name: 'high', stargazers_count: 100 }),
    ]
    const { result } = renderHook(() => useFilteredRepos(repos, { ...defaultFilters, direction: 'asc' }))
    expect(result.current[0].name).toBe('low')
  })
})
