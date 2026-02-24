import React from 'react'

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode
}

export function Select({ children, className = '', ...props }: SelectProps) {
  return (
    <select
      className={`py-1.5 px-2 border border-[var(--color-border)] rounded-md bg-[var(--color-bg)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${className}`}
      {...props}
    >
      {children}
    </select>
  )
}
