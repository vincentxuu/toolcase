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
        className="p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] cursor-pointer flex items-center justify-center transition-all w-10 h-10"
        aria-label="切換主題"
      >
        <Sun size={20} />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-secondary)] text-[var(--color-text)] cursor-pointer flex items-center justify-center transition-all w-10 h-10 hover:bg-[var(--color-border)]"
      aria-label={theme === 'light' ? '切換至深色模式' : '切換至淺色模式'}
      title={theme === 'light' ? '切換至深色模式' : '切換至淺色模式'}
    >
      {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}
