'use client'

import { useState } from 'react'
import { ChevronRight, X } from 'lucide-react'
import CodexEntryDetail from './codex-entry-detail'

type Category = 'characters' | 'locations' | 'factions' | 'magic' | 'timeline'

interface CodexEntry {
  id: string
  name: string
  category: Category
  tags: string[]
  shortDescription: string
  longDescription: string
  relatedEntries: string[]
}

const SAMPLE_ENTRIES: CodexEntry[] = [
  {
    id: 'verso',
    name: 'Verso',
    category: 'characters',
    tags: ['Painter', 'Wanderer', 'Canvas Ghost'],
    shortDescription: 'A figure caught between the waking world and painted realities.',
    longDescription: 'Verso is a mysterious wanderer who exists at the threshold between worlds. Once a brilliant artist, he became entangled with the Canvas Ghost and now navigates fractured realities, each brushstroke a choice that echoes across dimensions.',
    relatedEntries: ['maelle', 'canvas-ghost', 'painted-gallery'],
  },
  {
    id: 'maelle',
    name: 'Maelle',
    category: 'characters',
    tags: ['Writer', 'Seeker', 'Truth-bearer'],
    shortDescription: 'A seeker of truth in a world of shadows and illusions.',
    longDescription: 'Maelle is a chronicler of hidden truths, one who can perceive the threads connecting seemingly disparate events. Her journey through Clair Obscur is one of revelation and transformation.',
    relatedEntries: ['verso', 'expedition-33', 'fractured-paths'],
  },
  {
    id: 'canvas-ghost',
    name: 'The Canvas Ghost',
    category: 'characters',
    tags: ['Entity', 'Painter', 'Liminal'],
    shortDescription: 'An enigmatic presence that dwells within painted worlds.',
    longDescription: 'The Canvas Ghost is neither fully real nor entirely imaginary. It exists in the space between paint and canvas, between intention and creation. Its nature remains shrouded in mystery, though its influence permeates the fractured paths.',
    relatedEntries: ['verso', 'painted-gallery'],
  },
  {
    id: 'painted-gallery',
    name: 'The Painted Gallery',
    category: 'locations',
    tags: ['Liminal', 'Transition Point'],
    shortDescription: 'A threshold between worlds where art and reality intertwine.',
    longDescription: 'An impossible place where the boundaries between the mundane and the surreal blur. Each gallery room contains doors to different realities, and the paintings themselves seem to shift and change when observed.',
    relatedEntries: ['verso', 'canvas-ghost', 'expedition-33'],
  },
  {
    id: 'expedition-33',
    name: 'Expedition 33',
    category: 'events',
    tags: ['Historical', 'Catalyst'],
    shortDescription: 'The event that fractured the world and began the tale.',
    longDescription: 'An expedition into the deepest reaches of Clair Obscur that ended in mystery. What happened during Expedition 33 remains largely unknown, but its aftermath created the fractured paths that define the current age.',
    relatedEntries: ['verso', 'maelle', 'fractured-paths'],
  },
  {
    id: 'painter-faction',
    name: 'The Painters\' Circle',
    category: 'factions',
    tags: ['Painter', 'Creators', 'Artistic'],
    shortDescription: 'Those who shape reality through art and vision.',
    longDescription: 'An ancient collective of artists and visionaries who believe that reality can be reshaped through creative will. They seek to understand and control the boundary between imagination and existence.',
    relatedEntries: ['verso', 'magic-of-creation'],
  },
  {
    id: 'writer-faction',
    name: 'The Scribes\' Order',
    category: 'factions',
    tags: ['Writer', 'Keepers', 'Knowledge'],
    shortDescription: 'Guardians of truth and recorded history.',
    longDescription: 'An order dedicated to documenting truth in a world of shadows. The Scribes maintain archives of what is real, what was, and what might have been. They believe that truth can be found through careful observation and recording.',
    relatedEntries: ['maelle', 'magic-of-words'],
  },
  {
    id: 'magic-of-creation',
    name: 'Art of Creation',
    category: 'magic',
    tags: ['Painter', 'Reality-shaping', 'Visual'],
    shortDescription: 'Magic wrought through artistic expression.',
    longDescription: 'The power to reshape reality through visual creation. Those who master this art can make the painted world tangible, bringing imagination into being through brush and canvas.',
    relatedEntries: ['painter-faction', 'verso'],
  },
  {
    id: 'magic-of-words',
    name: 'Power of Language',
    category: 'magic',
    tags: ['Writer', 'Knowledge', 'Truth'],
    shortDescription: 'Magic inherent in the spoken and written word.',
    longDescription: 'Words hold immense power in Clair Obscur. The right phrase, spoken with conviction, can unlock doors, reveal truths, or alter perception. Language itself becomes a tool for reshaping reality.',
    relatedEntries: ['scribe-faction', 'maelle'],
  },
  {
    id: 'fractured-paths',
    name: 'The Fracturing',
    category: 'timeline',
    tags: ['Event', 'Turning Point'],
    shortDescription: 'When the world splintered into multiple realities.',
    longDescription: 'A cataclysmic moment when Clair Obscur fractured into countless possible paths. Each path represents a different outcome, a different reality. Travelers now navigate these fractured timelines, seeking understanding.',
    relatedEntries: ['expedition-33', 'verso', 'maelle'],
  },
]

export default function CodexPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('characters')
  const [selectedEntry, setSelectedEntry] = useState<CodexEntry | null>(null)

  const categories: { id: Category; label: string }[] = [
    { id: 'characters', label: 'Characters' },
    { id: 'locations', label: 'Locations' },
    { id: 'factions', label: 'Factions' },
    { id: 'magic', label: 'Magic' },
    { id: 'timeline', label: 'Timeline' },
  ]

  const filteredEntries = SAMPLE_ENTRIES.filter(
    (entry) => entry.category === activeCategory || entry.category === 'events'
  )

  if (selectedEntry) {
    return (
      <CodexEntryDetail
        entry={selectedEntry}
        allEntries={SAMPLE_ENTRIES}
        onBack={() => setSelectedEntry(null)}
      />
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
      <h1 className="text-4xl md:text-5xl font-light mb-2 text-foreground">
        Lore Codex
      </h1>
      <p className="text-muted-foreground mb-12">
        Entries and knowledge gathered across fractured paths.
      </p>

      <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border/30">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-lg text-sm uppercase tracking-wider transition-all ${
              activeCategory === category.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-card text-muted-foreground hover:text-foreground border border-border/30'
            }`}
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="grid gap-4">
        {filteredEntries.map((entry) => (
          <div
            key={entry.id}
            onClick={() => setSelectedEntry(entry)}
            className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-xl font-light text-foreground group-hover:text-primary transition-colors">
                  {entry.name}
                </h3>
              </div>
              <ChevronRight
                size={20}
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0 ml-4"
              />
            </div>

            <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
              {entry.shortDescription}
            </p>

            <div className="flex flex-wrap gap-2">
              {entry.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 bg-secondary/30 text-accent rounded border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
