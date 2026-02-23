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
    <div className="flex flex-col gap-4">
      <div className="flex gap-2 items-center flex-wrap">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleEncode}>{l.encode}</button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleDecode}>{l.decode}</button>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]"
          onClick={() => fileRef.current?.click()}
        >
          {l.uploadFile}
        </button>
        <input
          ref={fileRef}
          type="file"
          onChange={handleFileUpload}
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all h-[300px]"
            placeholder={l.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="relative">
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all h-[300px]"
            placeholder={l.output}
            value={output}
            readOnly
          />
          {output && (
            <div className="absolute top-2 right-2">
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
