'use client'
import { useState, useCallback } from 'react'

interface RelativeTitleCalculatorProps {
  labels?: {
    title: string
    selectRelation: string
    addRelation: string
    clear: string
    result: string
    you: string
    relation: string
    noRelation: string
    // Relations
    father: string
    mother: string
    son: string
    daughter: string
    elderBrother: string
    youngerBrother: string
    elderSister: string
    youngerSister: string
    husband: string
    wife: string
  }
}

type Relation = 'father' | 'mother' | 'son' | 'daughter' | 'elderBrother' | 'youngerBrother' | 'elderSister' | 'youngerSister' | 'husband' | 'wife'

// Simplified relative title mapping for Taiwan
const relativeTitles: Record<string, string> = {
  // Direct
  'father': '爸爸/父親',
  'mother': '媽媽/母親',
  'son': '兒子',
  'daughter': '女兒',
  'elderBrother': '哥哥',
  'youngerBrother': '弟弟',
  'elderSister': '姐姐',
  'youngerSister': '妹妹',
  'husband': '先生/丈夫',
  'wife': '太太/妻子',

  // Father's side
  'father-father': '爺爺/祖父',
  'father-mother': '奶奶/祖母',
  'father-elderBrother': '伯父/伯伯',
  'father-youngerBrother': '叔叔',
  'father-elderSister': '姑姑',
  'father-youngerSister': '姑姑',
  'father-son': '兄弟',
  'father-daughter': '姐妹',

  // Mother's side
  'mother-father': '外公',
  'mother-mother': '外婆',
  'mother-elderBrother': '舅舅',
  'mother-youngerBrother': '舅舅',
  'mother-elderSister': '阿姨/姨媽',
  'mother-youngerSister': '阿姨/姨媽',
  'mother-son': '兄弟',
  'mother-daughter': '姐妹',

  // Children
  'son-son': '孫子',
  'son-daughter': '孫女',
  'daughter-son': '外孫',
  'daughter-daughter': '外孫女',

  // Siblings' children
  'elderBrother-son': '姪子',
  'elderBrother-daughter': '姪女',
  'youngerBrother-son': '姪子',
  'youngerBrother-daughter': '姪女',
  'elderSister-son': '外甥',
  'elderSister-daughter': '外甥女',
  'youngerSister-son': '外甥',
  'youngerSister-daughter': '外甥女',

  // Spouse's parents
  'husband-father': '公公',
  'husband-mother': '婆婆',
  'wife-father': '岳父',
  'wife-mother': '岳母',

  // Spouse's siblings
  'husband-elderBrother': '大伯',
  'husband-youngerBrother': '小叔',
  'husband-elderSister': '大姑',
  'husband-youngerSister': '小姑',
  'wife-elderBrother': '大舅子',
  'wife-youngerBrother': '小舅子',
  'wife-elderSister': '大姨子',
  'wife-youngerSister': '小姨子',
}

export default function RelativeTitleCalculator({ labels }: RelativeTitleCalculatorProps) {
  const l = {
    title: labels?.title ?? 'Relative Title Calculator',
    selectRelation: labels?.selectRelation ?? 'Select Relationship',
    addRelation: labels?.addRelation ?? 'Add',
    clear: labels?.clear ?? 'Clear',
    result: labels?.result ?? 'Relationship',
    you: labels?.you ?? 'You',
    relation: labels?.relation ?? 'Relation',
    noRelation: labels?.noRelation ?? 'Unknown relation',
    father: labels?.father ?? 'Father',
    mother: labels?.mother ?? 'Mother',
    son: labels?.son ?? 'Son',
    daughter: labels?.daughter ?? 'Daughter',
    elderBrother: labels?.elderBrother ?? 'Elder Brother',
    youngerBrother: labels?.youngerBrother ?? 'Younger Brother',
    elderSister: labels?.elderSister ?? 'Elder Sister',
    youngerSister: labels?.youngerSister ?? 'Younger Sister',
    husband: labels?.husband ?? 'Husband',
    wife: labels?.wife ?? 'Wife',
  }

  const relations: { value: Relation; label: string }[] = [
    { value: 'father', label: l.father },
    { value: 'mother', label: l.mother },
    { value: 'son', label: l.son },
    { value: 'daughter', label: l.daughter },
    { value: 'elderBrother', label: l.elderBrother },
    { value: 'youngerBrother', label: l.youngerBrother },
    { value: 'elderSister', label: l.elderSister },
    { value: 'youngerSister', label: l.youngerSister },
    { value: 'husband', label: l.husband },
    { value: 'wife', label: l.wife },
  ]

  const [selectedRelation, setSelectedRelation] = useState<Relation>('father')
  const [chain, setChain] = useState<Relation[]>([])

  const handleAdd = useCallback(() => {
    setChain([...chain, selectedRelation])
  }, [chain, selectedRelation])

  const handleClear = useCallback(() => {
    setChain([])
  }, [])

  const getResult = useCallback(() => {
    if (chain.length === 0) return ''

    const key = chain.join('-')
    return relativeTitles[key] || l.noRelation
  }, [chain, l.noRelation])

  const getRelationLabel = (rel: Relation): string => {
    return relations.find(r => r.value === rel)?.label || rel
  }

  const result = getResult()

  return (
    <div className="flex flex-col gap-6">
      {/* Relation selector */}
      <div>
        <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.75rem', fontSize: '0.875rem' }}>
          {l.selectRelation}
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
          {relations.map((rel) => (
            <button
              key={rel.value}
              onClick={() => setSelectedRelation(rel.value)}
              style={{
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: selectedRelation === rel.value ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                backgroundColor: selectedRelation === rel.value ? 'rgba(59, 130, 246, 0.1)' : 'var(--color-bg-secondary)',
                color: 'var(--color-text)',
                fontWeight: 500,
                fontSize: '0.875rem',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {rel.label}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          className="flex-1 justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0"
          onClick={handleAdd}
        >
          {l.addRelation}
        </button>
        <button
          className="flex-1 justify-center inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]"
          onClick={handleClear}
          disabled={chain.length === 0}
        >
          {l.clear}
        </button>
      </div>

      {/* Chain display */}
      {chain.length > 0 && (
        <div>
          <label style={{ display: 'block', fontWeight: 500, marginBottom: '0.75rem', fontSize: '0.875rem' }}>
            {l.relation}
          </label>
          <div style={{
            padding: '1.5rem',
            borderRadius: '0.75rem',
            backgroundColor: 'var(--color-bg-secondary)',
            border: '2px solid var(--color-border)',
          }}>
            {/* Chain visualization */}
            <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <span style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{l.you}</span>
              {chain.map((rel, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-[var(--color-text-secondary)]">→</span>
                  <span style={{
                    padding: '0.375rem 0.75rem',
                    borderRadius: '0.375rem',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}>
                    {getRelationLabel(rel)}
                  </span>
                </div>
              ))}
            </div>

            {/* Result */}
            {result && (
              <div style={{
                padding: '1.25rem',
                borderRadius: '0.5rem',
                backgroundColor: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                textAlign: 'center',
              }}>
                <div className="text-sm text-[var(--color-text-secondary)] mb-2">
                  {l.result}:
                </div>
                <div className="text-3xl font-bold text-[var(--color-primary)]">
                  {result}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Info */}
      <div style={{
        padding: '1rem',
        borderRadius: '0.5rem',
        backgroundColor: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        fontSize: '0.813rem',
        color: 'var(--color-text-secondary)',
        lineHeight: 1.6,
      }}>
        <strong className="text-[var(--color-text)]">How to use:</strong> Select relationships step by step to build the family tree.
        For example: select &quot;Father&quot; then &quot;Father&quot; to get &quot;爺爺&quot; (paternal grandfather). The tool supports common Taiwan family relationships.
      </div>
    </div>
  )
}
