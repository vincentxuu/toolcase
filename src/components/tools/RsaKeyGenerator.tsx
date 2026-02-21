'use client'
import { useState, useCallback } from 'react'

interface RsaKeyGeneratorProps {
  labels?: {
    keySize: string
    generate: string
    publicKey: string
    privateKey: string
    copy: string
    copied: string
    generating: string
    bits: string
  }
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return btoa(binary)
}

function formatPem(base64: string, label: string): string {
  const lines: string[] = []
  for (let i = 0; i < base64.length; i += 64) {
    lines.push(base64.substring(i, i + 64))
  }
  return `-----BEGIN ${label}-----\n${lines.join('\n')}\n-----END ${label}-----`
}

export default function RsaKeyGenerator({ labels }: RsaKeyGeneratorProps) {
  const l = {
    keySize: labels?.keySize ?? 'Key Size',
    generate: labels?.generate ?? 'Generate Key Pair',
    publicKey: labels?.publicKey ?? 'Public Key',
    privateKey: labels?.privateKey ?? 'Private Key',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    generating: labels?.generating ?? 'Generating...',
    bits: labels?.bits ?? 'bits',
  }

  const [keySize, setKeySize] = useState<2048 | 4096>(2048)
  const [publicKeyPem, setPublicKeyPem] = useState('')
  const [privateKeyPem, setPrivateKeyPem] = useState('')
  const [generating, setGenerating] = useState(false)
  const [copiedPub, setCopiedPub] = useState(false)
  const [copiedPriv, setCopiedPriv] = useState(false)

  const handleGenerate = useCallback(async () => {
    setGenerating(true)
    setPublicKeyPem('')
    setPrivateKeyPem('')

    try {
      const keyPair = await crypto.subtle.generateKey(
        {
          name: 'RSA-OAEP',
          modulusLength: keySize,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: 'SHA-256',
        },
        true,
        ['encrypt', 'decrypt']
      )

      const pubExported = await crypto.subtle.exportKey('spki', keyPair.publicKey)
      const privExported = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey)

      const pubBase64 = arrayBufferToBase64(pubExported)
      const privBase64 = arrayBufferToBase64(privExported)

      setPublicKeyPem(formatPem(pubBase64, 'PUBLIC KEY'))
      setPrivateKeyPem(formatPem(privBase64, 'PRIVATE KEY'))
    } catch {
      // Crypto API error
    } finally {
      setGenerating(false)
    }
  }, [keySize])

  const handleCopyPub = useCallback(() => {
    navigator.clipboard.writeText(publicKeyPem)
    setCopiedPub(true)
    setTimeout(() => setCopiedPub(false), 2000)
  }, [publicKeyPem])

  const handleCopyPriv = useCallback(() => {
    navigator.clipboard.writeText(privateKeyPem)
    setCopiedPriv(true)
    setTimeout(() => setCopiedPriv(false), 2000)
  }, [privateKeyPem])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-text-secondary)',
  }

  const selectStyle: React.CSSProperties = {
    padding: '0.375rem 0.5rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
  }

  const textareaStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.375rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.75rem',
    fontFamily: 'monospace',
    resize: 'vertical',
    lineHeight: 1.4,
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <label style={labelStyle}>{l.keySize}:</label>
          <select
            value={keySize}
            onChange={(e) => setKeySize(Number(e.target.value) as 2048 | 4096)}
            style={selectStyle}
          >
            <option value={2048}>2048 {l.bits}</option>
            <option value={4096}>4096 {l.bits}</option>
          </select>
        </div>

        <button className="btn-primary" onClick={handleGenerate} disabled={generating}>
          {generating ? l.generating : l.generate}
        </button>
      </div>

      {publicKeyPem && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ ...labelStyle, fontWeight: 600 }}>{l.publicKey}</label>
            <button
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              onClick={handleCopyPub}
            >
              {copiedPub ? l.copied : l.copy}
            </button>
          </div>
          <textarea readOnly value={publicKeyPem} rows={8} style={textareaStyle} />
        </div>
      )}

      {privateKeyPem && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label style={{ ...labelStyle, fontWeight: 600 }}>{l.privateKey}</label>
            <button
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              onClick={handleCopyPriv}
            >
              {copiedPriv ? l.copied : l.copy}
            </button>
          </div>
          <textarea readOnly value={privateKeyPem} rows={12} style={textareaStyle} />
        </div>
      )}
    </div>
  )
}
