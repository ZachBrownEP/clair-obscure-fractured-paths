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
    title: 'The Gommage: A World Erased by Age',
    content: [
      'For 67 years, the isolated island of Lumière has lived under the terror of the Gommage. Every year, the supernatural being known as the Paintress paints a number onto the Monolith. Everyone aged that number or older disappears instantly — erased like paint wiped off a canvas.',
      'The number decreases every year. Death creeps closer.',
      'This year, the number becomes 33.',
      'Desperate for answers and running out of time, Lumière launches Expedition 33, the latest group tasked with crossing to the mainland and killing the Paintress.',
      'Among them: Gustave, engineer with a mechanical arm; Maelle, his foster sister and the youngest member; Lune, a powerful scholar-mage; Sciel, a calm warrior.',
      'Their mission: Reach the Paintress. End the Gommage. Save Lumière.',
    ],
  },
  {
    number: 2,
    title: 'Catastrophe on the Mainland',
    content: [
      'Within minutes of landing, Expedition 33 is ambushed by an old, white-haired man commanding a monstrous horde.',
      'The expedition is utterly crushed.',
      'Only four survive the massacre: Gustave, Maelle, Lune, and Sciel.',
      'As they regroup, a mysterious presence known as the Curator begins guiding them — but only Maelle can hear or communicate with it.',
      'Maelle is soon plagued by visions of: the same white-haired man; a masked girl. Both accusing her of causing some unknown disaster.',
      'The mystery deepens. Something about Maelle is not what it seems.',
    ],
  },
  {
    number: 3,
    title: 'The Death of Gustave & the Arrival of Verso',
    content: [
      'To reach the Paintress, the survivors must cross another sea. To do so, they seek the help of Esquie, a mythical local creature.',
      'But before they can depart, the white-haired man returns.',
      'In the ensuing battle, Gustave sacrifices himself to protect Maelle, fulfilling his vow as her foster brother.',
      'All seems lost — until a mysterious fighter named Verso intervenes and rescues the remaining survivors.',
      'His identity will soon change everything.',
    ],
  },
  {
    number: 4,
    title: "Verso's Revelation: The First Expedition",
    content: [
      'Verso rejoins the party and explains the truth:',
      'He was part of the very first expedition decades earlier.',
      'The white-haired man is Renoir — the commander of that expedition.',
      'Both he and Renoir stopped aging upon entering the mainland.',
      'Renoir now believes the Paintress granted him immortality and has sworn to protect her.',
      'Verso, tired of living forever, chooses to help the expedition destroy the Paintress.',
      'After they mourn Gustave, the group recruits Monoco, a construct-like Gestrel linked to Verso.',
      'Their push toward the Paintress begins.',
    ],
  },
  {
    number: 5,
    title: 'The Mansion in Old Lumière',
    content: [
      'The expedition reaches Renoir\'s mansion in Old Lumière, searching for the Paintress\' Heart — a crucial artifact needed to break the barrier protecting her.',
      'Inside, Verso reveals more secrets:',
      'Renoir is his father.',
      'The masked girl from Maelle\'s visions is Alicia, Verso\'s sister.',
      'Before the group can destroy the Heart, Renoir teleports the entire mansion — and the Heart — far away, preventing them from lowering the barrier.',
      'The expedition must find another way.',
    ],
  },
  {
    number: 6,
    title: 'Forging a God-Slayer',
    content: [
      'Lune proposes a bold plan: Forge an ultimate weapon using the hearts of ancient, dangerous beings known as Axons.',
      'The expedition hunts these primordial monsters, claiming their hearts and forging a weapon powerful enough to pierce the Paintress\' barrier.',
      'With it, they breach the Monolith, fighting their way through Renoir\'s forces.',
      'They kill Renoir.',
      'Inside the Monolith, they confront the Paintress — revealed to be: Aline, Verso\'s mother.',
      'The expedition kills her and erases the number from the Monolith, believing the Gommage is finally over.',
      'They return home victorious.',
    ],
  },
  {
    number: 7,
    title: "Lumière's Disappearance & Alicia's Letter",
    content: [
      'The celebration is short-lived.',
      'Upon returning to Lumière, the expedition watches in horror as the entire population vanishes — everyone except Verso.',
      'Alicia\'s letter explains the truth:',
      'Aline wasn\'t causing the Gommage — she was slowing it down.',
      'The real source of the Gommage was the Curator — Renoir\'s true form inside the Canvas.',
      'The number painted each year was not a curse — it was a warning to those about to be erased.',
      'Without Aline\'s protection, Lumière collapses instantly.',
      'The victory was a mistake. Killing Aline doomed the world.',
    ],
  },
  {
    number: 8,
    title: 'The Real World: The Dessendre Family & the Canvas',
    content: [
      'A flashback reveals the true reality:',
      'The world of Lumière is not real. It is a magical Canvas, a fully inhabitable world created by the Dessendre family, powerful Painters who can create and enter such realms.',
      'In early 20th-century Paris:',
      'The real Verso died saving Alicia from a fire.',
      'Alicia survived but was left disfigured and mute.',
      'Grieving, Aline entered her dead son\'s Canvas — creating painted versions of her family.',
      'The real Renoir manifested inside as the Curator, attempting to gradually destroy the Canvas (via the Gommage) to bring Aline back home.',
      'A rival faction, the Writers, manipulated Alicia and caused the fire.',
      'At Clea\'s urging, Alicia entered the Canvas to end it quickly… but the Canvas overwhelmed her mind.',
      'She was reborn inside as: Maelle.',
    ],
  },
  {
    number: 9,
    title: "Alicia's Return & the Battle for the Canvas",
    content: [
      'With Maelle\'s "death," Alicia regains her memories and awakens in a shattered Lumière.',
      'She reunites with the painted Verso — who reveals he has been attempting to remove Aline\'s lingering presence from the Canvas to end his immortality.',
      'Alicia taps into her Painter powers: revives the fallen Expedition; confronts Renoir; and fights for control of the Canvas.',
      'Optional revelations include: Verso allowed Gustave to die to motivate Alicia to defeat Aline.',
      'The final confrontation erupts. Renoir pleads that the Canvas must be destroyed so Aline and Alicia can heal and return to the real world.',
      'Aline breaches the Canvas and aids the expedition one last time.',
      'Renoir is defeated. He promises to "leave the lights on" so Alicia can return if she chooses.',
      'Aline and Renoir exit the Canvas.',
    ],
  },
  {
    number: 10,
    title: 'Two Endings: The Painter or the Canvas',
    content: [
      'In the end, Alicia and Verso clash over the fate of the Canvas. Two endings emerge:',
      'ENDING 1 — Alicia\'s Path (Choose Alicia):',
      'Alicia decides to remain in the Canvas permanently. She: rebuilds Lumière; revives its people (including Gustave and Sophie); keeps painted Verso alive.',
      'But Verso notices Alicia beginning to decline — the same fate that consumed Aline. A Painter who stays too long in their creation begins to die with it. Her choice brings peace… but at the cost of her life.',
      'ENDING 2 — Verso\'s Path (Choose Verso):',
      'Verso chooses to end the suffering. He destroys the final remnant of the real Verso\'s soul — the anchor sustaining the Canvas.',
      'The entire Canvas collapses: Lumière, the expedition, painted Verso, Maelle, everything.',
      'Alicia wakes in the real world. Her family mourns her loss but finally accepts Verso\'s death and moves forward.',
      'Alicia sees visions of her Canvas loved ones waving goodbye… before they fade forever.',
    ],
  },
]

export default function Expedition33Recap() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentChapter, setCurrentChapter] = useState(0)
  const [visibleStartIndex, setVisibleStartIndex] = useState(0)

  const handlePrevious = () => {
    setCurrentChapter((prev) => Math.max(0, prev - 1))
  }

  const handleNext = () => {
    setCurrentChapter((prev) => Math.min(chapters.length - 1, prev + 1))
  }

  const handleChapterNavigationPrevious = () => {
    setVisibleStartIndex((prev) => Math.max(0, prev - 1))
  }

  const handleChapterNavigationNext = () => {
    setVisibleStartIndex((prev) => Math.min(chapters.length - 5, prev + 1))
  }

  // Show 5 chapter pills at a time
  const visibleChapters = chapters.slice(visibleStartIndex, visibleStartIndex + 5)

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
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/95 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />

          {/* Modal Content */}
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-4xl glass rounded-xl border border-primary/30 shadow-2xl my-8">
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

              {/* Chapter Navigation Pills with Arrows */}
              <div className="relative z-10 px-6 py-4 border-b border-primary/20">
                <div className="flex items-center gap-2">
                  {/* Left Arrow */}
                  <button
                    onClick={handleChapterNavigationPrevious}
                    disabled={visibleStartIndex === 0}
                    className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                      visibleStartIndex === 0
                        ? 'opacity-30 cursor-not-allowed text-muted-foreground'
                        : 'glass hover:bg-card/70 text-foreground border border-primary/30 hover:border-primary/50'
                    }`}
                    aria-label="Previous chapters"
                  >
                    <ChevronLeft size={16} />
                  </button>

                  {/* Chapter Pills */}
                  <div className="flex gap-2 flex-1 justify-center">
                    {visibleChapters.map((chapter) => {
                      const index = chapters.indexOf(chapter)
                      return (
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
                      )
                    })}
                  </div>

                  {/* Right Arrow */}
                  <button
                    onClick={handleChapterNavigationNext}
                    disabled={visibleStartIndex >= chapters.length - 5}
                    className={`p-2 rounded-lg transition-all flex-shrink-0 ${
                      visibleStartIndex >= chapters.length - 5
                        ? 'opacity-30 cursor-not-allowed text-muted-foreground'
                        : 'glass hover:bg-card/70 text-foreground border border-primary/30 hover:border-primary/50'
                    }`}
                    aria-label="Next chapters"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>

              {/* Content - Removed overflow-y-auto to scroll with page */}
              <div className="relative z-10 p-6 md:p-8">
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
        </div>
      )}
    </>
  )
}
