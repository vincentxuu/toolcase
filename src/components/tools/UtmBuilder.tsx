'use client'
import { useState, useCallback } from 'react'

interface UtmBuilderProps {
  labels?: {
    websiteUrl: string
    source: string
    medium: string
    campaignName: string
    term: string
    content: string
    generatedUrl: string
    copy: string
    copied: string
    required: string
  }
}

const PRESETS: { name: string; source: string; medium: string }[] = [
  { name: 'Google', source: 'google', medium: 'cpc' },
  { name: 'Facebook', source: 'facebook', medium: 'social' },
  { name: 'Twitter', source: 'twitter', medium: 'social' },
  { name: 'LinkedIn', source: 'linkedin', medium: 'social' },
  { name: 'Email', source: 'newsletter', medium: 'email' },
]

export default function UtmBuilder({ labels }: UtmBuilderProps) {
  const l = {
    websiteUrl: labels?.websiteUrl ?? 'Website URL',
    source: labels?.source ?? 'Campaign Source',
    medium: labels?.medium ?? 'Campaign Medium',
    campaignName: labels?.campaignName ?? 'Campaign Name',
    term: labels?.term ?? 'Campaign Term',
    content: labels?.content ?? 'Campaign Content',
    generatedUrl: labels?.generatedUrl ?? 'Generated URL',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    required: labels?.required ?? 'required',
  }

  const [url, setUrl] = useState('https://example.com')
  const [source, setSource] = useState('')
  const [medium, setMedium] = useState('')
  const [campaignName, setCampaignName] = useState('')
  const [term, setTerm] = useState('')
  const [content, setContent] = useState('')
  const [copied, setCopied] = useState(false)

  const generatedUrl = (() => {
    try {
      const base = url.startsWith('http') ? url : `https://${url}`
      const u = new URL(base)
      if (source) u.searchParams.set('utm_source', source)
      if (medium) u.searchParams.set('utm_medium', medium)
      if (campaignName) u.searchParams.set('utm_campaign', campaignName)
      if (term) u.searchParams.set('utm_term', term)
      if (content) u.searchParams.set('utm_content', content)
      return u.toString()
    } catch {
      return ''
    }
  })()

  const handleCopy = useCallback(async () => {
    if (!generatedUrl) return
    try {
      await navigator.clipboard.writeText(generatedUrl)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = generatedUrl
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [generatedUrl])

  const applyPreset = (preset: typeof PRESETS[number]) => {
    setSource(preset.source)
    setMedium(preset.medium)
  }

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

  const requiredStyle: React.CSSProperties = {
    color: '#ef4444',
    fontSize: '0.75rem',
    marginLeft: '0.25rem',
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Preset buttons */}
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.name}
            onClick={() => applyPreset(preset)}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '0.5rem',
              border: '1px solid var(--color-border)',
              backgroundColor: source === preset.source && medium === preset.medium
                ? 'var(--color-primary)'
                : 'var(--color-bg-secondary)',
              color: source === preset.source && medium === preset.medium
                ? 'white'
                : 'var(--color-text)',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Website URL */}
      <div>
        <label style={labelStyle}>
          {l.websiteUrl}
          <span style={requiredStyle}>*</span>
        </label>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          style={inputStyle}
        />
      </div>

      {/* Source & Medium */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>
            {l.source}
            <span style={requiredStyle}>* {l.required}</span>
          </label>
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            placeholder="google"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>
            {l.medium}
            <span style={requiredStyle}>* {l.required}</span>
          </label>
          <input
            type="text"
            value={medium}
            onChange={(e) => setMedium(e.target.value)}
            placeholder="cpc"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Campaign Name */}
      <div>
        <label style={labelStyle}>
          {l.campaignName}
          <span style={requiredStyle}>* {l.required}</span>
        </label>
        <input
          type="text"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          placeholder="spring_sale"
          style={inputStyle}
        />
      </div>

      {/* Term & Content (optional) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label style={labelStyle}>{l.term}</label>
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="running+shoes"
            style={inputStyle}
          />
        </div>
        <div>
          <label style={labelStyle}>{l.content}</label>
          <input
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="logolink"
            style={inputStyle}
          />
        </div>
      </div>

      {/* Generated URL */}
      <div>
        <label style={labelStyle}>{l.generatedUrl}</label>
        <div style={{
          position: 'relative',
          padding: '1rem',
          paddingRight: '5.5rem',
          borderRadius: '0.75rem',
          backgroundColor: 'var(--color-bg-secondary)',
          border: '1px solid var(--color-border)',
          fontSize: '0.85rem',
          wordBreak: 'break-all',
          color: generatedUrl ? 'var(--color-primary)' : 'var(--color-text-secondary)',
          minHeight: '3rem',
          fontFamily: "'Fira Code', monospace",
        }}>
          {generatedUrl || 'Enter a URL and parameters to generate...'}
          <div className="absolute top-2 right-2">
            <button
              onClick={handleCopy}
              disabled={!generatedUrl}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--color-border)',
                backgroundColor: copied ? '#10b981' : 'var(--color-bg-secondary)',
                color: copied ? 'white' : 'var(--color-text)',
                cursor: generatedUrl ? 'pointer' : 'not-allowed',
                fontSize: '0.8rem',
                fontWeight: 500,
                opacity: generatedUrl ? 1 : 0.5,
              }}
            >
              {copied ? l.copied : l.copy}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
