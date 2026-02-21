'use client'
import { useState, useCallback, useRef } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface Base64ToolProps {
  labels?: {
    input: string
    output: string
    encode: string
    decode: string
    uploadFile: string
    copy: string
    copied: string
    invalidBase64: string
  }
}

export default function Base64Tool({ labels }: Base64ToolProps) {
  const l = {
    input: labels?.input ?? 'Enter text to encode or Base64 to decode...',
    output: labels?.output ?? 'Result will appear here...',
    encode: labels?.encode ?? 'Encode',
    decode: labels?.decode ?? 'Decode',
    uploadFile: labels?.uploadFile ?? 'Upload File',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    invalidBase64: labels?.invalidBase64 ?? 'Invalid Base64 input',
  }

  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleEncode = useCallback(() => {
    if (!input) return
    try {
      const bytes = new TextEncoder().encode(input)
      const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join('')
      setOutput(btoa(binary))
      setError('')
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }, [input])

  const handleDecode = useCallback(() => {
    if (!input) return
    try {
      const binary = atob(input.trim())
      const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0))
      setOutput(new TextDecoder().decode(bytes))
      setError('')
    } catch {
      setError(l.invalidBase64)
      setOutput('')
    }
  }, [input, l.invalidBase64])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setInput(file.name)
      setOutput(result)
      setError('')
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={handleEncode}>{l.encode}</button>
        <button className="btn-secondary" onClick={handleDecode}>{l.decode}</button>
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
