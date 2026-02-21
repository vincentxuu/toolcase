import {
  Braces,
  QrCode,
  KeyRound,
  Clock,
  CalendarClock,
  Languages,
  Binary,
  type LucideProps,
} from 'lucide-react'

const iconMap: Record<string, React.ComponentType<LucideProps>> = {
  braces: Braces,
  'qr-code': QrCode,
  'key-round': KeyRound,
  clock: Clock,
  'calendar-clock': CalendarClock,
  languages: Languages,
  binary: Binary,
}

export default function ToolIcon({ name, size = 28 }: { name: string; size?: number }) {
  const Icon = iconMap[name]
  if (!Icon) return null
  return <Icon size={size} />
}
