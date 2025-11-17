'use client'

import Link from 'next/link'
import { ChevronLeft, Lock, CheckCircle } from 'lucide-react'

interface Ending {
  key: string
  route: 'verso' | 'maelle'
  title: string
  description: string
  unlocked: boolean
}

// Define all possible endings
const ENDINGS: Ending[] = [
  {
    key: 'verso_mediator',
    route: 'verso',
    title: 'The Mediator',
    description: 'Walk the threshold between worlds. Neither trapped nor free, neither real nor imagined.',
    unlocked: false
  },
  {
    key: 'verso_escape',
    route: 'verso',
    title: 'Return to Flesh',
    description: 'Choose the real over the painted, forgetting what you were to reclaim what you had been.',
    unlocked: false
  },
  {
    key: 'verso_rebel',
    route: 'verso',
    title: 'The Third Door',
    description: 'Reject the binary. Paint yourself new rules and write them into reality.',
    unlocked: false
  },
  {
    key: 'maelle_resonance',
    route: 'maelle',
    title: 'The Living Archive',
    description: 'Merge with Alicia completely, becoming the embodiment of all recorded truth.',
    unlocked: false
  },
  {
    key: 'maelle_dual_self',
    route: 'maelle',
    title: 'The Dual Self',
    description: 'Achieve balance between individual identity and the resonance with Alicia.',
    unlocked: false
  },
  {
    key: 'maelle_cartographer',
    route: 'maelle',
    title: 'Keeper of Maps',
    description: 'Share your knowledge, becoming the guide who helps others navigate fractured timelines.',
    unlocked: false
  },
  {
    key: 'maelle_guardian',
    route: 'maelle',
    title: 'The Lonely Truth',
    description: 'Protect the knowledge of fractures alone, eternal guardian watching over multiplicity.',
    unlocked: false
  }
]

export default function EndingsPage() {
  // In a real implementation, this would check localStorage or a state management system
  // for which endings have been unlocked
  const endings = ENDINGS

  const versoEndings = endings.filter(e => e.route === 'verso')
  const maelleEndings = endings.filter(e => e.route === 'maelle')

  const totalEndings = endings.length
  const unlockedCount = endings.filter(e => e.unlocked).length

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
        >
          <ChevronLeft size={18} />
          Back to Home
        </Link>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-light mb-2 text-foreground">
            Endings Gallery
          </h1>
          <p className="text-muted-foreground mb-4">
            Discover all the fates that await across fractured paths.
          </p>

          <div className="glass inline-block px-6 py-3 rounded-lg">
            <span className="text-sm text-muted-foreground">
              Unlocked:{' '}
              <span className="text-primary font-light text-lg">
                {unlockedCount}/{totalEndings}
              </span>
            </span>
          </div>
        </div>

        {/* Verso's Endings */}
        <section className="mb-12">
          <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-3">
            <span>Verso's Paths</span>
            <span className="text-sm text-muted-foreground font-normal">
              The Fractured Canvas
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {versoEndings.map(ending => (
              <div
                key={ending.key}
                className={`glass rounded-xl p-6 transition-all ${
                  ending.unlocked
                    ? 'hover:bg-card/70 cursor-pointer'
                    : 'opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {ending.unlocked ? (
                      <CheckCircle size={24} className="text-primary" />
                    ) : (
                      <Lock size={24} className="text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-light text-foreground mb-2">
                      {ending.unlocked ? ending.title : '???'}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {ending.unlocked
                        ? ending.description
                        : 'Complete this path to unlock this ending.'}
                    </p>

                    {ending.unlocked && (
                      <Link
                        href={`/stories/verso/play`}
                        className="inline-block mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        Experience again →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Maelle's Endings */}
        <section>
          <h2 className="text-2xl font-light text-foreground mb-6 flex items-center gap-3">
            <span>Maelle's Paths</span>
            <span className="text-sm text-muted-foreground font-normal">
              Resonance of Alicia
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            {maelleEndings.map(ending => (
              <div
                key={ending.key}
                className={`glass rounded-xl p-6 transition-all ${
                  ending.unlocked
                    ? 'hover:bg-card/70 cursor-pointer'
                    : 'opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {ending.unlocked ? (
                      <CheckCircle size={24} className="text-primary" />
                    ) : (
                      <Lock size={24} className="text-muted-foreground" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-light text-foreground mb-2">
                      {ending.unlocked ? ending.title : '???'}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {ending.unlocked
                        ? ending.description
                        : 'Complete this path to unlock this ending.'}
                    </p>

                    {ending.unlocked && (
                      <Link
                        href={`/stories/maelle/play`}
                        className="inline-block mt-4 text-sm text-primary hover:text-primary/80 transition-colors"
                      >
                        Experience again →
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Info box */}
        <div className="mt-12 glass rounded-lg p-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Note:</strong> Endings are unlocked
            by completing story routes. Your choices throughout each journey determine
            which endings become available. Some endings require specific alignment
            scores or flags to be set during your playthrough.
          </p>
        </div>
      </main>
    </div>
  )
}
