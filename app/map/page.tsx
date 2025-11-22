'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import MapViewer from '@/components/map-viewer'
import NavigationSidebar from '@/components/navigation-sidebar'
import EnhancedBackground from '@/components/enhanced-background'

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
    region: 'Between Worlds',
    description: 'Where art and reality intertwine. A threshold between worlds.',
    significance: 'The starting point of fractured paths. Where Verso first encountered the Canvas Ghost and Renoir maintains eternal vigil over the Gallery Between.',
    visitedIn: ['verso', 'maelle']
  },
  {
    id: 'lumiere',
    name: 'Lumière',
    region: 'Real World',
    description: 'A city that remembers multiple versions of itself.',
    significance: 'Home to both the Painters\' Circle and Scribes\' Order. The café and fountain serve as threshold points where real and painted worlds overlap.',
    visitedIn: ['verso', 'maelle']
  },
  {
    id: 'scribes-archive',
    name: "The Scribes' Archive",
    region: 'Northern Heights',
    description: 'An ancient library housing contradictory truths and lost histories.',
    significance: 'Home to the Order of Scribes. Keeper of all truths across all fractured timelines. Contains the hidden Liminal Archive where Alicia dwells.',
    visitedIn: ['maelle']
  },
  {
    id: 'painters-studio',
    name: "The Painters' Studio",
    region: 'Western Reaches',
    description: 'A sprawling atelier where reality is reshaped through art.',
    significance: 'Headquarters of the Painters\' Circle. Where imagination becomes tangible and students learn the Art of Creation.',
    visitedIn: ['verso']
  },
  {
    id: 'liminal-archive',
    name: 'The Liminal Archive',
    region: 'Between Spaces',
    description: 'A metaphysical space where all written words exist simultaneously.',
    significance: 'Accessible only to those who perceive across fractured timelines. Home to Alicia in her transformed state.',
    visitedIn: ['maelle']
  },
  {
    id: 'cafe-dor',
    name: 'Café d\'Or',
    region: 'Lumière - Threshold',
    description: 'A café where memories linger and time moves strangely.',
    significance: 'Towers impossibly high in painted worlds. Patrons frozen mid-conversation. Verso and Aline\'s memories are embedded in its architecture.',
    visitedIn: ['verso']
  },
  {
    id: 'fractured-expanse',
    name: 'The Fractured Expanse',
    region: 'Beyond the Known',
    description: 'Where multiple realities overlap and collide. A dangerous frontier.',
    significance: 'The frontier beyond all mapped territories. Where fractured timelines merge chaotically. The ultimate destination for truth-seekers.'
  }
]

export default function MapPage() {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <EnhancedBackground />
      <NavigationSidebar />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
        >
          <ChevronLeft size={18} />
          Back to Dashboard
        </Link>

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
            {LOCATIONS.map(location => (
              <div
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={`glass p-6 rounded-lg cursor-pointer transition-all ${
                  selectedLocation?.id === location.id
                    ? 'bg-card/70 border-primary'
                    : 'hover:bg-card/70'
                }`}
              >
                <h3 className="text-lg font-light text-foreground mb-2">
                  {location.name}
                </h3>
                <p className="text-xs text-muted-foreground uppercase mb-3">
                  {location.region}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {location.description}
                </p>
              </div>
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

              {selectedLocation.visitedIn && selectedLocation.visitedIn.length > 0 && (
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-2">
                    Explored In
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedLocation.visitedIn.map(route => (
                      <Link
                        key={route}
                        href={`/stories/${route}`}
                        className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-sm hover:bg-primary/30 transition-colors"
                      >
                        {route === 'verso' ? "Verso's Path" : "Maelle's Journey"}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
