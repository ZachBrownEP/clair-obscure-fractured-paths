'use client'

import { useState, useEffect } from 'react'
import { StoryNode, StoryState, StoryRouteId, StoryChoice } from '@/lib/story/types'
import { ChevronLeft, RotateCcw } from 'lucide-react'
import Link from 'next/link'
import ChoiceButton from '@/components/choice-button'
import AlignmentIndicator from '@/components/alignment-indicator'
import ProgressBar from '@/components/progress-bar'

interface StoryEngineProps {
  routeId: StoryRouteId
  nodes: StoryNode[]
  startNodeId: string
  totalChapters: number
  onEnding?: (endingKey: string) => void
}

export default function StoryEngine({
  routeId,
  nodes,
  startNodeId,
  totalChapters,
  onEnding
}: StoryEngineProps) {
  const [state, setState] = useState<StoryState>({
    routeId,
    currentNodeId: startNodeId,
    stats: {
      painterAlignment: 50,
      writerAlignment: 50,
      compassion: 50
    },
    flags: {},
    seenNodes: [startNodeId],
    currentChapter: 1
  })

  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)
  const [currentNode, setCurrentNode] = useState<StoryNode | null>(null)

  // Find current node whenever currentNodeId changes
  useEffect(() => {
    const node = nodes.find(n => n.id === state.currentNodeId)
    if (node) {
      setCurrentNode(node)
    }
  }, [state.currentNodeId, nodes])

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

      // Check if next node is an ending
      const nextNode = nodes.find(n => n.id === choice.nextId)
      if (nextNode?.isEnding && nextNode.endingKey && onEnding) {
        onEnding(nextNode.endingKey)
      }
    }, 300)
  }

  const handleRestart = () => {
    setState({
      routeId,
      currentNodeId: startNodeId,
      stats: {
        painterAlignment: 50,
        writerAlignment: 50,
        compassion: 50
      },
      flags: {},
      seenNodes: [startNodeId],
      currentChapter: 1
    })
  }

  if (!currentNode) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading story...</p>
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
    <div className="min-h-screen bg-background py-8 md:py-16 px-4">
      <ProgressBar current={state.currentChapter} total={totalChapters} />

      <div className="max-w-3xl mx-auto">
        <div className="glass rounded-2xl p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/30">
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

          {/* Alignment indicators */}
          {!currentNode.isEnding && (
            <div className="flex gap-6 mb-8">
              <AlignmentIndicator
                type="painter"
                score={state.stats.painterAlignment}
                label="Painter"
              />
              <AlignmentIndicator
                type="writer"
                score={state.stats.writerAlignment}
                label="Writer"
              />
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
            <div className="space-y-3 pt-8 border-t border-border/30">
              <Link
                href={`/stories/${routeId}`}
                className="block w-full text-center glass p-4 rounded-lg hover:bg-card/70 transition-all text-primary uppercase tracking-wider text-sm"
              >
                Return to Route
              </Link>
              <button
                onClick={handleRestart}
                className="w-full glass p-4 rounded-lg hover:bg-card/70 transition-all text-foreground uppercase tracking-wider text-sm"
              >
                Restart from Beginning
              </button>
              <Link
                href="/endings"
                className="block w-full text-center glass p-4 rounded-lg hover:bg-card/70 transition-all text-accent uppercase tracking-wider text-sm"
              >
                View All Endings
              </Link>
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
