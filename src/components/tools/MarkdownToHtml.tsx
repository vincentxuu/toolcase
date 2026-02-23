'use client'
import { useState, useMemo } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface MarkdownToHtmlProps {
  labels?: {
    inputPlaceholder: string
    input: string
    output: string
    copy: string
    copied: string
  }
}

function convertMarkdownToHtml(md: string): string {
  let html = md

  // Code blocks (``` ... ```)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const escapedCode = escapeHtml(code.trim())
    const langAttr = lang ? ` class="language-${lang}"` : ''
    return `<pre><code${langAttr}>${escapedCode}</code></pre>`
  })

  // Split into lines for block-level processing
  const lines = html.split('\n')
  const result: string[] = []
  let inList = false
  let listType: 'ul' | 'ol' | '' = ''
  let inBlockquote = false
  let inPre = false

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Track pre blocks
    if (line.includes('<pre>')) {
      inPre = true
      result.push(line)
      continue
    }
    if (line.includes('</pre>')) {
      inPre = false
      result.push(line)
      continue
    }
    if (inPre) {
      result.push(line)
      continue
    }

    // Horizontal rule
    if (/^---+$/.test(line.trim()) || /^\*\*\*+$/.test(line.trim())) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = '' }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false }
      result.push('<hr>')
      continue
    }

    // Headers
    const headerMatch = line.match(/^(#{1,6})\s+(.+)$/)
    if (headerMatch) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = '' }
      if (inBlockquote) { result.push('</blockquote>'); inBlockquote = false }
      const level = headerMatch[1].length
      const text = parseInlineMarkdown(headerMatch[2])
      result.push(`<h${level}>${text}</h${level}>`)
      continue
    }

    // Blockquote
    const bqMatch = line.match(/^>\s?(.*)$/)
    if (bqMatch) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false; listType = '' }
      if (!inBlockquote) {
        result.push('<blockquote>')
        inBlockquote = true
      }
      result.push(`<p>${parseInlineMarkdown(bqMatch[1])}</p>`)
      continue
    } else if (inBlockquote) {
      result.push('</blockquote>')
      inBlockquote = false
    }

    // Unordered list
    const ulMatch = line.match(/^[-*+]\s+(.+)$/)
    if (ulMatch) {
      if (inList && listType !== 'ul') { result.push('</ol>'); inList = false; listType = '' }
      if (!inList) { result.push('<ul>'); inList = true; listType = 'ul' }
      result.push(`<li>${parseInlineMarkdown(ulMatch[1])}</li>`)
      continue
    }

    // Ordered list
    const olMatch = line.match(/^\d+\.\s+(.+)$/)
    if (olMatch) {
      if (inList && listType !== 'ol') { result.push('</ul>'); inList = false; listType = '' }
      if (!inList) { result.push('<ol>'); inList = true; listType = 'ol' }
      result.push(`<li>${parseInlineMarkdown(olMatch[1])}</li>`)
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
      continue
    }

    // Regular paragraph
    result.push(`<p>${parseInlineMarkdown(line)}</p>`)
  }

  // Close any open tags
  if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>')
  if (inBlockquote) result.push('</blockquote>')

  return result.join('\n')
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function parseInlineMarkdown(text: string): string {
  // Inline code
  text = text.replace(/`([^`]+)`/g, '<code>$1</code>')

  // Bold and italic
  text = text.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
  text = text.replace(/___(.+?)___/g, '<strong><em>$1</em></strong>')

  // Bold
  text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/__(.+?)__/g, '<strong>$1</strong>')

  // Italic
  text = text.replace(/\*(.+?)\*/g, '<em>$1</em>')
  text = text.replace(/_(.+?)_/g, '<em>$1</em>')

  // Images
  text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')

  // Links
  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')

  return text
}

const DEFAULT_MARKDOWN = `# Hello World

This is a **bold** and *italic* example.

## Lists

- Item one
- Item two
- Item three

1. First
2. Second
3. Third

## Code

Inline \`code\` example.

\`\`\`js
function hello() {
  console.log("Hello!");
}
\`\`\`

> This is a blockquote.

[Example link](https://example.com)

---

That's all!
`

export default function MarkdownToHtml({ labels }: MarkdownToHtmlProps) {
  const l = {
    inputPlaceholder: labels?.inputPlaceholder ?? 'Enter Markdown text...',
    input: labels?.input ?? 'Markdown',
    output: labels?.output ?? 'HTML Output',
    copy: labels?.copy ?? 'Copy',
    copied: labels?.copied ?? 'Copied!',
  }

  const [input, setInput] = useState(DEFAULT_MARKDOWN)

  const htmlOutput = useMemo(() => convertMarkdownToHtml(input), [input])

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'var(--color-text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '0.375rem',
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span style={labelStyle}>{l.input}</span>
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
            style={{ height: '500px', fontFamily: 'monospace', fontSize: '0.875rem' }}
            placeholder={l.inputPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
          <span style={labelStyle}>{l.output}</span>
          <textarea
            className="w-full min-h-[200px] p-4 border border-[var(--color-border)] rounded-lg bg-[var(--color-bg-secondary)] text-[var(--color-text)] font-mono text-sm resize-y focus:outline-none focus:border-[var(--color-primary)] focus:ring-4 focus:ring-blue-600/10 transition-all"
            style={{ height: '500px', fontFamily: 'monospace', fontSize: '0.875rem' }}
            value={htmlOutput}
            readOnly
          />
          {htmlOutput && (
            <div style={{ position: 'absolute', top: '1.5rem', right: '0.5rem' }}>
              <CopyButton text={htmlOutput} label={l.copy} copiedLabel={l.copied} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
