'use client'
import { useState, useCallback, useEffect } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface JwtDecoderProps {
  labels?: {
    decode: string
    copy: string
    clear: string
    copied: string
    placeholder: string
    header: string
    payload: string
    signature: string
    expired: string
    valid: string
    expiresAt: string
    issuedAt: string
  }
}

function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/')
  while (base64.length % 4) base64 += '='
  return decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join('')
  )
}

export default function JwtDecoder({ labels }: JwtDecoderProps) {
  const l = {
    decode: labels?.decode ?? 'Decode',
    copy: labels?.copy ?? 'Copy',
    clear: labels?.clear ?? 'Clear',
    copied: labels?.copied ?? 'Copied!',
    placeholder: labels?.placeholder ?? 'Paste your JWT token here...',
    header: labels?.header ?? 'Header',
    payload: labels?.payload ?? 'Payload',
    signature: labels?.signature ?? 'Signature',
    expired: labels?.expired ?? 'Expired',
    valid: labels?.valid ?? 'Valid',
    expiresAt: labels?.expiresAt ?? 'Expires at',
    issuedAt: labels?.issuedAt ?? 'Issued at',
  }

  const [input, setInput] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [signature, setSignature] = useState('')
  const [error, setError] = useState('')
  const [expInfo, setExpInfo] = useState<{ expired: boolean; exp?: string; iat?: string } | null>(null)

  const handleDecode = useCallback(() => {
    if (!input.trim()) return
    try {
      const parts = input.trim().split('.')
      if (parts.length !== 3) throw new Error('Invalid JWT: must have 3 parts separated by dots')

      const headerJson = base64UrlDecode(parts[0])
      const payloadJson = base64UrlDecode(parts[1])

      const headerObj = JSON.parse(headerJson)
      const payloadObj = JSON.parse(payloadJson)

      setHeader(JSON.stringify(headerObj, null, 2))
      setPayload(JSON.stringify(payloadObj, null, 2))
      setSignature(parts[2])
      setError('')

      // Check expiration
      const info: { expired: boolean; exp?: string; iat?: string } = { expired: false }
      if (payloadObj.exp) {
        const expDate = new Date(payloadObj.exp * 1000)
        info.exp = expDate.toLocaleString()
        info.expired = expDate < new Date()
      }
      if (payloadObj.iat) {
        info.iat = new Date(payloadObj.iat * 1000).toLocaleString()
      }
      setExpInfo(info)
    } catch (e) {
      setError((e as Error).message)
      setHeader('')
      setPayload('')
      setSignature('')
      setExpInfo(null)
    }
  }, [input])

  useEffect(() => {
    if (input.trim()) {
      const timer = setTimeout(handleDecode, 300)
      return () => clearTimeout(timer)
    }
  }, [input, handleDecode])

  return (
    <div className="flex flex-col gap-4">
      <textarea
        className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
        style={{ minHeight: '120px' }}
        placeholder={l.placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleDecode}>{l.decode}</button>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]"
          onClick={() => { setInput(''); setHeader(''); setPayload(''); setSignature(''); setError(''); setExpInfo(null) }}
        >
          {l.clear}
        </button>
      </div>

      {error && (
        <div style={{ padding: '0.75rem 1rem', borderRadius: '0.5rem', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: 'var(--color-error)', fontSize: '0.875rem', fontFamily: 'monospace' }}>
          {error}
        </div>
      )}

      {expInfo && (
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: expInfo.expired ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
          color: expInfo.expired ? 'var(--color-error)' : 'var(--color-success)',
          fontSize: '0.875rem',
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
        }}>
          {expInfo.exp && <span>{expInfo.expired ? `${l.expired}` : l.valid} — {l.expiresAt}: {expInfo.exp}</span>}
          {expInfo.iat && <span>{l.issuedAt}: {expInfo.iat}</span>}
        </div>
      )}

      {header && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{l.header}</h3>
              <CopyButton text={header} label={l.copy} copiedLabel={l.copied} />
            </div>
            <pre style={{
              padding: '1rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
            }}>
              {header}
            </pre>
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{l.payload}</h3>
              <CopyButton text={payload} label={l.copy} copiedLabel={l.copied} />
            </div>
            <pre style={{
              padding: '1rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              borderRadius: '0.5rem',
              overflow: 'auto',
              fontSize: '0.875rem',
              fontFamily: 'monospace',
            }}>
              {payload}
            </pre>
          </div>
        </div>
      )}

      {signature && (
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 style={{ fontWeight: 600, color: 'var(--color-text-secondary)' }}>{l.signature}</h3>
            <CopyButton text={signature} label={l.copy} copiedLabel={l.copied} />
          </div>
          <pre style={{
            padding: '1rem',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)',
            borderRadius: '0.5rem',
            overflow: 'auto',
            fontSize: '0.75rem',
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            color: 'var(--color-text-secondary)',
          }}>
            {signature}
          </pre>
        </div>
      )}
    </div>
  )
}
