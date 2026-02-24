import React from 'react'

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'error' | 'success' | 'warning' | 'info'
  children: React.ReactNode
}

export function Alert({ variant = 'info', children, className = '', ...props }: AlertProps) {
  const baseClasses = 'p-3 rounded-lg text-sm font-mono'

  const variantClasses = {
    error: 'bg-red-500/10 text-[var(--color-error)]',
    success: 'bg-green-500/10 text-[var(--color-success)]',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  }

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      role="alert"
      {...props}
    >
      {children}
    </div>
  )
}
