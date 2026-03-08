export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  html_url: string
  name: string | null
  company: string | null
  blog: string | null
  location: string | null
  email: string | null
  bio: string | null
  twitter_username: string | null
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  fork: boolean
  created_at: string
  updated_at: string
  pushed_at: string
  homepage: string | null
  size: number
  stargazers_count: number
  watchers_count: number
  language: string | null
  forks_count: number
  open_issues_count: number
  default_branch: string
  topics: string[]
}

export interface GitHubEvent {
  id: string
  type: string
  created_at: string
  repo: {
    id: number
    name: string
  }
  payload: Record<string, unknown>
}

export interface LanguageStat {
  name: string
  value: number
  percentage: number
  color: string
}

export interface CommitDay {
  date: string
  count: number
  level: number
}

export interface ActivityPoint {
  month: string
  commits: number
  events: number
}

export type SortOption = 'stars' | 'forks' | 'updated' | 'name' | 'size'
export type SortDirection = 'asc' | 'desc'
export type FilterLanguage = string | null

export interface RepoFilters {
  sort: SortOption
  direction: SortDirection
  language: FilterLanguage
  search: string
}
