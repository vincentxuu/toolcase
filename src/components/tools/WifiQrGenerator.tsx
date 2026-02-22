'use client'
import { useState, useCallback, useEffect, useRef } from 'react'
import QRCode from 'qrcode'

interface WifiQrGeneratorProps {
  labels?: {
    ssid: string
    password: string
    encryption: string
    generate: string
    copy: string
    wifiString: string
    copied: string
    none: string
  }
}

export default function WifiQrGenerator({ labels }: WifiQrGeneratorProps) {
  const l = {
    ssid: labels?.ssid ?? 'Network Name (SSID)',
    password: labels?.password ?? 'Password',
    encryption: labels?.encryption ?? 'Encryption',
    generate: labels?.generate ?? 'Generate QR Code',
    copy: labels?.copy ?? 'Copy WiFi String',
    wifiString: labels?.wifiString ?? 'WiFi String',
    copied: labels?.copied ?? 'Copied!',
    none: labels?.none ?? 'None',
  }

  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')
  const [encryption, setEncryption] = useState<'WPA' | 'WEP' | 'nopass'>('WPA')
  const [qrDataUrl, setQrDataUrl] = useState('')
  const [copied, setCopied] = useState(false)

  const escapeSpecial = (str: string) => {
    return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/:/g, '\\:').replace(/"/g, '\\"')
  }

  const wifiString = ssid
    ? `WIFI:T:${encryption};S:${escapeSpecial(ssid)};P:${escapeSpecial(password)};;`
    : ''

  const generateQr = useCallback(async () => {
    if (!ssid) return
    try {
      const url = await QRCode.toDataURL(wifiString, { width: 300, margin: 2, color: { dark: '#000000', light: '#ffffff' } })
      setQrDataUrl(url)
    } catch {
      setQrDataUrl('')
    }
  }, [ssid, wifiString])

  useEffect(() => {
    if (ssid) generateQr()
    else setQrDataUrl('')
  }, [ssid, password, encryption, generateQr])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(wifiString)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch { /* fallback */ }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = {
    display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)',
  }
  const btnStyle: React.CSSProperties = {
    padding: '0.5rem 1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', cursor: 'pointer',
    fontSize: '0.875rem', fontWeight: 500,
  }
  const primaryBtnStyle: React.CSSProperties = {
    ...btnStyle, backgroundColor: 'var(--color-primary)', color: '#fff', border: 'none',
  }
  const cardStyle: React.CSSProperties = {
    padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)', textAlign: 'center',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.ssid}</label>
          <input
            type="text"
            style={inputStyle}
            value={ssid}
            onChange={(e) => setSsid(e.target.value)}
            placeholder="MyWiFiNetwork"
          />
        </div>
        <div>
          <label style={labelStyle}>{l.password}</label>
          <input
            type="text"
            style={inputStyle}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password123"
          />
        </div>
        <div>
          <label style={labelStyle}>{l.encryption}</label>
          <select style={inputStyle} value={encryption} onChange={(e) => setEncryption(e.target.value as 'WPA' | 'WEP' | 'nopass')}>
            <option value="WPA">WPA/WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">{l.none}</option>
          </select>
        </div>
      </div>

      {qrDataUrl && (
        <div style={cardStyle}>
          <img
            src={qrDataUrl}
            alt="WiFi QR Code"
            style={{ maxWidth: '300px', width: '100%', height: 'auto', imageRendering: 'pixelated' }}
          />
        </div>
      )}

      {wifiString && (
        <div>
          <label style={labelStyle}>{l.wifiString}</label>
          <div style={{
            padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)',
            border: '1px solid var(--color-border)', fontFamily: "'Fira Code', monospace", fontSize: '0.85rem',
            wordBreak: 'break-all',
          }}>
            {wifiString}
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button style={primaryBtnStyle} onClick={generateQr} disabled={!ssid}>
          {l.generate}
        </button>
        <button style={btnStyle} onClick={handleCopy} disabled={!wifiString}>
          {copied ? l.copied : l.copy}
        </button>
      </div>
    </div>
  )
}
