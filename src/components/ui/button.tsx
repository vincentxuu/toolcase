import * as React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'default', ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer'

    const variants = {
      primary: 'bg-[var(--color-primary)] text-white border-0 hover:bg-[var(--color-primary-hover)]',
      secondary: 'bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] hover:bg-[var(--color-border)]',
      outline: 'border border-[var(--color-border)] bg-transparent hover:bg-[var(--color-bg-secondary)]',
      ghost: 'hover:bg-[var(--color-bg-secondary)]',
      destructive: 'bg-[var(--color-error)] text-white hover:opacity-90',
    }

    const sizes = {
      default: 'px-5 py-2.5',
      sm: 'px-3 py-2 text-sm',
      lg: 'px-8 py-3 text-lg',
      icon: 'w-10 h-10',
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    return <button className={classes} ref={ref} {...props} />
  }
)

Button.displayName = 'Button'

export { Button }
