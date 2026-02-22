'use client'
import { useState, useMemo, useCallback } from 'react'
import CopyButton from '@/components/shared/CopyButton'

interface JsonPathFinderProps {
  labels?: {
    inputPlaceholder: string
    parse: string
    clear: string
    path: string
    value: string
    copied: string
    copy: string
    clickNode: string
    dotNotation: string
    bracketNotation: string
    invalidJson: string
    items: string
  }
}

interface TreeNodeData {
  key: string
  value: unknown
  path: string
  bracketPath: string
  type: string
  depth: number
}

function buildTree(obj: unknown, parentPath: string, parentBracketPath: string, depth: number): TreeNodeData[] {
  const nodes: TreeNodeData[] = []
  if (obj !== null && typeof obj === 'object') {
    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        const dotPath = `${parentPath}[${index}]`
        const bracketPath = `${parentBracketPath}[${index}]`
        const type = item === null ? 'null' : Array.isArray(item) ? 'array' : typeof item
        nodes.push({ key: String(index), value: item, path: dotPath, bracketPath, type, depth })
        if (item !== null && typeof item === 'object') {
          nodes.push(...buildTree(item, dotPath, bracketPath, depth + 1))
        }
      })
    } else {
      Object.entries(obj).forEach(([key, val]) => {
        const needsBracket = /[^a-zA-Z0-9_$]/.test(key) || /^\d/.test(key)
        const dotPath = needsBracket ? `${parentPath}["${key}"]` : `${parentPath}.${key}`
        const bracketPath = `${parentBracketPath}["${key}"]`
        const type = val === null ? 'null' : Array.isArray(val) ? 'array' : typeof val
        nodes.push({ key, value: val, path: dotPath, bracketPath, type, depth })
        if (val !== null && typeof val === 'object') {
          nodes.push(...buildTree(val, dotPath, bracketPath, depth + 1))
        }
      })
    }
  }
  return nodes
}

function TreeNode({ node, collapsed, onToggle, onSelect, selected, itemsLabel }: {
  node: TreeNodeData
  collapsed: Set<string>
  onToggle: (path: string) => void
  onSelect: (node: TreeNodeData) => void
  selected: string | null
  itemsLabel: string
}) {
  const isExpandable = node.type === 'object' || node.type === 'array'
  const isCollapsed = collapsed.has(node.path)

  const getPreview = () => {
    if (node.type === 'array') {
      const arr = node.value as unknown[]
      return `[${arr.length} ${itemsLabel}]`
    }
    if (node.type === 'object') {
      const keys = Object.keys(node.value as Record<string, unknown>)
      return `{${keys.length} ${itemsLabel}}`
    }
    if (node.type === 'string') return `"${String(node.value)}"`
    if (node.type === 'null') return 'null'
    return String(node.value)
  }

  const typeColor = () => {
    switch (node.type) {
      case 'string': return 'var(--color-success)'
      case 'number': return 'var(--color-primary)'
      case 'boolean': return '#f59e0b'
      case 'null': return 'var(--color-text-secondary)'
      case 'array':
      case 'object': return 'var(--color-text)'
      default: return 'var(--color-text)'
    }
  }

  return (
    <div
      onClick={(e) => { e.stopPropagation(); onSelect(node) }}
      style={{
        paddingLeft: `${node.depth * 1.25}rem`,
        padding: '0.25rem 0.5rem 0.25rem',
        marginLeft: `${node.depth * 1.25}rem`,
        cursor: 'pointer',
        borderRadius: '0.25rem',
        backgroundColor: selected === node.path ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
        borderLeft: selected === node.path ? '2px solid var(--color-primary)' : '2px solid transparent',
      }}
    >
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
        {isExpandable && (
          <span
            onClick={(e) => { e.stopPropagation(); onToggle(node.path) }}
            style={{ cursor: 'pointer', fontSize: '0.7rem', width: '1rem', display: 'inline-block', userSelect: 'none' }}
          >
            {isCollapsed ? '\u25B6' : '\u25BC'}
          </span>
        )}
        {!isExpandable && <span style={{ width: '1rem', display: 'inline-block' }} />}
        <span style={{ fontWeight: 600, color: 'var(--color-text)', fontSize: '0.8125rem' }}>{node.key}:</span>
        <span style={{ color: typeColor(), fontSize: '0.8125rem', fontFamily: 'monospace' }}>
          {getPreview()}
        </span>
      </span>
    </div>
  )
}

export default function JsonPathFinder({ labels }: JsonPathFinderProps) {
  const l = {
    inputPlaceholder: labels?.inputPlaceholder ?? 'Paste your JSON here...',
    parse: labels?.parse ?? 'Parse',
    clear: labels?.clear ?? 'Clear',
    path: labels?.path ?? 'Path',
    value: labels?.value ?? 'Value',
    copied: labels?.copied ?? 'Copied!',
    copy: labels?.copy ?? 'Copy',
    clickNode: labels?.clickNode ?? 'Click a node in the tree to see its path',
    dotNotation: labels?.dotNotation ?? 'Dot notation',
    bracketNotation: labels?.bracketNotation ?? 'Bracket notation',
    invalidJson: labels?.invalidJson ?? 'Invalid JSON',
    items: labels?.items ?? 'items',
  }

  const [input, setInput] = useState('')
  const [parsed, setParsed] = useState<unknown>(null)
  const [error, setError] = useState('')
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null)
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  const handleParse = useCallback(() => {
    if (!input.trim()) return
    try {
      const obj = JSON.parse(input)
      setParsed(obj)
      setError('')
      setSelectedNode(null)
      setCollapsed(new Set())
    } catch (e) {
      setError((e as Error).message)
      setParsed(null)
    }
  }, [input])

  const handleClear = useCallback(() => {
    setInput('')
    setParsed(null)
    setError('')
    setSelectedNode(null)
    setCollapsed(new Set())
  }, [])

  const tree = useMemo(() => {
    if (parsed === null || parsed === undefined) return []
    return buildTree(parsed, '$', '$', 0)
  }, [parsed])

  const visibleTree = useMemo(() => {
    const visible: TreeNodeData[] = []
    for (const node of tree) {
      let isHidden = false
      for (const cp of collapsed) {
        if (node.path !== cp && node.path.startsWith(cp)) {
          isHidden = true
          break
        }
      }
      if (!isHidden) visible.push(node)
    }
    return visible
  }, [tree, collapsed])

  const handleToggle = useCallback((path: string) => {
    setCollapsed(prev => {
      const next = new Set(prev)
      if (next.has(path)) {
        next.delete(path)
      } else {
        next.add(path)
      }
      return next
    })
  }, [])

  const handleSelect = useCallback((node: TreeNodeData) => {
    setSelectedNode(node)
  }, [])

  const getDisplayValue = (val: unknown): string => {
    if (val === null) return 'null'
    if (typeof val === 'object') return JSON.stringify(val, null, 2)
    if (typeof val === 'string') return `"${val}"`
    return String(val)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary" onClick={handleParse}>{l.parse}</button>
        <button className="btn-secondary" onClick={handleClear}>{l.clear}</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', minHeight: '400px' }}>
        {/* Left: JSON input */}
        <div>
          <textarea
            className="tool-textarea"
            style={{ height: '400px' }}
            placeholder={l.inputPlaceholder}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Right: Tree view */}
        <div style={{
          border: '1px solid var(--color-border)',
          borderRadius: '0.5rem',
          backgroundColor: 'var(--color-bg-secondary)',
          overflow: 'auto',
          height: '400px',
          padding: '0.5rem 0',
        }}>
          {!parsed && !error && (
            <div style={{ padding: '1rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem', textAlign: 'center' }}>
              {l.clickNode}
            </div>
          )}
          {visibleTree.map((node) => (
            <TreeNode
              key={node.path}
              node={node}
              collapsed={collapsed}
              onToggle={handleToggle}
              onSelect={handleSelect}
              selected={selectedNode?.path ?? null}
              itemsLabel={l.items}
            />
          ))}
        </div>
      </div>

      {error && (
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          color: 'var(--color-error)',
          fontSize: '0.875rem',
          fontFamily: 'monospace',
        }}>
          {l.invalidJson}: {error}
        </div>
      )}

      {selectedNode && (
        <div style={{
          padding: '1rem',
          border: '1px solid var(--color-border)',
          borderRadius: '0.75rem',
          backgroundColor: 'var(--color-bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600, minWidth: '110px' }}>{l.dotNotation}:</span>
            <code style={{
              flex: 1,
              padding: '0.375rem 0.625rem',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              fontFamily: 'monospace',
              fontSize: '0.8125rem',
              color: 'var(--color-primary)',
            }}>
              {selectedNode.path}
            </code>
            <CopyButton text={selectedNode.path} label={l.copy} copiedLabel={l.copied} />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600, minWidth: '110px' }}>{l.bracketNotation}:</span>
            <code style={{
              flex: 1,
              padding: '0.375rem 0.625rem',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              fontFamily: 'monospace',
              fontSize: '0.8125rem',
              color: 'var(--color-primary)',
            }}>
              {selectedNode.bracketPath}
            </code>
            <CopyButton text={selectedNode.bracketPath} label={l.copy} copiedLabel={l.copied} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', fontWeight: 600, display: 'block', marginBottom: '0.375rem' }}>{l.value}:</span>
            <pre style={{
              padding: '0.625rem',
              borderRadius: '0.375rem',
              backgroundColor: 'var(--color-bg)',
              border: '1px solid var(--color-border)',
              fontFamily: 'monospace',
              fontSize: '0.8125rem',
              color: 'var(--color-text)',
              overflow: 'auto',
              maxHeight: '200px',
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}>
              {getDisplayValue(selectedNode.value)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
