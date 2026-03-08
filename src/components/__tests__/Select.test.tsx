import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Select from '../ui/Select'

const options = [
  { value: 'stars', label: 'Stars' },
  { value: 'forks', label: 'Forks' },
  { value: 'name', label: 'Name' },
]

describe('Select', () => {
  it('renders all options', () => {
    render(<Select options={options} />)
    expect(screen.getAllByRole('option')).toHaveLength(3)
  })

  it('calls onChange when selection changes', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Select options={options} onChange={onChange} />)
    await user.selectOptions(screen.getByRole('combobox'), 'forks')
    expect(onChange).toHaveBeenCalled()
  })
})
