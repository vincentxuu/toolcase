'use client'
import { useState, useCallback } from 'react'

interface CopyButtonProps {
  text: string
  label?: string
  copiedLabel?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function CopyButton({ text, label = 'Copy', copiedLabel = 'Copied!', size = 'md' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text])

  const sizeClasses = {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-3 py-2',
    lg: 'text-lg px-4 py-3',
  }

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center gap-2 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)] ${sizeClasses[size]} min-w-[${size === 'sm' ? '4rem' : '5rem'}]`}
    >
      {copied ? copiedLabel : label}
    </button>
  )
}
