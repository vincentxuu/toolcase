'use client'
import { useState, useCallback } from 'react'

interface BinaryTextConverterProps {
  labels?: {
    text: string
    binary: string
    textToBinary: string
    binaryToText: string
    copy: string
    copied: string
    placeholder: string
    binaryPlaceholder: string
  }
}

function textToBinary(text: string): string {
  return text.split('').map((ch) => ch.charCodeAt(0).toString(2).padStart(8, '0')).join(' ')
}

function binaryToText(bin: string): string {
  const bytes = bin.trim().split(/\s+/)
  return bytes.map((b) => {
    const n = parseInt(b, 2)
    return isNaN(n) ? '' : String.fromCharCode(n)
  }).join('')
}

export default function BinaryTextConverter({ labels }: BinaryTextConverterProps) {
  const l = {
    text: labels?.text ?? 'Text',
    binary: labels?.binary ?? 'Binary',
    textToBinary: labels?.textToBinary ?? 'Text to Binary',
    binaryToText: labels?.binaryToText ?? 'Binary to Text',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    placeholder: labels?.placeholder ?? 'Enter text...',
    binaryPlaceholder: labels?.binaryPlaceholder ?? 'Enter binary (space-separated bytes)...',
  }

  const [mode, setMode] = useState<'t2b' | 'b2t'>('t2b')
  const [textInput, setTextInput] = useState('')
  const [binaryInput, setBinaryInput] = useState('')
  const [copied, setCopied] = useState(false)

  const output = mode === 't2b' ? textToBinary(textInput) : binaryToText(binaryInput)

  const handleCopy = useCallback(async () => {
    if (!output) return
    try { await navigator.clipboard.writeText(output) } catch { /* ignore */ }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const btnStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    backgroundColor: active ? 'var(--color-primary)' : 'var(--color-bg-secondary)',
    color: active ? '#fff' : 'inherit',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '0.9rem',
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <button onClick={() => setMode('t2b')} style={btnStyle(mode === 't2b')}>{l.textToBinary}</button>
        <button onClick={() => setMode('b2t')} style={btnStyle(mode === 'b2t')}>{l.binaryToText}</button>
      </div>
      <div>
        <label className="font-semibold block mb-1">{mode === 't2b' ? l.text : l.binary}</label>
        <textarea
          className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
          style={{ height: '100px' }}
          placeholder={mode === 't2b' ? l.placeholder : l.binaryPlaceholder}
          value={mode === 't2b' ? textInput : binaryInput}
          onChange={(e) => mode === 't2b' ? setTextInput(e.target.value) : setBinaryInput(e.target.value)}
        />
      </div>
      <div>
        <label className="font-semibold block mb-1">{mode === 't2b' ? l.binary : l.text}</label>
        <textarea className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all" style={{ height: '100px', fontFamily: 'monospace' }} value={output} readOnly />
      </div>
      <button onClick={handleCopy} style={{ ...btnStyle(true), alignSelf: 'flex-start' }}>
        {copied ? l.copied : l.copy}
      </button>
    </div>
  )
}
