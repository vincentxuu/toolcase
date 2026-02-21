import {
  Braces,
  QrCode,
  KeyRound,
  Clock,
  CalendarClock,
  Languages,
  Binary,
  House,
  TrendingUp,
  Banknote,
  CreditCard,
  PiggyBank,
  Percent,
  Umbrella,
  HeartPulse,
  Flame,
  Baby,
  Calculator,
  Cake,
  Shield,
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
  house: House,
  'trending-up': TrendingUp,
  banknote: Banknote,
  'credit-card': CreditCard,
  'piggy-bank': PiggyBank,
  percent: Percent,
  umbrella: Umbrella,
  'heart-pulse': HeartPulse,
  flame: Flame,
  baby: Baby,
  calculator: Calculator,
  cake: Cake,
  shield: Shield,
}

export default function ToolIcon({ name, size = 28 }: { name: string; size?: number }) {
  const Icon = iconMap[name]
  if (!Icon) return null
  return <Icon size={size} />
}
