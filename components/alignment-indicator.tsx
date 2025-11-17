import { Palette, Feather } from 'lucide-react'

interface AlignmentIndicatorProps {
  type: 'painter' | 'writer'
  score: number
  label: string
}

export default function AlignmentIndicator({
  type,
  score,
  label,
}: AlignmentIndicatorProps) {
  const Icon = type === 'painter' ? Palette : Feather
  const color = type === 'painter' ? 'text-primary' : 'text-accent'

  return (
    <div className="flex items-center gap-2">
      <Icon size={20} className={color} />
      <div className="flex items-center gap-2">
        <span className="text-xs text-muted-foreground uppercase tracking-wider">
          {label}
        </span>
        <span className="text-sm font-light text-foreground">{score}</span>
      </div>
    </div>
  )
}
