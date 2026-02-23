'use client'
import { useState, useCallback, useMemo } from 'react'
import * as Icons from 'lucide-react'
import CopyButton from '@/components/shared/CopyButton'

interface IconSearchProps {
  labels?: {
    title: string
    searchPlaceholder: string
    iconName: string
    copyName: string
    copyJsx: string
    copySvg: string
    copied: string
    totalIcons: string
    showingIcons: string
    noResults: string
    size: string
    strokeWidth: string
    color: string
  }
}

export default function IconSearch({ labels }: IconSearchProps) {
  const l = {
    title: labels?.title ?? 'Icon Search',
    searchPlaceholder: labels?.searchPlaceholder ?? 'Search icons...',
    iconName: labels?.iconName ?? 'Icon Name',
    copyName: labels?.copyName ?? 'Copy Name',
    copyJsx: labels?.copyJsx ?? 'Copy JSX',
    copySvg: labels?.copySvg ?? 'Copy SVG',
    copied: labels?.copied ?? 'Copied!',
    totalIcons: labels?.totalIcons ?? 'Total Icons',
    showingIcons: labels?.showingIcons ?? 'Showing',
    noResults: labels?.noResults ?? 'No icons found',
    size: labels?.size ?? 'Size',
    strokeWidth: labels?.strokeWidth ?? 'Stroke Width',
    color: labels?.color ?? 'Color',
  }

  const [searchQuery, setSearchQuery] = useState('')
  const [iconSize, setIconSize] = useState(24)
  const [strokeWidth, setStrokeWidth] = useState(2)
  const [iconColor, setIconColor] = useState('#000000')

  // Get all icon names from lucide-react
  const allIconNames = useMemo(() => {
    return Object.keys(Icons || {})
      .filter((key) => key !== 'createLucideIcon' && key !== 'default')
      .sort()
  }, [])

  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return allIconNames
    const query = searchQuery.toLowerCase()
    return (allIconNames || []).filter((name) =>
      name.toLowerCase().includes(query)
    )
  }, [searchQuery, allIconNames])

  const safeAllIconNames = Array.isArray(allIconNames) ? allIconNames : []
  const safeFilteredIcons = Array.isArray(filteredIcons) ? filteredIcons : []

  const getIconComponent = useCallback((iconName: string) => {
    const IconComponent = (Icons as any)[iconName]
    return IconComponent
  }, [])

  const handleCopyJsx = useCallback((iconName: string) => {
    const jsx = `<${iconName} size={${iconSize}} strokeWidth={${strokeWidth}} color="${iconColor}" />`
    navigator.clipboard.writeText(jsx)
  }, [iconSize, strokeWidth, iconColor])

  const handleCopySvg = useCallback((iconName: string) => {
    const IconComponent = getIconComponent(iconName)
    if (!IconComponent) return

    // Create a temporary div to render the icon
    const div = document.createElement('div')
    const tempRoot = document.createElement('div')
    tempRoot.style.display = 'none'
    document.body.appendChild(tempRoot)

    // Render icon to get SVG
    import('react-dom/client').then(({ createRoot }) => {
      const root = createRoot(tempRoot)
      root.render(
        <IconComponent size={iconSize} strokeWidth={strokeWidth} color={iconColor} />
      )

      setTimeout(() => {
        const svg = tempRoot.querySelector('svg')
        if (svg) {
          navigator.clipboard.writeText(svg.outerHTML)
        }
        root.unmount()
        document.body.removeChild(tempRoot)
      }, 100)
    })
  }, [iconSize, strokeWidth, iconColor, getIconComponent])

  return (
    <div className="flex flex-col gap-6">
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder={l.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-sm"
        />

        <div className="flex gap-4 flex-wrap">
          <div className="flex gap-2 items-center flex-1 min-w-fit">
            <label className="text-sm whitespace-nowrap">{l.size}:</label>
            <input
              type="number"
              min="12"
              max="96"
              value={iconSize}
              onChange={(e) => setIconSize(Number(e.target.value))}
              className="w-[70px] p-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-sm"
            />
          </div>

          <div className="flex gap-2 items-center flex-1 min-w-fit">
            <label className="text-sm whitespace-nowrap">{l.strokeWidth}:</label>
            <input
              type="number"
              min="1"
              max="4"
              step="0.5"
              value={strokeWidth}
              onChange={(e) => setStrokeWidth(Number(e.target.value))}
              className="w-[70px] p-1.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] text-sm"
            />
          </div>

          <div className="flex gap-2 items-center flex-1 min-w-fit">
            <label className="text-sm whitespace-nowrap">{l.color}:</label>
            <input
              type="color"
              value={iconColor}
              onChange={(e) => setIconColor(e.target.value)}
              className="w-[50px] h-8 p-0.5 rounded-md border border-[var(--color-border)] bg-[var(--color-bg)] cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="text-sm text-[var(--color-text-secondary)]">
        {l.showingIcons}: <strong>{safeFilteredIcons.length}</strong> / {safeAllIconNames.length}
      </div>

      {/* Icon Grid */}
      {safeFilteredIcons.length > 0 ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '1rem',
          }}
        >
          {safeFilteredIcons.map((iconName) => {
            const IconComponent = getIconComponent(iconName)
            if (!IconComponent) return null

            return (
              <div
                key={iconName}
                style={{
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  padding: '1rem',
                  backgroundColor: 'var(--color-bg-secondary)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.75rem',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '80px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconComponent
                    size={iconSize}
                    strokeWidth={strokeWidth}
                    color={iconColor}
                  />
                </div>

                <div
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'monospace',
                    color: 'var(--color-text-secondary)',
                    textAlign: 'center',
                    wordBreak: 'break-word',
                  }}
                >
                  {iconName}
                </div>

                <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                  <CopyButton
                    text={iconName}
                    label={l.copyName}
                    copiedLabel={l.copied}
                    size="sm"
                  />
                  <button
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)] text-xs px-2 py-1"
                    onClick={() => handleCopyJsx(iconName)}
                  >
                    {l.copyJsx}
                  </button>
                </div>
              </div>
            )
          })}
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
