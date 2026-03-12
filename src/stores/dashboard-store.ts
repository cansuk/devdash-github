import { create } from 'zustand'
import type { RepoFilters } from '../types/github'

interface DashboardState {
  username: string
  filters: RepoFilters
  setUsername: (username: string) => void
  setFilters: (filters: Partial<RepoFilters>) => void
  resetFilters: () => void
}

const defaultFilters: RepoFilters = {
  sort: 'stars',
  direction: 'desc',
  language: null,
  search: '',
}

export const useDashboardStore = create<DashboardState>()((set) => ({
  username: '',
  filters: { ...defaultFilters },
  setUsername: (username) => set({ username, filters: { ...defaultFilters } }),
  setFilters: (partial) => set((state) => ({ filters: { ...state.filters, ...partial } })),
  resetFilters: () => set({ filters: { ...defaultFilters } }),
}))
