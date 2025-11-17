import { Palette, Feather, Scale } from 'lucide-react'

interface ChoiceButtonProps {
  text: string
  alignment?: 'painter' | 'writer' | 'balance'
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
      className={`w-full text-left p-4 rounded-lg border transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10 ${
        isSelected
          ? 'bg-primary/20 border-primary text-primary scale-[0.98]'
          : 'border-border/50 hover:border-primary/50 hover:bg-card/50 text-foreground hover:text-primary'
      }`}
    >
      <div className="flex items-start gap-3">
        {alignment && (
          <div className="mt-1 flex-shrink-0">
            {alignment === 'painter' ? (
              <Palette size={18} className="text-primary" />
            ) : alignment === 'writer' ? (
              <Feather size={18} className="text-accent" />
            ) : (
              <Scale size={18} className="text-secondary" />
            )}
          </div>
        )}
        <span className="leading-relaxed">{text}</span>
      </div>
    </button>
  )
}
