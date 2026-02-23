'use client'
import { useState, useCallback } from 'react'

interface OpenGraphPreviewProps {
  labels?: {
    title: string
    description: string
    imageUrl: string
    url: string
    siteName: string
    facebookPreview: string
    twitterPreview: string
    linkedinPreview: string
    metaTags: string
    copy: string
    copied: string
  }
}

export default function OpenGraphPreview({ labels }: OpenGraphPreviewProps) {
  const l = {
    title: labels?.title ?? 'og:title',
    description: labels?.description ?? 'og:description',
    imageUrl: labels?.imageUrl ?? 'og:image (URL)',
    url: labels?.url ?? 'og:url',
    siteName: labels?.siteName ?? 'og:site_name',
    facebookPreview: labels?.facebookPreview ?? 'Facebook Preview',
    twitterPreview: labels?.twitterPreview ?? 'Twitter Preview',
    linkedinPreview: labels?.linkedinPreview ?? 'LinkedIn Preview',
    metaTags: labels?.metaTags ?? 'Meta Tags',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [title, setTitle] = useState('My Page Title')
  const [description, setDescription] = useState('This is a description of my page that will appear in social media previews.')
  const [imageUrl, setImageUrl] = useState('')
  const [url, setUrl] = useState('https://example.com')
  const [siteName, setSiteName] = useState('Example')
  const [copied, setCopied] = useState(false)

  const metaTags = [
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    imageUrl ? `<meta property="og:image" content="${imageUrl}" />` : '',
    `<meta property="og:url" content="${url}" />`,
    siteName ? `<meta property="og:site_name" content="${siteName}" />` : '',
    `<meta property="og:type" content="website" />`,
    '',
    `<!-- Twitter Card -->`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    imageUrl ? `<meta name="twitter:image" content="${imageUrl}" />` : '',
  ].filter(Boolean).join('\n')

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(metaTags)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = metaTags
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [metaTags])

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '0.875rem',
    outline: 'none',
    boxSizing: 'border-box',
  }

  const labelStyle: React.CSSProperties = {
    fontSize: '0.875rem',
    fontWeight: 500,
    color: 'var(--color-text)',
    marginBottom: '0.25rem',
    display: 'block',
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--color-text)',
    marginBottom: '0.75rem',
  }

  const previewCardStyle: React.CSSProperties = {
    borderRadius: '0.5rem',
    border: '1px solid var(--color-border)',
    overflow: 'hidden',
    backgroundColor: 'var(--color-bg-secondary)',
  }

  const displayDomain = (() => {
    try {
      return new URL(url).hostname
    } catch {
      return url
    }
  })()

  return (
    <div className="flex flex-col gap-6">
      {/* Inputs */}
      <div className="flex flex-col gap-4">
        <div>
          <label style={labelStyle}>{l.title}</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Page title" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>{l.description}</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Page description"
            rows={3}
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
          />
        </div>
        <div>
          <label style={labelStyle}>{l.imageUrl}</label>
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" style={inputStyle} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label style={labelStyle}>{l.url}</label>
            <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://example.com" style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>{l.siteName}</label>
            <input type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} placeholder="My Website" style={inputStyle} />
          </div>
        </div>
      </div>

      {/* Preview Cards */}
      <div className="flex flex-col gap-6">
        {/* Facebook Preview */}
        <div>
          <div style={sectionTitleStyle}>{l.facebookPreview}</div>
          <div style={previewCardStyle}>
            {imageUrl && (
              <div style={{
                width: '100%',
                height: '210px',
                backgroundColor: '#e4e6eb',
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
            )}
            <div style={{ padding: '0.75rem 1rem', borderTop: imageUrl ? '1px solid var(--color-border)' : 'none' }}>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.02em' }}>
                {displayDomain}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-text)', marginTop: '0.25rem', lineHeight: 1.3 }}>
                {title || 'Page Title'}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {description || 'Page description will appear here.'}
              </div>
            </div>
          </div>
        </div>

        {/* Twitter Preview */}
        <div>
          <div style={sectionTitleStyle}>{l.twitterPreview}</div>
          <div style={{ ...previewCardStyle, borderRadius: '0.875rem' }}>
            {imageUrl && (
              <div style={{
                width: '100%',
                height: '190px',
                backgroundColor: '#e4e6eb',
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
            )}
            <div style={{ padding: '0.75rem 1rem' }}>
              <div style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-text)', lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {title || 'Page Title'}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginTop: '0.125rem', lineHeight: 1.4, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {description || 'Page description will appear here.'}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <span>&#128279;</span> {displayDomain}
              </div>
            </div>
          </div>
        </div>

        {/* LinkedIn Preview */}
        <div>
          <div style={sectionTitleStyle}>{l.linkedinPreview}</div>
          <div style={previewCardStyle}>
            {imageUrl && (
              <div style={{
                width: '100%',
                height: '200px',
                backgroundColor: '#e4e6eb',
                backgroundImage: `url(${imageUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} />
            )}
            <div style={{ padding: '0.625rem 1rem', borderTop: imageUrl ? '1px solid var(--color-border)' : 'none' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text)', lineHeight: 1.3 }}>
                {title || 'Page Title'}
              </div>
              <div className="text-xs text-[var(--color-text-secondary)] mt-1">
                {displayDomain}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Meta Tags Output */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <div style={sectionTitleStyle}>{l.metaTags}</div>
          <button
            onClick={handleCopy}
            style={{
              padding: '0.4rem 0.75rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--color-border)',
              backgroundColor: copied ? '#10b981' : 'var(--color-bg-secondary)',
              color: copied ? 'white' : 'var(--color-text)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            {copied ? l.copied : l.copy}
          </button>
        </div>
        <textarea
          readOnly
          value={metaTags}
          style={{
            ...inputStyle,
            fontFamily: "'Fira Code', monospace",
            fontSize: '0.8rem',
            height: '200px',
            resize: 'vertical',
            lineHeight: 1.6,
          }}
        />
      </div>
    </div>
  )
}
