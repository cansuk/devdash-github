import clsx from 'clsx'

interface SkeletonProps {
  className?: string
  count?: number
}

export default function Skeleton({ className, count = 1 }: SkeletonProps) {
  return (
    <>
      {Array.from({ length: count }, (_, i) => (
        <div
          key={i}
          className={clsx('animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800', className)}
        />
      ))}
    </>
  )
}
