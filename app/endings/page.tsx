'use client'

import Link from 'next/link'
import { ChevronLeft, Lock, CheckCircle } from 'lucide-react'
import { useEndingsProgress } from '@/lib/hooks/useEndingsProgress'

interface EndingMetadata {
  key: string
  route: 'verso' | 'maelle'
  title: string
  description: string
}

// Define all possible endings metadata
const ENDINGS_METADATA: EndingMetadata[] = [
  {
    key: 'verso_mediator',
    route: 'verso',
    title: 'The Mediator',
    description: 'Walk the threshold between worlds. Neither trapped nor free, neither real nor imagined. You exist as a bridge between Painter and Writer, flesh and pigment in harmony.'
  },
  {
    key: 'verso_escape',
    route: 'verso',
    title: 'Return to Flesh',
    description: 'Choose the real over the painted, forgetting what you were to reclaim what you had been. Unpainted and whole, but at the cost of memory.'
  },
  {
    key: 'verso_rebel',
    route: 'verso',
    title: 'The Third Door',
    description: 'Reject the binary. Paint yourself new rules and write them into reality. Break the Gallery itself through sheer impossible will.'
  },
  {
    key: 'maelle_resonance',
    route: 'maelle',
    title: 'The Living Archive',
    description: 'Merge with Alicia completely, becoming the embodiment of all recorded truth across all timelines. You are language itself now.'
  },
  {
    key: 'maelle_dual_self',
    route: 'maelle',
    title: 'The Dual Self',
    description: 'Achieve balance between individual identity and the resonance with Alicia. Remain Maelle while carrying the echo of the First Writer.'
  },
  {
    key: 'maelle_cartographer',
    route: 'maelle',
    title: 'Keeper of Maps',
    description: 'Share your knowledge, becoming the guide who helps others navigate fractured timelines. Your maps chart all possible paths.'
  },
  {
    key: 'maelle_guardian',
    route: 'maelle',
    title: 'The Lonely Truth',
    description: 'Protect the knowledge of fractures alone, eternal guardian watching over multiplicity. The burden of truth carried in solitude.'
  }
]

export default function EndingsPage() {
  const { isUnlocked, totalUnlocked, isLoading } = useEndingsProgress()

  const versoEndings = ENDINGS_METADATA.filter(e => e.route === 'verso')
  const maelleEndings = ENDINGS_METADATA.filter(e => e.route === 'maelle')

  const totalEndings = ENDINGS_METADATA.length

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
                {isLoading ? '...' : `${totalUnlocked}/${totalEndings}`}
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
            {versoEndings.map(ending => {
              const unlocked = isUnlocked(ending.route, ending.key)

              return (
                <div
                  key={ending.key}
                  className={`glass rounded-xl p-6 transition-all ${
                    unlocked
                      ? 'hover:bg-card/70 cursor-pointer border-primary/20'
                      : 'opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {unlocked ? (
                        <CheckCircle size={24} className="text-primary" />
                      ) : (
                        <Lock size={24} className="text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-light text-foreground mb-2">
                        {unlocked ? ending.title : '???'}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {unlocked
                          ? ending.description
                          : 'Complete Verso\'s path to unlock this ending.'}
                      </p>

                      {unlocked && (
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
              )
            })}
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
            {maelleEndings.map(ending => {
              const unlocked = isUnlocked(ending.route, ending.key)

              return (
                <div
                  key={ending.key}
                  className={`glass rounded-xl p-6 transition-all ${
                    unlocked
                      ? 'hover:bg-card/70 cursor-pointer border-accent/20'
                      : 'opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 mt-1">
                      {unlocked ? (
                        <CheckCircle size={24} className="text-accent" />
                      ) : (
                        <Lock size={24} className="text-muted-foreground" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-light text-foreground mb-2">
                        {unlocked ? ending.title : '???'}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {unlocked
                          ? ending.description
                          : 'Complete Maelle\'s path to unlock this ending.'}
                      </p>

                      {unlocked && (
                        <Link
                          href={`/stories/maelle/play`}
                          className="inline-block mt-4 text-sm text-accent hover:text-accent/80 transition-colors"
                        >
                          Experience again →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
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
