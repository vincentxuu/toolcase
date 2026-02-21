'use client'
import { useState } from 'react'

interface Props {
  labels?: {
    pageTitle: string; metaDescription: string; keywords: string; author: string
    robots: string; index: string; noindex: string; follow: string; nofollow: string
    canonicalUrl: string; ogImage: string; serpPreview: string; generatedCode: string
    copy: string; copied: string; titleLength: string; descLength: string
  }
}

export default function MetaTagGenerator({ labels }: Props) {
  const l = {
    pageTitle: labels?.pageTitle ?? 'Page Title',
    metaDescription: labels?.metaDescription ?? 'Meta Description',
    keywords: labels?.keywords ?? 'Keywords',
    author: labels?.author ?? 'Author',
    robots: labels?.robots ?? 'Robots',
    index: labels?.index ?? 'Index',
    noindex: labels?.noindex ?? 'Noindex',
    follow: labels?.follow ?? 'Follow',
    nofollow: labels?.nofollow ?? 'Nofollow',
    canonicalUrl: labels?.canonicalUrl ?? 'Canonical URL',
    ogImage: labels?.ogImage ?? 'OG Image URL',
    serpPreview: labels?.serpPreview ?? 'Google SERP Preview',
    generatedCode: labels?.generatedCode ?? 'Generated Meta Tags',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
    titleLength: labels?.titleLength ?? 'Title length',
    descLength: labels?.descLength ?? 'Description length',
  }

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [keywords, setKeywords] = useState('')
  const [author, setAuthor] = useState('')
  const [indexable, setIndexable] = useState(true)
  const [followable, setFollowable] = useState(true)
  const [canonical, setCanonical] = useState('')
  const [ogImage, setOgImage] = useState('')
  const [copied, setCopied] = useState(false)

  const robotsContent = `${indexable ? 'index' : 'noindex'}, ${followable ? 'follow' : 'nofollow'}`

  const code = [
    `<title>${title}</title>`,
    description && `<meta name="description" content="${description}" />`,
    keywords && `<meta name="keywords" content="${keywords}" />`,
    author && `<meta name="author" content="${author}" />`,
    `<meta name="robots" content="${robotsContent}" />`,
    canonical && `<link rel="canonical" href="${canonical}" />`,
    title && `<meta property="og:title" content="${title}" />`,
    description && `<meta property="og:description" content="${description}" />`,
    ogImage && `<meta property="og:image" content="${ogImage}" />`,
    canonical && `<meta property="og:url" content="${canonical}" />`,
    title && `<meta name="twitter:card" content="summary_large_image" />`,
    title && `<meta name="twitter:title" content="${title}" />`,
    description && `<meta name="twitter:description" content="${description}" />`,
    ogImage && `<meta name="twitter:image" content="${ogImage}" />`,
  ].filter(Boolean).join('\n')

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '0.9rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.25rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const titleColor = title.length > 60 ? '#ef4444' : title.length >= 50 ? '#22c55e' : 'var(--color-text-secondary)'
  const descColor = description.length > 160 ? '#ef4444' : description.length >= 150 ? '#22c55e' : 'var(--color-text-secondary)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.pageTitle} <span style={{ color: titleColor, fontSize: '0.75rem' }}>({title.length}/60)</span></label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} placeholder="My Awesome Page" />
        </div>
        <div>
          <label style={labelStyle}>{l.author}</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} style={inputStyle} />
        </div>
      </div>
      <div>
        <label style={labelStyle}>{l.metaDescription} <span style={{ color: descColor, fontSize: '0.75rem' }}>({description.length}/160)</span></label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inputStyle, minHeight: '60px', resize: 'vertical' }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.keywords}</label>
          <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} style={inputStyle} placeholder="keyword1, keyword2, keyword3" />
        </div>
        <div>
          <label style={labelStyle}>{l.canonicalUrl}</label>
          <input type="text" value={canonical} onChange={(e) => setCanonical(e.target.value)} style={inputStyle} placeholder="https://example.com/page" />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
        <div>
          <label style={labelStyle}>{l.ogImage}</label>
          <input type="text" value={ogImage} onChange={(e) => setOgImage(e.target.value)} style={inputStyle} placeholder="https://example.com/image.jpg" />
        </div>
        <div>
          <label style={labelStyle}>{l.robots}</label>
          <div style={{ display: 'flex', gap: '1rem', padding: '0.75rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={indexable} onChange={(e) => setIndexable(e.target.checked)} /> {l.index}
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={followable} onChange={(e) => setFollowable(e.target.checked)} /> {l.follow}
            </label>
          </div>
        </div>
      </div>

      {title && (
        <div style={{ padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.5rem', fontWeight: 600 }}>{l.serpPreview}</div>
          <div style={{ fontSize: '1.125rem', color: '#1a0dab', cursor: 'pointer', marginBottom: '0.125rem' }}>{title}</div>
          <div style={{ fontSize: '0.8rem', color: '#006621', marginBottom: '0.25rem' }}>{canonical || 'https://example.com/page'}</div>
          <div style={{ fontSize: '0.85rem', color: '#545454', lineHeight: 1.4 }}>{description || 'No description provided.'}</div>
        </div>
      )}

      <div style={{ position: 'relative' }}>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem', fontWeight: 500 }}>{l.generatedCode}</div>
        <pre style={{ ...inputStyle, whiteSpace: 'pre-wrap', fontFamily: "'Fira Code', monospace", fontSize: '0.8rem', minHeight: '100px', overflow: 'auto' }}>{code}</pre>
        <button className="btn-secondary" onClick={handleCopy} style={{ position: 'absolute', top: '2rem', right: '0.5rem' }}>
          {copied ? l.copied : l.copy}
        </button>
      </div>
    </div>
  )
}
