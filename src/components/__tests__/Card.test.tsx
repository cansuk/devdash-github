import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Card from '../ui/Card'

describe('Card', () => {
  it('renders children', () => {
    render(<Card>Card content</Card>)
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders title when provided', () => {
    render(<Card title="Test Title">Content</Card>)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders action when provided', () => {
    render(<Card action={<button>Action</button>}>Content</Card>)
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument()
  })
})
