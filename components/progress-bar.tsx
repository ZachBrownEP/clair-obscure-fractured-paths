interface ProgressBarProps {
  current: number
  total: number
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = (current / total) * 100

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-40">
      <div
        className="h-full bg-gradient-to-r from-primary via-accent to-primary transition-all duration-500"
        style={{ width: `${percentage}%` }}
      />
    </div>
  )
}
