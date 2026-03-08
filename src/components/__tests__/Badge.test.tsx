import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Badge from '../ui/Badge'

describe('Badge', () => {
  it('renders text content', () => {
    render(<Badge>TypeScript</Badge>)
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
  })

  it('applies custom color style', () => {
    const { container } = render(<Badge color="#3178c6">TS</Badge>)
    const badge = container.firstChild as HTMLElement
    expect(badge.style.color).toBe('rgb(49, 120, 198)')
  })
})
