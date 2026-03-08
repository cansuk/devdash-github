import { GITHUB_API_BASE } from '../utils/constants'
import type { GitHubUser, GitHubRepo, GitHubEvent } from '../types/github'

class GitHubApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
    this.name = 'GitHubApiError'
  }
}

async function fetchGitHub<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${GITHUB_API_BASE}${endpoint}`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  })

  if (!response.ok) {
    if (response.status === 404) throw new GitHubApiError(404, 'User not found')
    if (response.status === 403) throw new GitHubApiError(403, 'API rate limit exceeded. Please try again later.')
    throw new GitHubApiError(response.status, `GitHub API error: ${response.statusText}`)
  }

  return response.json()
}

export async function getUserProfile(username: string): Promise<GitHubUser> {
  return fetchGitHub<GitHubUser>(`/users/${username}`)
}

export async function getUserRepos(username: string): Promise<GitHubRepo[]> {
  const allRepos: GitHubRepo[] = []
  let page = 1
  const perPage = 100

  while (true) {
    const repos = await fetchGitHub<GitHubRepo[]>(
      `/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated`,
    )
    allRepos.push(...repos)
    if (repos.length < perPage) break
    page++
  }

  return allRepos
}

export async function getUserEvents(username: string): Promise<GitHubEvent[]> {
  const pages = [1, 2, 3]
  const results = await Promise.all(
    pages.map((page) =>
      fetchGitHub<GitHubEvent[]>(`/users/${username}/events/public?per_page=100&page=${page}`).catch(() => []),
    ),
  )
  return results.flat()
}

export { GitHubApiError }
