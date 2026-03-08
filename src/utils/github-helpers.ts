import { subDays, format, eachDayOfInterval, startOfDay } from 'date-fns'
import type { GitHubEvent, GitHubRepo, CommitDay, LanguageStat, ActivityPoint } from '../types/github'
import { GITHUB_LANGUAGE_COLORS, DEFAULT_LANGUAGE_COLOR } from './constants'

export function buildLanguageStats(repos: GitHubRepo[]): LanguageStat[] {
  const languageCounts: Record<string, number> = {}
  for (const repo of repos) {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + repo.size
    }
  }

  const total = Object.values(languageCounts).reduce((sum, val) => sum + val, 0)
  if (total === 0) return []

  return Object.entries(languageCounts)
    .map(([name, value]) => ({
      name,
      value,
      percentage: Math.round((value / total) * 1000) / 10,
      color: GITHUB_LANGUAGE_COLORS[name] || DEFAULT_LANGUAGE_COLOR,
    }))
    .sort((a, b) => b.value - a.value)
}

export function buildCommitHeatmap(events: GitHubEvent[]): CommitDay[] {
  const today = startOfDay(new Date())
  const yearAgo = subDays(today, 364)
  const days = eachDayOfInterval({ start: yearAgo, end: today })

  const commitsByDate: Record<string, number> = {}
  for (const event of events) {
    if (event.type === 'PushEvent') {
      const date = format(new Date(event.created_at), 'yyyy-MM-dd')
      const commits = (event.payload as { commits?: unknown[] }).commits?.length || 1
      commitsByDate[date] = (commitsByDate[date] || 0) + commits
    }
  }

  const maxCount = Math.max(1, ...Object.values(commitsByDate))

  return days.map((day) => {
    const date = format(day, 'yyyy-MM-dd')
    const count = commitsByDate[date] || 0
    const level = count === 0 ? 0 : Math.min(4, Math.ceil((count / maxCount) * 4))
    return { date, count, level }
  })
}

export function buildActivityTimeline(events: GitHubEvent[]): ActivityPoint[] {
  const monthlyData: Record<string, { commits: number; events: number }> = {}

  for (const event of events) {
    const month = format(new Date(event.created_at), 'MMM yyyy')
    if (!monthlyData[month]) monthlyData[month] = { commits: 0, events: 0 }
    monthlyData[month].events++
    if (event.type === 'PushEvent') {
      monthlyData[month].commits += (event.payload as { commits?: unknown[] }).commits?.length || 1
    }
  }

  return Object.entries(monthlyData)
    .map(([month, data]) => ({ month, ...data }))
    .reverse()
}

export function getUniqueLanguages(repos: GitHubRepo[]): string[] {
  const languages = new Set<string>()
  for (const repo of repos) {
    if (repo.language) languages.add(repo.language)
  }
  return Array.from(languages).sort()
}
