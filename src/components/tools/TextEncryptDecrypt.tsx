'use client'
import { useState, useCallback } from 'react'

interface TextEncryptDecryptProps {
  labels?: {
    encrypt: string
    decrypt: string
    inputText: string
    password: string
    output: string
    run: string
    copy: string
    copied: string
    encryptPlaceholder: string
    decryptPlaceholder: string
    passwordPlaceholder: string
    errorEncrypt: string
    errorDecrypt: string
  }
}

async function deriveKey(password: string, salt: Uint8Array): Promise<CryptoKey> {
  const enc = new TextEncoder()
  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    enc.encode(password),
    'PBKDF2',
    false,
    ['deriveKey']
  )
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt.buffer as ArrayBuffer, iterations: 100000, hash: 'SHA-256' },
    keyMaterial,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  )
}

async function encryptText(plaintext: string, password: string): Promise<string> {
  const enc = new TextEncoder()
  const salt = crypto.getRandomValues(new Uint8Array(16))
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const key = await deriveKey(password, salt)
  const encrypted = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    enc.encode(plaintext)
  )
  // Combine salt + iv + ciphertext
  const combined = new Uint8Array(salt.length + iv.length + new Uint8Array(encrypted).length)
  combined.set(salt, 0)
  combined.set(iv, salt.length)
  combined.set(new Uint8Array(encrypted), salt.length + iv.length)

  // Convert to base64
  let binary = ''
  for (let i = 0; i < combined.length; i++) {
    binary += String.fromCharCode(combined[i])
  }
  return btoa(binary)
}

async function decryptText(base64: string, password: string): Promise<string> {
  const binary = atob(base64)
  const combined = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    combined[i] = binary.charCodeAt(i)
  }

  const salt = combined.slice(0, 16)
  const iv = combined.slice(16, 28)
  const ciphertext = combined.slice(28)

  const key = await deriveKey(password, salt)
  const decrypted = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv },
    key,
    ciphertext
  )
  return new TextDecoder().decode(decrypted)
}

export default function TextEncryptDecrypt({ labels }: TextEncryptDecryptProps) {
  const l = {
    encrypt: labels?.encrypt ?? 'Encrypt',
    decrypt: labels?.decrypt ?? 'Decrypt',
    inputText: labels?.inputText ?? 'Input Text',
    password: labels?.password ?? 'Password / Key',
    output: labels?.output ?? 'Output',
    run: labels?.run ?? 'Run',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    encryptPlaceholder: labels?.encryptPlaceholder ?? 'Enter text to encrypt...',
    decryptPlaceholder: labels?.decryptPlaceholder ?? 'Paste base64 encrypted text...',
    passwordPlaceholder: labels?.passwordPlaceholder ?? 'Enter password...',
    errorEncrypt: labels?.errorEncrypt ?? 'Encryption failed. Please try again.',
    errorDecrypt: labels?.errorDecrypt ?? 'Decryption failed. Wrong password or corrupted data.',
  }

  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt')
  const [input, setInput] = useState('')
  const [password, setPassword] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [processing, setProcessing] = useState(false)

  const handleRun = useCallback(async () => {
    if (!input.trim() || !password) return
    setError('')
    setOutput('')
    setProcessing(true)

    try {
      if (mode === 'encrypt') {
        const result = await encryptText(input, password)
        setOutput(result)
      } else {
        const result = await decryptText(input.trim(), password)
        setOutput(result)
      }
    } catch {
      setError(mode === 'encrypt' ? l.errorEncrypt : l.errorDecrypt)
    } finally {
      setProcessing(false)
    }
  }, [input, password, mode, l.errorEncrypt, l.errorDecrypt])

  const handleCopy = useCallback(() => {
    if (!output) return
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [output])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
  }

  const inputStyle: React.CSSProperties = {
    padding: '0.375rem 0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
    width: '100%',
  }

  const tabStyle = (active: boolean): React.CSSProperties => ({
    padding: '0.5rem 1.5rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    backgroundColor: active ? 'var(--color-primary, #3b82f6)' : 'var(--color-bg-secondary)',
    color: active ? '#fff' : 'var(--color-text)',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: '0.875rem',
  })

  return (
    <div className="flex flex-col gap-4">
      {/* Mode toggle */}
      <div className="flex gap-2">
        <button style={tabStyle(mode === 'encrypt')} onClick={() => { setMode('encrypt'); setInput(''); setOutput(''); setError('') }}>
          {l.encrypt}
        </button>
        <button style={tabStyle(mode === 'decrypt')} onClick={() => { setMode('decrypt'); setInput(''); setOutput(''); setError('') }}>
          {l.decrypt}
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <label style={labelStyle}>{l.inputText}</label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'encrypt' ? l.encryptPlaceholder : l.decryptPlaceholder}
          rows={5}
          style={{ ...inputStyle, resize: 'vertical', fontFamily: 'monospace' }}
        />
      </div>

      <div className="flex flex-col gap-2">
        <label style={labelStyle}>{l.password}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={l.passwordPlaceholder}
          style={{ ...inputStyle, maxWidth: '300px' }}
        />
      </div>

      <div>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0"
          onClick={handleRun}
          disabled={!input.trim() || !password || processing}
        >
          {mode === 'encrypt' ? l.encrypt : l.decrypt}
        </button>
      </div>

      {error && <p style={{ color: '#ef4444', fontSize: '0.875rem' }}>{error}</p>}

      {output && (
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <label style={labelStyle}>{l.output}</label>
            <button
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)] text-xs px-2 py-1"
              onClick={handleCopy}
            >
              {copied ? l.copied : l.copy}
            </button>
          </div>
          <textarea
            readOnly
            value={output}
            rows={5}
            style={{
              ...inputStyle,
              resize: 'vertical',
              fontFamily: 'monospace',
              backgroundColor: 'var(--color-bg-secondary)',
            }}
          />
        </div>
      )}
    </div>
  )
}
