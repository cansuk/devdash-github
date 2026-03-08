import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ErrorMessage from '../ui/ErrorMessage'

describe('ErrorMessage', () => {
  it('renders error message', () => {
    render(<ErrorMessage message="API rate limit exceeded" />)
    expect(screen.getByText('API rate limit exceeded')).toBeInTheDocument()
  })

  it('renders custom title', () => {
    render(<ErrorMessage title="User Not Found" message="No user found" />)
    expect(screen.getByText('User Not Found')).toBeInTheDocument()
  })

  it('calls onRetry when retry button is clicked', async () => {
    const user = userEvent.setup()
    const onRetry = vi.fn()
    render(<ErrorMessage message="Error" onRetry={onRetry} />)
    await user.click(screen.getByText('Try Again'))
    expect(onRetry).toHaveBeenCalledOnce()
  })

  it('hides retry button when onRetry is not provided', () => {
    render(<ErrorMessage message="Error" />)
    expect(screen.queryByText('Try Again')).not.toBeInTheDocument()
  })
})
