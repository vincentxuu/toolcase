'use client'
import { useState, useRef, useEffect } from 'react'
import { getDictionary } from '@/i18n/get-dict'
import type { Locale } from '@/i18n/config'
import SearchSuggestions from './SearchSuggestions'
import { getSearchSuggestions } from '@/lib/search-tools'

interface SearchBarProps {
  locale: Locale
  variant?: 'navbar' | 'hero' | 'inline'
}

export default function SearchBar({ locale, variant = 'inline' }: SearchBarProps) {
  const t = getDictionary(locale)
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<ReturnType<typeof getSearchSuggestions>>([])
  const containerRef = useRef<HTMLDivElement>(null)

  // 樣式變體類別
  const containerClasses = {
    navbar: 'max-w-[500px] w-full',
    hero: 'max-w-[600px] w-full',
    inline: 'w-full',
  }

  const inputClasses = {
    navbar: 'text-sm py-2 pl-10 pr-4',
    hero: 'text-base py-3 pl-12 pr-4',
    inline: 'text-sm py-2 pl-10 pr-4',
  }

  const iconClasses = {
    navbar: 'left-3 w-5 h-5',
    hero: 'left-4 w-5 h-5',
    inline: 'left-3 w-5 h-5',
  }

  // 處理搜尋輸入（debounced）
  useEffect(() => {
    if (query.trim().length < 2) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const timer = setTimeout(() => {
      const results = getSearchSuggestions(query, locale, 8)
      setSuggestions(results)
      setShowSuggestions(results.length > 0)
    }, 200) // 200ms debounce

    return () => clearTimeout(timer)
  }, [query, locale])

  // 點擊外部關閉建議
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className={`relative ${containerClasses[variant]}`}>
      <div className="relative">
        {/* 搜尋圖標 */}
        <svg
          className={`absolute top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] ${iconClasses[variant]}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        {/* 輸入框 */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.search_placeholder}
          className={`w-full border border-[var(--color-border)] rounded-lg bg-[var(--color-background)] text-[var(--color-text)] outline-none transition-colors hover:border-[var(--color-primary)] focus:border-[var(--color-primary)] ${inputClasses[variant]}`}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true)
            }
          }}
        />

        {/* 清除按鈕 */}
        {query && (
          <button
            onClick={() => {
              setQuery('')
              setSuggestions([])
              setShowSuggestions(false)
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 border-0 bg-transparent text-[var(--color-text-secondary)] cursor-pointer flex items-center justify-center hover:text-[var(--color-text)]"
          >
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </div>

      {/* 搜尋建議 */}
      {showSuggestions && suggestions.length > 0 && (
        <SearchSuggestions
          suggestions={suggestions}
          locale={locale}
          onClose={() => setShowSuggestions(false)}
        />
      )}
    </div>
  )
}
