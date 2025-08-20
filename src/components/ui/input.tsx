import * as React from 'react'

import { cn } from '../../lib/utils'

export const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full bg-background-100/10 border-accent-500/30 focus:border-accent-500 focus:ring-accent-500/20 placeholder:text-text-200 rounded-md border px-4 py-1 text-text-50 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
