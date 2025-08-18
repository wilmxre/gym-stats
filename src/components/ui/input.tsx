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
        'flex h-10 w-full rounded-md border border-secondary-300 !bg-background-400 px-4 py-1 text-base text-text-50 shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-50 placeholder:text-text-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
