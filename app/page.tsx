import Link from 'next/link'
import { BookOpen, Map, Trophy, ChevronRight } from 'lucide-react'
import HeroSection from '@/components/hero-section'
import EnhancedBackground from '@/components/enhanced-background'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <EnhancedBackground />
      <main className="relative z-10">
        <HeroSection />

        <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
          {/* Story Routes */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-foreground mb-4">Begin Your Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your path through the fractured world of Clair Obscur
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-20 max-w-5xl mx-auto justify-items-center">
            <Link href="/stories/verso" className="block w-full max-w-md md:max-w-none">
              <div className="glass rounded-xl p-8 hover:bg-card/70 transition-all cursor-pointer group h-full text-center">
                <h2 className="text-3xl font-light text-foreground mb-3 group-hover:text-primary transition-colors">
                  Verso's Story
                </h2>
                <p className="text-sm text-muted-foreground uppercase mb-4">
                  The Fractured Canvas
                </p>
                <p className="text-foreground leading-relaxed mb-6">
                  Follow Verso's journey through shadowed corridors and painted realities. Navigate the threshold between worlds and uncover the secrets of the Canvas Ghost.
                </p>
                <div className="flex items-center justify-center gap-2 text-primary group-hover:gap-3 transition-all">
                  <span className="text-sm uppercase tracking-wider font-light">
                    Begin Journey
                  </span>
                  <ChevronRight size={18} />
                </div>
              </div>
            </Link>

            <Link href="/stories/maelle" className="block w-full max-w-md md:max-w-none">
              <div className="glass rounded-xl p-8 hover:bg-card/70 transition-all cursor-pointer group h-full text-center">
                <h2 className="text-3xl font-light text-foreground mb-3 group-hover:text-primary transition-colors">
                  Maelle's Story
                </h2>
                <p className="text-sm text-muted-foreground uppercase mb-4">
                  Resonance of Alicia
                </p>
                <p className="text-foreground leading-relaxed mb-6">
                  Trace Maelle's path as a seeker of truth through fractured timelines. Navigate between versions of reality and discover the resonance that connects all possible worlds.
                </p>
                <div className="flex items-center justify-center gap-2 text-primary group-hover:gap-3 transition-all">
                  <span className="text-sm uppercase tracking-wider font-light">
                    Begin Journey
                  </span>
                  <ChevronRight size={18} />
                </div>
              </div>
            </Link>
          </div>

          {/* Secondary Links */}
          <section className="text-center">
            <h2 className="text-3xl font-light text-foreground mb-4">Explore</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Delve deeper into the lore and world of Fractured Paths
            </p>
            <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
              <Link href="/codex">
                <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group text-center">
                  <div className="text-primary mb-3 group-hover:scale-110 transition-transform flex justify-center">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-lg font-light text-foreground mb-2">Lore Codex</h3>
                  <p className="text-sm text-muted-foreground">
                    Characters, locations, factions, and the magic that binds them.
                  </p>
                </div>
              </Link>

              <Link href="/map">
                <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group text-center">
                  <div className="text-primary mb-3 group-hover:scale-110 transition-transform flex justify-center">
                    <Map size={24} />
                  </div>
                  <h3 className="text-lg font-light text-foreground mb-2">World Map</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore the fractured lands and discover hidden connections.
                  </p>
                </div>
              </Link>

              <Link href="/endings">
                <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group text-center">
                  <div className="text-primary mb-3 group-hover:scale-110 transition-transform flex justify-center">
                    <Trophy size={24} />
                  </div>
                  <h3 className="text-lg font-light text-foreground mb-2">Endings Gallery</h3>
                  <p className="text-sm text-muted-foreground">
                    View the fates you have unlocked across all routes.
                  </p>
                </div>
              </Link>
            </div>
          </section>
        </section>
      </main>
    </div>
  )
}
