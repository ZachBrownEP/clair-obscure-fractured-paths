import Link from 'next/link'
import { BookOpen, Map, Trophy, ChevronRight, Award, History, BarChart3, GitBranch, Bookmark, GitMerge, Book } from 'lucide-react'
import EnhancedBackground from '@/components/enhanced-background'
import NavigationSidebar from '@/components/navigation-sidebar'
import PageHeader from '@/components/page-header'
import SpoilerWarning from '@/components/spoiler-warning'
import Expedition33Recap from '@/components/expedition-33-recap'
import SubtleParticleEffect from '@/components/subtle-particle-effect'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <EnhancedBackground />
      <NavigationSidebar />
      <main className="relative z-10">
        {/* Header */}
        <div className="px-4 md:px-8 pt-16 pb-8">
          <PageHeader
            subtitle="Clair Obscur"
            title="Fractured Paths"
            description="Your gateway to the stories beyond Expedition 33"
            glowParticles={true}
          />
        </div>

        <section className="px-4 md:px-8 py-8 max-w-7xl mx-auto">
          {/* Spoiler Warning */}
          <SpoilerWarning />

          {/* Expedition 33 Recap */}
          <div className="mb-12">
            <Expedition33Recap />
          </div>

          {/* Story Routes */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
                Story Paths
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Choose your journey through the fractured world
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                      Navigate the threshold between worlds and uncover the secrets of the Canvas Ghost.
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
                        Begin Journey
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
                      Trace fractured timelines and discover the resonance that connects all possible worlds.
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
                        Begin Journey
                      </span>
                      <ChevronRight size={18} />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Explore & Track Section */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
                Explore & Track
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Delve deeper into the lore and track your progress
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
                    Characters, locations, factions, and magic
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
                    Explore the fractured lands
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
                    View all unlocked fates
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
                    Track your accomplishments
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
                    Review all your decisions
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
                    View statistics and analytics
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
                    Visualize your story path
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
                    Save favorite scenes
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
                    Explore alternate timelines
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
