'use client'
import { useState, useCallback, useMemo } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface Font {
  name: string
  family: string
  category: string
  variants: string[]
}

interface FontPreviewProps {
  labels?: {
    title: string
    searchPlaceholder: string
    previewText: string
    previewPlaceholder: string
    fontSize: string
    category: string
    allCategories: string
    serif: string
    sansSerif: string
    display: string
    handwriting: string
    monospace: string
    copyImport: string
    copyCss: string
    copied: string
    showingFonts: string
    noResults: string
    variants: string
  }
}

export default function FontPreview({ labels }: FontPreviewProps) {
  const l = {
    title: labels?.title ?? 'Font Preview',
    searchPlaceholder: labels?.searchPlaceholder ?? 'Search fonts...',
    previewText: labels?.previewText ?? 'Preview Text',
    previewPlaceholder: labels?.previewPlaceholder ?? 'The quick brown fox jumps over the lazy dog',
    fontSize: labels?.fontSize ?? 'Font Size',
    category: labels?.category ?? 'Category',
    allCategories: labels?.allCategories ?? 'All Categories',
    serif: labels?.serif ?? 'Serif',
    sansSerif: labels?.sansSerif ?? 'Sans Serif',
    display: labels?.display ?? 'Display',
    handwriting: labels?.handwriting ?? 'Handwriting',
    monospace: labels?.monospace ?? 'Monospace',
    copyImport: labels?.copyImport ?? 'Copy Import',
    copyCss: labels?.copyCss ?? 'Copy CSS',
    copied: labels?.copied ?? 'Copied!',
    showingFonts: labels?.showingFonts ?? 'Showing',
    noResults: labels?.noResults ?? 'No fonts found',
    variants: labels?.variants ?? 'Variants',
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog')
  const [fontSize, setFontSize] = useState(32)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Popular Google Fonts
  const fonts: Font[] = useMemo(() => [
    { name: 'Roboto', family: 'Roboto', category: 'sans-serif', variants: ['300', '400', '500', '700', '900'] },
    { name: 'Open Sans', family: 'Open Sans', category: 'sans-serif', variants: ['300', '400', '600', '700', '800'] },
    { name: 'Lato', family: 'Lato', category: 'sans-serif', variants: ['300', '400', '700', '900'] },
    { name: 'Montserrat', family: 'Montserrat', category: 'sans-serif', variants: ['300', '400', '500', '600', '700', '800', '900'] },
    { name: 'Poppins', family: 'Poppins', category: 'sans-serif', variants: ['300', '400', '500', '600', '700', '800', '900'] },
    { name: 'Inter', family: 'Inter', category: 'sans-serif', variants: ['300', '400', '500', '600', '700', '800', '900'] },
    { name: 'Nunito', family: 'Nunito', category: 'sans-serif', variants: ['300', '400', '600', '700', '800', '900'] },
    { name: 'Raleway', family: 'Raleway', category: 'sans-serif', variants: ['300', '400', '500', '600', '700', '800', '900'] },
    { name: 'Playfair Display', family: 'Playfair Display', category: 'serif', variants: ['400', '500', '600', '700', '800', '900'] },
    { name: 'Merriweather', family: 'Merriweather', category: 'serif', variants: ['300', '400', '700', '900'] },
    { name: 'PT Serif', family: 'PT Serif', category: 'serif', variants: ['400', '700'] },
    { name: 'Lora', family: 'Lora', category: 'serif', variants: ['400', '500', '600', '700'] },
    { name: 'Bebas Neue', family: 'Bebas Neue', category: 'display', variants: ['400'] },
    { name: 'Pacifico', family: 'Pacifico', category: 'handwriting', variants: ['400'] },
    { name: 'Dancing Script', family: 'Dancing Script', category: 'handwriting', variants: ['400', '500', '600', '700'] },
    { name: 'Caveat', family: 'Caveat', category: 'handwriting', variants: ['400', '500', '600', '700'] },
    { name: 'Fira Code', family: 'Fira Code', category: 'monospace', variants: ['300', '400', '500', '600', '700'] },
    { name: 'JetBrains Mono', family: 'JetBrains Mono', category: 'monospace', variants: ['300', '400', '500', '600', '700', '800'] },
    { name: 'Source Code Pro', family: 'Source Code Pro', category: 'monospace', variants: ['300', '400', '600', '700', '900'] },
    { name: 'Ubuntu', family: 'Ubuntu', category: 'sans-serif', variants: ['300', '400', '500', '700'] },
  ], [])

  const filteredFonts = useMemo(() => {
    return fonts.filter((font) => {
      const matchesSearch = font.name.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === 'all' || font.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [fonts, searchQuery, selectedCategory])

  const handleCopyImport = useCallback((fontFamily: string) => {
    const importUrl = `@import url('https://fonts.googleapis.com/css2?family=${fontFamily.replace(/ /g, '+')}:wght@300;400;500;600;700;800;900&display=swap');`
    navigator.clipboard.writeText(importUrl)
  }, [])

  const handleCopyCss = useCallback((fontFamily: string) => {
    const css = `font-family: '${fontFamily}', ${
      fonts.find((f) => f.family === fontFamily)?.category || 'sans-serif'
    };`
    navigator.clipboard.writeText(css)
  }, [fonts])

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder={l.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            flex: 1,
            minWidth: '200px',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
            fontSize: '0.875rem',
          }}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
            fontSize: '0.875rem',
          }}
        >
          <option value="all">{l.allCategories}</option>
          <option value="sans-serif">{l.sansSerif}</option>
          <option value="serif">{l.serif}</option>
          <option value="display">{l.display}</option>
          <option value="handwriting">{l.handwriting}</option>
          <option value="monospace">{l.monospace}</option>
        </select>

        <div className="flex gap-2 items-center">
          <label style={{ fontSize: '0.875rem', whiteSpace: 'nowrap' }}>{l.fontSize}:</label>
          <input
            type="number"
            min="12"
            max="72"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            style={{
              width: '70px',
              padding: '0.375rem',
              borderRadius: '0.375rem',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
              fontSize: '0.875rem',
            }}
          />
        </div>
      </div>

      {/* Preview Text Input */}
      <div>
        <label className="block mb-2 text-sm font-semibold">
          {l.previewText}
        </label>
        <input
          type="text"
          placeholder={l.previewPlaceholder}
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '0.375rem',
            border: '1px solid var(--color-border)',
            backgroundColor: 'var(--color-bg)',
            color: 'var(--color-text)',
            fontSize: '0.875rem',
          }}
        />
      </div>

      {/* Stats */}
      <div className="text-sm text-[var(--color-text-secondary)]">
        {l.showingFonts}: <strong>{filteredFonts.length}</strong> / {fonts.length}
      </div>

      {/* Font List */}
      {filteredFonts.length > 0 ? (
        <div className="flex flex-col gap-4">
          {filteredFonts.map((font) => (
            <div
              key={font.family}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1.5rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, margin: 0, marginBottom: '0.25rem' }}>
                    {font.name}
                  </h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-text-tertiary)' }}>
                    {font.category}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]"
                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                    onClick={() => handleCopyImport(font.family)}
                  >
                    {l.copyImport}
                  </button>
                  <button
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]"
                    style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}
                    onClick={() => handleCopyCss(font.family)}
                  >
                    {l.copyCss}
                  </button>
                </div>
              </div>

              <link
                href={`https://fonts.googleapis.com/css2?family=${font.family.replace(
                  / /g,
                  '+'
                )}:wght@${font.variants.join(';')}&display=swap`}
                rel="stylesheet"
              />

              <div
                style={{
                  fontFamily: `'${font.family}', ${font.category}`,
                  fontSize: `${fontSize}px`,
                  padding: '1rem',
                  backgroundColor: 'var(--color-bg)',
                  borderRadius: '0.375rem',
                  border: '1px solid var(--color-border)',
                  lineHeight: 1.4,
                }}
              >
                {previewText || l.previewPlaceholder}
              </div>

              {font.variants.length > 1 && (
                <div style={{ marginTop: '0.75rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
                  {l.variants}: {font.variants.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div
          style={{
            padding: '3rem 1rem',
            textAlign: 'center',
            color: 'var(--color-text-secondary)',
            border: '2px dashed var(--color-border)',
            borderRadius: '0.5rem',
          }}
        >
          {l.noResults}
        </div>
      )}
    </div>
  )
}
