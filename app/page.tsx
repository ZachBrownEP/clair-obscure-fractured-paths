import Link from 'next/link'
import { BookOpen, Map, Trophy, ChevronRight, Sparkles, GitBranch, Award } from 'lucide-react'
import HeroSection from '@/components/hero-section'
import EnhancedBackground from '@/components/enhanced-background'
import ParticleEffects from '@/components/particle-effects'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <EnhancedBackground />
      <main className="relative z-10">
        <HeroSection />

        {/* About Section */}
        <section className="px-4 md:px-8 py-16 max-w-5xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 mb-16 relative overflow-hidden">
            <ParticleEffects count={8} color="gold" intensity="subtle" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6 text-center">
                About This Experience
              </h2>
              <div className="space-y-6 text-foreground/90 leading-relaxed">
                <p className="text-lg md:text-xl">
                  <strong className="text-primary">Fractured Paths</strong> is an interactive companion experience for <em>Clair Obscur: Expedition 33</em>, expanding the world beyond the game with original branching narratives and multiple endings.
                </p>

                <p>
                  This web application allows you to explore the stories of characters whose fates were touched by the events of Expedition 33. Through your choices, you'll navigate fractured realities, shape character alignments, and unlock unique endings that reflect your decisions.
                </p>

                <div className="grid md:grid-cols-3 gap-6 py-6">
                  <div className="text-center">
                    <div className="inline-block p-3 bg-primary/10 rounded-full mb-3">
                      <GitBranch className="text-primary" size={24} />
                    </div>
                    <h3 className="text-lg font-light text-primary mb-2">Branching Stories</h3>
                    <p className="text-sm text-muted-foreground">
                      Every choice matters. Navigate complex decision trees that lead to vastly different outcomes.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="inline-block p-3 bg-accent/10 rounded-full mb-3">
                      <Award className="text-accent" size={24} />
                    </div>
                    <h3 className="text-lg font-light text-accent mb-2">Multiple Endings</h3>
                    <p className="text-sm text-muted-foreground">
                      Discover 7 unique endings across two character routes, each with their own narrative conclusion.
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="inline-block p-3 bg-secondary/10 rounded-full mb-3">
                      <Sparkles className="text-secondary" size={24} />
                    </div>
                    <h3 className="text-lg font-light text-secondary mb-2">Alignment System</h3>
                    <p className="text-sm text-muted-foreground">
                      Track your philosophical alignment between Painter and Writer, plus compassion metrics that unlock paths.
                    </p>
                  </div>
                </div>

                <p>
                  Choose between <strong>Story Journey</strong> mode for a linear, chapter-based narrative experience, or <strong>Interactive Path</strong> mode for choice-driven gameplay with alignment tracking and conditional branching.
                </p>

                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mt-6">
                  <p className="text-sm text-foreground/80">
                    <strong className="text-primary">New to Expedition 33?</strong> Visit the <Link href="/recap" className="text-accent hover:underline">Story Recap</Link> to learn about the world, the Monolith, and the events that shaped this fractured reality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 md:px-8 pb-16 max-w-7xl mx-auto">
          {/* Story Routes */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-foreground mb-4">Begin Your Journey</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your path through the fractured world of Clair Obscur
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-20 max-w-5xl mx-auto">
            <Link href="/stories/verso" className="block relative">
              <div className="glass rounded-xl p-8 hover:bg-card/70 transition-all cursor-pointer group h-full relative overflow-hidden">
                <ParticleEffects count={5} color="gold" intensity="subtle" />
                <div className="relative">
                  <h2 className="text-3xl font-light text-foreground mb-3 group-hover:text-primary transition-colors">
                    Verso's Story
                  </h2>
                  <p className="text-sm text-muted-foreground uppercase mb-4">
                    The Fractured Canvas
                  </p>
                  <p className="text-foreground leading-relaxed mb-6">
                    Follow Verso's journey through shadowed corridors and painted realities. Navigate the threshold between worlds and uncover the secrets of the Canvas Ghost.
                  </p>
                  <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm uppercase tracking-wider font-light">
                      Begin Journey
                    </span>
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/stories/maelle" className="block relative">
              <div className="glass rounded-xl p-8 hover:bg-card/70 transition-all cursor-pointer group h-full relative overflow-hidden">
                <ParticleEffects count={5} color="accent" intensity="subtle" />
                <div className="relative">
                  <h2 className="text-3xl font-light text-foreground mb-3 group-hover:text-accent transition-colors">
                    Maelle's Story
                  </h2>
                  <p className="text-sm text-muted-foreground uppercase mb-4">
                    Resonance of Alicia
                  </p>
                  <p className="text-foreground leading-relaxed mb-6">
                    Trace Maelle's path as a seeker of truth through fractured timelines. Navigate between versions of reality and discover the resonance that connects all possible worlds.
                  </p>
                  <div className="flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
                    <span className="text-sm uppercase tracking-wider font-light">
                      Begin Journey
                    </span>
                    <ChevronRight size={18} />
                  </div>
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
                <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group">
                  <div className="text-primary mb-3 group-hover:scale-110 transition-transform">
                    <BookOpen size={24} />
                  </div>
                  <h3 className="text-lg font-light text-foreground mb-2">Lore Codex</h3>
                  <p className="text-sm text-muted-foreground">
                    Characters, locations, factions, and the magic that binds them.
                  </p>
                </div>
              </Link>

              <Link href="/map">
                <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group">
                  <div className="text-primary mb-3 group-hover:scale-110 transition-transform">
                    <Map size={24} />
                  </div>
                  <h3 className="text-lg font-light text-foreground mb-2">World Map</h3>
                  <p className="text-sm text-muted-foreground">
                    Explore the fractured lands and discover hidden connections.
                  </p>
                </div>
              </Link>

              <Link href="/endings">
                <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group">
                  <div className="text-primary mb-3 group-hover:scale-110 transition-transform">
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
