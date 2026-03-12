import { useEffect } from 'react'

export function useKeyboardShortcut(key: string, callback: () => void) {
  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === key && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return
        e.preventDefault()
        callback()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [key, callback])
}
