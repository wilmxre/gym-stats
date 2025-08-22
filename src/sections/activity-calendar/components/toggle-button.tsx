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
        ? 'bg-black/20 backdrop-blur-md border text-white border-accent-300 shadow-xl rounded-xl'
        : 'text-white/75 hover:text-white hover:bg-black/10'
    )}
  >
    {children}
  </button>
)
