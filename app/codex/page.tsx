'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import codexEntries from '@/data/codex/entries.json'

type Category = 'character' | 'location' | 'faction' | 'magic' | 'event'

interface CodexEntry {
  id: string
  name: string
  category: Category
  tags: string[]
  shortDescription: string
  fullDescription: string
}

export default function CodexPage() {
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [selectedEntry, setSelectedEntry] = useState<CodexEntry | null>(null)

  const categories: { id: Category | 'all'; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'character', label: 'Characters' },
    { id: 'location', label: 'Locations' },
    { id: 'faction', label: 'Factions' },
    { id: 'magic', label: 'Magic' },
    { id: 'event', label: 'Events' }
  ]

  const filteredEntries = (codexEntries as CodexEntry[]).filter(
    entry => activeCategory === 'all' || entry.category === activeCategory
  )

  // Get related entries
  const getRelatedEntries = (entryId: string): CodexEntry[] => {
    // For now, return entries with overlapping tags
    const entry = codexEntries.find((e: any) => e.id === entryId) as CodexEntry | undefined
    if (!entry) return []

    return (codexEntries as CodexEntry[])
      .filter(e =>
        e.id !== entryId &&
        e.tags.some(tag => entry.tags.includes(tag))
      )
      .slice(0, 3)
  }

  if (selectedEntry) {
    const relatedEntries = getRelatedEntries(selectedEntry.id)

    return (
      <div className="min-h-screen bg-background">
        <main className="max-w-4xl mx-auto px-4 md:px-8 py-16">
          <button
            onClick={() => setSelectedEntry(null)}
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
          >
            <ChevronLeft size={18} />
            Back to Codex
          </button>

          <div className="glass rounded-2xl p-8 md:p-12">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-widest text-muted-foreground">
                {selectedEntry.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              {selectedEntry.name}
            </h1>

            <div className="flex flex-wrap gap-2 mb-8">
              {selectedEntry.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 bg-secondary/30 text-accent rounded border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-lg leading-relaxed text-foreground">
              {selectedEntry.fullDescription}
            </p>

            {relatedEntries.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border/30">
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                  Related Entries
                </h3>
                <div className="grid gap-3">
                  {relatedEntries.map(entry => (
                    <button
                      key={entry.id}
                      onClick={() => setSelectedEntry(entry)}
                      className="glass p-4 rounded-lg hover:bg-card/70 transition-all text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-foreground group-hover:text-primary transition-colors">
                            {entry.name}
                          </h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            {entry.shortDescription}
                          </p>
                        </div>
                        <ChevronRight
                          size={18}
                          className="text-muted-foreground group-hover:text-primary flex-shrink-0 ml-4"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
        >
          <ChevronLeft size={18} />
          Back to Home
        </Link>

        <h1 className="text-4xl md:text-5xl font-light mb-2 text-foreground">
          Lore Codex
        </h1>
        <p className="text-muted-foreground mb-12">
          Entries and knowledge gathered across fractured paths.
        </p>

        <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border/30">
          {categories.map(category => (
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
          {filteredEntries.map(entry => (
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
                  <p className="text-xs text-muted-foreground uppercase mt-1">
                    {entry.category}
                  </p>
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
                {entry.tags.map(tag => (
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
      </main>
    </div>
  )
}
