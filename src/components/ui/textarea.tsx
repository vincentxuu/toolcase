import * as React from 'react'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'code'
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseStyles = 'flex w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] px-4 py-3 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-secondary)] focus-visible:outline-none focus-visible:border-[var(--color-primary)] focus-visible:ring-4 focus-visible:ring-blue-600/10 disabled:cursor-not-allowed disabled:opacity-50 resize-y transition-all'

    const variants = {
      default: 'min-h-[80px]',
      code: 'min-h-[200px] font-mono',
    }

    return (
      <textarea
        className={`${baseStyles} ${variants[variant]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)

Textarea.displayName = 'Textarea'

export { Textarea }
