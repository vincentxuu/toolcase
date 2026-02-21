'use client'
import { useState } from 'react'

interface WordCounterProps {
  labels?: {
    input: string
    words: string
    characters: string
    charactersNoSpaces: string
    sentences: string
    paragraphs: string
    readingTime: string
    minutes: string
  }
}

export default function WordCounter({ labels }: WordCounterProps) {
  const l = {
    input: labels?.input ?? 'Type or paste your text here...',
    words: labels?.words ?? 'Words',
    characters: labels?.characters ?? 'Characters',
    charactersNoSpaces: labels?.charactersNoSpaces ?? 'Characters (no spaces)',
    sentences: labels?.sentences ?? 'Sentences',
    paragraphs: labels?.paragraphs ?? 'Paragraphs',
    readingTime: labels?.readingTime ?? 'Reading Time',
    minutes: labels?.minutes ?? 'min',
  }

  const [text, setText] = useState('')

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0
  const charCount = text.length
  const charNoSpaceCount = text.replace(/\s/g, '').length
  const sentenceCount = text.trim() ? (text.match(/[.!?]+(\s|$)/g) || []).length : 0
  const paragraphCount = text.trim() ? text.split(/\n\s*\n/).filter((p) => p.trim()).length : 0
  const readingTimeMin = Math.max(1, Math.ceil(wordCount / 200))

  const statCardStyle: React.CSSProperties = {
    padding: '1rem',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
    textAlign: 'center',
  }

  const statValueStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: 700,
    color: 'var(--color-primary)',
    lineHeight: 1.2,
  }

  const statLabelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    color: 'var(--color-text-secondary)',
    marginTop: '0.25rem',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <textarea
        className="tool-textarea"
        style={{ height: '250px' }}
        placeholder={l.input}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{wordCount}</div>
          <div style={statLabelStyle}>{l.words}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{charCount}</div>
          <div style={statLabelStyle}>{l.characters}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{charNoSpaceCount}</div>
          <div style={statLabelStyle}>{l.charactersNoSpaces}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{sentenceCount}</div>
          <div style={statLabelStyle}>{l.sentences}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>{paragraphCount}</div>
          <div style={statLabelStyle}>{l.paragraphs}</div>
        </div>
        <div style={statCardStyle}>
          <div style={statValueStyle}>
            {wordCount > 0 ? readingTimeMin : 0}
          </div>
          <div style={statLabelStyle}>{l.readingTime} ({l.minutes})</div>
        </div>
      </div>
    </div>
  )
}
