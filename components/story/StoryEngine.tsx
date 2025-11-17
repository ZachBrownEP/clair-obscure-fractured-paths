'use client'

import { useState, useEffect } from 'react'
import { StoryNode, StoryState, StoryRouteId, StoryChoice } from '@/lib/story/types'
import {
  loadStoryState,
  saveStoryState,
  clearStoryState,
  unlockEnding,
  getInitialState
} from '@/lib/story/persistence'
import { ChevronLeft, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import ChoiceButton from '@/components/choice-button'
import AlignmentIndicator from '@/components/alignment-indicator'
import ProgressBar from '@/components/progress-bar'
import EnhancedBackground from '@/components/enhanced-background'

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

  // Find current node whenever currentNodeId changes
  useEffect(() => {
    const node = nodes.find(n => n.id === state.currentNodeId)
    if (node) {
      setCurrentNode(node)
    }
  }, [state.currentNodeId, nodes])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveStoryState(state)
  }, [state])

  const handleChoice = (choice: StoryChoice) => {
    setSelectedChoice(choice.id)

    // Apply effects after a brief delay for animation
    setTimeout(() => {
      setState(prevState => {
        const newState = { ...prevState }

        // Apply choice effects
        if (choice.effects) {
          choice.effects.forEach(effect => {
            if (effect.type === 'stat') {
              newState.stats[effect.key] = Math.max(
                0,
                Math.min(100, newState.stats[effect.key] + effect.delta)
              )
            } else if (effect.type === 'flag') {
              newState.flags[effect.key] = effect.value
            }
          })
        }

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

      // Check if next node is an ending and unlock it
      const nextNode = nodes.find(n => n.id === choice.nextId)
      if (nextNode?.isEnding && nextNode.endingKey) {
        unlockEnding(routeId, nextNode.endingKey)
      }
    }, 300)
  }

  const handleRestart = () => {
    // Clear saved state and reset to initial
    clearStoryState(routeId)
    const initialState = getInitialState(routeId, startNodeId)
    setState(initialState)
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

  return (
    <div className="min-h-screen bg-background py-8 md:py-16 px-4 relative overflow-hidden">
      <EnhancedBackground />
      <ProgressBar current={state.currentChapter} total={totalChapters} />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="glass rounded-2xl p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-border/30">
            <Link
              href={`/stories/${routeId}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ChevronLeft size={18} />
              Back
            </Link>

            <button
              onClick={handleRestart}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <RotateCcw size={18} />
              Restart
            </button>
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
                    <span className="text-xs text-muted-foreground">Compassion</span>
                    <span className="text-sm text-secondary font-light">
                      {state.stats.compassion}
                    </span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-secondary transition-all"
                      style={{ width: `${state.stats.compassion}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Story content */}
          <div className="mb-12">
            <p className="text-xs tracking-widest text-muted-foreground uppercase mb-3">
              Chapter {state.currentChapter} of {totalChapters}
              {currentNode.isEnding && ' • Ending'}
            </p>

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
              <div className="text-center mb-8 py-6 px-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                  Ending Reached
                </p>
                {currentNode.endingTitle && (
                  <h3 className="text-2xl md:text-3xl font-light text-primary mb-3">
                    {currentNode.endingTitle}
                  </h3>
                )}
                <p className="text-sm text-muted-foreground">
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
                let alignment: 'painter' | 'writer' | undefined
                if (choice.effects) {
                  const painterEffect = choice.effects.find(
                    e => e.type === 'stat' && e.key === 'painterAlignment'
                  )
                  const writerEffect = choice.effects.find(
                    e => e.type === 'stat' && e.key === 'writerAlignment'
                  )
                  if (painterEffect && 'delta' in painterEffect && painterEffect.delta > 0) {
                    alignment = 'painter'
                  } else if (writerEffect && 'delta' in writerEffect && writerEffect.delta > 0) {
                    alignment = 'writer'
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

        {/* Progress indicator */}
        <div className="mt-8 flex items-center justify-between text-sm text-muted-foreground">
          <span>Chapter {state.currentChapter} of {totalChapters}</span>
          <span>
            {((state.currentChapter / totalChapters) * 100).toFixed(0)}% complete
          </span>
        </div>
      </div>
    </div>
  )
}
