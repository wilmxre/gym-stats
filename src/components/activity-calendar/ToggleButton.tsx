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
        ? 'bg-primary-300 text-text-950 shadow-sm'
        : 'text-text-900 hover:text-text-950'
    )}
  >
    {children}
  </button>
)
