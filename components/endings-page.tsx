'use client'

import { useState } from 'react'
import EndingCard from './ending-card'

interface Ending {
  id: string
  title: string
  route: string
  summary: string
  unlocked: boolean
}

const ENDINGS: Ending[] = [
  {
    id: 'verso-truth',
    title: 'The Truth Unveiled',
    route: "Verso's Path",
    summary: 'Verso discovers the true nature of the Canvas Ghost.',
    unlocked: true,
  },
  {
    id: 'verso-ascension',
    title: 'Ascension to Canvas',
    route: "Verso's Path",
    summary: 'Verso merges with the painted world, transcending reality.',
    unlocked: false,
  },
  {
    id: 'verso-return',
    title: 'Return to the Waking World',
    route: "Verso's Path",
    summary: 'Verso chooses to abandon the fractured paths and return home.',
    unlocked: false,
  },
  {
    id: 'verso-balance',
    title: 'The Painter\'s Balance',
    route: "Verso's Path",
    summary: 'Verso achieves equilibrium between painter and writer alignments.',
    unlocked: false,
  },
  {
    id: 'maelle-scribe',
    title: 'The Scribe\'s Truth',
    route: "Maelle's Journey",
    summary: 'Maelle completes the chronicles and becomes keeper of truths.',
    unlocked: false,
  },
  {
    id: 'maelle-seeker',
    title: 'Endless Seeking',
    route: "Maelle's Journey",
    summary: 'Maelle continues her quest, forever seeking deeper truths.',
    unlocked: false,
  },
  {
    id: 'maelle-revelation',
    title: 'The Final Revelation',
    route: "Maelle's Journey",
    summary: 'All secrets are revealed. Everything changes.',
    unlocked: false,
  },
  {
    id: 'maelle-fracture',
    title: 'Fracture of Self',
    route: "Maelle's Journey",
    summary: 'Maelle fragments across multiple realities, becoming one with the fractured paths.',
    unlocked: false,
  },
]

export default function EndingsPage() {
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'verso' | 'maelle'>('all')

  const filteredEndings = ENDINGS.filter((ending) => {
    if (filter === 'unlocked') return ending.unlocked
    if (filter === 'verso') return ending.route === "Verso's Path"
    if (filter === 'maelle') return ending.route === "Maelle's Journey"
    return true
  })

  const unlockedCount = ENDINGS.filter((e) => e.unlocked).length
  const totalCount = ENDINGS.length

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-16">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-light mb-2 text-foreground">
          Endings Gallery
        </h1>
        <p className="text-muted-foreground">
          Unlock all endings across the fractured paths.
        </p>
        <div className="mt-4 text-sm text-muted-foreground">
          <span className="text-primary font-light">{unlockedCount}</span> of{' '}
          <span className="text-primary font-light">{totalCount}</span> endings discovered
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm uppercase tracking-wider transition-all ${
            filter === 'all'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-muted-foreground hover:text-foreground border border-border/30'
          }`}
        >
          All Endings
        </button>
        <button
          onClick={() => setFilter('unlocked')}
          className={`px-4 py-2 rounded-lg text-sm uppercase tracking-wider transition-all ${
            filter === 'unlocked'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-muted-foreground hover:text-foreground border border-border/30'
          }`}
        >
          Unlocked
        </button>
        <button
          onClick={() => setFilter('verso')}
          className={`px-4 py-2 rounded-lg text-sm uppercase tracking-wider transition-all ${
            filter === 'verso'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-muted-foreground hover:text-foreground border border-border/30'
          }`}
        >
          Verso
        </button>
        <button
          onClick={() => setFilter('maelle')}
          className={`px-4 py-2 rounded-lg text-sm uppercase tracking-wider transition-all ${
            filter === 'maelle'
              ? 'bg-primary text-primary-foreground'
              : 'bg-card text-muted-foreground hover:text-foreground border border-border/30'
          }`}
        >
          Maelle
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredEndings.map((ending) => (
          <EndingCard key={ending.id} ending={ending} />
        ))}
      </div>

      {filteredEndings.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No endings match your filter.</p>
        </div>
      )}
    </div>
  )
}
