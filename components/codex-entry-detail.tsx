'use client'

import { ChevronLeft } from 'lucide-react'

interface CodexEntry {
  id: string
  name: string
  category: string
  tags: string[]
  shortDescription: string
  longDescription: string
  relatedEntries: string[]
}

interface CodexEntryDetailProps {
  entry: CodexEntry
  allEntries: CodexEntry[]
  onBack: () => void
}

export default function CodexEntryDetail({
  entry,
  allEntries,
  onBack,
}: CodexEntryDetailProps) {
  const relatedEntriesData = allEntries.filter((e) =>
    entry.relatedEntries.includes(e.id)
  )

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-16">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ChevronLeft size={20} />
        Back to Codex
      </button>

      <div className="glass rounded-2xl p-8 md:p-12">
        <div className="mb-8 pb-8 border-b border-border/30">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
            {entry.category}
          </p>
          <h1 className="text-5xl font-light text-foreground mb-4">
            {entry.name}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {entry.shortDescription}
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-sm px-3 py-1 bg-primary/20 text-primary rounded-lg border border-primary/30"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="mb-12 prose prose-invert max-w-none">
          <p className="text-foreground leading-relaxed whitespace-pre-wrap">
            {entry.longDescription}
          </p>
        </div>

        {relatedEntriesData.length > 0 && (
          <div className="pt-8 border-t border-border/30">
            <h3 className="text-xl font-light text-foreground mb-4">
              Related Entries
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {relatedEntriesData.map((related) => (
                <div
                  key={related.id}
                  className="p-4 bg-card/50 rounded-lg border border-border/30 hover:border-primary/50 transition-colors"
                >
                  <p className="text-xs text-muted-foreground uppercase mb-1">
                    {related.category}
                  </p>
                  <p className="text-foreground font-light">{related.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
