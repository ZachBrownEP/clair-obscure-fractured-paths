'use client'

import { useState } from 'react'
import MapViewer from './map-viewer'
import LocationCard from './location-card'

interface Location {
  id: string
  name: string
  region: string
  description: string
  significance: string
  visitedIn?: string[]
}

const LOCATIONS: Location[] = [
  {
    id: 'painted-gallery',
    name: 'The Painted Gallery',
    region: 'City Center',
    description: 'Where art and reality intertwine. A threshold between worlds.',
    significance: 'The starting point of fractured paths. Where Verso first encountered the Canvas Ghost.',
    visitedIn: ['verso', 'maelle'],
  },
  {
    id: 'dreaming-district',
    name: 'The Dreaming District',
    region: 'Eastern Quarter',
    description: 'A place where streets shift and buildings remember their pasts.',
    significance: 'A liminal space where memories and dreams take physical form.',
  },
  {
    id: 'scribes-archive',
    name: "The Scribes' Archive",
    region: 'Northern Heights',
    description: 'An ancient library housing forbidden knowledge and lost histories.',
    significance: 'Home to the Order of Scribes. Keeper of truths.',
  },
  {
    id: 'painters-studio',
    name: "The Painters' Studio",
    region: 'Western Reaches',
    description: 'A sprawling atelier where reality is reshaped through art.',
    significance: 'Headquarters of the Painters\' Circle. Where imagination becomes tangible.',
  },
  {
    id: 'fractured-expanse',
    name: 'The Fractured Expanse',
    region: 'Beyond the Known',
    description: 'Where multiple realities overlap and collide. A dangerous frontier.',
    significance: 'The ultimate destination for those seeking the deepest truths.',
  },
]

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-4xl md:text-5xl font-light mb-2 text-foreground">
        World Map
      </h1>
      <p className="text-muted-foreground mb-12">
        Explore the fractured lands of Clair Obscur.
      </p>

      <div className="mb-12">
        <MapViewer selectedLocation={selectedLocation} />
      </div>

      <div>
        <h2 className="text-2xl font-light text-foreground mb-6">Locations</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LOCATIONS.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              isSelected={selectedLocation?.id === location.id}
              onClick={() => setSelectedLocation(location)}
            />
          ))}
        </div>
      </div>

      {selectedLocation && (
        <div className="mt-12 glass rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-light text-foreground mb-2">
            {selectedLocation.name}
          </h2>
          <p className="text-sm text-muted-foreground uppercase mb-6">
            {selectedLocation.region}
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                Description
              </h3>
              <p className="text-foreground leading-relaxed">
                {selectedLocation.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                Significance
              </h3>
              <p className="text-foreground leading-relaxed">
                {selectedLocation.significance}
              </p>
            </div>

            {selectedLocation.visitedIn && (
              <div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                  Explored In
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedLocation.visitedIn.map((route) => (
                    <span
                      key={route}
                      className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm"
                    >
                      {route === 'verso' ? "Verso's Path" : "Maelle's Journey"}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
