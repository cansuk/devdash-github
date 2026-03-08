import { motion } from 'framer-motion'
import SearchBar from '../components/features/SearchBar'

export default function HomePage() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
          Dev<span className="text-primary-500">Dash</span>
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
          Explore GitHub profiles with beautiful analytics
        </p>
      </motion.div>

      <div className="mt-8 w-full flex justify-center">
        <SearchBar size="large" />
      </div>

      <motion.p
        className="mt-4 text-sm text-gray-400 dark:text-gray-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Press <kbd className="rounded border border-gray-300 px-1.5 py-0.5 text-xs font-mono dark:border-gray-700">/</kbd> to focus search
      </motion.p>

      <motion.div
        className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3 max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {[
          { title: 'Language Stats', desc: 'See language distribution across repositories' },
          { title: 'Contribution Map', desc: 'Visualize commit activity over the past year' },
          { title: 'Repo Analytics', desc: 'Top repos by stars, sizes, and activity trends' },
        ].map((item) => (
          <div key={item.title} className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white">{item.title}</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
