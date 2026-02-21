'use client'
import { useState, useCallback } from 'react'

interface CopyButtonProps {
  text: string
  label?: string
  copiedLabel?: string
}

export default function CopyButton({ text, label = 'Copy', copiedLabel = 'Copied!' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
      const ta = document.createElement('textarea')
      ta.value = text
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [text])

  return (
    <button
      onClick={handleCopy}
      className="btn-secondary"
      style={{ minWidth: '5rem' }}
    >
      {copied ? copiedLabel : label}
    </button>
  )
}
