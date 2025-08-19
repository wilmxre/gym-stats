import clsx from 'clsx'
import React from 'react'

interface ToggleButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
  active,
  onClick,
  children
}) => (
  <button
    onClick={onClick}
    className={clsx(
      'px-3 py-2 text-sm font-medium rounded-xl transition-colors',
      active
        ? 'bg-background-700 text-text-50 shadow-sm'
        : 'text-text-300 hover:text-text-50'
    )}
  >
    {children}
  </button>
)
