'use client'
import { useState, useCallback } from 'react'

interface SpecialSymbolsProps {
  labels?: {
    clickToCopy: string
    copied: string
    search: string
    searchPlaceholder: string
    categories: { name: string; symbols: { char: string; name: string }[] }[]
  }
}

const DEFAULT_CATEGORIES = [
  {
    name: '箭頭符號',
    symbols: [
      { char: '→', name: '右箭頭' }, { char: '←', name: '左箭頭' }, { char: '↑', name: '上箭頭' }, { char: '↓', name: '下箭頭' },
      { char: '↗', name: '右上' }, { char: '↘', name: '右下' }, { char: '↙', name: '左下' }, { char: '↖', name: '左上' },
      { char: '⇒', name: '雙線右' }, { char: '⇐', name: '雙線左' }, { char: '⇑', name: '雙線上' }, { char: '⇓', name: '雙線下' },
      { char: '➜', name: '粗右箭頭' }, { char: '➤', name: '三角右' }, { char: '▶', name: '播放' }, { char: '◀', name: '倒退' },
      { char: '⟵', name: '長左箭頭' }, { char: '⟶', name: '長右箭頭' }, { char: '↔', name: '左右' }, { char: '↕', name: '上下' },
    ],
  },
  {
    name: '勾選 / 叉叉',
    symbols: [
      { char: '✓', name: '勾' }, { char: '✔', name: '粗勾' }, { char: '☑', name: '勾選框' }, { char: '✅', name: '綠勾' },
      { char: '✗', name: '叉' }, { char: '✘', name: '粗叉' }, { char: '❌', name: '紅叉' }, { char: '☒', name: '叉選框' },
      { char: '○', name: '空心圈' }, { char: '●', name: '實心圈' }, { char: '◎', name: '雙圈' }, { char: '⊕', name: '圈加' },
    ],
  },
  {
    name: '星星 / 愛心',
    symbols: [
      { char: '★', name: '實心星' }, { char: '☆', name: '空心星' }, { char: '✦', name: '四角星' }, { char: '✧', name: '空四角星' },
      { char: '⭐', name: '金星' }, { char: '🌟', name: '閃亮星' }, { char: '💫', name: '暈星' }, { char: '✨', name: '火花' },
      { char: '♥', name: '實心愛心' }, { char: '♡', name: '空心愛心' }, { char: '❤', name: '紅愛心' }, { char: '💛', name: '黃愛心' },
      { char: '💚', name: '綠愛心' }, { char: '💙', name: '藍愛心' }, { char: '💜', name: '紫愛心' }, { char: '🖤', name: '黑愛心' },
    ],
  },
  {
    name: '數學符號',
    symbols: [
      { char: '±', name: '正負' }, { char: '×', name: '乘' }, { char: '÷', name: '除' }, { char: '≠', name: '不等於' },
      { char: '≈', name: '約等於' }, { char: '≤', name: '小於等於' }, { char: '≥', name: '大於等於' }, { char: '∞', name: '無限' },
      { char: '√', name: '根號' }, { char: '∑', name: '求和' }, { char: '∏', name: '連乘' }, { char: '∫', name: '積分' },
      { char: 'π', name: '圓周率' }, { char: 'Δ', name: 'Delta' }, { char: '∂', name: '偏微分' }, { char: '∇', name: '梯度' },
      { char: '∈', name: '屬於' }, { char: '∉', name: '不屬於' }, { char: '∩', name: '交集' }, { char: '∪', name: '聯集' },
    ],
  },
  {
    name: '貨幣符號',
    symbols: [
      { char: '$', name: '美元' }, { char: '€', name: '歐元' }, { char: '£', name: '英鎊' }, { char: '¥', name: '日圓/人民幣' },
      { char: '₩', name: '韓元' }, { char: '₹', name: '印度盧比' }, { char: '₿', name: '比特幣' }, { char: '¢', name: '美分' },
      { char: '₫', name: '越南盾' }, { char: '₱', name: '菲律賓比索' }, { char: '฿', name: '泰銖' }, { char: '₺', name: '土耳其里拉' },
    ],
  },
  {
    name: '標點 / 排版',
    symbols: [
      { char: '—', name: '破折號' }, { char: '–', name: '短破折號' }, { char: '…', name: '省略號' }, { char: '·', name: '中點' },
      { char: '•', name: '項目符號' }, { char: '†', name: '十字' }, { char: '‡', name: '雙十字' }, { char: '§', name: '章節' },
      { char: '¶', name: '段落' }, { char: '©', name: '版權' }, { char: '®', name: '註冊商標' }, { char: '™', name: '商標' },
      { char: '「', name: '左引號' }, { char: '」', name: '右引號' }, { char: '『', name: '左雙引號' }, { char: '』', name: '右雙引號' },
      { char: '【', name: '左方括號' }, { char: '】', name: '右方括號' }, { char: '〈', name: '左角括號' }, { char: '〉', name: '右角括號' },
    ],
  },
  {
    name: '線條 / 方塊',
    symbols: [
      { char: '─', name: '橫線' }, { char: '│', name: '直線' }, { char: '┌', name: '左上角' }, { char: '┐', name: '右上角' },
      { char: '└', name: '左下角' }, { char: '┘', name: '右下角' }, { char: '├', name: '左T' }, { char: '┤', name: '右T' },
      { char: '┬', name: '上T' }, { char: '┴', name: '下T' }, { char: '┼', name: '十字' }, { char: '═', name: '雙橫線' },
      { char: '█', name: '全方塊' }, { char: '▓', name: '深方塊' }, { char: '▒', name: '中方塊' }, { char: '░', name: '淺方塊' },
      { char: '▲', name: '上三角' }, { char: '▼', name: '下三角' }, { char: '◆', name: '菱形' }, { char: '◇', name: '空菱形' },
    ],
  },
  {
    name: '音樂 / 天氣 / 其他',
    symbols: [
      { char: '♩', name: '音符' }, { char: '♪', name: '八分音符' }, { char: '♫', name: '雙音符' }, { char: '♬', name: '十六分音符' },
      { char: '☀', name: '太陽' }, { char: '☁', name: '雲' }, { char: '☂', name: '雨傘' }, { char: '❄', name: '雪花' },
      { char: '☎', name: '電話' }, { char: '✉', name: '信封' }, { char: '✂', name: '剪刀' }, { char: '⚡', name: '閃電' },
      { char: '♠', name: '黑桃' }, { char: '♣', name: '梅花' }, { char: '♦', name: '方塊' }, { char: '♥', name: '紅心' },
      { char: '☮', name: '和平' }, { char: '☯', name: '太極' }, { char: '♻', name: '回收' }, { char: '⚠', name: '警告' },
    ],
  },
]

export default function SpecialSymbols({ labels }: SpecialSymbolsProps) {
  const l = {
    clickToCopy: labels?.clickToCopy ?? '點擊符號即可複製',
    copied: labels?.copied ?? '已複製！',
    search: labels?.search ?? '搜尋',
    searchPlaceholder: labels?.searchPlaceholder ?? '搜尋符號名稱...',
    categories: labels?.categories ?? DEFAULT_CATEGORIES,
  }

  const [copiedChar, setCopiedChar] = useState<string | null>(null)
  const [search, setSearch] = useState('')

  const handleCopy = useCallback((char: string) => {
    navigator.clipboard.writeText(char)
    setCopiedChar(char)
    setTimeout(() => setCopiedChar(null), 1200)
  }, [])

  const filteredCategories = search.trim()
    ? l.categories.map(cat => ({
        ...cat,
        symbols: cat.symbols.filter(s =>
          s.name.toLowerCase().includes(search.toLowerCase()) || s.char.includes(search)
        ),
      })).filter(cat => cat.symbols.length > 0)
    : l.categories

  const sectionStyle: React.CSSProperties = {
    padding: '1.25rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.75rem',
    backgroundColor: 'var(--color-bg-secondary)',
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Search + Hint */}
      <div style={sectionStyle}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder={l.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              minWidth: '200px',
              padding: '0.625rem',
              border: '1px solid var(--color-border)',
              borderRadius: '0.375rem',
              fontSize: '0.9rem',
              backgroundColor: 'var(--color-bg)',
              color: 'var(--color-text)',
            }}
          />
          <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>
            {l.clickToCopy}
          </span>
        </div>
      </div>

      {/* Copied Toast */}
      {copiedChar && (
        <div style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          padding: '0.625rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'var(--color-success)',
          color: '#fff',
          fontWeight: 600,
          fontSize: '0.875rem',
          zIndex: 9999,
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}>
          {copiedChar} {l.copied}
        </div>
      )}

      {/* Symbol Categories */}
      {filteredCategories.map((cat, ci) => (
        <div key={ci} style={sectionStyle}>
          <h3 style={{ fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.95rem' }}>{cat.name}</h3>
          <div className="flex flex-wrap gap-2">
            {cat.symbols.map((s, si) => (
              <button
                key={si}
                onClick={() => handleCopy(s.char)}
                title={s.name}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.125rem',
                  padding: '0.5rem',
                  minWidth: '56px',
                  border: '1px solid var(--color-border)',
                  borderRadius: '0.5rem',
                  backgroundColor: copiedChar === s.char ? 'rgba(34,197,94,0.1)' : 'var(--color-bg)',
                  cursor: 'pointer',
                  transition: 'all 0.12s',
                }}
              >
                <span style={{ fontSize: '1.25rem' }}>{s.char}</span>
                <span style={{ fontSize: '0.6rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>{s.name}</span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
