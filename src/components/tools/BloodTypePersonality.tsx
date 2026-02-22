'use client'
import { useState } from 'react'

interface BloodTypePersonalityProps {
  labels?: {
    selectType: string
    lookup: string
    yourType: string
    strengths: string
    weaknesses: string
    bestMatch: string
    worstMatch: string
    types: {
      name: string
      nickname: string
      strengths: string
      weaknesses: string
      bestMatch: string
      worstMatch: string
      description: string
    }[]
    allTypes: string
    type: string
    personality: string
    compatibility: string
  }
}

const TYPE_KEYS = ['A', 'B', 'O', 'AB']
const TYPE_COLORS = ['#ef4444', '#3b82f6', '#22c55e', '#a855f7']

const DEFAULT_TYPES = [
  {
    name: 'A 型',
    nickname: '完美主義者',
    strengths: '細心、有責任感、守規矩、有條理、善於團隊合作、考慮周到',
    weaknesses: '容易焦慮、過度謹慎、固執、有時過於在意他人眼光',
    bestMatch: 'A 型、AB 型',
    worstMatch: 'B 型',
    description: 'A 型的人通常個性認真細膩，做事有條理且負責任。他們重視和諧的人際關係，在團體中常扮演協調者的角色。雖然外表沉穩，但內心情感豐富。',
  },
  {
    name: 'B 型',
    nickname: '自由奔放者',
    strengths: '樂觀、創意豐富、好奇心強、不拘小節、興趣廣泛、行動力強',
    weaknesses: '自我中心、三分鐘熱度、不善規劃、有時較任性',
    bestMatch: 'B 型、AB 型',
    worstMatch: 'A 型',
    description: 'B 型的人是天生的自由主義者，對感興趣的事物充滿熱情。他們不喜歡被規則束縛，有獨特的思考方式和生活態度。性格直率，相處起來輕鬆自在。',
  },
  {
    name: 'O 型',
    nickname: '天生領導者',
    strengths: '大方、有領導力、意志堅強、自信、直率、具有感染力',
    weaknesses: '較衝動、不注重細節、固執己見、有時較霸道',
    bestMatch: 'O 型、A 型',
    worstMatch: 'AB 型',
    description: 'O 型的人充滿活力和領袖氣質，天生具有號召力。他們行事果斷、目標明確，在困難面前不輕易退縮。社交能力強，容易成為團體中的核心人物。',
  },
  {
    name: 'AB 型',
    nickname: '理性分析家',
    strengths: '理性、冷靜、多才多藝、有創造力、善於分析、適應力強',
    weaknesses: '有時顯得冷漠、雙重性格、優柔寡斷、不易被理解',
    bestMatch: 'AB 型、B 型',
    worstMatch: 'O 型',
    description: 'AB 型的人結合了 A 型的細膩與 B 型的創意，是最少見的血型。他們通常聰明理性，能從不同角度分析問題。個性中有時矛盾的兩面，讓他們顯得神秘而有魅力。',
  },
]

export default function BloodTypePersonality({ labels }: BloodTypePersonalityProps) {
  const l = {
    selectType: labels?.selectType ?? '選擇你的血型',
    lookup: labels?.lookup ?? '查看性格分析',
    yourType: labels?.yourType ?? '你的血型',
    strengths: labels?.strengths ?? '優點',
    weaknesses: labels?.weaknesses ?? '缺點',
    bestMatch: labels?.bestMatch ?? '最佳配對',
    worstMatch: labels?.worstMatch ?? '較不合',
    types: labels?.types ?? DEFAULT_TYPES,
    allTypes: labels?.allTypes ?? '四大血型一覽',
    type: labels?.type ?? '血型',
    personality: labels?.personality ?? '性格',
    compatibility: labels?.compatibility ?? '配對',
  }

  const [selected, setSelected] = useState<number | null>(null)

  const sectionStyle: React.CSSProperties = {
    padding: '1.25rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.75rem',
    backgroundColor: 'var(--color-bg-secondary)',
  }

  const tagStyle = (color: string): React.CSSProperties => ({
    display: 'inline-block',
    padding: '0.25rem 0.625rem',
    borderRadius: '9999px',
    fontSize: '0.8rem',
    fontWeight: 600,
    color,
    backgroundColor: color + '18',
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Blood Type Selection */}
      <div style={sectionStyle}>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem' }}>
          {l.selectType}
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          {TYPE_KEYS.map((key, i) => (
            <button
              key={key}
              onClick={() => setSelected(i)}
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '0.75rem',
                border: selected === i ? `2px solid ${TYPE_COLORS[i]}` : '2px solid var(--color-border)',
                backgroundColor: selected === i ? TYPE_COLORS[i] + '12' : 'var(--color-bg)',
                color: selected === i ? TYPE_COLORS[i] : 'var(--color-text)',
                fontSize: '1.25rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s',
                minWidth: '80px',
              }}
            >
              {key}
            </button>
          ))}
        </div>
      </div>

      {/* Result */}
      {selected !== null && (
        <div style={{
          ...sectionStyle,
          borderColor: TYPE_COLORS[selected] + '40',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: TYPE_COLORS[selected], marginBottom: '0.25rem' }}>
              {TYPE_KEYS[selected]}
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '0.25rem' }}>
              {l.types[selected].name}
            </h3>
            <span style={tagStyle(TYPE_COLORS[selected])}>
              {l.types[selected].nickname}
            </span>
          </div>

          <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.8, marginBottom: '1.25rem', textAlign: 'center', maxWidth: '560px', marginLeft: 'auto', marginRight: 'auto' }}>
            {l.types[selected].description}
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.15)' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#22c55e', marginBottom: '0.375rem' }}>{l.strengths}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{l.types[selected].strengths}</p>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ef4444', marginBottom: '0.375rem' }}>{l.weaknesses}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{l.types[selected].weaknesses}</p>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#3b82f6', marginBottom: '0.375rem' }}>{l.bestMatch}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{l.types[selected].bestMatch}</p>
            </div>
            <div style={{ padding: '0.75rem', borderRadius: '0.5rem', backgroundColor: 'rgba(168,85,247,0.06)', border: '1px solid rgba(168,85,247,0.15)' }}>
              <h4 style={{ fontSize: '0.8rem', fontWeight: 600, color: '#a855f7', marginBottom: '0.375rem' }}>{l.worstMatch}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{l.types[selected].worstMatch}</p>
            </div>
          </div>
        </div>
      )}

      {/* All Types Reference Table */}
      <div style={sectionStyle}>
        <h3 style={{ fontWeight: 600, marginBottom: '0.75rem' }}>{l.allTypes}</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--color-border)' }}>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>{l.type}</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>{l.personality}</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>{l.strengths}</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>{l.weaknesses}</th>
                <th style={{ padding: '0.5rem', textAlign: 'left' }}>{l.compatibility}</th>
              </tr>
            </thead>
            <tbody>
              {l.types.map((t, i) => (
                <tr key={i} style={{
                  borderBottom: '1px solid var(--color-border)',
                  backgroundColor: selected === i ? TYPE_COLORS[i] + '08' : 'transparent',
                }}>
                  <td style={{ padding: '0.5rem', fontWeight: 700, color: TYPE_COLORS[i] }}>
                    {TYPE_KEYS[i]}
                  </td>
                  <td style={{ padding: '0.5rem' }}>
                    <span style={{ fontWeight: 600 }}>{t.nickname}</span>
                  </td>
                  <td style={{ padding: '0.5rem', color: 'var(--color-text-secondary)' }}>{t.strengths}</td>
                  <td style={{ padding: '0.5rem', color: 'var(--color-text-secondary)' }}>{t.weaknesses}</td>
                  <td style={{ padding: '0.5rem' }}>
                    <span style={{ color: '#22c55e', fontSize: '0.8rem' }}>{t.bestMatch}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
