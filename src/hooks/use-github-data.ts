import { useQuery } from '@tanstack/react-query'
import { getUserProfile, getUserRepos, getUserEvents } from '../services/github-api'
import { buildLanguageStats, buildCommitHeatmap, buildActivityTimeline } from '../utils/github-helpers'

const STALE_TIME = 5 * 60 * 1000

export function useGitHubUser(username: string) {
  return useQuery({
    queryKey: ['github-user', username],
    queryFn: () => getUserProfile(username),
    enabled: !!username,
    staleTime: STALE_TIME,
    retry: 1,
  })
}

export function useGitHubRepos(username: string) {
  return useQuery({
    queryKey: ['github-repos', username],
    queryFn: () => getUserRepos(username),
    enabled: !!username,
    staleTime: STALE_TIME,
    retry: 1,
  })
}

export function useGitHubEvents(username: string) {
  return useQuery({
    queryKey: ['github-events', username],
    queryFn: () => getUserEvents(username),
    enabled: !!username,
    staleTime: STALE_TIME,
    retry: 1,
  })
}

export function useLanguageStats(username: string) {
  const { data: repos, ...rest } = useGitHubRepos(username)
  return {
    ...rest,
    data: repos ? buildLanguageStats(repos) : undefined,
  }
}

export function useCommitHeatmap(username: string) {
  const { data: events, ...rest } = useGitHubEvents(username)
  return {
    ...rest,
    data: events ? buildCommitHeatmap(events) : undefined,
  }
}

export function useActivityTimeline(username: string) {
  const { data: events, ...rest } = useGitHubEvents(username)
  return {
    ...rest,
    data: events ? buildActivityTimeline(events) : undefined,
  }
}
