'use client'
import { useState, useMemo } from 'react'

interface ElectricityCalculatorProps {
  labels?: {
    deviceName: string
    wattage: string
    hoursPerDay: string
    daysPerMonth: string
    electricityRate: string
    addDevice: string
    remove: string
    device: string
    dailyKwh: string
    monthlyKwh: string
    dailyCost: string
    monthlyCost: string
    yearlyCost: string
    totalCosts: string
    perKwh: string
  }
}

interface Device {
  id: number
  name: string
  wattage: number
  hoursPerDay: number
  daysPerMonth: number
}

let nextId = 3

export default function ElectricityCalculator({ labels }: ElectricityCalculatorProps) {
  const l = {
    deviceName: labels?.deviceName ?? 'Device Name',
    wattage: labels?.wattage ?? 'Wattage (W)',
    hoursPerDay: labels?.hoursPerDay ?? 'Hours/Day',
    daysPerMonth: labels?.daysPerMonth ?? 'Days/Month',
    electricityRate: labels?.electricityRate ?? 'Electricity Rate ($/kWh)',
    addDevice: labels?.addDevice ?? 'Add Device',
    remove: labels?.remove ?? 'Remove',
    device: labels?.device ?? 'Device',
    dailyKwh: labels?.dailyKwh ?? 'Daily kWh',
    monthlyKwh: labels?.monthlyKwh ?? 'Monthly kWh',
    dailyCost: labels?.dailyCost ?? 'Daily Cost',
    monthlyCost: labels?.monthlyCost ?? 'Monthly Cost',
    yearlyCost: labels?.yearlyCost ?? 'Yearly Cost',
    totalCosts: labels?.totalCosts ?? 'Total Costs',
    perKwh: labels?.perKwh ?? '/kWh',
  }

  const [devices, setDevices] = useState<Device[]>([
    { id: 1, name: 'Light Bulb', wattage: 60, hoursPerDay: 8, daysPerMonth: 30 },
    { id: 2, name: 'Air Conditioner', wattage: 1500, hoursPerDay: 6, daysPerMonth: 30 },
  ])
  const [rate, setRate] = useState(0.12)

  const results = useMemo(() => {
    const deviceResults = devices.map((d) => {
      const dailyKwh = (d.wattage * d.hoursPerDay) / 1000
      const monthlyKwh = dailyKwh * d.daysPerMonth
      const dailyCost = dailyKwh * rate
      const monthlyCost = monthlyKwh * rate
      const yearlyCost = monthlyCost * 12
      return { id: d.id, name: d.name, dailyKwh, monthlyKwh, dailyCost, monthlyCost, yearlyCost }
    })
    const totals = deviceResults.reduce(
      (acc, r) => ({
        dailyKwh: acc.dailyKwh + r.dailyKwh,
        monthlyKwh: acc.monthlyKwh + r.monthlyKwh,
        dailyCost: acc.dailyCost + r.dailyCost,
        monthlyCost: acc.monthlyCost + r.monthlyCost,
        yearlyCost: acc.yearlyCost + r.yearlyCost,
      }),
      { dailyKwh: 0, monthlyKwh: 0, dailyCost: 0, monthlyCost: 0, yearlyCost: 0 }
    )
    return { deviceResults, totals }
  }, [devices, rate])

  const addDevice = () => {
    setDevices([...devices, { id: nextId++, name: `${l.device} ${devices.length + 1}`, wattage: 100, hoursPerDay: 4, daysPerMonth: 30 }])
  }

  const removeDevice = (id: number) => {
    if (devices.length > 1) setDevices(devices.filter((d) => d.id !== id))
  }

  const updateDevice = (id: number, field: keyof Device, value: string | number) => {
    setDevices(devices.map((d) => (d.id === id ? { ...d, [field]: value } : d)))
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem',
    backgroundColor: 'var(--color-bg-secondary)', color: 'var(--color-text)', fontSize: '1rem',
  }
  const labelStyle: React.CSSProperties = { display: 'block', marginBottom: '0.375rem', fontWeight: 500, fontSize: '0.875rem', color: 'var(--color-text-secondary)' }
  const cardStyle: React.CSSProperties = { padding: '1.25rem', borderRadius: '0.75rem', backgroundColor: 'var(--color-bg-secondary)', border: '1px solid var(--color-border)', textAlign: 'center' }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <label style={labelStyle}>{l.electricityRate}</label>
        <input type="number" style={{ ...inputStyle, maxWidth: '250px' }} value={rate} onChange={(e) => setRate(Number(e.target.value))} min={0} step={0.01} />
      </div>

      {devices.map((device) => (
        <div key={device.id} style={{ padding: '1rem', borderRadius: '0.75rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <input
              type="text"
              style={{ ...inputStyle, fontWeight: 600, border: 'none', backgroundColor: 'transparent', padding: '0', fontSize: '1rem' }}
              value={device.name}
              onChange={(e) => updateDevice(device.id, 'name', e.target.value)}
            />
            <button
              onClick={() => removeDevice(device.id)}
              style={{
                padding: '0.375rem 0.75rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)',
                backgroundColor: 'transparent', color: 'var(--color-error)', cursor: 'pointer',
                fontSize: '0.8rem', opacity: devices.length <= 1 ? 0.4 : 1,
              }}
              disabled={devices.length <= 1}
            >
              {l.remove}
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
            <div>
              <label style={labelStyle}>{l.wattage}</label>
              <input type="number" style={inputStyle} value={device.wattage} onChange={(e) => updateDevice(device.id, 'wattage', Number(e.target.value))} min={0} />
            </div>
            <div>
              <label style={labelStyle}>{l.hoursPerDay}</label>
              <input type="number" style={inputStyle} value={device.hoursPerDay} onChange={(e) => updateDevice(device.id, 'hoursPerDay', Number(e.target.value))} min={0} max={24} step={0.5} />
            </div>
            <div>
              <label style={labelStyle}>{l.daysPerMonth}</label>
              <input type="number" style={inputStyle} value={device.daysPerMonth} onChange={(e) => updateDevice(device.id, 'daysPerMonth', Number(e.target.value))} min={0} max={31} />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addDevice}
        style={{
          padding: '0.75rem 1.5rem', borderRadius: '0.5rem', border: '2px dashed var(--color-border)',
          backgroundColor: 'transparent', color: 'var(--color-primary)', cursor: 'pointer',
          fontSize: '0.875rem', fontWeight: 600,
        }}
      >
        + {l.addDevice}
      </button>

      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.75rem' }}>{l.totalCosts}</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.dailyCost}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>
              ${results.totals.dailyCost.toFixed(2)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>{results.totals.dailyKwh.toFixed(2)} kWh</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.monthlyCost}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#f59e0b' }}>
              ${results.totals.monthlyCost.toFixed(2)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>{results.totals.monthlyKwh.toFixed(2)} kWh</div>
          </div>
          <div style={cardStyle}>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginBottom: '0.25rem' }}>{l.yearlyCost}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-success)' }}>
              ${results.totals.yearlyCost.toFixed(2)}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>{(results.totals.monthlyKwh * 12).toFixed(2)} kWh</div>
          </div>
        </div>
      </div>
    </div>
  )
}
