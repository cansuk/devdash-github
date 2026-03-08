import { describe, it, expect } from 'vitest'
import { useDashboardStore } from '../dashboard-store'

describe('useDashboardStore', () => {
  it('has default empty username', () => {
    expect(useDashboardStore.getState().username).toBe('')
  })

  it('sets username and resets filters', () => {
    const store = useDashboardStore.getState()
    store.setFilters({ search: 'test' })
    store.setUsername('octocat')

    const state = useDashboardStore.getState()
    expect(state.username).toBe('octocat')
    expect(state.filters.search).toBe('')
  })

  it('updates filters partially', () => {
    useDashboardStore.getState().setFilters({ sort: 'forks', search: 'api' })
    const { filters } = useDashboardStore.getState()
    expect(filters.sort).toBe('forks')
    expect(filters.search).toBe('api')
    expect(filters.direction).toBe('desc')
  })

  it('resets filters to defaults', () => {
    useDashboardStore.getState().setFilters({ sort: 'name', search: 'test' })
    useDashboardStore.getState().resetFilters()
    const { filters } = useDashboardStore.getState()
    expect(filters.sort).toBe('stars')
    expect(filters.search).toBe('')
  })
})
