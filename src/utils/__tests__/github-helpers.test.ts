import { describe, it, expect } from 'vitest'
import { buildLanguageStats, getUniqueLanguages } from '../github-helpers'
import type { GitHubRepo } from '../../types/github'

function makeRepo(overrides: Partial<GitHubRepo> = {}): GitHubRepo {
  return {
    id: 1, name: 'test', full_name: 'user/test', html_url: '', description: null,
    fork: false, created_at: '', updated_at: '', pushed_at: '', homepage: null,
    size: 100, stargazers_count: 0, watchers_count: 0, language: null,
    forks_count: 0, open_issues_count: 0, default_branch: 'main', topics: [],
    ...overrides,
  }
}

describe('buildLanguageStats', () => {
  it('returns empty array for repos without languages', () => {
    const repos = [makeRepo()]
    expect(buildLanguageStats(repos)).toEqual([])
  })

  it('calculates language percentages correctly', () => {
    const repos = [
      makeRepo({ language: 'TypeScript', size: 300 }),
      makeRepo({ language: 'TypeScript', size: 200, id: 2 }),
      makeRepo({ language: 'JavaScript', size: 250, id: 3 }),
    ]
    const stats = buildLanguageStats(repos)
    expect(stats).toHaveLength(2)
    expect(stats[0].name).toBe('TypeScript')
    expect(stats[0].percentage).toBeCloseTo(66.7, 0)
    expect(stats[1].name).toBe('JavaScript')
    expect(stats[1].percentage).toBeCloseTo(33.3, 0)
  })

  it('assigns colors from language color map', () => {
    const repos = [makeRepo({ language: 'TypeScript', size: 100 })]
    const stats = buildLanguageStats(repos)
    expect(stats[0].color).toBe('#3178c6')
  })
})

describe('getUniqueLanguages', () => {
  it('returns sorted unique languages', () => {
    const repos = [
      makeRepo({ language: 'Python' }),
      makeRepo({ language: 'Go', id: 2 }),
      makeRepo({ language: 'Python', id: 3 }),
    ]
    expect(getUniqueLanguages(repos)).toEqual(['Go', 'Python'])
  })

  it('excludes null languages', () => {
    const repos = [makeRepo({ language: null })]
    expect(getUniqueLanguages(repos)).toEqual([])
  })
})
