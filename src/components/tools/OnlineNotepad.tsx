'use client'
import { useState, useEffect, useCallback } from 'react'

interface OnlineNotepadProps {
  labels?: {
    placeholder: string
    characters: string
    words: string
    clear: string
    download: string
    autoSaved: string
  }
}

const STORAGE_KEY = 'toolcase-notepad'

export default function OnlineNotepad({ labels }: OnlineNotepadProps) {
  const l = {
    placeholder: labels?.placeholder ?? 'Start typing your notes here...',
    characters: labels?.characters ?? 'Characters',
    words: labels?.words ?? 'Words',
    clear: labels?.clear ?? 'Clear',
    download: labels?.download ?? 'Download .txt',
    autoSaved: labels?.autoSaved ?? 'Auto-saved',
  }

  const [text, setText] = useState('')
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setText(stored)
  }, [])

  const handleChange = useCallback((value: string) => {
    setText(value)
    localStorage.setItem(STORAGE_KEY, value)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }, [])

  const handleClear = useCallback(() => {
    setText('')
    localStorage.removeItem(STORAGE_KEY)
  }, [])

  const handleDownload = useCallback(() => {
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'notepad.txt'
    a.click()
    URL.revokeObjectURL(url)
  }, [text])

  const charCount = text.length
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
    minHeight: '300px', resize: 'vertical', fontFamily: 'inherit', lineHeight: 1.7,
  }
  const btnStyle: React.CSSProperties = {
    padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', cursor: 'pointer',
    fontSize: '0.875rem', fontWeight: 500,
  }
  const statStyle: React.CSSProperties = {
    padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)', textAlign: 'center', flex: 1,
  }

  return (
    <div className="flex flex-col gap-4">
      <textarea
        style={inputStyle}
        placeholder={l.placeholder}
        value={text}
        onChange={(e) => handleChange(e.target.value)}
      />

      <div className="flex gap-4">
        <div style={statStyle}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{charCount}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">{l.characters}</div>
        </div>
        <div style={statStyle}>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{wordCount}</div>
          <div className="text-xs text-[var(--color-text-secondary)]">{l.words}</div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button style={btnStyle} onClick={handleClear}>{l.clear}</button>
        <button style={{ ...btnStyle, backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none' }} onClick={handleDownload} disabled={!text}>
          {l.download}
        </button>
        {saved && (
          <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 500 }}>{l.autoSaved}</span>
        )}
      </div>
    </div>
  )
}
