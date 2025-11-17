import Link from 'next/link'
import { ChevronLeft, ChevronRight, BookOpen, Gamepad2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { hasLinearStory } from '@/lib/story/linearLoader'
import EnhancedBackground from '@/components/enhanced-background'

// Route metadata
const routes = {
  verso: {
    name: "The Fractured Canvas",
    character: "Verso",
    subtitle: "A journey through painted realities",
    description: "Follow Verso's path through shadowed corridors and painted realities. Navigate the threshold between worlds and uncover the secrets of the Canvas Ghost. Half flesh, half pigment, Verso embodies the liminal state between creation and reality.",
    totalChapters: 12,
    themes: ["Identity", "Art vs Reality", "Transformation"]
  },
  maelle: {
    name: "Resonance of Alicia",
    character: "Maelle",
    subtitle: "A search for truth in echoing memories",
    description: "Trace Maelle's path as a seeker of truth through fractured timelines. Navigate between versions of reality and discover the resonance that connects all possible worlds. Experience multiplicity and find meaning in contradiction.",
    totalChapters: 10,
    themes: ["Truth", "Multiplicity", "Identity"]
  }
}

export default async function StoryRoutePage({
  params
}: {
  params: Promise<{ route: string }>
}) {
  const { route: routeId } = await params
  const route = routes[routeId as keyof typeof routes]

  if (!route) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <EnhancedBackground />
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-16 relative z-10">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
        >
          <ChevronLeft size={18} />
          Back to Home
        </Link>

        {/* Hero section */}
        <div className="mb-12">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-4">
            {route.character}
          </p>
          <h1 className="text-5xl md:text-6xl font-light text-foreground mb-4">
            {route.name}
          </h1>
          <p className="text-xl text-accent font-light mb-8">
            {route.subtitle}
          </p>
        </div>

        {/* Description */}
        <div className="glass rounded-2xl p-8 md:p-12 mb-8">
          <p className="text-lg leading-relaxed text-foreground mb-8">
            {route.description}
          </p>

          {/* Metadata */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border/30">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
                Chapters
              </h3>
              <p className="text-2xl text-primary">{route.totalChapters}</p>
            </div>
            <div>
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-3">
                Themes
              </h3>
              <div className="flex flex-wrap gap-2">
                {route.themes.map(theme => (
                  <span
                    key={theme}
                    className="px-3 py-1 bg-secondary/30 text-foreground rounded text-sm border border-border/30"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Experience Modes */}
          <div>
            <h3 className="text-lg font-light text-foreground mb-4">
              Choose Your Experience
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {/* Story Journey - Now First */}
              {hasLinearStory(routeId) ? (
                <Link
                  href={`/stories/${routeId}/read`}
                  className="block glass p-6 rounded-lg hover:bg-card/70 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-accent group-hover:scale-110 transition-transform">
                      <BookOpen size={28} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-light text-foreground mb-2 group-hover:text-accent transition-colors">
                        Story Journey
                      </h4>
                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        Experience the canonical story. Read through chapters and pages at your own pace.
                      </p>
                      <div className="flex items-center gap-2 text-accent text-sm">
                        <span>Begin Reading</span>
                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="glass p-6 rounded-lg opacity-50">
                  <div className="flex items-start gap-4">
                    <div className="text-muted-foreground">
                      <BookOpen size={28} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-light text-foreground mb-2">
                        Story Journey
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Coming soon...
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Interactive Path - Now Second */}
              <Link
                href={`/stories/${routeId}/play`}
                className="block glass p-6 rounded-lg hover:bg-card/70 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-primary group-hover:scale-110 transition-transform">
                    <Gamepad2 size={28} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-light text-foreground mb-2 group-hover:text-primary transition-colors">
                      Interactive Path
                    </h4>
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      Make choices that shape the story. Navigate branching paths and discover multiple endings.
                    </p>
                    <div className="flex items-center gap-2 text-primary text-sm">
                      <span>Begin Playing</span>
                      <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-light text-foreground mb-3">
            About This Route
          </h3>
          {hasLinearStory(routeId) && (
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              <strong className="text-foreground">Story Journey:</strong> Experience {route.character}'s canonical path through
              a linear narrative divided into chapters and pages. Perfect for those who want to immerse themselves
              in the complete story without branching choices.
            </p>
          )}
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Interactive Path:</strong> Your choices will shape {route.character}'s journey and determine which ending you reach.
            Alignment choices between Painter and Writer philosophies, as well as balanced approaches,
            will influence available paths and story outcomes. Multiple endings await discovery.
          </p>
        </div>
      </main>
    </div>
  )
}

export function generateStaticParams() {
  return [
    { route: 'verso' },
    { route: 'maelle' }
  ]
}
