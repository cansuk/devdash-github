import { Link } from 'react-router-dom'
import Button from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-extrabold text-gray-200 dark:text-gray-800">404</h1>
      <p className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">Page not found</p>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6">
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}
