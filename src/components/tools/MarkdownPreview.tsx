'use client'
import { useState, useMemo } from 'react'

interface MarkdownPreviewProps {
  labels?: {
    input: string
    preview: string
    inputPlaceholder: string
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function parseMarkdown(md: string): string {
  // First escape HTML entities
  let html = escapeHtml(md)

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, _lang, code) => {
    return `<pre style="background:var(--color-bg-secondary);padding:1rem;border-radius:0.375rem;overflow-x:auto;border:1px solid var(--color-border)"><code>${code.trim()}</code></pre>`
  })

  // Split into lines for block-level processing
  const lines = html.split('\n')
  const result: string[] = []
  let inList = false
  let listType: 'ul' | 'ol' | '' = ''
  let inBlockquote = false

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i]

    // Check if we're inside a <pre> block — skip processing
    if (line.includes('<pre')) {
      // Find the closing tag, could be multi-line from earlier replacement
      // Just pass through pre blocks
      result.push(line)
      continue
    }
    if (line.includes('</pre>')) {
      result.push(line)
      continue
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim()) || /^\*\*\*+$/.test(line.trim())) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = '' }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false }
      result.push('<hr style="border:none;border-top:1px solid var(--color-border);margin:1rem 0" />')
      continue
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headerMatch) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = '' }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false }
      const level = headerMatch[1].length
      const text = parseInline(headerMatch[2])
      const sizes: Record<number, string> = { 1: '1.75rem', 2: '1.5rem', 3: '1.25rem', 4: '1.1rem', 5: '1rem', 6: '0.875rem' }
      result.push(`<h${level} style="font-size:${sizes[level]};margin:0.75rem 0 0.5rem;font-weight:600">${text}</h${level}>`)
      continue
    }

    // Blockquote
    const bqMatch = line.match(/^&gt;\s?(.*)$/)
    if (bqMatch) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = '' }
      if (!inBlockquote) {
        result.push('<blockquote style="border-left:3px solid var(--color-primary);padding:0.5rem 1rem;margin:0.5rem 0;color:var(--color-text-secondary)">')
        inBlockquote = true
      }
      result.push(parseInline(bqMatch[1]))
      continue
    } else if (inBlockquote) {
      result.push('</blockquote>')
      inBlockquote = false
    }

    // Unordered list
    const ulMatch = line.match(/^[-*+]\s+(.+)$/)
    if (ulMatch) {
      if (inList && listType !== 'ul') { result.push('</ol>'); inList = false; listType = '' }
      if (!inList) { result.push('<ul style="margin:0.5rem 0;padding-left:1.5rem">'); inList = true; listType = 'ul' }
      result.push(`<li>${parseInline(ulMatch[1])}</li>`)
      continue
    }

    // Ordered list
    const olMatch = line.match(/^\d+\.\s+(.+)$/)
    if (olMatch) {
      if (inList && listType !== 'ol') { result.push('</ul>'); inList = false; listType = '' }
      if (!inList) { result.push('<ol style="margin:0.5rem 0;padding-left:1.5rem">'); inList = true; listType = 'ol' }
      result.push(`<li>${parseInline(olMatch[1])}</li>`)
      continue
    }

    // Close list if we're no longer in a list item
    if (inList) {
      result.push(listType === 'ul' ? '</ul>' : '</ol>')
      inList = false
      listType = ''
    }

    // Empty line
    if (line.trim() === '') {
      result.push('<br />')
      continue
    }

    // Regular paragraph
    result.push(`<p style="margin:0.25rem 0">${parseInline(line)}</p>`)
  }

  // Close any open tags
  if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>')
  if (inBlockquote) result.push('</blockquote>')

  return result.join('\n')
}

function parseInline(text: string): string {
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code style="background:var(--color-bg-secondary);padding:0.125rem 0.375rem;border-radius:0.25rem;font-size:0.875em;border:1px solid var(--color-border)">$1</code>')

  // Bold and italic (***text*** or ___text___)
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  text = text.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>')

  // Bold (**text** or __text__)
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>')

  // Italic (*text* or _text_)
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>')
  text = text.replace(/_(.+?)_/g, '<em>$1</em>')

  // Links [text](url)
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" style="color:var(--color-primary);text-decoration:underline" target="_blank" rel="noopener noreferrer">$1</a>')

  return text
}

const DEFAULT_MARKDOWN = `# Markdown Preview

## Features

**Bold text** and *italic text* and ***bold italic***.

### Code

Inline \`code\` example.

\`\`\`js
function hello() {
  console.log("Hello, world!");
}
\`\`\`

### Lists

- Item one
- Item two
- Item three

1. First
2. Second
3. Third

> This is a blockquote.

---

[Example link](https://example.com)
`

export default function MarkdownPreview({ labels }: MarkdownPreviewProps) {
  const l = {
    input: labels?.input ?? 'Markdown',
    preview: labels?.preview ?? 'Preview',
    inputPlaceholder: labels?.inputPlaceholder ?? 'Type your Markdown here...',
  }

  const [input, setInput] = useState(DEFAULT_MARKDOWN)

  const rendered = useMemo(() => parseMarkdown(input), [input])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.375rem',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={labelStyle}>{l.input}</span>
          <textarea
            className="tool-textarea"
            style={{ height: '500px', fontFamily: 'monospace', fontSize: '0.875rem' }}
            placeholder={l.inputPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={labelStyle}>{l.preview}</span>
          <div
            style={{
              height: '500px',
              overflowY: 'auto',
              padding: '1rem',
              borderRadius: '0.5rem',
              backgroundColor: 'var(--color-bg-secondary)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text)',
              fontSize: '0.9375rem',
              lineHeight: 1.6,
            }}
            dangerouslySetInnerHTML={{ __html: rendered }}
          />
        </div>
      </div>
    </div>
  )
}
