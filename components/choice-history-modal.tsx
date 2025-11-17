'use client'

import { ChoiceHistoryEntry } from '@/lib/story/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Clock, TrendingUp, TrendingDown, Flag } from 'lucide-react'

interface ChoiceHistoryModalProps {
  isOpen: boolean
  onClose: () => void
  history: ChoiceHistoryEntry[]
  routeName?: string
}

export default function ChoiceHistoryModal({
  isOpen,
  onClose,
  history,
  routeName
}: ChoiceHistoryModalProps) {
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const formatStatChange = (value: number) => {
    if (value > 0) return `+${value}`
    return value.toString()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-light flex items-center gap-2">
            <Clock size={24} className="text-primary" />
            Choice History {routeName && `- ${routeName}`}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            A record of your journey through the fractured paths
          </p>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          {history.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Your journey has just begun.</p>
              <p className="text-sm mt-2">Choices you make will appear here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {history.map((entry, index) => (
                <div
                  key={`${entry.nodeId}-${index}`}
                  className="glass rounded-lg p-4 hover:bg-card/70 transition-all"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-muted-foreground">
                          #{index + 1}
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
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">
                      {formatTimestamp(entry.timestamp)}
                    </span>
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
          )}
        </ScrollArea>

        {history.length > 0 && (
          <div className="pt-4 border-t border-border/30">
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>{history.length} choice{history.length !== 1 ? 's' : ''} made</span>
              {history[0] && history[history.length - 1] && (
                <span>
                  Journey: {formatTimestamp(history[0].timestamp)} - {formatTimestamp(history[history.length - 1].timestamp)}
                </span>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
