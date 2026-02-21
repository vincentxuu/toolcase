'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface UrlEncodeDecodeProps {
  labels?: {
    input: string
    output: string
    encode: string
    decode: string
    encodeUri: string
    decodeUri: string
    copy: string
    copied: string
  }
}

export default function UrlEncodeDecode({ labels }: UrlEncodeDecodeProps) {
  const l = {
    input: labels?.input ?? 'Enter text or URL to encode/decode...',
    output: labels?.output ?? 'Result will appear here...',
    encode: labels?.encode ?? 'Encode Component',
    decode: labels?.decode ?? 'Decode Component',
    encodeUri: labels?.encodeUri ?? 'Encode Full URI',
    decodeUri: labels?.decodeUri ?? 'Decode Full URI',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')

  const handleAction = useCallback((fn: (s: string) => string) => {
    if (!input) return
    try {
      setOutput(fn(input))
      setError('')
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }, [input])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={() => handleAction(encodeURIComponent)}>
          {l.encode}
        </button>
        <button className="btn-secondary" onClick={() => handleAction(decodeURIComponent)}>
          {l.decode}
        </button>
        <button className="btn-secondary" onClick={() => handleAction(encodeURI)}>
          {l.encodeUri}
        </button>
        <button className="btn-secondary" onClick={() => handleAction(decodeURI)}>
          {l.decodeUri}
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <textarea
            className="tool-textarea"
            style={{ height: '300px' }}
            placeholder={l.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div style={{ position: 'relative' }}>
          <textarea
            className="tool-textarea"
            style={{ height: '300px' }}
            placeholder={l.output}
            value={output}
            readOnly
          />
          {output && (
            <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
              <CopyButton text={output} label={l.copy} copiedLabel={l.copied} />
            </div>
          )}
        </div>
      </div>

      {error && (
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgba(239, 68, 68, 0.1)',
            color: 'var(--color-error)',
            fontSize: '0.875rem',
            fontFamily: 'monospace',
          }}
        >
          {error}
        </div>
      )}
    </div>
  )
}
