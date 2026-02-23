'use client'
import { useState, useCallback, useMemo } from 'react'

interface MenstrualCycleCalculatorProps {
  labels?: {
    title: string
    lastPeriodDate: string
    cycleLength: string
    periodLength: string
    calculate: string
    clear: string
    days: string
    results: string
    nextPeriod: string
    ovulation: string
    fertilityWindow: string
    dueDate: string
    currentPhase: string
    phaseFollicular: string
    phaseOvulation: string
    phaseLuteal: string
    phaseMenstruation: string
    note: string
    noteText: string
  }
}

export default function MenstrualCycleCalculator({ labels }: MenstrualCycleCalculatorProps) {
  const l = useMemo(() => ({
    title: labels?.title ?? 'Menstrual Cycle Calculator',
    lastPeriodDate: labels?.lastPeriodDate ?? 'Last Period Start Date',
    cycleLength: labels?.cycleLength ?? 'Average Cycle Length',
    periodLength: labels?.periodLength ?? 'Average Period Length',
    calculate: labels?.calculate ?? 'Calculate',
    clear: labels?.clear ?? 'Clear',
    days: labels?.days ?? 'days',
    results: labels?.results ?? 'Results',
    nextPeriod: labels?.nextPeriod ?? 'Next Period',
    ovulation: labels?.ovulation ?? 'Ovulation Day',
    fertilityWindow: labels?.fertilityWindow ?? 'Fertility Window',
    dueDate: labels?.dueDate ?? 'Estimated Due Date (if pregnant)',
    currentPhase: labels?.currentPhase ?? 'Current Phase',
    phaseFollicular: labels?.phaseFollicular ?? 'Follicular Phase',
    phaseOvulation: labels?.phaseOvulation ?? 'Ovulation',
    phaseLuteal: labels?.phaseLuteal ?? 'Luteal Phase',
    phaseMenstruation: labels?.phaseMenstruation ?? 'Menstruation',
    note: labels?.note ?? 'Note',
    noteText: labels?.noteText ?? 'This calculator provides estimates based on average cycle data. Actual cycles may vary. Consult a healthcare provider for medical advice.',
  }), [labels])

  const [lastPeriodDate, setLastPeriodDate] = useState('')
  const [cycleLength, setCycleLength] = useState(28)
  const [periodLength, setPeriodLength] = useState(5)
  const [showResults, setShowResults] = useState(false)

  const formatDate = useCallback((date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }, [])

  const addDays = useCallback((date: Date, days: number): Date => {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  }, [])

  const results = useMemo(() => {
    if (!lastPeriodDate) return null

    const lastPeriod = new Date(lastPeriodDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    // Calculate next period
    const nextPeriod = addDays(lastPeriod, cycleLength)

    // Calculate ovulation (typically 14 days before next period)
    const ovulationDay = addDays(nextPeriod, -14)

    // Calculate fertility window (5 days before ovulation + ovulation day)
    const fertilityStart = addDays(ovulationDay, -5)
    const fertilityEnd = ovulationDay

    // Calculate estimated due date (280 days from last period)
    const dueDate = addDays(lastPeriod, 280)

    // Calculate current phase
    const daysSinceLastPeriod = Math.floor(
      (today.getTime() - lastPeriod.getTime()) / (1000 * 60 * 60 * 24)
    )
    const dayInCycle = daysSinceLastPeriod % cycleLength

    let currentPhase = ''
    if (dayInCycle < periodLength) {
      currentPhase = l.phaseMenstruation
    } else if (dayInCycle < cycleLength - 14) {
      currentPhase = l.phaseFollicular
    } else if (dayInCycle >= cycleLength - 14 && dayInCycle <= cycleLength - 12) {
      currentPhase = l.phaseOvulation
    } else {
      currentPhase = l.phaseLuteal
    }

    return {
      nextPeriod,
      ovulationDay,
      fertilityStart,
      fertilityEnd,
      dueDate,
      currentPhase,
    }
  }, [lastPeriodDate, cycleLength, periodLength, addDays, l])

  const handleCalculate = useCallback(() => {
    if (lastPeriodDate) {
      setShowResults(true)
    }
  }, [lastPeriodDate])

  const handleClear = useCallback(() => {
    setLastPeriodDate('')
    setCycleLength(28)
    setPeriodLength(5)
    setShowResults(false)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {/* Input Section */}
      <div
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          backgroundColor: 'var(--color-bg-secondary)',
        }}
      >
        <div className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-sm font-semibold">
              {l.lastPeriodDate}
            </label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg)',
                color: 'var(--color-text)',
                fontSize: '0.875rem',
              }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-semibold">
                {l.cycleLength}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="21"
                  max="35"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(Number(e.target.value))}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    fontSize: '0.875rem',
                  }}
                />
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {l.days}
                </span>
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold">
                {l.periodLength}
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  min="2"
                  max="7"
                  value={periodLength}
                  onChange={(e) => setPeriodLength(Number(e.target.value))}
                  style={{
                    flex: 1,
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    border: '1px solid var(--color-border)',
                    backgroundColor: 'var(--color-bg)',
                    color: 'var(--color-text)',
                    fontSize: '0.875rem',
                  }}
                />
                <span className="text-sm text-[var(--color-text-secondary)]">
                  {l.days}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-primary)] text-white rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-primary-hover)] border-0" onClick={handleCalculate}>
              {l.calculate}
            </button>
            <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-bg-secondary)] text-[var(--color-text)] border border-[var(--color-border)] rounded-lg font-medium cursor-pointer transition-colors hover:bg-[var(--color-border)]" onClick={handleClear}>
              {l.clear}
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      {showResults && results && (
        <div>
          <h3 className="text-lg font-semibold mb-3">
            {l.results}
          </h3>

          <div style={{ display: 'grid', gap: '1rem' }}>
            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {l.nextPeriod}
              </div>
              <div className="text-lg font-semibold">
                {formatDate(results.nextPeriod)}
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {l.ovulation}
              </div>
              <div className="text-lg font-semibold">
                {formatDate(results.ovulationDay)}
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {l.fertilityWindow}
              </div>
              <div className="text-lg font-semibold">
                {formatDate(results.fertilityStart)} - {formatDate(results.fertilityEnd)}
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {l.currentPhase}
              </div>
              <div className="text-lg font-semibold">
                {results.currentPhase}
              </div>
            </div>

            <div
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem',
                padding: '1rem',
                backgroundColor: 'var(--color-bg-secondary)',
              }}
            >
              <div className="text-sm text-[var(--color-text-secondary)] mb-1">
                {l.dueDate}
              </div>
              <div className="text-lg font-semibold">
                {formatDate(results.dueDate)}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Note */}
      <div
        style={{
          padding: '1rem',
          borderRadius: '0.5rem',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
        }}
      >
        <h4 style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'rgb(59, 130, 246)' }}>
          {l.note}
        </h4>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.6, margin: 0 }}>
          {l.noteText}
        </p>
      </div>
    </div>
  )
}
