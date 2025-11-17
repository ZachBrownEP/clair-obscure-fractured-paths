interface Location {
  id: string
  name: string
  region: string
}

interface MapViewerProps {
  selectedLocation?: Location | null
}

export default function MapViewer({ selectedLocation }: MapViewerProps) {
  return (
    <div className="relative w-full aspect-video glass rounded-2xl overflow-hidden bg-gradient-to-b from-secondary/20 via-card to-card flex items-center justify-center">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {/* Background grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-12 left-12 w-24 h-24 rounded-full border-2 border-primary/30 opacity-50" />
        <div className="absolute bottom-20 right-16 w-32 h-32 rounded-full border-2 border-accent/30 opacity-50" />

        {/* Map content */}
        <div className="relative z-10 text-center">
          <p className="text-muted-foreground uppercase tracking-widest text-sm mb-4">
            {selectedLocation?.name || 'Select a location'}
          </p>
          <h3 className="text-2xl md:text-3xl font-light text-foreground">
            Clair Obscur
          </h3>
          <p className="text-muted-foreground text-sm mt-4">
            A stylized map of the fractured lands
          </p>
        </div>
      </div>
    </div>
  )
}
