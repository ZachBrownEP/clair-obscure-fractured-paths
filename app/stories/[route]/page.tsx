import Link from 'next/link'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { notFound } from 'next/navigation'

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

export default function StoryRoutePage({
  params
}: {
  params: { route: string }
}) {
  const route = routes[params.route as keyof typeof routes]

  if (!route) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-16">
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

          {/* Call to action */}
          <Link
            href={`/stories/${params.route}/play`}
            className="block w-full glass p-6 rounded-lg hover:bg-card/70 transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-light text-foreground mb-2 group-hover:text-primary transition-colors">
                  Begin Your Journey
                </h3>
                <p className="text-sm text-muted-foreground">
                  Start from Chapter 1 and navigate your path
                </p>
              </div>
              <ChevronRight
                size={24}
                className="text-primary group-hover:translate-x-2 transition-transform"
              />
            </div>
          </Link>
        </div>

        {/* Additional info */}
        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-light text-foreground mb-3">
            About This Route
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your choices will shape {route.character}'s journey and determine which ending you reach.
            Alignment choices between Painter and Writer philosophies, as well as acts of compassion,
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
