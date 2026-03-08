import { useState, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Input from '../ui/Input'
import Button from '../ui/Button'
import { useKeyboardShortcut } from '../../hooks/use-keyboard-shortcut'

interface SearchBarProps {
  initialValue?: string
  size?: 'default' | 'large'
}

export default function SearchBar({ initialValue = '', size = 'default' }: SearchBarProps) {
  const [value, setValue] = useState(initialValue)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const focusInput = useCallback(() => inputRef.current?.focus(), [])
  useKeyboardShortcut('/', focusInput)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) navigate(`/dashboard/${trimmed}`)
  }

  const isLarge = size === 'large'

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={`flex gap-2 ${isLarge ? 'w-full max-w-xl' : 'w-full max-w-sm'}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Input
        ref={inputRef}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Search GitHub username...'
        aria-label="GitHub username"
        className={isLarge ? 'py-3 text-base' : ''}
        icon={
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        }
      />
      <Button type="submit" size={isLarge ? 'lg' : 'md'} disabled={!value.trim()}>
        Search
      </Button>
    </motion.form>
  )
}
