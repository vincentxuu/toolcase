'use client'
import { useState, useMemo } from 'react'

interface IpSubnetCalculatorProps {
  labels?: {
    ipAddress: string
    cidr: string
    subnetMask: string
    networkAddress: string
    broadcastAddress: string
    firstHost: string
    lastHost: string
    totalHosts: string
    ipClass: string
    placeholder: string
    invalid: string
  }
}

function ipToNum(ip: string): number {
  const p = ip.split('.').map(Number)
  return ((p[0] << 24) | (p[1] << 16) | (p[2] << 8) | p[3]) >>> 0
}

function numToIp(n: number): string {
  return [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.')
}

function isValidIp(ip: string): boolean {
  const parts = ip.split('.')
  if (parts.length !== 4) return false
  return parts.every((p) => { const n = parseInt(p); return !isNaN(n) && n >= 0 && n <= 255 && String(n) === p })
}

function getIpClass(firstOctet: number): string {
  if (firstOctet < 128) return 'A'
  if (firstOctet < 192) return 'B'
  if (firstOctet < 224) return 'C'
  if (firstOctet < 240) return 'D'
  return 'E'
}

export default function IpSubnetCalculator({ labels }: IpSubnetCalculatorProps) {
  const l = {
    ipAddress: labels?.ipAddress ?? 'IP Address',
    cidr: labels?.cidr ?? 'CIDR',
    subnetMask: labels?.subnetMask ?? 'Subnet Mask',
    networkAddress: labels?.networkAddress ?? 'Network Address',
    broadcastAddress: labels?.broadcastAddress ?? 'Broadcast Address',
    firstHost: labels?.firstHost ?? 'First Host',
    lastHost: labels?.lastHost ?? 'Last Host',
    totalHosts: labels?.totalHosts ?? 'Total Usable Hosts',
    ipClass: labels?.ipClass ?? 'IP Class',
    placeholder: labels?.placeholder ?? '192.168.1.0',
    invalid: labels?.invalid ?? 'Enter a valid IPv4 address',
  }

  const [ip, setIp] = useState('192.168.1.0')
  const [cidr, setCidr] = useState(24)

  const result = useMemo(() => {
    if (!isValidIp(ip)) return null
    const ipNum = ipToNum(ip)
    const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0
    const network = (ipNum & mask) >>> 0
    const broadcast = (network | (~mask >>> 0)) >>> 0
    const firstHost = cidr >= 31 ? network : (network + 1) >>> 0
    const lastHost = cidr >= 31 ? broadcast : (broadcast - 1) >>> 0
    const totalHosts = cidr >= 31 ? (cidr === 32 ? 1 : 2) : Math.pow(2, 32 - cidr) - 2

    return {
      mask: numToIp(mask),
      network: numToIp(network),
      broadcast: numToIp(broadcast),
      firstHost: numToIp(firstHost),
      lastHost: numToIp(lastHost),
      totalHosts,
      ipClass: getIpClass(parseInt(ip.split('.')[0])),
    }
  }, [ip, cidr])

  const rowStyle: React.CSSProperties = { display: 'flex', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--color-border)' }
  const valueStyle: React.CSSProperties = { fontFamily: 'monospace', fontWeight: 600 }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1 1 200px' }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>{l.ipAddress}</label>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder={l.placeholder}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontFamily: 'monospace', fontSize: '1rem' }}
          />
        </div>
        <div style={{ flex: '0 0 120px' }}>
          <label style={{ fontWeight: 600, display: 'block', marginBottom: '0.25rem' }}>/{l.cidr}</label>
          <input
            type="number"
            min={0}
            max={32}
            value={cidr}
            onChange={(e) => setCidr(Math.min(32, Math.max(0, parseInt(e.target.value) || 0)))}
            style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.5rem', backgroundColor: 'var(--color-bg-secondary)', fontFamily: 'monospace', fontSize: '1rem' }}
          />
        </div>
      </div>

      {result ? (
        <div style={{ padding: '1rem', borderRadius: '0.5rem', border: '1px solid var(--color-border)', backgroundColor: 'var(--color-bg-secondary)' }}>
          <div style={rowStyle}><span>{l.subnetMask}</span><span style={valueStyle}>{result.mask}</span></div>
          <div style={rowStyle}><span>{l.networkAddress}</span><span style={valueStyle}>{result.network}</span></div>
          <div style={rowStyle}><span>{l.broadcastAddress}</span><span style={valueStyle}>{result.broadcast}</span></div>
          <div style={rowStyle}><span>{l.firstHost}</span><span style={valueStyle}>{result.firstHost}</span></div>
          <div style={rowStyle}><span>{l.lastHost}</span><span style={valueStyle}>{result.lastHost}</span></div>
          <div style={rowStyle}><span>{l.totalHosts}</span><span style={valueStyle}>{result.totalHosts.toLocaleString()}</span></div>
          <div style={{ ...rowStyle, borderBottom: 'none' }}><span>{l.ipClass}</span><span style={valueStyle}>Class {result.ipClass}</span></div>
        </div>
      ) : (
        <div style={{ padding: '1rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>{l.invalid}</div>
      )}
    </div>
  )
}
