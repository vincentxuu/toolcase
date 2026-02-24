import React from 'react'

export interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode
}

export function Table({ children, className = '', ...props }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={`w-full border-collapse text-sm ${className}`} {...props}>
        {children}
      </table>
    </div>
  )
}

export interface TableHeaderProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
}

export function TableHeader({ children, align = 'left', className = '', ...props }: TableHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <th
      className={`px-4 py-3 font-semibold text-[0.8125rem] text-[var(--color-text-secondary)] border-b-2 border-[var(--color-border)] ${alignClasses[align]} ${className}`}
      {...props}
    >
      {children}
    </th>
  )
}

export interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  children: React.ReactNode
  align?: 'left' | 'center' | 'right'
}

export function TableCell({ children, align = 'left', className = '', ...props }: TableCellProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  return (
    <td
      className={`px-4 py-3 border-b border-[var(--color-border)] ${alignClasses[align]} ${className}`}
      {...props}
    >
      {children}
    </td>
  )
}
