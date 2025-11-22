import Link from 'next/link'
import { BookOpen, Map, Trophy, ChevronRight, Award, History, BarChart3, GitBranch, Bookmark, GitMerge, Sparkles, Book, Gamepad2, Users } from 'lucide-react'
import EnhancedBackground from '@/components/enhanced-background'
import SubtleParticleEffect from '@/components/subtle-particle-effect'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <EnhancedBackground />
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 overflow-hidden">
          <SubtleParticleEffect />

          <div className="relative max-w-5xl mx-auto text-center">
            <p className="text-sm md:text-base tracking-[0.25em] text-foreground/70 mb-6 uppercase font-serif">
              Welcome to
            </p>

            <h1 className="text-5xl md:text-7xl font-decorative text-gold mb-6 leading-tight drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              Clair Obscur: Fractured Paths
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              An interactive companion experience that continues the story beyond Expedition 33
            </p>

            <div className="glass rounded-xl p-8 md:p-12 max-w-4xl mx-auto mb-8 relative overflow-hidden">
              <SubtleParticleEffect />
              <h2 className="text-2xl md:text-3xl font-light text-foreground mb-6 relative z-10">
                What is Fractured Paths?
              </h2>
              <div className="text-left space-y-4 text-foreground/90 leading-relaxed relative z-10">
                <p>
                  <strong className="text-primary">Clair Obscur: Expedition 33</strong> is a dark fantasy turn-based RPG that follows a group of Paintlings on a desperate quest to defeat the Painter—a mysterious figure who marks the world with a cursed number each year, condemning all who reach that age to be erased from existence.
                </p>
                <p>
                  <strong className="text-primary">Fractured Paths</strong> is your companion to this world. This interactive experience allows you to explore <em>what happens after</em> the events of Expedition 33, diving deeper into the lives of characters like <strong>Verso</strong> and <strong>Maelle</strong> through branching narrative journeys shaped entirely by your choices.
                </p>
                <p>
                  This is a <strong className="text-gold">fan-made companion app</strong> designed to extend your journey beyond the main game. Experience new stories, unlock multiple endings, track your decisions, and immerse yourself in the lore of this fractured world.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Overview */}
        <section className="px-4 md:px-8 py-12 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              What Can You Do Here?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Fractured Paths offers multiple ways to experience and explore the world of Clair Obscur
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {/* Interactive Stories */}
            <div className="glass rounded-xl p-8 relative overflow-hidden group">
              <SubtleParticleEffect />
              <div className="relative z-10">
                <div className="text-primary mb-4 flex justify-center">
                  <Gamepad2 size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 text-center">
                  Interactive Stories
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Make meaningful choices that shape the narrative. Every decision affects character relationships, unlocks different story paths, and leads to unique endings. Your choices have weight and consequence.
                </p>
              </div>
            </div>

            {/* Story Journey Mode */}
            <div className="glass rounded-xl p-8 relative overflow-hidden group">
              <SubtleParticleEffect />
              <div className="relative z-10">
                <div className="text-primary mb-4 flex justify-center">
                  <Book size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 text-center">
                  Story Journey Mode
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Prefer to read without making choices? Story Journey mode presents a canonical, linear narrative broken into chapters and pages. Perfect for a focused reading experience.
                </p>
              </div>
            </div>

            {/* Multiple Endings */}
            <div className="glass rounded-xl p-8 relative overflow-hidden group">
              <SubtleParticleEffect />
              <div className="relative z-10">
                <div className="text-primary mb-4 flex justify-center">
                  <Sparkles size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 text-center">
                  47 Unique Endings
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Discover 24 endings for Verso's story and 25 for Maelle's story. Each ending reflects the path you chose—some triumphant, others tragic, all meaningful.
                </p>
              </div>
            </div>

            {/* Alignment System */}
            <div className="glass rounded-xl p-8 relative overflow-hidden group">
              <SubtleParticleEffect />
              <div className="relative z-10">
                <div className="text-primary mb-4 flex justify-center">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 text-center">
                  Dynamic Alignment
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Your choices shift character alignments (Painter, Writer, Balance). These stats influence which story branches open to you and which endings become accessible.
                </p>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="glass rounded-xl p-8 relative overflow-hidden group">
              <SubtleParticleEffect />
              <div className="relative z-10">
                <div className="text-primary mb-4 flex justify-center">
                  <BarChart3 size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 text-center">
                  Complete Tracking
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  All your progress is automatically saved. Track your endings, achievements, choice history, and statistics. Bookmark favorite scenes and revisit them anytime.
                </p>
              </div>
            </div>

            {/* Lore & Exploration */}
            <div className="glass rounded-xl p-8 relative overflow-hidden group">
              <SubtleParticleEffect />
              <div className="relative z-10">
                <div className="text-primary mb-4 flex justify-center">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 text-center">
                  Deep Lore Codex
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Explore the Lore Codex to learn about characters, locations, factions, magic systems, and the history of the world. A living encyclopedia of Clair Obscur.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Story Routes */}
        <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Begin Your Journey
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your path through the fractured world. Each character's story is a complete experience with its own branching paths, choices, and endings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-5xl mx-auto">
            <Link href="/stories/verso" className="block">
              <div className="glass rounded-xl p-8 md:p-10 hover:bg-card/70 transition-all cursor-pointer group h-full relative overflow-hidden">
                <SubtleParticleEffect />
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-light text-foreground mb-3 group-hover:text-primary transition-colors text-center">
                    Verso's Story
                  </h2>
                  <p className="text-sm text-muted-foreground uppercase mb-6 text-center tracking-wider">
                    The Fractured Canvas
                  </p>
                  <p className="text-foreground/90 leading-relaxed mb-6 text-center">
                    Follow Verso's journey through shadowed corridors and painted realities. Navigate the threshold between worlds and uncover the secrets of the Canvas Ghost. Verso's path is one of artistic creation, existential questioning, and the burden of seeing beyond the veil.
                  </p>
                  <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                    <p className="flex items-center justify-center gap-2">
                      <Trophy size={16} className="text-primary" />
                      <span>24 Unique Endings</span>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <GitBranch size={16} className="text-primary" />
                      <span>Multiple Story Branches</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm uppercase tracking-wider font-light">
                      Enter Verso's Path
                    </span>
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/stories/maelle" className="block">
              <div className="glass rounded-xl p-8 md:p-10 hover:bg-card/70 transition-all cursor-pointer group h-full relative overflow-hidden">
                <SubtleParticleEffect />
                <div className="relative z-10">
                  <h2 className="text-3xl md:text-4xl font-light text-foreground mb-3 group-hover:text-primary transition-colors text-center">
                    Maelle's Story
                  </h2>
                  <p className="text-sm text-muted-foreground uppercase mb-6 text-center tracking-wider">
                    Resonance of Alicia
                  </p>
                  <p className="text-foreground/90 leading-relaxed mb-6 text-center">
                    Trace Maelle's path as a seeker of truth through fractured timelines. Navigate between versions of reality and discover the resonance that connects all possible worlds. Maelle's journey explores memory, identity, and the echoes we leave behind.
                  </p>
                  <div className="space-y-2 mb-6 text-sm text-muted-foreground">
                    <p className="flex items-center justify-center gap-2">
                      <Trophy size={16} className="text-primary" />
                      <span>25 Unique Endings</span>
                    </p>
                    <p className="flex items-center justify-center gap-2">
                      <GitBranch size={16} className="text-primary" />
                      <span>Multiple Story Branches</span>
                    </p>
                  </div>
                  <div className="flex items-center justify-center gap-2 text-primary group-hover:gap-3 transition-all">
                    <span className="text-sm uppercase tracking-wider font-light">
                      Enter Maelle's Path
                    </span>
                    <ChevronRight size={18} />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        {/* Explore Section */}
        <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
              Explore & Discover
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Delve deeper into the lore, track your progress, and uncover every secret the fractured world has to offer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/codex">
              <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group text-center h-full flex flex-col">
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform flex justify-center">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2">Lore Codex</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Characters, locations, factions, and the magic that binds them together.
                </p>
              </div>
            </Link>

            <Link href="/map">
              <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group text-center h-full flex flex-col">
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform flex justify-center">
                  <Map size={24} />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2">World Map</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Explore the fractured lands and discover hidden connections between locations.
                </p>
              </div>
            </Link>

            <Link href="/endings">
              <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group text-center h-full flex flex-col">
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform flex justify-center">
                  <Trophy size={24} />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2">Endings Gallery</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  View all the fates you've unlocked across all routes and playthroughs.
                </p>
              </div>
            </Link>

            <Link href="/achievements">
              <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group text-center h-full flex flex-col">
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform flex justify-center">
                  <Award size={24} />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2">Achievements</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Track your accomplishments and milestones throughout your journey.
                </p>
              </div>
            </Link>

            <Link href="/history">
              <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group text-center h-full flex flex-col">
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform flex justify-center">
                  <History size={24} />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2">Choice History</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Review every decision you've made across all your journeys.
                </p>
              </div>
            </Link>

            <Link href="/progress">
              <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group text-center h-full flex flex-col">
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform flex justify-center">
                  <BarChart3 size={24} />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2">Your Progress</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  View detailed statistics and analytics about your journey through the world.
                </p>
              </div>
            </Link>

            <Link href="/tree">
              <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group text-center h-full flex flex-col">
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform flex justify-center">
                  <GitBranch size={24} />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2">Decision Tree</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Visualize your path through the story and see where you could go.
                </p>
              </div>
            </Link>

            <Link href="/bookmarks">
              <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group text-center h-full flex flex-col">
                <div className="text-amber-500 mb-3 group-hover:scale-110 transition-transform flex justify-center">
                  <Bookmark size={24} />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2">Bookmarks</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Save and revisit your favorite scenes and moments.
                </p>
              </div>
            </Link>

            <Link href="/timelines">
              <div className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group text-center h-full flex flex-col">
                <div className="text-primary mb-3 group-hover:scale-110 transition-transform flex justify-center">
                  <GitMerge size={24} />
                </div>
                <h3 className="text-lg font-light text-foreground mb-2">What If Mode</h3>
                <p className="text-sm text-muted-foreground flex-1">
                  Explore alternate timelines and outcomes from different choices.
                </p>
              </div>
            </Link>
          </div>
        </section>

        {/* Footer CTA */}
        <section className="px-4 md:px-8 py-16 max-w-4xl mx-auto text-center">
          <div className="glass rounded-xl p-12 relative overflow-hidden">
            <SubtleParticleEffect />
            <div className="relative z-10">
              <h2 className="text-3xl font-light text-foreground mb-4">
                Ready to Begin?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                The fractured world awaits. Your choices will shape the destinies of those who survived Expedition 33.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/stories/verso">
                  <button className="glass px-8 py-3 rounded-lg hover:bg-primary/20 transition-all border border-primary/30 hover:border-primary/50 font-light tracking-wide">
                    Start Verso's Story
                  </button>
                </Link>
                <Link href="/stories/maelle">
                  <button className="glass px-8 py-3 rounded-lg hover:bg-primary/20 transition-all border border-primary/30 hover:border-primary/50 font-light tracking-wide">
                    Start Maelle's Story
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
