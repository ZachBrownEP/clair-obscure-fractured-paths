'use client'

import Link from 'next/link'
import { Lock, CheckCircle } from 'lucide-react'
import { useEndingsProgress } from '@/lib/hooks/useEndingsProgress'
import PageHeader from '@/components/page-header'
import Expedition33Recap from '@/components/expedition-33-recap'
import EnhancedBackground from '@/components/enhanced-background'
import SmartBackButton from '@/components/smart-back-button'

interface EndingMetadata {
  key: string
  route: 'verso' | 'maelle'
  title: string
  description: string
}

// Define all possible endings metadata
const ENDINGS_METADATA: EndingMetadata[] = [
  // VERSO'S ENDINGS (22 total)
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
    key: 'verso_curator',
    route: 'verso',
    title: 'Renoir\'s Successor',
    description: 'Become the Gallery\'s eternal curator, tending to painted reality with loving attention. Where the Paintress creates, you preserve and maintain.'
  },
  {
    key: 'verso_apprentice',
    route: 'verso',
    title: 'The Paintress\'s Apprentice',
    description: 'Learn to paint reality itself alongside the Paintress. Master the brush that creates worlds and beings from pigment and possibility.'
  },
  {
    key: 'verso_revolutionary',
    route: 'verso',
    title: 'The Painted Revolutionary',
    description: 'Lead a rebellion of painted beings against the Paintress. Establish a self-governed Gallery where every creation has agency and voice.'
  },
  {
    key: 'verso_tyrant',
    route: 'verso',
    title: 'Canvas Tyrant',
    description: 'Overthrow the Paintress and become the new ruler of the Gallery. Wield her techniques with ruthless efficiency and terrible beauty.'
  },
  {
    key: 'verso_frozen',
    route: 'verso',
    title: 'The Trapped Portrait',
    description: 'Slow down completely, becoming frozen in a single perfect moment. Join the eternal café patrons preserved in stretched time.'
  },
  {
    key: 'verso_gallery_dweller',
    route: 'verso',
    title: 'Home in Paint',
    description: 'Build a life in the Gallery with the painted child. Find family, belonging, and peace among impossible flowers and singing streets.'
  },
  {
    key: 'verso_nomad',
    route: 'verso',
    title: 'Brushstroke Nomad',
    description: 'Wander eternally between infinite Galleries, exploring every painted world and artistic style. Never settle, always seeking new wonders.'
  },
  {
    key: 'verso_watercolor',
    route: 'verso',
    title: 'The Unfinished',
    description: 'Enter the watercolor world and embrace incompletion. Become an eternal sketch with bleeding boundaries, forever in flux.'
  },
  {
    key: 'verso_conqueror',
    route: 'verso',
    title: 'Reality Weaver',
    description: 'Join a world where painted beings conquered reality. Help weave the entire world into painted existence, blending all boundaries.'
  },
  {
    key: 'verso_aline_merged',
    route: 'verso',
    title: 'Aline\'s Echo',
    description: 'Merge completely with Aline\'s ghost, becoming a single being that carries both identities and loves. Together at last, in a new form.'
  },
  {
    key: 'verso_self_taught',
    route: 'verso',
    title: 'Master of Frames',
    description: 'Develop your own unique style of existing between states. Control all boundaries and thresholds, walking the frame\'s edge with mastery.'
  },
  {
    key: 'verso_ghost_partner',
    route: 'verso',
    title: 'Ghost\'s Equal',
    description: 'Become partner and equal to the Canvas Ghost. Together maintain perfect balance between all states of being across the Gallery.'
  },
  {
    key: 'verso_background',
    route: 'verso',
    title: 'Faded to Background',
    description: 'Diffuse into the Gallery\'s background, becoming the quiet substrate on which all other existences play out. Peaceful dissolution.'
  },
  {
    key: 'verso_architect',
    route: 'verso',
    title: 'The Gallery Architect',
    description: 'Redesign and expand the Gallery with new districts, beings, and wonders. Where the Paintress provides foundation, you add infinite detail.'
  },
  {
    key: 'verso_new_love',
    route: 'verso',
    title: 'Dual Existence',
    description: 'Complete Aline\'s ghost into a new person named Celine. Build a loving life together in the Gallery, both existing between real and painted.'
  },
  {
    key: 'verso_community_builder',
    route: 'verso',
    title: 'The Hollow Canvas',
    description: 'Hollow yourself out to become a vessel for others. Create a sanctuary where newly painted beings can learn, heal, and transform.'
  },
  {
    key: 'verso_threshold_trial',
    route: 'verso',
    title: 'Pigment Phoenix',
    description: 'Die and resurrect endlessly through paint cycles. Become pure transformation itself, existing through constant death and rebirth.'
  },
  {
    key: 'verso_memory_keeper',
    route: 'verso',
    title: 'Pigment Prophet',
    description: 'Become keeper of all forgotten memories. See futures through what will be forgotten, guiding others through time\'s landscape.'
  },
  {
    key: 'verso_undefined',
    route: 'verso',
    title: 'The Living Question',
    description: 'Refuse to settle into any single purpose. Remain forever in flux, a living question that refuses to be answered. Perpetual becoming.'
  },
  {
    key: 'verso_style_shifter',
    route: 'verso',
    title: 'The Style Shifter',
    description: 'Master every artistic style, becoming a living anthology of art history. Shift forms at will between impressionist, cubist, abstract, and all styles.'
  },
  {
    key: 'verso_eternal_witness',
    route: 'verso',
    title: 'Eternal Witness',
    description: 'Become the Gallery\'s immortal historian, documenting its endless evolution. Serve as living memory for all painted existence across centuries.'
  },
  {
    key: 'verso_paint_drinker',
    route: 'verso',
    title: 'The Paint Drinker',
    description: 'Discover the power of consuming paint directly. Wield terrible creative power while struggling with addiction to transformation itself.'
  },

  // MAELLE'S ENDINGS (25 total)
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
  },
  {
    key: 'maelle_collapser',
    route: 'maelle',
    title: 'Timeline Collapser',
    description: 'Collapse all fractured timelines into one singular reality. Erase infinite possibilities to restore absolute, unified truth.'
  },
  {
    key: 'maelle_fracture_guardian',
    route: 'maelle',
    title: 'The Fracture Queen',
    description: 'Claim the first fracture point as your domain. Rule over the moment reality learned to split, existing in the eternal breach.'
  },
  {
    key: 'maelle_infinite_fracturer',
    route: 'maelle',
    title: 'Infinite Scribe',
    description: 'Fracture yourself across endless timelines, existing as countless versions. Become multiplicity itself, forever splitting and dividing.'
  },
  {
    key: 'maelle_reality_editor',
    route: 'maelle',
    title: 'Reality Editor',
    description: 'Edit reality like a manuscript, carefully fracturing timelines to create better versions of history and existence.'
  },
  {
    key: 'maelle_fracture_teacher',
    route: 'maelle',
    title: 'The Probability Walker',
    description: 'Teach others to fracture timelines through mathematical precision. Navigate existence through probability and democratize reality-splitting.'
  },
  {
    key: 'maelle_echo_breaker',
    route: 'maelle',
    title: 'Echo Breaker',
    description: 'Sever all resonance with Alicia, ending the echo cycle forever. Become truly singular—the first and last of your kind.'
  },
  {
    key: 'maelle_possessed',
    route: 'maelle',
    title: 'Alicia\'s Vengeance',
    description: 'Surrender to Alicia\'s possession, becoming a vessel for her ancient vengeance against those who fractured reality.'
  },
  {
    key: 'maelle_temporal_anchor',
    route: 'maelle',
    title: 'Temporal Anchor',
    description: 'Become a fixed point across all timelines, existing identically in every reality. A constant anchor in the sea of fractures.'
  },
  {
    key: 'maelle_living_contradiction',
    route: 'maelle',
    title: 'Living Contradiction',
    description: 'Embody multiple contradictory truths simultaneously. Exist as walking paradox, teaching that contradiction needs no resolution.'
  },
  {
    key: 'maelle_synthesizer',
    route: 'maelle',
    title: 'Chronicle of Sorrows',
    description: 'Create a new tradition synthesizing Writing and Painting. Record tragedies while imagining better alternatives, offering consolation through possibility.'
  },
  {
    key: 'maelle_mediator',
    route: 'maelle',
    title: 'Silence Keeper',
    description: 'Become guardian of Alicia\'s final words. Heal the Writer-Painter split by choosing silence over revelation, protecting dangerous truths.'
  },
  {
    key: 'maelle_unwritten',
    route: 'maelle',
    title: 'The Unwritten',
    description: 'Erase yourself from all records to escape Alicia\'s resonance. Become the person who exists but leaves no trace in history.'
  },
  {
    key: 'maelle_pattern_breaker',
    route: 'maelle',
    title: 'The Forgotten Path',
    description: 'Awaken people to their unconscious patterns. Break cycles across all timelines, introducing genuine free will to reality.'
  },
  {
    key: 'maelle_echo_resolver',
    route: 'maelle',
    title: 'Truth Destroyer',
    description: 'Help echoing souls complete their unfinished business. End cycles of repetition by bringing closure across all timelines.'
  },
  {
    key: 'maelle_eternal_echo',
    route: 'maelle',
    title: 'The First Word',
    description: 'Choose to echo eternally across all timelines. Forever attempt to document the complete history of language, never finishing, always beginning again.'
  },
  {
    key: 'maelle_word_weaver',
    route: 'maelle',
    title: 'Word Weaver',
    description: 'Transcend the Writer-Painter divide by reshaping reality through pure language. Every word you write becomes law, every sentence becomes fact.'
  },
  {
    key: 'maelle_memory_merchant',
    route: 'maelle',
    title: 'Memory Merchant',
    description: 'Establish an economy of memory, trading experiences across timelines. Build vast wealth in lived consciousness, curating memories as currency.'
  },
  {
    key: 'maelle_bridge_builder',
    route: 'maelle',
    title: 'The Bridge Builder',
    description: 'Build permanent bridges between Writers and Painters, healing the ancient schism. Create a unified Order where both traditions flourish together.'
  },
  {
    key: 'maelle_truth_eater',
    route: 'maelle',
    title: 'Truth Eater',
    description: 'Gain power to consume contradictory truths and digest them into singular clarity. Devour complexity, produce simplicity, help others find peace.'
  },
  {
    key: 'maelle_chrono_cartographer',
    route: 'maelle',
    title: 'Chrono Cartographer',
    description: 'Learn to map not just space but time itself. Chart and influence temporal flow across all fractured realities, controlling the fourth dimension.'
  },
  {
    key: 'maelle_self_authored',
    route: 'maelle',
    title: 'The Self-Authored',
    description: 'Write yourself into every timeline simultaneously, becoming omnipresent across all fractured realities while maintaining singular consciousness.'
  }
]

export default function EndingsPage() {
  const { isUnlocked, totalUnlocked, isLoading } = useEndingsProgress()

  const versoEndings = ENDINGS_METADATA.filter(e => e.route === 'verso')
  const maelleEndings = ENDINGS_METADATA.filter(e => e.route === 'maelle')

  const totalEndings = ENDINGS_METADATA.length

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <EnhancedBackground />
      <main className="max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-16 relative z-10">
        <div className="mb-8">
          <SmartBackButton fallbackLabel="Back to Dashboard" />
        </div>

        <PageHeader
          subtitle="Clair Obscur"
          title="Endings Gallery"
          description="Discover all the fates that await across fractured paths"
        />

        <div className="mb-8">
          <Expedition33Recap />
        </div>

        <div className="mb-12">
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
              The Fractured Canvas • {versoEndings.length} Endings
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              Resonance of Alicia • {maelleEndings.length} Endings
            </span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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
