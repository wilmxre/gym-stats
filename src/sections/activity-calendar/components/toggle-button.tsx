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
      'px-3 py-2 text-sm font-medium rounded-xl transition-colors focus:outline-none focus:ring-0',
      active
        ? 'backdrop-blur-md border border-accent-300/30 text-text-50 shadow-sm'
        : 'text-text-200 hover:text-text-50'
    )}
  >
    {children}
  </button>
)
