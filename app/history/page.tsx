'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Clock, TrendingUp, TrendingDown, Flag, Filter } from 'lucide-react'
import { ChoiceHistoryEntry, StoryRouteId } from '@/lib/story/types'
import { loadStoryState } from '@/lib/story/persistence'
import { ScrollArea } from '@/components/ui/scroll-area'
import EnhancedBackground from '@/components/enhanced-background'
import SmartBackButton from '@/components/smart-back-button'

interface CombinedHistoryEntry extends ChoiceHistoryEntry {
  route: StoryRouteId
  routeName: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<CombinedHistoryEntry[]>([])
  const [filter, setFilter] = useState<'all' | 'verso' | 'maelle'>('all')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    loadAllHistory()
  }, [])

  const loadAllHistory = () => {
    try {
      // Load both routes
      const versoState = loadStoryState('verso', 'v_start')
      const maelleState = loadStoryState('maelle', 'm_start')

      const combined: CombinedHistoryEntry[] = []

      // Add Verso history
      if (versoState.choiceHistory) {
        versoState.choiceHistory.forEach(entry => {
          combined.push({
            ...entry,
            route: 'verso',
            routeName: "Verso's Story"
          })
        })
      }

      // Add Maelle history
      if (maelleState.choiceHistory) {
        maelleState.choiceHistory.forEach(entry => {
          combined.push({
            ...entry,
            route: 'maelle',
            routeName: "Maelle's Story"
          })
        })
      }

      // Sort by timestamp (newest first)
      combined.sort((a, b) => b.timestamp - a.timestamp)

      setHistory(combined)
    } catch (error) {
      console.error('Error loading history:', error)
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatStatChange = (value: number) => {
    if (value > 0) return `+${value}`
    return value.toString()
  }

  const filteredHistory = filter === 'all'
    ? history
    : history.filter(entry => entry.route === filter)

  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <EnhancedBackground />
      <div className="relative z-10 pt-20">
        {/* Header */}
        <header className="glass sticky top-20 z-20 border-b border-border/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-muted-foreground hover:text-primary transition-colors">
                  <SmartBackButton
                    fallbackLabel=""
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-light text-foreground flex items-center gap-2">
                    <Clock size={24} className="text-primary" />
                    Choice History
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Every decision across all your journeys
                  </p>
                </div>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter size={16} className="text-muted-foreground" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as typeof filter)}
                  className="glass px-3 py-1.5 rounded text-sm border border-border/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="all">All Routes</option>
                  <option value="verso">Verso Only</option>
                  <option value="maelle">Maelle Only</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {filteredHistory.length === 0 ? (
            <div className="glass rounded-xl p-12 text-center">
              <Clock size={48} className="mx-auto text-muted-foreground/50 mb-4" />
              <h2 className="text-xl font-light text-foreground mb-2">
                No Choices Yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Your journey has just begun. Choices you make will appear here.
              </p>
              <Link
                href="/dashboard"
                className="inline-block glass px-6 py-2 rounded-lg hover:bg-card/70 transition-all text-primary"
              >
                Begin Your Journey
              </Link>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-light text-primary mb-1">
                    {history.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Choices
                  </div>
                </div>
                <div className="glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-light text-primary mb-1">
                    {history.filter(h => h.route === 'verso').length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Verso Choices
                  </div>
                </div>
                <div className="glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-light text-primary mb-1">
                    {history.filter(h => h.route === 'maelle').length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Maelle Choices
                  </div>
                </div>
              </div>

              {/* History List */}
              <div className="space-y-4">
                {filteredHistory.map((entry, index) => (
                  <div
                    key={`${entry.route}-${entry.nodeId}-${index}`}
                    className="glass rounded-lg p-5 hover:bg-card/70 transition-all"
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
                            {entry.routeName}
                          </span>
                          {entry.nodeTitle && (
                            <span className="text-sm font-light text-foreground">
                              {entry.nodeTitle}
                            </span>
                          )}
                          <span className="text-xs text-muted-foreground">
                            • Chapter {entry.chapter}
                          </span>
                        </div>
                        <p className="text-foreground font-light text-lg">
                          "{entry.choiceLabel}"
                        </p>
                      </div>
                      <div className="text-right ml-4">
                        <div className="text-xs text-muted-foreground whitespace-nowrap">
                          {formatTimestamp(entry.timestamp)}
                        </div>
                      </div>
                    </div>

                    {/* Effects */}
                    {(entry.statChanges || entry.flagsSet) && (
                      <div className="mt-3 pt-3 border-t border-border/30">
                        <div className="flex flex-wrap gap-2">
                          {/* Stat Changes */}
                          {entry.statChanges?.painterAlignment && (
                            <div
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                                entry.statChanges.painterAlignment > 0
                                  ? 'bg-primary/10 text-primary'
                                  : 'bg-destructive/10 text-destructive'
                              }`}
                            >
                              {entry.statChanges.painterAlignment > 0 ? (
                                <TrendingUp size={12} />
                              ) : (
                                <TrendingDown size={12} />
                              )}
                              Painter {formatStatChange(entry.statChanges.painterAlignment)}
                            </div>
                          )}

                          {entry.statChanges?.writerAlignment && (
                            <div
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                                entry.statChanges.writerAlignment > 0
                                  ? 'bg-accent/10 text-accent'
                                  : 'bg-destructive/10 text-destructive'
                              }`}
                            >
                              {entry.statChanges.writerAlignment > 0 ? (
                                <TrendingUp size={12} />
                              ) : (
                                <TrendingDown size={12} />
                              )}
                              Writer {formatStatChange(entry.statChanges.writerAlignment)}
                            </div>
                          )}

                          {entry.statChanges?.balance && (
                            <div
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs ${
                                entry.statChanges.balance > 0
                                  ? 'bg-secondary/20 text-secondary'
                                  : 'bg-destructive/10 text-destructive'
                              }`}
                            >
                              {entry.statChanges.balance > 0 ? (
                                <TrendingUp size={12} />
                              ) : (
                                <TrendingDown size={12} />
                              )}
                              Balance {formatStatChange(entry.statChanges.balance)}
                            </div>
                          )}

                          {/* Flags */}
                          {entry.flagsSet && Object.keys(entry.flagsSet).length > 0 && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-muted/50 text-muted-foreground">
                              <Flag size={12} />
                              {Object.keys(entry.flagsSet).length} flag{Object.keys(entry.flagsSet).length !== 1 ? 's' : ''} set
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
