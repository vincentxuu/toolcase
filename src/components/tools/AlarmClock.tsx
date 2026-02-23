'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Plus, Bell, BellOff, Trash2, Clock } from 'lucide-react'

interface Alarm {
  id: string
  time: string
  label: string
  enabled: boolean
  days: number[] // 0-6 for Sunday-Saturday
}

interface AlarmClockProps {
  labels?: {
    addAlarm: string
    time: string
    label: string
    labelPlaceholder: string
    enabled: string
    delete: string
    noAlarms: string
    createFirst: string
    currentTime: string
    alarmRinging: string
    stop: string
    snooze: string
    repeat: string
    once: string
    everyday: string
    weekdays: string
    weekends: string
    custom: string
    sun: string
    mon: string
    tue: string
    wed: string
    thu: string
    fri: string
    sat: string
  }
}

export default function AlarmClock({ labels }: AlarmClockProps) {
  const l = {
    addAlarm: labels?.addAlarm ?? 'Add Alarm',
    time: labels?.time ?? 'Time',
    label: labels?.label ?? 'Label',
    labelPlaceholder: labels?.labelPlaceholder ?? 'Alarm label...',
    enabled: labels?.enabled ?? 'Enabled',
    delete: labels?.delete ?? 'Delete',
    noAlarms: labels?.noAlarms ?? 'No alarms set',
    createFirst: labels?.createFirst ?? 'Create your first alarm',
    currentTime: labels?.currentTime ?? 'Current Time',
    alarmRinging: labels?.alarmRinging ?? 'Alarm Ringing!',
    stop: labels?.stop ?? 'Stop',
    snooze: labels?.snooze ?? 'Snooze (5 min)',
    repeat: labels?.repeat ?? 'Repeat',
    once: labels?.once ?? 'Once',
    everyday: labels?.everyday ?? 'Everyday',
    weekdays: labels?.weekdays ?? 'Weekdays',
    weekends: labels?.weekends ?? 'Weekends',
    custom: labels?.custom ?? 'Custom',
    sun: labels?.sun ?? 'S',
    mon: labels?.mon ?? 'M',
    tue: labels?.tue ?? 'T',
    wed: labels?.wed ?? 'W',
    thu: labels?.thu ?? 'T',
    fri: labels?.fri ?? 'F',
    sat: labels?.sat ?? 'S',
  }

  const [alarms, setAlarms] = useState<Alarm[]>([])
  const [currentTime, setCurrentTime] = useState(new Date())
  const [ringingAlarm, setRingingAlarm] = useState<Alarm | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const dayNames = [l.sun, l.mon, l.tue, l.wed, l.thu, l.fri, l.sat]

  // Load alarms from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('alarms')
    if (saved) {
      try {
        setAlarms(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load alarms:', e)
      }
    }
  }, [])

  // Save alarms to localStorage
  useEffect(() => {
    if (alarms.length > 0) {
      localStorage.setItem('alarms', JSON.stringify(alarms))
    }
  }, [alarms])

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const triggerAlarm = useCallback((alarm: Alarm) => {
    setRingingAlarm(alarm)
    playSound()
  }, [])

  // Check for alarm triggers
  useEffect(() => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    const currentDay = now.getDay()
    const currentTimeStr = `${String(currentHour).padStart(2, '0')}:${String(currentMinute).padStart(2, '0')}`

    alarms.forEach(alarm => {
      if (
        alarm.enabled &&
        alarm.time === currentTimeStr &&
        now.getSeconds() === 0 &&
        (alarm.days.length === 0 || alarm.days.includes(currentDay))
      ) {
        triggerAlarm(alarm)
      }
    })
  }, [currentTime, alarms, triggerAlarm])

  const playSound = () => {
    // Create beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)

    // Repeat every second
    const interval = setInterval(() => {
      if (!ringingAlarm) {
        clearInterval(interval)
        return
      }
      const osc = audioContext.createOscillator()
      const gain = audioContext.createGain()
      osc.connect(gain)
      gain.connect(audioContext.destination)
      osc.frequency.value = 800
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.3, audioContext.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)
      osc.start(audioContext.currentTime)
      osc.stop(audioContext.currentTime + 0.5)
    }, 1000)

    // Auto-stop after 1 minute
    setTimeout(() => {
      clearInterval(interval)
      setRingingAlarm(null)
    }, 60000)
  }

  const stopAlarm = () => {
    setRingingAlarm(null)
  }

  const snoozeAlarm = () => {
    if (!ringingAlarm) return

    const now = new Date()
    now.setMinutes(now.getMinutes() + 5)
    const snoozeTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`

    const snoozeAlarm: Alarm = {
      ...ringingAlarm,
      id: Date.now().toString(),
      time: snoozeTime,
      label: `${ringingAlarm.label} (Snooze)`,
      days: [],
    }

    setAlarms([...alarms, snoozeAlarm])
    setRingingAlarm(null)
  }

  const addAlarm = () => {
    const now = new Date()
    const newAlarm: Alarm = {
      id: Date.now().toString(),
      time: `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`,
      label: '',
      enabled: true,
      days: [],
    }
    setAlarms([...alarms, newAlarm])
  }

  const updateAlarm = (id: string, updates: Partial<Alarm>) => {
    setAlarms(alarms.map(a => (a.id === id ? { ...a, ...updates } : a)))
  }

  const deleteAlarm = (id: string) => {
    setAlarms(alarms.filter(a => a.id !== id))
  }

  const toggleDay = (alarmId: string, day: number) => {
    const alarm = alarms.find(a => a.id === alarmId)
    if (!alarm) return

    const days = alarm.days.includes(day) ? alarm.days.filter(d => d !== day) : [...alarm.days, day].sort()

    updateAlarm(alarmId, { days })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Ringing Alarm Modal */}
      {ringingAlarm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-md animate-pulse border-red-500 p-8">
            <div className="text-center">
              <Bell className="mx-auto mb-4 h-16 w-16 text-red-500" />
              <h2 className="mb-2 text-2xl font-bold">{l.alarmRinging}</h2>
              <p className="mb-1 text-4xl font-bold tabular-nums">{ringingAlarm.time}</p>
              {ringingAlarm.label && <p className="mb-6 text-muted-foreground">{ringingAlarm.label}</p>}
              <div className="flex gap-3">
                <Button onClick={snoozeAlarm} variant="outline" className="flex-1">
                  {l.snooze}
                </Button>
                <Button onClick={stopAlarm} className="flex-1">
                  {l.stop}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Current Time */}
      <Card className="p-6">
        <div className="text-center">
          <p className="mb-2 text-sm text-muted-foreground">{l.currentTime}</p>
          <p className="text-4xl font-bold tabular-nums">{formatTime(currentTime)}</p>
        </div>
      </Card>

      {/* Add Alarm Button */}
      <Button onClick={addAlarm} className="w-full gap-2">
        <Plus className="h-4 w-4" />
        {l.addAlarm}
      </Button>

      {/* Alarms List */}
      {alarms.length > 0 ? (
        <div className="space-y-4">
          {alarms.map(alarm => (
            <Card key={alarm.id} className={`p-6 ${!alarm.enabled && 'opacity-50'}`}>
              <div className="space-y-4">
                {/* Time and Toggle */}
                <div className="flex items-center justify-between">
                  <Input
                    type="time"
                    value={alarm.time}
                    onChange={e => updateAlarm(alarm.id, { time: e.target.value })}
                    className="w-32 text-2xl font-bold"
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateAlarm(alarm.id, { enabled: !alarm.enabled })}
                      className={`rounded-full p-2 transition-colors ${
                        alarm.enabled
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {alarm.enabled ? <Bell className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
                    </button>
                    <Button
                      onClick={() => deleteAlarm(alarm.id)}
                      variant="ghost"
                      size="sm"
                      className="text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Label */}
                <Input
                  value={alarm.label}
                  onChange={e => updateAlarm(alarm.id, { label: e.target.value })}
                  placeholder={l.labelPlaceholder}
                />

                {/* Repeat Days */}
                <div>
                  <p className="mb-2 text-sm font-medium">{l.repeat}</p>
                  <div className="flex gap-2">
                    {[0, 1, 2, 3, 4, 5, 6].map(day => (
                      <button
                        key={day}
                        onClick={() => toggleDay(alarm.id, day)}
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                          alarm.days.includes(day)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {dayNames[day]}
                      </button>
                    ))}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {alarm.days.length === 0
                      ? l.once
                      : alarm.days.length === 7
                        ? l.everyday
                        : alarm.days.length === 5 &&
                            alarm.days.every(d => [1, 2, 3, 4, 5].includes(d))
                          ? l.weekdays
                          : alarm.days.length === 2 &&
                              alarm.days.every(d => [0, 6].includes(d))
                            ? l.weekends
                            : l.custom}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="border-dashed p-12">
          <div className="text-center text-muted-foreground">
            <Clock className="mx-auto mb-4 h-12 w-12 opacity-50" />
            <p className="text-lg font-medium">{l.noAlarms}</p>
            <p className="mt-1 text-sm">{l.createFirst}</p>
          </div>
        </Card>
      )}

      {/* Tips */}
      <Card className="border-blue-200 bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950">
        <h4 className="mb-2 font-semibold text-blue-900 dark:text-blue-100">💡 使用說明</h4>
        <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
          <li>• 鬧鐘會在設定時間準時響起,持續 1 分鐘</li>
          <li>• 可設定重複日期:一次性、每天、工作日、週末或自訂</li>
          <li>• 貪睡功能會在 5 分鐘後再次提醒</li>
          <li>• 鬧鐘資料會自動儲存到瀏覽器</li>
          <li>• 請確保瀏覽器分頁保持開啟,鬧鐘才能正常運作</li>
        </ul>
      </Card>
    </div>
  )
}
