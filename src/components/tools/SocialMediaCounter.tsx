'use client'
import { useState } from 'react'

interface SocialMediaCounterProps {
  labels?: {
    input: string
    characters: string
    twitter: string
    instagram: string
    linkedin: string
    facebook: string
    youtube: string
    tiktok: string
    remaining: string
    overLimit: string
  }
}

const PLATFORMS = [
  { key: 'twitter', defaultLabel: 'Twitter / X', limit: 280 },
  { key: 'youtube', defaultLabel: 'YouTube Title', limit: 100 },
  { key: 'instagram', defaultLabel: 'Instagram Caption', limit: 2200 },
  { key: 'tiktok', defaultLabel: 'TikTok Caption', limit: 2200 },
  { key: 'linkedin', defaultLabel: 'LinkedIn Post', limit: 3000 },
  { key: 'facebook', defaultLabel: 'Facebook Post', limit: 63206 },
] as const

function getColor(ratio: number): string {
  if (ratio > 1) return '#ef4444'
  if (ratio >= 0.8) return '#f59e0b'
  return '#10b981'
}

export default function SocialMediaCounter({ labels }: SocialMediaCounterProps) {
  const l = {
    input: labels?.input ?? 'Type or paste your text here...',
    characters: labels?.characters ?? 'Characters',
    twitter: labels?.twitter ?? 'Twitter / X',
    instagram: labels?.instagram ?? 'Instagram Caption',
    linkedin: labels?.linkedin ?? 'LinkedIn Post',
    facebook: labels?.facebook ?? 'Facebook Post',
    youtube: labels?.youtube ?? 'YouTube Title',
    tiktok: labels?.tiktok ?? 'TikTok Caption',
    remaining: labels?.remaining ?? 'remaining',
    overLimit: labels?.overLimit ?? 'over limit',
  }

  const platformLabels: Record<string, string> = {
    twitter: l.twitter,
    instagram: l.instagram,
    linkedin: l.linkedin,
    facebook: l.facebook,
    youtube: l.youtube,
    tiktok: l.tiktok,
  }

  const [text, setText] = useState('')
  const charCount = text.length

  return (
    <div className="flex flex-col gap-6">
      {/* Textarea */}
      <div className="relative">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={l.input}
          style={{
            width: '100%',
            minHeight: '180px',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg-secondary)',
            color: 'var(--color-text)',
            fontSize: '1rem',
            fontFamily: 'inherit',
            resize: 'vertical',
            outline: 'none',
            boxSizing: 'border-box',
            lineHeight: 1.6,
          }}
        />
        <div style={{
          position: 'absolute',
          bottom: '0.75rem',
          right: '0.75rem',
          fontSize: '0.8rem',
          color: 'var(--color-text-secondary)',
          backgroundColor: 'var(--color-bg-secondary)',
          padding: '0.125rem 0.5rem',
          borderRadius: '0.25rem',
        }}>
          {charCount} {l.characters}
        </div>
      </div>

      {/* Platform progress bars */}
      <div className="flex flex-col gap-4">
        {PLATFORMS.map((platform) => {
          const ratio = charCount / platform.limit
          const remaining = platform.limit - charCount
          const color = getColor(ratio)
          const barWidth = Math.min(ratio * 100, 100)

          return (
            <div key={platform.key}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '0.375rem',
              }}>
                <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-text)' }}>
                  {platformLabels[platform.key]}
                </span>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color }}>
                  {remaining >= 0
                    ? `${remaining} ${l.remaining}`
                    : `${Math.abs(remaining)} ${l.overLimit}`}
                </span>
              </div>
              <div style={{
                width: '100%',
                height: '0.5rem',
                borderRadius: '0.25rem',
                backgroundColor: 'var(--color-border)',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: `${barWidth}%`,
                  height: '100%',
                  borderRadius: '0.25rem',
                  backgroundColor: color,
                  transition: 'width 0.15s ease, background-color 0.15s ease',
                }} />
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: '0.125rem',
              }}>
                <span className="text-[0.7rem] text-[var(--color-text-secondary)]">
                  {charCount} / {platform.limit.toLocaleString()}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
