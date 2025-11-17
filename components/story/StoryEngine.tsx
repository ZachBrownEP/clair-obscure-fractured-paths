'use client'

import { useState, useEffect } from 'react'
import { StoryNode, StoryState, StoryRouteId, StoryChoice, ChoiceHistoryEntry } from '@/lib/story/types'
import {
  loadStoryState,
  saveStoryState,
  clearStoryState,
  unlockEnding,
  getInitialState,
  checkAndUnlockAchievements,
  addBookmark,
  isNodeBookmarked,
  removeBookmark,
  getRouteBookmarks
} from '@/lib/story/persistence'
import { ChevronLeft, RotateCcw, History, Trophy, Bookmark as BookmarkIcon, BookmarkCheck } from 'lucide-react'
import Link from 'next/link'
import ChoiceButton from '@/components/choice-button'
import AlignmentIndicator from '@/components/alignment-indicator'
import EnhancedBackground from '@/components/enhanced-background'
import ChoiceHistoryModal from '@/components/choice-history-modal'
import ParticleEffect from '@/components/particle-effect'
import { toast } from 'sonner'

interface StoryEngineProps {
  routeId: StoryRouteId
  nodes: StoryNode[]
  startNodeId: string
  totalChapters: number
  routeName?: string // Added for display
}

export default function StoryEngine({
  routeId,
  nodes,
  startNodeId,
  totalChapters,
  routeName
}: StoryEngineProps) {
  // Load initial state from localStorage or use default
  const [state, setState] = useState<StoryState>(() =>
    loadStoryState(routeId, startNodeId)
  )

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [lastSaveTime, setLastSaveTime] = useState<number>(Date.now())
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  // Find current node whenever currentNodeId changes
  useEffect(() => {
    const node = nodes.find(n => n.id === state.currentNodeId)
    if (node) {
      setCurrentNode(node)
      setIsBookmarked(isNodeBookmarked(routeId, node.id))
    }
  }, [state.currentNodeId, nodes, routeId])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveStoryState(state)
    setLastSaveTime(Date.now())

    // Show auto-save notification (debounced to avoid spam)
    const timeoutId = setTimeout(() => {
      toast.success('Progress Saved', {
        description: new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        }),
        duration: 2000,
      })
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [state])

  const handleChoice = (choice: StoryChoice) => {
    setSelectedChoice(choice.id)
    setIsTransitioning(true)

    // Apply effects after a brief delay for animation
    setTimeout(() => {
      setState(prevState => {
        const newState = { ...prevState }

        // Track stat changes for history
        const statChanges: ChoiceHistoryEntry['statChanges'] = {}
        const flagsSet: Record<string, boolean> = {}

        // Apply choice effects
        if (choice.effects) {
          choice.effects.forEach(effect => {
            if (effect.type === 'stat') {
              const oldValue = newState.stats[effect.key]
              newState.stats[effect.key] = Math.max(
                0,
                Math.min(100, oldValue + effect.delta)
              )
              // Record the actual change
              statChanges[effect.key] = effect.delta
            } else if (effect.type === 'flag') {
              newState.flags[effect.key] = effect.value
              flagsSet[effect.key] = effect.value
            }
          })
        }

        // Add to choice history
        const historyEntry: ChoiceHistoryEntry = {
          nodeId: currentNode?.id || '',
          nodeTitle: currentNode?.title,
          choiceId: choice.id,
          choiceLabel: choice.label,
          timestamp: Date.now(),
          statChanges: Object.keys(statChanges).length > 0 ? statChanges : undefined,
          flagsSet: Object.keys(flagsSet).length > 0 ? flagsSet : undefined,
          chapter: newState.currentChapter
        }
        newState.choiceHistory.push(historyEntry)

        // Move to next node
        newState.currentNodeId = choice.nextId
        if (!newState.seenNodes.includes(choice.nextId)) {
          newState.seenNodes.push(choice.nextId)
        }

        // Update chapter based on next node
        const nextNode = nodes.find(n => n.id === choice.nextId)
        if (nextNode) {
          newState.currentChapter = nextNode.chapter
        }

        return newState
      })

      setSelectedChoice(null)

      // Reset transition state after a delay
      setTimeout(() => setIsTransitioning(false), 600)

      // Check if next node is an ending and unlock it
      const nextNode = nodes.find(n => n.id === choice.nextId)
      const isEnding = nextNode?.isEnding || false

      if (isEnding && nextNode?.endingKey) {
        unlockEnding(routeId, nextNode.endingKey)
      }

      // Check and unlock achievements
      setState(currentState => {
        const newAchievements = checkAndUnlockAchievements(currentState, isEnding)

        // Show toast for newly unlocked achievements
        if (newAchievements.length > 0) {
          newAchievements.forEach(achievementId => {
            // Simple toast - we'll show the full achievement details
            toast.success('Achievement Unlocked!', {
              description: `Check your achievements page to see what you've earned!`,
              duration: 3000,
            })
          })
        }

        return currentState
      })
    }, 300)
  }

  const handleRestart = () => {
    // Clear saved state and reset to initial
    clearStoryState(routeId)
    const initialState = getInitialState(routeId, startNodeId)
    setState(initialState)
  }

  const handleBookmark = () => {
    if (!currentNode) return

    if (isBookmarked) {
      // Remove bookmark
      const bookmarks = getRouteBookmarks(routeId)
      const bookmark = bookmarks.find(b => b.nodeId === currentNode.id)
      if (bookmark) {
        removeBookmark(bookmark.id)
        setIsBookmarked(false)
        toast.success('Bookmark Removed')
      }
    } else {
      // Add bookmark
      addBookmark({
        route: routeId,
        nodeId: currentNode.id,
        nodeTitle: currentNode.title,
        quote: currentNode.text.substring(0, 200),
        chapter: state.currentChapter
      })
      setIsBookmarked(true)
      toast.success('Scene Bookmarked', {
        description: 'View in bookmarks page'
      })
    }
  }

  if (!currentNode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center relative overflow-hidden">
        <EnhancedBackground />
        <p className="text-muted-foreground relative z-10">Loading story...</p>
      </div>
    )
  }

  // Filter choices based on conditions
  const availableChoices = currentNode.choices.filter(choice => {
    if (!choice.condition) return true

    const { type, key, value, min, max } = choice.condition

    if (type === 'flag') {
      return state.flags[key] === value
    } else if (type === 'stat' && key in state.stats) {
      const statValue = state.stats[key as keyof typeof state.stats]
      if (min !== undefined && statValue < min) return false
      if (max !== undefined && statValue > max) return false
      return true
    }

    return true
  })

  // Calculate progress metrics
  const totalNodes = nodes.length
  const visitedNodes = state.seenNodes.length
  const progressPercentage = Math.round((visitedNodes / totalNodes) * 100)
  const estimatedTimeRemaining = Math.max(1, Math.round((totalNodes - visitedNodes) * 0.5)) // ~30 seconds per node

  return (
    <div className="min-h-screen bg-background py-8 md:py-16 px-4 relative overflow-hidden">
      <EnhancedBackground />

      <div className={`max-w-3xl mx-auto relative z-10 transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
        <div className="glass rounded-2xl p-8 md:p-12 transition-all duration-300">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-border/30">
            <Link
              href={`/stories/${routeId}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ChevronLeft size={18} />
              Back
            </Link>

            <div className="flex items-center gap-3">
              <button
                onClick={handleBookmark}
                className={`flex items-center gap-2 transition-colors text-sm ${
                  isBookmarked
                    ? 'text-amber-500 hover:text-amber-600'
                    : 'text-muted-foreground hover:text-amber-500'
                }`}
                title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Scene'}
              >
                {isBookmarked ? <BookmarkCheck size={18} /> : <BookmarkIcon size={18} />}
                <span className="hidden sm:inline">
                  {isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </span>
              </button>

              <button
                onClick={() => setShowHistory(true)}
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
                title="View Choice History"
              >
                <History size={18} />
                <span className="hidden sm:inline">History</span>
              </button>

              <Link
                href="/achievements"
                className="flex items-center gap-2 text-muted-foreground hover:text-accent transition-colors text-sm"
                title="View Achievements"
              >
                <Trophy size={18} />
                <span className="hidden sm:inline">Achievements</span>
              </Link>

              <button
                onClick={handleRestart}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <RotateCcw size={18} />
                <span className="hidden sm:inline">Restart</span>
              </button>
            </div>
          </div>

          {/* Route title */}
          {routeName && (
            <div className="mb-6">
              <h2 className="text-sm uppercase tracking-widest text-muted-foreground">
                {routeName}
              </h2>
            </div>
          )}

          {/* Alignment indicators */}
          {!currentNode.isEnding && (
            <div className="mb-8">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
                Alignment
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Painter</span>
                    <span className="text-sm text-primary font-light">
                      {state.stats.painterAlignment}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${state.stats.painterAlignment}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Writer</span>
                    <span className="text-sm text-accent font-light">
                      {state.stats.writerAlignment}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-accent transition-all"
                      style={{ width: `${state.stats.writerAlignment}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-muted-foreground">Balance</span>
                    <span className="text-sm text-secondary font-light">
                      {state.stats.balance}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary transition-all"
                      style={{ width: `${state.stats.balance}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Enhanced Progress Indicators */}
          <div className="mb-6 glass rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Progress</div>
                <div className="text-lg font-light text-primary">{progressPercentage}%</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Nodes</div>
                <div className="text-lg font-light text-primary">{visitedNodes}/{totalNodes}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Est. Time</div>
                <div className="text-lg font-light text-primary">{estimatedTimeRemaining}m</div>
              </div>
            </div>
          </div>

          {/* Story content */}
          <div className="mb-12">
            {currentNode.isEnding && (
              <p className="text-xs tracking-widest text-muted-foreground uppercase mb-3">
                Ending
              </p>
            )}

            {currentNode.title && (
              <h1 className="text-3xl md:text-4xl font-light text-foreground mb-8 leading-relaxed">
                {currentNode.title}
              </h1>
            )}

            <div className="prose prose-invert max-w-none">
              <p className="text-lg leading-relaxed text-foreground whitespace-pre-wrap">
                {currentNode.text}
              </p>
            </div>
          </div>

          {/* Choices or ending actions */}
          {currentNode.isEnding ? (
            <div className="pt-8 border-t border-border/30">
              {/* Ending celebration */}
              <div className="text-center mb-8 py-6 px-4 bg-primary/5 rounded-lg border border-primary/20 relative overflow-hidden">
                <ParticleEffect />
                <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2 relative z-10">
                  Ending Reached
                </p>
                {currentNode.endingTitle && (
                  <h3 className="text-2xl md:text-3xl font-light text-primary mb-3 relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {currentNode.endingTitle}
                  </h3>
                )}
                <p className="text-sm text-muted-foreground relative z-10">
                  You've completed one of {routeId === 'verso' ? "Verso's" : "Maelle's"} paths.
                  This ending has been unlocked in your gallery.
                </p>
              </div>

              {/* Action buttons */}
              <div className="space-y-3">
                <button
                  onClick={handleRestart}
                  className="w-full glass p-4 rounded-lg hover:bg-card/70 transition-all text-foreground uppercase tracking-wider text-sm"
                >
                  Restart Route
                </button>
                <Link
                  href={`/stories/${routeId}`}
                  className="block w-full text-center glass p-4 rounded-lg hover:bg-card/70 transition-all text-muted-foreground uppercase tracking-wider text-sm"
                >
                  Back to Route Overview
                </Link>
                <Link
                  href="/endings"
                  className="block w-full text-center glass p-4 rounded-lg hover:bg-card/70 transition-all text-accent uppercase tracking-wider text-sm"
                >
                  View Endings Gallery
                </Link>
              </div>
            </div>
          ) : availableChoices.length > 0 ? (
            <div className="space-y-3 pt-8 border-t border-border/30">
              <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
                What do you do?
              </p>

              {availableChoices.map((choice) => {
                // Determine alignment based on effects
                let alignment: 'painter' | 'writer' | 'balance' | undefined
                if (choice.effects) {
                  const painterEffect = choice.effects.find(
                    e => e.type === 'stat' && e.key === 'painterAlignment'
                  )
                  const writerEffect = choice.effects.find(
                    e => e.type === 'stat' && e.key === 'writerAlignment'
                  )
                  const balanceEffect = choice.effects.find(
                    e => e.type === 'stat' && e.key === 'balance'
                  )
                  if (painterEffect && 'delta' in painterEffect && painterEffect.delta > 0) {
                    alignment = 'painter'
                  } else if (writerEffect && 'delta' in writerEffect && writerEffect.delta > 0) {
                    alignment = 'writer'
                  } else if (balanceEffect && 'delta' in balanceEffect && balanceEffect.delta > 0) {
                    alignment = 'balance'
                  }
                }

                return (
                  <ChoiceButton
                    key={choice.id}
                    text={choice.label}
                    alignment={alignment}
                    onClick={() => handleChoice(choice)}
                    isSelected={selectedChoice === choice.id}
                  />
                )
              })}
            </div>
          ) : (
            <div className="pt-8 border-t border-border/30 text-center">
              <p className="text-muted-foreground mb-4">
                This path continues in a future chapter...
              </p>
              <Link
                href={`/stories/${routeId}`}
                className="inline-block glass px-6 py-3 rounded-lg hover:bg-card/70 transition-all text-primary uppercase tracking-wider text-sm"
              >
                Return to Route
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Choice History Modal */}
      <ChoiceHistoryModal
        isOpen={showHistory}
        onClose={() => setShowHistory(false)}
        history={state.choiceHistory}
        routeName={routeName}
      />
    </div>
  )
}
