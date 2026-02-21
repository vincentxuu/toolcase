'use client'
import { useState, useCallback, useEffect } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface UserAgentParserProps {
  labels?: {
    parse: string
    clear: string
    copy: string
    copied: string
    placeholder: string
    useCurrentBrowser: string
    browser: string
    os: string
    device: string
    engine: string
    name: string
    version: string
    type: string
    unknown: string
  }
}

interface ParsedUA {
  browser: { name: string; version: string }
  os: { name: string; version: string }
  device: string
  engine: { name: string; version: string }
}

function parseUserAgent(ua: string): ParsedUA {
  const result: ParsedUA = {
    browser: { name: 'Unknown', version: '' },
    os: { name: 'Unknown', version: '' },
    device: 'Desktop',
    engine: { name: 'Unknown', version: '' },
  }

  // Detect browser
  if (/Edg\/(\d[\d.]*)/i.test(ua)) {
    result.browser = { name: 'Microsoft Edge', version: RegExp.$1 }
  } else if (/OPR\/(\d[\d.]*)/i.test(ua) || /Opera\/(\d[\d.]*)/i.test(ua)) {
    result.browser = { name: 'Opera', version: RegExp.$1 }
  } else if (/Vivaldi\/(\d[\d.]*)/i.test(ua)) {
    result.browser = { name: 'Vivaldi', version: RegExp.$1 }
  } else if (/YaBrowser\/(\d[\d.]*)/i.test(ua)) {
    result.browser = { name: 'Yandex Browser', version: RegExp.$1 }
  } else if (/SamsungBrowser\/(\d[\d.]*)/i.test(ua)) {
    result.browser = { name: 'Samsung Internet', version: RegExp.$1 }
  } else if (/UCBrowser\/(\d[\d.]*)/i.test(ua)) {
    result.browser = { name: 'UC Browser', version: RegExp.$1 }
  } else if (/Firefox\/(\d[\d.]*)/i.test(ua) && !/Seamonkey/i.test(ua)) {
    result.browser = { name: 'Firefox', version: RegExp.$1 }
  } else if (/; MSIE (\d[\d.]*)/i.test(ua) || /Trident.*rv:(\d[\d.]*)/i.test(ua)) {
    result.browser = { name: 'Internet Explorer', version: RegExp.$1 }
  } else if (/Chrome\/(\d[\d.]*)/i.test(ua) && !/Chromium/i.test(ua)) {
    result.browser = { name: 'Chrome', version: RegExp.$1 }
  } else if (/Chromium\/(\d[\d.]*)/i.test(ua)) {
    result.browser = { name: 'Chromium', version: RegExp.$1 }
  } else if (/Safari\/(\d[\d.]*)/i.test(ua) && /Version\/(\d[\d.]*)/i.test(ua)) {
    result.browser = { name: 'Safari', version: RegExp.$1 }
  }

  // Detect OS
  if (/Windows NT 10\.0/i.test(ua)) {
    result.os = { name: 'Windows', version: '10/11' }
  } else if (/Windows NT 6\.3/i.test(ua)) {
    result.os = { name: 'Windows', version: '8.1' }
  } else if (/Windows NT 6\.2/i.test(ua)) {
    result.os = { name: 'Windows', version: '8' }
  } else if (/Windows NT 6\.1/i.test(ua)) {
    result.os = { name: 'Windows', version: '7' }
  } else if (/Windows/i.test(ua)) {
    result.os = { name: 'Windows', version: '' }
  } else if (/Mac OS X (\d[\d_]*)/i.test(ua)) {
    result.os = { name: 'macOS', version: RegExp.$1.replace(/_/g, '.') }
  } else if (/iPhone OS (\d[\d_]*)/i.test(ua)) {
    result.os = { name: 'iOS', version: RegExp.$1.replace(/_/g, '.') }
  } else if (/iPad.*OS (\d[\d_]*)/i.test(ua)) {
    result.os = { name: 'iPadOS', version: RegExp.$1.replace(/_/g, '.') }
  } else if (/Android (\d[\d.]*)/i.test(ua)) {
    result.os = { name: 'Android', version: RegExp.$1 }
  } else if (/CrOS/i.test(ua)) {
    result.os = { name: 'Chrome OS', version: '' }
  } else if (/Linux/i.test(ua)) {
    result.os = { name: 'Linux', version: '' }
  } else if (/Ubuntu/i.test(ua)) {
    result.os = { name: 'Ubuntu', version: '' }
  }

  // Detect device type
  if (/Mobile|Android.*Mobile|iPhone|iPod/i.test(ua)) {
    result.device = 'Mobile'
  } else if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) {
    result.device = 'Tablet'
  } else if (/Bot|Crawler|Spider|Slurp|Googlebot/i.test(ua)) {
    result.device = 'Bot'
  } else {
    result.device = 'Desktop'
  }

  // Detect rendering engine
  if (/Trident\/(\d[\d.]*)/i.test(ua)) {
    result.engine = { name: 'Trident', version: RegExp.$1 }
  } else if (/Gecko\/(\d[\d.]*)/i.test(ua) && /rv:(\d[\d.]*)/i.test(ua)) {
    result.engine = { name: 'Gecko', version: RegExp.$1 }
  } else if (/AppleWebKit\/(\d[\d.]*)/i.test(ua)) {
    result.engine = { name: 'WebKit', version: RegExp.$1 }
    // Blink is based on WebKit but used by Chrome 28+
    if (/Chrome\/(\d+)/i.test(ua) && parseInt(RegExp.$1) >= 28) {
      result.engine = { name: 'Blink', version: result.engine.version }
    }
  } else if (/Presto\/(\d[\d.]*)/i.test(ua)) {
    result.engine = { name: 'Presto', version: RegExp.$1 }
  }

  return result
}

export default function UserAgentParser({ labels }: UserAgentParserProps) {
  const l = {
    parse: labels?.parse ?? 'Parse',
    clear: labels?.clear ?? 'Clear',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    placeholder: labels?.placeholder ?? 'Paste a user-agent string here...',
    useCurrentBrowser: labels?.useCurrentBrowser ?? 'Use Current Browser',
    browser: labels?.browser ?? 'Browser',
    os: labels?.os ?? 'Operating System',
    device: labels?.device ?? 'Device Type',
    engine: labels?.engine ?? 'Rendering Engine',
    name: labels?.name ?? 'Name',
    version: labels?.version ?? 'Version',
    type: labels?.type ?? 'Type',
    unknown: labels?.unknown ?? 'Unknown',
  }

  const [input, setInput] = useState('')
  const [parsed, setParsed] = useState<ParsedUA | null>(null)

  const handleParse = useCallback(() => {
    if (!input.trim()) return
    setParsed(parseUserAgent(input))
  }, [input])

  const handleUseCurrent = useCallback(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent
      setInput(ua)
      setParsed(parseUserAgent(ua))
    }
  }, [])

  const handleClear = useCallback(() => {
    setInput('')
    setParsed(null)
  }, [])

  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      const ua = navigator.userAgent
      setInput(ua)
      setParsed(parseUserAgent(ua))
    }
  }, [])

  const cardStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.25rem',
  }

  const valueStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 500,
    color: 'var(--color-text)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ position: 'relative' }}>
        <textarea
          className="tool-textarea"
          style={{ minHeight: '80px', fontFamily: 'monospace', fontSize: '0.875rem' }}
          placeholder={l.placeholder}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        {input && (
          <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}>
            <CopyButton text={input} label={l.copy} copiedLabel={l.copied} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={handleParse}>{l.parse}</button>
        <button className="btn-secondary" onClick={handleUseCurrent}>{l.useCurrentBrowser}</button>
        <button className="btn-secondary" onClick={handleClear}>{l.clear}</button>
      </div>

      {parsed && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div style={cardStyle}>
            <div style={labelStyle}>{l.browser}</div>
            <div style={valueStyle}>{parsed.browser.name}</div>
            {parsed.browser.version && (
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                {l.version}: {parsed.browser.version}
              </div>
            )}
          </div>

          <div style={cardStyle}>
            <div style={labelStyle}>{l.os}</div>
            <div style={valueStyle}>{parsed.os.name}</div>
            {parsed.os.version && (
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                {l.version}: {parsed.os.version}
              </div>
            )}
          </div>

          <div style={cardStyle}>
            <div style={labelStyle}>{l.device}</div>
            <div style={valueStyle}>{parsed.device}</div>
          </div>

          <div style={cardStyle}>
            <div style={labelStyle}>{l.engine}</div>
            <div style={valueStyle}>{parsed.engine.name}</div>
            {parsed.engine.version && (
              <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                {l.version}: {parsed.engine.version}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
