'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import StoryReader from './story-reader'

interface Route {
  id: string
  name: string
  character: string
  description: string
  chaptersCompleted: number
  totalChapters: number
  endingsFound: number
}

const SAMPLE_ROUTES: Route[] = [
  {
    id: 'verso',
    name: "Verso's Path",
    character: 'Verso',
    description: 'The wanderer caught between worlds. Follow his journey through painted realities.',
    chaptersCompleted: 5,
    totalChapters: 12,
    endingsFound: 1,
  },
  {
    id: 'maelle',
    name: "Maelle's Journey",
    character: 'Maelle',
    description: 'The seeker of truth. Navigate fractured memories and hidden connections.',
    chaptersCompleted: 0,
    totalChapters: 10,
    endingsFound: 0,
  },
]

const SAMPLE_CHAPTER = {
  id: 'ch1',
  title: "Verso's Path",
  chapterNumber: 1,
  totalChapters: 12,
  text: `The candlelight flickers against the damask walls, casting shadows that seem to move of their own accord. You stand at the threshold of the gallery, your fingers trembling against the lacquered doorframe.

Behind you, the city hums with its usual indifference. Ahead, the paintings await—their subjects watching with eyes that hold secrets you're not sure you want to know.

A voice calls from somewhere deeper within. Familiar, yet distorted by distance and time. You must choose: step forward into the painted world, or turn back to the waking city.`,
  choices: [
    {
      id: 'choice1',
      text: 'Step into the gallery. The paintings have always held answers.',
      alignment: 'painter',
    },
    {
      id: 'choice2',
      text: 'Turn back. Something about this moment feels wrong.',
      alignment: 'writer',
    },
    {
      id: 'choice3',
      text: 'Call out to the voice. Demand to know who awaits you.',
      alignment: undefined,
    },
  ],
}

export default function StoryRouteSelector() {
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null)
  const [currentChapter, setCurrentChapter] = useState(SAMPLE_CHAPTER)

  if (selectedRoute) {
    return (
      <StoryReader
        chapter={currentChapter}
        painterScore={60}
        writerScore={40}
        onBack={() => setSelectedRoute(null)}
        onRestart={() => setSelectedRoute(null)}
        onChoice={(choiceId) => {
          console.log('Choice selected:', choiceId)
        }}
      />
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-4xl md:text-5xl font-light mb-4 text-foreground">
        Choose Your Path
      </h1>
      <p className="text-muted-foreground mb-12 text-lg">
        Select a route and continue the story of Clair Obscur.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {SAMPLE_ROUTES.map((route) => (
          <div
            key={route.id}
            className="glass rounded-xl p-8 hover:bg-card/70 transition-all cursor-pointer group"
            onClick={() => setSelectedRoute(route.id)}
          >
            {/* Progress indicators */}
            <div className="mb-6 space-y-3">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs text-muted-foreground uppercase">
                    Chapters
                  </span>
                  <span className="text-sm text-primary">
                    {route.chaptersCompleted}/{route.totalChapters}
                  </span>
                </div>
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary"
                    style={{
                      width: `${(route.chaptersCompleted / route.totalChapters) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-4 text-sm">
                <span className="text-muted-foreground">
                  Endings: <span className="text-accent">{route.endingsFound}</span>
                </span>
              </div>
            </div>

            <h2 className="text-2xl font-light text-foreground mb-2">
              {route.name}
            </h2>
            <p className="text-sm text-muted-foreground mb-1">
              {route.character}
            </p>
            <p className="text-foreground leading-relaxed mb-6">
              {route.description}
            </p>

            <div className="flex items-center gap-2 text-primary group-hover:gap-3 transition-all">
              <span className="text-sm uppercase tracking-wider font-light">
                {route.chaptersCompleted > 0 ? 'Continue' : 'Start'}
              </span>
              <ChevronRight size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
