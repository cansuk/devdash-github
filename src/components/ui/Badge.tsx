import clsx from 'clsx'

interface BadgeProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export default function Badge({ children, color, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium',
        !color && 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300',
        className,
      )}
      style={color ? { backgroundColor: `${color}20`, color } : undefined}
    >
      {color && <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />}
      {children}
    </span>
  )
}
