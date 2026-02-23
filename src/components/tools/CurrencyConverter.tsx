'use client'
import { useState, useEffect, useCallback, useMemo } from 'react'

interface CurrencyConverterProps {
  labels?: {
    amount: string
    from: string
    to: string
    swap: string
    result: string
    rate: string
    lastUpdated: string
    loading: string
    error: string
    retry: string
  }
}

const POPULAR_CURRENCIES = ['USD', 'EUR', 'TWD', 'JPY', 'GBP', 'CNY', 'KRW', 'HKD', 'SGD', 'AUD', 'CAD', 'CHF']

const CURRENCY_NAMES: Record<string, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  TWD: 'New Taiwan Dollar',
  JPY: 'Japanese Yen',
  GBP: 'British Pound',
  CNY: 'Chinese Yuan',
  KRW: 'South Korean Won',
  HKD: 'Hong Kong Dollar',
  SGD: 'Singapore Dollar',
  AUD: 'Australian Dollar',
  CAD: 'Canadian Dollar',
  CHF: 'Swiss Franc',
  SEK: 'Swedish Krona',
  NOK: 'Norwegian Krone',
  DKK: 'Danish Krone',
  NZD: 'New Zealand Dollar',
  MXN: 'Mexican Peso',
  BRL: 'Brazilian Real',
  INR: 'Indian Rupee',
  ZAR: 'South African Rand',
  THB: 'Thai Baht',
  MYR: 'Malaysian Ringgit',
  PHP: 'Philippine Peso',
  IDR: 'Indonesian Rupiah',
  PLN: 'Polish Zloty',
  CZK: 'Czech Koruna',
  HUF: 'Hungarian Forint',
  TRY: 'Turkish Lira',
  ISK: 'Icelandic Krona',
  BGN: 'Bulgarian Lev',
  RON: 'Romanian Leu',
  HRK: 'Croatian Kuna',
  ILS: 'Israeli Shekel',
}

export default function CurrencyConverter({ labels }: CurrencyConverterProps) {
  const l = {
    amount: labels?.amount ?? 'Amount',
    from: labels?.from ?? 'From',
    to: labels?.to ?? 'To',
    swap: labels?.swap ?? 'Swap',
    result: labels?.result ?? 'Result',
    rate: labels?.rate ?? 'Exchange Rate',
    lastUpdated: labels?.lastUpdated ?? 'Last updated',
    loading: labels?.loading ?? 'Loading exchange rates...',
    error: labels?.error ?? 'Failed to load exchange rates.',
    retry: labels?.retry ?? 'Retry',
  }

  const [rates, setRates] = useState<Record<string, number> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [amount, setAmount] = useState(1)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('TWD')
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchRates = useCallback(async () => {
    setLoading(true)
    setError(false)
    try {
      const res = await fetch('/api/exchange-rates')
      if (!res.ok) throw new Error('Failed to fetch')
      const json = await res.json()
      if (json.error) throw new Error(json.error)
      setRates(json.rates)
      setLastUpdated(new Date())
    } catch {
      setError(true)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchRates()
  }, [fetchRates])

  const sortedCurrencies = useMemo(() => {
    if (!rates) return []
    const all = Object.keys(rates)
    const popular = POPULAR_CURRENCIES.filter((c) => all.includes(c))
    const rest = all.filter((c) => !POPULAR_CURRENCIES.includes(c)).sort()
    return [...popular, ...rest]
  }, [rates])

  const converted = useMemo(() => {
    if (!rates || !rates[fromCurrency] || !rates[toCurrency]) return null
    const rateFromUSD = rates[toCurrency] / rates[fromCurrency]
    return amount * rateFromUSD
  }, [rates, amount, fromCurrency, toCurrency])

  const forwardRate = useMemo(() => {
    if (!rates || !rates[fromCurrency] || !rates[toCurrency]) return null
    return rates[toCurrency] / rates[fromCurrency]
  }, [rates, fromCurrency, toCurrency])

  const inverseRate = useMemo(() => {
    if (!forwardRate) return null
    return 1 / forwardRate
  }, [forwardRate])

  const handleSwap = useCallback(() => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }, [fromCurrency, toCurrency])

  const formatNumber = (n: number) => {
    if (n >= 1000) return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    if (n >= 1) return n.toFixed(4)
    return n.toFixed(6)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '1rem',
  }

  const selectStyle: React.CSSProperties = {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid var(--color-border)',
    borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)',
    color: 'var(--color-text)',
    fontSize: '1rem',
    cursor: 'pointer',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    marginBottom: '0.375rem',
    fontWeight: 500,
    fontSize: '0.875rem',
    color: 'var(--color-text-secondary)',
  }

  const cardStyle: React.CSSProperties = {
    padding: '1.5rem',
    borderRadius: '0.75rem',
    backgroundColor: 'var(--color-bg-secondary)',
    border: '1px solid var(--color-border)',
  }

  if (loading) {
    return (
      <div style={{ ...cardStyle, textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>&#8987;</div>
        <div style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>{l.loading}</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ ...cardStyle, textAlign: 'center', padding: '3rem' }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem', color: 'var(--color-error)' }}>&#9888;</div>
        <div style={{ color: 'var(--color-error)', marginBottom: '1rem', fontSize: '0.95rem' }}>{l.error}</div>
        <button
          onClick={fetchRates}
          style={{
            padding: '0.5rem 1.5rem',
            borderRadius: '0.5rem',
            border: '1px solid var(--color-primary)',
            backgroundColor: 'var(--color-primary)',
            color: '#fff',
            cursor: 'pointer',
            fontWeight: 600,
            fontSize: '0.875rem',
          }}
        >
          {l.retry}
        </button>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Input section */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Amount */}
          <div>
            <label style={labelStyle}>{l.amount}</label>
            <input
              type="number"
              style={inputStyle}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              min={0}
              step={0.01}
            />
          </div>

          {/* Currency selectors with swap */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'end' }}>
            <div>
              <label style={labelStyle}>{l.from}</label>
              <select
                style={selectStyle}
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {sortedCurrencies.map((code, idx) => (
                  <option key={code} value={code}>
                    {code}{CURRENCY_NAMES[code] ? ` - ${CURRENCY_NAMES[code]}` : ''}
                    {idx === POPULAR_CURRENCIES.filter((c) => sortedCurrencies.includes(c)).length - 1 ? '' : ''}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleSwap}
              title={l.swap}
              style={{
                padding: '0.75rem',
                borderRadius: '50%',
                border: '1px solid var(--color-border)',
                backgroundColor: 'var(--color-bg-secondary)',
                color: 'var(--color-primary)',
                cursor: 'pointer',
                fontSize: '1.25rem',
                lineHeight: 1,
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.15s',
                flexShrink: 0,
              }}
            >
              &#8646;
            </button>

            <div>
              <label style={labelStyle}>{l.to}</label>
              <select
                style={selectStyle}
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {sortedCurrencies.map((code) => (
                  <option key={code} value={code}>
                    {code}{CURRENCY_NAMES[code] ? ` - ${CURRENCY_NAMES[code]}` : ''}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Result section */}
      {converted !== null && forwardRate !== null && inverseRate !== null && (
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 600 }}>
            {l.result}
          </div>
          <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>
            {formatNumber(converted)} {toCurrency}
          </div>
          <div style={{ fontSize: '1.1rem', color: 'var(--color-text-secondary)', marginBottom: '1.25rem' }}>
            {formatNumber(amount)} {fromCurrency}
          </div>

          {/* Exchange rates */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', padding: '1rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)' }}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: '0.25rem' }}>
              {l.rate}
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--color-text)' }}>
              1 {fromCurrency} = {formatNumber(forwardRate)} {toCurrency}
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--color-text)' }}>
              1 {toCurrency} = {formatNumber(inverseRate)} {fromCurrency}
            </div>
          </div>

          {/* Last updated */}
          {lastUpdated && (
            <div style={{ marginTop: '1rem', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
              {l.lastUpdated}: {lastUpdated.toLocaleTimeString()}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
