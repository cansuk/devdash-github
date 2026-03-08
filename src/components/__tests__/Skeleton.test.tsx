import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import Skeleton from '../ui/Skeleton'

describe('Skeleton', () => {
  it('renders single skeleton by default', () => {
    const { container } = render(<Skeleton />)
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(1)
  })

  it('renders multiple skeletons with count prop', () => {
    const { container } = render(<Skeleton count={3} />)
    expect(container.querySelectorAll('.animate-pulse')).toHaveLength(3)
  })
})
