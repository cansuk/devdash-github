import { describe, it, expect } from 'vitest'
import { formatNumber, formatDate, formatRepoSize, getRelativeTime } from '../formatters'

describe('formatNumber', () => {
  it('returns plain number for values under 1000', () => {
    expect(formatNumber(42)).toBe('42')
    expect(formatNumber(0)).toBe('0')
    expect(formatNumber(999)).toBe('999')
  })

  it('formats thousands with K suffix', () => {
    expect(formatNumber(1000)).toBe('1.0K')
    expect(formatNumber(1500)).toBe('1.5K')
    expect(formatNumber(45_200)).toBe('45.2K')
  })

  it('formats millions with M suffix', () => {
    expect(formatNumber(1_000_000)).toBe('1.0M')
    expect(formatNumber(2_500_000)).toBe('2.5M')
  })
})

describe('formatDate', () => {
  it('formats ISO date string to readable format', () => {
    const result = formatDate('2023-06-15T10:00:00Z')
    expect(result).toContain('Jun')
    expect(result).toContain('15')
    expect(result).toContain('2023')
  })
})

describe('formatRepoSize', () => {
  it('formats KB values', () => {
    expect(formatRepoSize(500)).toBe('500 KB')
  })

  it('formats MB values', () => {
    expect(formatRepoSize(2500)).toBe('2.5 MB')
  })

  it('formats GB values', () => {
    expect(formatRepoSize(1_500_000)).toBe('1.5 GB')
  })
})

describe('getRelativeTime', () => {
  it('returns "today" for current date', () => {
    expect(getRelativeTime(new Date().toISOString())).toBe('today')
  })

  it('returns "yesterday" for yesterday', () => {
    const yesterday = new Date(Date.now() - 86_400_000).toISOString()
    expect(getRelativeTime(yesterday)).toBe('yesterday')
  })

  it('returns days ago for recent dates', () => {
    const fiveDaysAgo = new Date(Date.now() - 5 * 86_400_000).toISOString()
    expect(getRelativeTime(fiveDaysAgo)).toBe('5 days ago')
  })
})
