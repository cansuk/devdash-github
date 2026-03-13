interface ErrorMessageProps {
  title?: string
  message: string
  onRetry?: () => void
}

export default function ErrorMessage({ title = 'Something went wrong', message, onRetry }: ErrorMessageProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:border-red-900 dark:bg-red-950/30">
      <svg className="mb-3 h-10 w-10 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
      </svg>
      <h3 className="text-sm font-semibold text-red-800 dark:text-red-300">{title}</h3>
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-200 dark:bg-red-900/50 dark:text-red-300 dark:hover:bg-red-900"
        >
          Try Again
        </button>
      )}
    </div>
  )
}
