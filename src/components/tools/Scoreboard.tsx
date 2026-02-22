'use client'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Minus, RotateCcw, Edit2, Check, X, Trash2 } from 'lucide-react'

interface Player {
  id: string
  name: string
  score: number
}

interface ScoreboardProps {
  labels?: {
    addPlayer: string
    playerName: string
    reset: string
    confirmReset: string
    edit: string
    save: string
    cancel: string
    delete: string
    player: string
    score: string
    placeholder: string
  }
}

export default function Scoreboard({ labels }: ScoreboardProps) {
  const l = {
    addPlayer: labels?.addPlayer ?? 'Add Player',
    playerName: labels?.playerName ?? 'Player Name',
    reset: labels?.reset ?? 'Reset All',
    confirmReset: labels?.confirmReset ?? 'Are you sure you want to reset all scores?',
    edit: labels?.edit ?? 'Edit',
    save: labels?.save ?? 'Save',
    cancel: labels?.cancel ?? 'Cancel',
    delete: labels?.delete ?? 'Delete',
    player: labels?.player ?? 'Player',
    score: labels?.score ?? 'Score',
    placeholder: labels?.placeholder ?? 'Enter player name...',
  }

  const [players, setPlayers] = useState<Player[]>([])
  const [newPlayerName, setNewPlayerName] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingName, setEditingName] = useState('')

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('scoreboard')
    if (saved) {
      try {
        setPlayers(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load scoreboard:', e)
      }
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem('scoreboard', JSON.stringify(players))
    }
  }, [players])

  const addPlayer = () => {
    if (!newPlayerName.trim()) return

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: newPlayerName.trim(),
      score: 0,
    }

    setPlayers([...players, newPlayer])
    setNewPlayerName('')
  }

  const updateScore = (id: string, delta: number) => {
    setPlayers(players.map(p => (p.id === id ? { ...p, score: Math.max(0, p.score + delta) } : p)))
  }

  const startEdit = (player: Player) => {
    setEditingId(player.id)
    setEditingName(player.name)
  }

  const saveEdit = () => {
    if (!editingName.trim() || !editingId) return

    setPlayers(players.map(p => (p.id === editingId ? { ...p, name: editingName.trim() } : p)))
    setEditingId(null)
    setEditingName('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingName('')
  }

  const deletePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id))
  }

  const resetAll = () => {
    if (window.confirm(l.confirmReset)) {
      setPlayers(players.map(p => ({ ...p, score: 0 })))
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter') {
      action()
    }
  }

  // Sort by score (highest first)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score)

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Add Player Card */}
      <Card className="p-6">
        <div className="flex gap-2">
          <Input
            value={newPlayerName}
            onChange={e => setNewPlayerName(e.target.value)}
            onKeyPress={e => handleKeyPress(e, addPlayer)}
            placeholder={l.placeholder}
            className="flex-1"
          />
          <Button onClick={addPlayer} className="gap-2">
            <Plus className="h-4 w-4" />
            {l.addPlayer}
          </Button>
        </div>
      </Card>

      {/* Scoreboard */}
      {players.length > 0 && (
        <>
          <Card className="overflow-hidden">
            <div className="bg-muted px-6 py-3">
              <div className="grid grid-cols-[2fr_1fr_auto] items-center gap-4 text-sm font-medium">
                <div>{l.player}</div>
                <div className="text-center">{l.score}</div>
                <div className="w-32"></div>
              </div>
            </div>

            <div className="divide-y">
              {sortedPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className="grid grid-cols-[2fr_1fr_auto] items-center gap-4 px-6 py-4"
                >
                  {/* Player Name */}
                  <div className="flex items-center gap-3">
                    {index < 3 && (
                      <div
                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                          index === 0
                            ? 'bg-yellow-500 text-white'
                            : index === 1
                              ? 'bg-gray-400 text-white'
                              : 'bg-orange-600 text-white'
                        }`}
                      >
                        {index + 1}
                      </div>
                    )}
                    {editingId === player.id ? (
                      <div className="flex flex-1 items-center gap-2">
                        <Input
                          value={editingName}
                          onChange={e => setEditingName(e.target.value)}
                          onKeyPress={e => handleKeyPress(e, saveEdit)}
                          className="flex-1"
                          autoFocus
                        />
                        <Button onClick={saveEdit} size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <Check className="h-4 w-4 text-green-600" />
                        </Button>
                        <Button onClick={cancelEdit} size="sm" variant="ghost" className="h-8 w-8 p-0">
                          <X className="h-4 w-4 text-red-600" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-1 items-center justify-between">
                        <span className="font-medium">{player.name}</span>
                        <Button
                          onClick={() => startEdit(player)}
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <Edit2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>

                  {/* Score */}
                  <div className="text-center text-2xl font-bold tabular-nums">{player.score}</div>

                  {/* Actions */}
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => updateScore(player.id, 1)}
                      size="sm"
                      variant="outline"
                      className="h-9 w-9 p-0"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => updateScore(player.id, -1)}
                      size="sm"
                      variant="outline"
                      className="h-9 w-9 p-0"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <Button
                      onClick={() => deletePlayer(player.id)}
                      size="sm"
                      variant="ghost"
                      className="h-9 w-9 p-0 text-red-600 hover:bg-red-50 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Reset Button */}
          <div className="flex justify-end">
            <Button onClick={resetAll} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              {l.reset}
            </Button>
          </div>
        </>
      )}

      {/* Empty State */}
      {players.length === 0 && (
        <Card className="border-dashed p-12">
          <div className="text-center text-muted-foreground">
            <div className="mb-2 text-4xl">🏆</div>
            <p className="text-lg font-medium">開始記分</p>
            <p className="mt-1 text-sm">新增玩家開始記錄分數</p>
          </div>
        </Card>
      )}

      {/* Tips */}
      <Card className="border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
        <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">💡 使用說明</h4>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• 分數會自動儲存到瀏覽器,重新整理頁面不會遺失</li>
          <li>• 玩家會自動按分數高低排序,前三名會顯示獎牌</li>
          <li>• 點擊玩家名稱可以編輯,點擊刪除圖示可移除玩家</li>
          <li>• 適合桌遊、運動比賽、課堂競賽等多種場景使用</li>
        </ul>
      </Card>
    </div>
  )
}
