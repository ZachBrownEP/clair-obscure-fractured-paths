import { Palette, Feather } from 'lucide-react'

interface ChoiceButtonProps {
  text: string
  alignment?: 'painter' | 'writer'
  onClick: () => void
  isSelected?: boolean
}

export default function ChoiceButton({
  text,
  alignment,
  onClick,
  isSelected,
}: ChoiceButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-all ${
        isSelected
          ? 'bg-primary/20 border-primary text-primary'
          : 'border-border/50 hover:border-border hover:bg-card/50 text-foreground hover:text-primary'
      }`}
    >
      <div className="flex items-start gap-3">
        {alignment && (
          <div className="mt-1 flex-shrink-0">
            {alignment === 'painter' ? (
              <Palette size={18} className="text-primary" />
            ) : (
              <Feather size={18} className="text-accent" />
            )}
          </div>
        )}
        <span className="leading-relaxed">{text}</span>
      </div>
    </button>
  )
}
