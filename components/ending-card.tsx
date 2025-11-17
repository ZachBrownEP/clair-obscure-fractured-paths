import { Lock } from 'lucide-react'

interface Ending {
  id: string
  title: string
  route: string
  summary: string
  unlocked: boolean
}

interface EndingCardProps {
  ending: Ending
}

export default function EndingCard({ ending }: EndingCardProps) {
  return (
    <div
      className={`relative rounded-lg p-6 min-h-48 flex flex-col justify-between transition-all ${
        ending.unlocked
          ? 'glass hover:bg-card/70'
          : 'bg-muted/20 border border-border/30 backdrop-blur-sm'
      }`}
    >
      {ending.unlocked ? (
        <>
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
              {ending.route}
            </p>
            <h3 className="text-lg font-light text-foreground mb-3 line-clamp-2">
              {ending.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
              {ending.summary}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-border/30">
            <span className="text-xs text-primary uppercase tracking-wider">
              Unlocked
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <Lock size={32} className="text-muted-foreground/40 mb-3" />
          <p className="text-center text-sm text-muted-foreground">???</p>
        </div>
      )}
    </div>
  )
}
