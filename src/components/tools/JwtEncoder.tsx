'use client'
import { useState, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface JwtEncoderProps {
  labels?: {
    encode: string
    clear: string
    copy: string
    copied: string
    headerLabel: string
    payloadLabel: string
    secretLabel: string
    tokenLabel: string
    algorithm: string
    headerPlaceholder: string
    payloadPlaceholder: string
    secretPlaceholder: string
    tokenPlaceholder: string
    invalidJson: string
    note: string
  }
}

function base64UrlEncode(str: string): string {
  const base64 = btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  )
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

async function hmacSign(algorithm: string, secret: string, data: string): Promise<string> {
  const enc = new TextEncoder()
  const keyData = enc.encode(secret)
  const msgData = enc.encode(data)

  let hashAlgo = 'SHA-256'
  if (algorithm === 'HS384') hashAlgo = 'SHA-384'
  if (algorithm === 'HS512') hashAlgo = 'SHA-512'

  const key = await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: hashAlgo },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', key, msgData)
  const bytes = new Uint8Array(signature)
  const base64 = btoa(String.fromCharCode(...bytes))
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

const DEFAULT_HEADER = JSON.stringify({ alg: 'HS256', typ: 'JWT' }, null, 2)
const DEFAULT_PAYLOAD = JSON.stringify(
  {
    sub: '1234567890',
    name: 'John Doe',
    iat: Math.floor(Date.now() / 1000),
  },
  null,
  2
)

export default function JwtEncoder({ labels }: JwtEncoderProps) {
  const l = {
    encode: labels?.encode ?? 'Encode',
    clear: labels?.clear ?? 'Clear',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    headerLabel: labels?.headerLabel ?? 'Header',
    payloadLabel: labels?.payloadLabel ?? 'Payload',
    secretLabel: labels?.secretLabel ?? 'Secret Key',
    tokenLabel: labels?.tokenLabel ?? 'JWT Token',
    algorithm: labels?.algorithm ?? 'Algorithm',
    headerPlaceholder: labels?.headerPlaceholder ?? 'JWT header JSON...',
    payloadPlaceholder: labels?.payloadPlaceholder ?? 'JWT payload JSON...',
    secretPlaceholder: labels?.secretPlaceholder ?? 'Enter secret key for signing...',
    tokenPlaceholder: labels?.tokenPlaceholder ?? 'Generated JWT token will appear here...',
    invalidJson: labels?.invalidJson ?? 'Invalid JSON',
    note: labels?.note ?? 'Note: Signing is performed client-side for demonstration purposes. Do not use this for production tokens.',
  }

  const [headerInput, setHeaderInput] = useState(DEFAULT_HEADER)
  const [payloadInput, setPayloadInput] = useState(DEFAULT_PAYLOAD)
  const [secret, setSecret] = useState('your-256-bit-secret')
  const [algorithm, setAlgorithm] = useState('HS256')
  const [token, setToken] = useState('')
  const [error, setError] = useState('')

  const handleEncode = useCallback(async () => {
    try {
      // Validate header JSON
      const headerObj = JSON.parse(headerInput)
      headerObj.alg = algorithm
      if (!headerObj.typ) headerObj.typ = 'JWT'

      // Validate payload JSON
      JSON.parse(payloadInput)

      const headerStr = base64UrlEncode(JSON.stringify(headerObj))
      const payloadStr = base64UrlEncode(payloadInput)
      const unsignedToken = `${headerStr}.${payloadStr}`

      if (secret) {
        const sig = await hmacSign(algorithm, secret, unsignedToken)
        setToken(`${unsignedToken}.${sig}`)
      } else {
        setToken(`${unsignedToken}.`)
      }
      setError('')
    } catch (e) {
      setError(`${l.invalidJson}: ${(e as Error).message}`)
      setToken('')
    }
  }, [headerInput, payloadInput, secret, algorithm, l.invalidJson])

  const handleClear = useCallback(() => {
    setHeaderInput(DEFAULT_HEADER)
    setPayloadInput(DEFAULT_PAYLOAD)
    setSecret('your-256-bit-secret')
    setToken('')
    setError('')
  }, [])

  const inputStyle: React.CSSProperties = {
    padding: '0.625rem 0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.375rem',
    backgroundColor: 'var(--color-bg)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
    fontFamily: 'monospace',
    width: '100%',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: '0.375rem',
    display: 'block',
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>{l.headerLabel}</label>
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
            style={{ height: '150px', fontFamily: 'monospace' }}
            placeholder={l.headerPlaceholder}
            value={headerInput}
            onChange={(e) => setHeaderInput(e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>{l.payloadLabel}</label>
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
            style={{ height: '150px', fontFamily: 'monospace' }}
            placeholder={l.payloadPlaceholder}
            value={payloadInput}
            onChange={(e) => setPayloadInput(e.target.value)}
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '200px' }}>
          <label style={labelStyle}>{l.secretLabel}</label>
          <input
            type="text"
            style={inputStyle}
            placeholder={l.secretPlaceholder}
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
          />
        </div>
        <div>
          <label style={labelStyle}>{l.algorithm}</label>
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
            style={{
              padding: '0.625rem 0.75rem',
              border: '1px solid var(--color-border)',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: '0.875rem',
            }}
          >
            <option value="HS256">HS256</option>
            <option value="HS384">HS384</option>
            <option value="HS512">HS512</option>
          </select>
        </div>
      </div>

      <div className="flex gap-2">
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleEncode}>{l.encode}</button>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleClear}>{l.clear}</button>
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

      {token && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.375rem' }}>
            <label style={labelStyle}>{l.tokenLabel}</label>
            <CopyButton text={token} label={l.copy} copiedLabel={l.copied} />
          </div>
          <div
            style={{
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              fontFamily: 'monospace',
              fontSize: '0.8125rem',
              wordBreak: 'break-all',
              lineHeight: 1.6,
              color: 'var(--color-text)',
            }}
          >
            <span style={{ color: '#ef4444' }}>{token.split('.')[0]}</span>
            <span>.</span>
            <span style={{ color: '#a855f7' }}>{token.split('.')[1]}</span>
            <span>.</span>
            <span style={{ color: '#3b82f6' }}>{token.split('.')[2]}</span>
          </div>
        </div>
      )}

      <div
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(234, 179, 8, 0.1)',
          color: 'var(--color-text-secondary)',
          fontSize: '0.8125rem',
        }}
      >
        {l.note}
      </div>
    </div>
  )
}
