import { MapPin } from 'lucide-react'

interface Location {
  id: string
  name: string
  region: string
  description: string
}

interface LocationCardProps {
  location: Location
  isSelected: boolean
  onClick: () => void
}

export default function LocationCard({
  location,
  isSelected,
  onClick,
}: LocationCardProps) {
  return (
    <div
      onClick={onClick}
      className={`glass p-4 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-card/80 border-primary/50 ring-1 ring-primary/30'
          : 'hover:bg-card/60 border-border/30'
      }`}
    >
      <div className="flex items-start gap-3">
        <MapPin
          size={20}
          className={isSelected ? 'text-primary flex-shrink-0' : 'text-muted-foreground flex-shrink-0'}
        />
        <div className="min-w-0">
          <h3 className={`font-light ${isSelected ? 'text-primary' : 'text-foreground'}`}>
            {location.name}
          </h3>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            {location.region}
          </p>
          <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
            {location.description}
          </p>
        </div>
      </div>
    </div>
  )
}
