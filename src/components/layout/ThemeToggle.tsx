'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // 從 localStorage 讀取主題設定，或使用系統偏好
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const systemTheme = prefersDark ? 'dark' : 'light'
      setTheme(systemTheme)
      applyTheme(systemTheme)
    }
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const html = document.documentElement
    html.classList.remove('light', 'dark')
    html.classList.add(newTheme)
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
  }

  // 避免 hydration 不匹配
  if (!mounted) {
    return (
      <button
        style={{
          padding: '0.5rem',
          borderRadius: '0.5rem',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-secondary)',
          color: 'var(--color-text)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.15s',
          width: '40px',
          height: '40px',
        }}
        aria-label="切換主題"
      >
        <Sun size={20} />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: '0.5rem',
        borderRadius: '0.5rem',
        border: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-bg-secondary)',
        color: 'var(--color-text)',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s',
        width: '40px',
        height: '40px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-border)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--color-bg-secondary)'
      }}
      aria-label={theme === 'light' ? '切換至深色模式' : '切換至淺色模式'}
      title={theme === 'light' ? '切換至深色模式' : '切換至淺色模式'}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}
