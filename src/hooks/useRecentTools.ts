'use client'
import { useLocalStorage } from './useLocalStorage'
import { tools } from '@/lib/tools-config'
import type { ToolConfig } from '@/lib/tools-config'

interface RecentTool {
  slug: string
  visitedAt: number
}

/**
 * useRecentTools Hook
 * 追蹤和管理最近使用的工具
 */
export function useRecentTools() {
  const [recentTools, setRecentTools] = useLocalStorage<RecentTool[]>('recent-tools', [])

  /**
   * 添加工具到最近使用列表
   */
  const addRecentTool = (slug: string) => {
    setRecentTools((prev) => {
      // 移除重複項目
      const filtered = prev.filter((t) => t.slug !== slug)

      // 添加到開頭，保留最近 10 個
      return [{ slug, visitedAt: Date.now() }, ...filtered].slice(0, 10)
    })
  }

  /**
   * 獲取最近使用的工具列表
   */
  const getRecentTools = (): ToolConfig[] => {
    return recentTools
      .sort((a, b) => b.visitedAt - a.visitedAt)
      .map((rt) => tools.find((t) => t.slug === rt.slug))
      .filter((tool): tool is ToolConfig => tool !== undefined)
  }

  /**
   * 清除最近使用記錄
   */
  const clearRecentTools = () => {
    setRecentTools([])
  }

  return {
    recentTools: getRecentTools(),
    addRecentTool,
    clearRecentTools,
  }
}
