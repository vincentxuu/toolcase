'use client'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface DigitalClockProps {
  labels?: {
    hour12: string
    hour24: string
    showSeconds: string
    showDate: string
    fullscreen: string
    exitFullscreen: string
  }
}

export default function DigitalClock({ labels }: DigitalClockProps) {
  const l = {
    hour12: labels?.hour12 ?? '12-hour',
    hour24: labels?.hour24 ?? '24-hour',
    showSeconds: labels?.showSeconds ?? 'Show Seconds',
    showDate: labels?.showDate ?? 'Show Date',
    fullscreen: labels?.fullscreen ?? 'Fullscreen',
    exitFullscreen: labels?.exitFullscreen ?? 'Exit Fullscreen',
  }

  const [time, setTime] = useState(new Date())
  const [is24Hour, setIs24Hour] = useState(true)
  const [showSeconds, setShowSeconds] = useState(true)
  const [showDate, setShowDate] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 監聽全螢幕變化
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  const formatTime = () => {
    let hours = time.getHours()
    const minutes = time.getMinutes()
    const seconds = time.getSeconds()
    let period = ''

    if (!is24Hour) {
      period = hours >= 12 ? ' PM' : ' AM'
      hours = hours % 12 || 12
    }

    const h = hours.toString().padStart(2, '0')
    const m = minutes.toString().padStart(2, '0')
    const s = seconds.toString().padStart(2, '0')

    return {
      time: showSeconds ? `${h}:${m}:${s}` : `${h}:${m}`,
      period
    }
  }

  const formatDate = () => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    return {
      dayName: days[time.getDay()],
      monthName: months[time.getMonth()],
      date: time.getDate(),
      year: time.getFullYear()
    }
  }

  const { time: timeStr, period } = formatTime()
  const dateInfo = formatDate()

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* 控制面板 */}
      {!isFullscreen && (
        <Card className="p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex gap-2">
              <Button
                variant={is24Hour ? 'primary' : 'outline'}
                onClick={() => setIs24Hour(true)}
                size="sm"
              >
                {l.hour24}
              </Button>
              <Button
                variant={!is24Hour ? 'primary' : 'outline'}
                onClick={() => setIs24Hour(false)}
                size="sm"
              >
                {l.hour12}
              </Button>
            </div>

            <div className="flex gap-3">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showSeconds}
                  onChange={e => setShowSeconds(e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-sm">{l.showSeconds}</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={showDate}
                  onChange={e => setShowDate(e.target.checked)}
                  className="h-4 w-4"
                />
                <span className="text-sm">{l.showDate}</span>
              </label>
            </div>

            <Button onClick={toggleFullscreen} variant="outline" size="sm">
              {l.fullscreen}
            </Button>
          </div>
        </Card>
      )}

      {/* 時鐘顯示 */}
      <Card className={`flex items-center justify-center ${isFullscreen ? 'h-screen' : 'p-12'}`}>
        <div className="text-center">
          <div className="flex items-center justify-center gap-2">
            <div className={`font-mono font-bold tabular-nums ${isFullscreen ? 'text-9xl' : 'text-8xl'}`}>
              {timeStr}
            </div>
            {!is24Hour && period && (
              <div className={`font-bold ${isFullscreen ? 'text-5xl' : 'text-4xl'} self-start mt-4`}>
                {period}
              </div>
            )}
          </div>

          {showDate && (
            <div className={`mt-6 text-muted-foreground ${isFullscreen ? 'text-4xl' : 'text-2xl'}`}>
              <div className="font-medium">{dateInfo.dayName}</div>
              <div className="mt-2">
                {dateInfo.monthName} {dateInfo.date}, {dateInfo.year}
              </div>
            </div>
          )}

          {isFullscreen && (
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="lg"
              className="mt-12"
            >
              {l.exitFullscreen}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
