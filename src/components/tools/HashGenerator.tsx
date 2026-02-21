'use client'
import { useState, useCallback, useRef } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface HashGeneratorProps {
  labels?: {
    input: string
    uploadFile: string
    copy: string
    copied: string
  }
}

const ALGORITHMS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'] as const

async function computeHash(algorithm: string, data: ArrayBuffer): Promise<string> {
  const hashBuffer = await crypto.subtle.digest(algorithm, data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

export default function HashGenerator({ labels }: HashGeneratorProps) {
  const l = {
    input: labels?.input ?? 'Enter text to hash...',
    uploadFile: labels?.uploadFile ?? 'Upload File',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<Record<string, string>>({})
  const [computing, setComputing] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const computeAll = useCallback(async (data: ArrayBuffer) => {
    setComputing(true)
    const results: Record<string, string> = {}
    for (const algo of ALGORITHMS) {
      try {
        results[algo] = await computeHash(algo, data)
      } catch {
        results[algo] = '(error)'
      }
    }
    setHashes(results)
    setComputing(false)
  }, [])

  const handleTextChange = useCallback(async (text: string) => {
    setInput(text)
    if (!text) {
      setHashes({})
      return
    }
    const data = new TextEncoder().encode(text).buffer
    await computeAll(data)
  }, [computeAll])

  const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setInput(`[File: ${file.name}]`)
    const data = await file.arrayBuffer()
    await computeAll(data)
    e.target.value = ''
  }, [computeAll])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
    fontFamily: 'monospace',
  }

  const hashStyle: React.CSSProperties = {
    padding: '0.75rem',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    fontFamily: 'monospace',
    fontSize: '0.8125rem',
    wordBreak: 'break-all',
    color: 'var(--color-text)',
    lineHeight: 1.5,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        <button
          className="btn-secondary"
          onClick={() => fileRef.current?.click()}
        >
          {l.uploadFile}
        </button>
        <input
          ref={fileRef}
          type="file"
          onChange={handleFileUpload}
          style={{ display: 'none' }}
        />
      </div>

      <textarea
        className="tool-textarea"
        style={{ height: '150px' }}
        placeholder={l.input}
        value={input}
        onChange={(e) => handleTextChange(e.target.value)}
      />

      {computing && (
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          Computing hashes...
        </div>
      )}

      {Object.keys(hashes).length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {ALGORITHMS.map((algo) => (
            <div key={algo} style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <span style={labelStyle}>{algo}</span>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                <div style={{ ...hashStyle, flex: 1 }}>
                  {hashes[algo] || ''}
                </div>
                {hashes[algo] && hashes[algo] !== '(error)' && (
                  <CopyButton text={hashes[algo]} label={l.copy} copiedLabel={l.copied} />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
