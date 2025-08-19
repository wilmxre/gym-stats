import clsx from 'clsx'
import React from 'react'

export const ToggleButton: React.FC<{
  active: boolean
  onClick: () => void
  children: React.ReactNode
}> = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={clsx(
      'px-3 py-2 text-sm font-medium rounded-md transition-colors',
      active
        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
    )}
  >
    {children}
  </button>
)
