'use client'

import { useState } from 'react'
import { Book, X, ChevronLeft, ChevronRight } from 'lucide-react'
import SubtleParticleEffect from './subtle-particle-effect'

interface Chapter {
  number: number
  title: string
  content: string[]
}

const chapters: Chapter[] = [
  {
    number: 1,
    title: 'The Curse of the Painter',
    content: [
      'In the world of Clair Obscur, death arrives not by age, but by number. Every year, the Painter—a mysterious and malevolent entity—inscribes a cursed number upon a monolith. All who have reached that age are marked for erasure, vanishing from existence in an event known as the Gommage.',
      'For generations, the people of this dark fantasy realm have lived in fear, watching loved ones disappear when their age aligns with the Painter\'s decree. No one knows where the Painter came from, why this curse began, or how to stop it.',
      'As the game begins, the cursed number is 33. Anyone who has lived 33 years is doomed to be erased. The only hope lies in Expedition 33—a desperate group of warriors, mages, and outcasts who dare to challenge the Painter and end the curse once and for all.',
    ],
  },
  {
    number: 2,
    title: 'The Expedition Begins',
    content: [
      'Expedition 33 is formed from survivors and volunteers—those who refuse to accept the Painter\'s tyranny. The party includes seasoned fighters, scholars of forbidden magic, and individuals with personal vendettas against the curse.',
      'Among them are key figures whose stories intertwine: Gustave, the stoic leader haunted by losses; Sciel, a brilliant engineer seeking answers through invention; Maelle, a wanderer searching for her place in fractured timelines; and Verso, an artist who sees beyond the veil of painted reality.',
      'The expedition\'s mission is clear but perilous: journey to the Painter\'s domain, confront this god-like being, and destroy the source of the curse. But the path is treacherous, filled with corrupted creatures, reality-bending anomalies, and the ever-present threat of erasure.',
    ],
  },
  {
    number: 3,
    title: 'The Painted Lands',
    content: [
      'As Expedition 33 ventures deeper into the cursed territories, they encounter the Painted Lands—regions where reality itself has been warped by the Painter\'s influence. Trees become brushstrokes, skies shift between colors, and time flows inconsistently.',
      'The party battles Echoes—twisted remnants of those erased by previous Gommages, now serving as the Painter\'s unwitting guardians. These encounters reveal the true horror of erasure: not just death, but the complete removal of one\'s existence from memory and history.',
      'Throughout their journey, the expedition discovers fragments of lore: ancient texts, forgotten murals, and whispers of a time before the Painter. These clues suggest the curse is not eternal—it had a beginning, and perhaps, it can have an end.',
    ],
  },
  {
    number: 4,
    title: 'Sacrifices and Revelations',
    content: [
      'The expedition\'s progress comes at a cost. Members fall in battle, some are lost to reality distortions, and others make deliberate sacrifices to ensure the mission continues. Each loss weighs heavily on the survivors, but retreat is not an option—turning back would doom everyone.',
      'Key revelations emerge about the nature of the Painter. The entity is not simply malicious; it exists in a symbiotic relationship with the world itself, drawing power from the act of erasure. The curse is a ritual, a cycle that sustains the Painter\'s existence.',
      'Characters confront personal demons along the way. Maelle grapples with memories that don\'t align across timelines. Verso sees visions of alternate realities where different choices led to different fates. The line between what is real and what is painted becomes increasingly blurred.',
    ],
  },
  {
    number: 5,
    title: 'The Threshold',
    content: [
      'Expedition 33 reaches the Threshold—the boundary between the mortal world and the Painter\'s domain. This liminal space is a gallery of impossibilities, where laws of nature bend and break. The air shimmers with unrealized potential, and every step forward feels like crossing into a living canvas.',
      'Here, the party encounters the Canvas Ghosts—beings who exist between painted and real, neither fully erased nor fully alive. These entities offer cryptic guidance, warning that confronting the Painter directly may not be enough. To truly end the curse, they must understand its origin.',
      'The expedition splits their approach: some prepare for direct confrontation, while others seek the source—the First Painting, the moment when the curse began. Time is running out. The next Gommage approaches, and if they fail, the cursed number will drop to 32, erasing even more lives.',
    ],
  },
  {
    number: 6,
    title: 'The Confrontation',
    content: [
      'The final confrontation with the Painter is both a battle and a negotiation with reality itself. The Painter appears not as a single entity, but as a manifestation of collective will—a being born from the world\'s fear and resignation to fate.',
      'The fight is surreal: weapons clash against brushstrokes, magic duels with color and form, and the very environment shifts allegiance. Expedition 33 must not only defeat the Painter in combat but also break the conceptual hold the curse has on the world.',
      'In the climactic moments, the truth is revealed: the Painter was created long ago as a solution to overpopulation and resource scarcity, a grim utilitarian answer to survival. But the solution became a prison, and the prison became an identity. To end the curse, they must offer the world a new story—one where survival doesn\'t require erasure.',
    ],
  },
  {
    number: 7,
    title: 'The Aftermath',
    content: [
      'With the Painter defeated and the curse shattered, the world begins to heal. The Gommage will no longer occur. Those who survived Expedition 33 emerge as heroes, but they carry the weight of what was lost—the friends who fell, the realities that were unmade, and the knowledge of what they had to destroy.',
      'The monolith that once bore the cursed number now stands empty, a monument to the end of an era. Society must rebuild, learning to live without the annual fear of erasure. For some, this freedom is exhilarating. For others, it\'s disorienting—the curse had defined their entire worldview.',
      'Key characters face their own reckonings. Gustave must decide what to do with a leadership forged in crisis. Sciel channels her intellect into rebuilding rather than destroying. Maelle seeks to understand which version of herself is real across the timelines. And Verso contemplates what it means to create art in a world no longer painted by death.',
    ],
  },
  {
    number: 8,
    title: 'Beyond Expedition 33',
    content: [
      'The events of Expedition 33 mark the beginning of a new age, but questions linger. Echoes of the Painter\'s influence remain in the fabric of reality. Some regions are still warped, some individuals still carry fragments of painted existence, and some mysteries were never fully solved.',
      'This is where the companion stories of Fractured Paths begin. Characters like Verso and Maelle, having survived the expedition, now navigate a world rebuilding itself. Their journeys explore the personal aftermath of cosmic-scale trauma and the challenge of finding meaning beyond survival.',
      'The curse may be broken, but its legacy endures. The world of Clair Obscur is forever changed, and those who lived through Expedition 33 carry the responsibility of ensuring the horrors of the Painter never return. The fractured paths ahead are theirs to choose.',
    ],
  },
]

export default function Expedition33Recap() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(0)

  const handlePrevious = () => {
    setCurrentChapter((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentChapter((prev) => Math.min(chapters.length - 1, prev + 1))
  }

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="glass px-6 py-3 rounded-lg hover:bg-primary/20 transition-all border border-primary/30 hover:border-primary/50 flex items-center gap-3 w-full justify-center"
      >
        <Book size={20} className="text-primary" />
        <span className="font-light">View Expedition 33 Story Recap</span>
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/95 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-4xl max-h-[90vh] glass rounded-xl border border-primary/30 shadow-2xl flex flex-col overflow-hidden">
            <SubtleParticleEffect />

            {/* Header */}
            <div className="relative z-10 flex items-center justify-between p-6 border-b border-primary/20">
              <div>
                <h2 className="text-2xl md:text-3xl font-decorative text-gold">
                  Expedition 33: The Story
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  A recap of the events from the original game
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors p-2"
                aria-label="Close recap"
              >
                <X size={24} />
              </button>
            </div>

            {/* Chapter Navigation Pills */}
            <div className="relative z-10 px-6 py-4 border-b border-primary/20 overflow-x-auto">
              <div className="flex gap-2 min-w-max">
                {chapters.map((chapter, index) => (
                  <button
                    key={chapter.number}
                    onClick={() => setCurrentChapter(index)}
                    className={`
                      px-4 py-2 rounded-full text-xs font-light whitespace-nowrap transition-all
                      ${currentChapter === index
                        ? 'bg-primary/20 text-primary border border-primary/50'
                        : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card/70'
                      }
                    `}
                  >
                    Chapter {chapter.number}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex-1 overflow-y-auto p-6 md:p-8">
              <div className="max-w-3xl mx-auto">
                <div className="mb-4">
                  <p className="text-sm text-primary uppercase tracking-widest mb-2">
                    Chapter {chapters[currentChapter].number}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-light text-foreground mb-6">
                    {chapters[currentChapter].title}
                  </h3>
                </div>

                <div className="space-y-4 text-foreground/90 leading-relaxed">
                  {chapters[currentChapter].content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer Navigation */}
            <div className="relative z-10 flex items-center justify-between p-6 border-t border-primary/20">
              <button
                onClick={handlePrevious}
                disabled={currentChapter === 0}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                  ${currentChapter === 0
                    ? 'opacity-50 cursor-not-allowed text-muted-foreground'
                    : 'glass hover:bg-card/70 text-foreground border border-primary/30 hover:border-primary/50'
                  }
                `}
              >
                <ChevronLeft size={20} />
                <span className="text-sm font-light">Previous</span>
              </button>

              <div className="text-sm text-muted-foreground">
                {currentChapter + 1} / {chapters.length}
              </div>

              <button
                onClick={handleNext}
                disabled={currentChapter === chapters.length - 1}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                  ${currentChapter === chapters.length - 1
                    ? 'opacity-50 cursor-not-allowed text-muted-foreground'
                    : 'glass hover:bg-card/70 text-foreground border border-primary/30 hover:border-primary/50'
                  }
                `}
              >
                <span className="text-sm font-light">Next</span>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
