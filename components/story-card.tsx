import { ChevronRight } from 'lucide-react'

interface StoryCardProps {
  title: string
  description: string
  progress: number
  buttonText: string
}

export default function StoryCard({ title, description, progress, buttonText }: StoryCardProps) {
  return (
    <div className="group glass p-8 rounded-xl hover:bg-card/70 transition-all hover:shadow-lg">
      {progress > 0 && (
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">Progress</span>
            <span className="text-sm text-primary font-light">{progress}%</span>
          </div>
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-primary to-accent transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      
      <h2 className="text-3xl font-light text-foreground mb-4">{title}</h2>
      <p className="text-muted-foreground leading-relaxed mb-6">{description}</p>
      
      <button className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-light">
        {buttonText}
        <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  )
}
