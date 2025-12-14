'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, GitMerge, Plus, Trash2, Play, Eye } from 'lucide-react'
import {
  loadTimelines,
  getMainTimeline,
  createTimeline,
  deleteTimeline,
  Timeline,
  loadStoryState
} from '@/lib/story/persistence'
import { StoryRouteId } from '@/lib/story/types'
import EnhancedBackground from '@/components/enhanced-background'
import { toast } from 'sonner'
import SmartBackButton from '@/components/smart-back-button'

export default function TimelinesPage() {
  const [selectedRoute, setSelectedRoute] = useState<StoryRouteId>('verso')
  const [timelines, setTimelines] = useState<Timeline[]>([])
  const [mainTimeline, setMainTimeline] = useState<Timeline | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newTimelineName, setNewTimelineName] = useState('')

  useEffect(() => {
    setIsClient(true)
    loadRouteTimelines(selectedRoute)
  }, [selectedRoute])

  const loadRouteTimelines = (route: StoryRouteId) => {
    const main = getMainTimeline(route)
    const alternates = loadTimelines(route)

    setMainTimeline(main)
    setTimelines(alternates)
  }

  const handleCreateTimeline = () => {
    if (!mainTimeline || !newTimelineName.trim()) return

    createTimeline(
      selectedRoute,
      mainTimeline.state,
      newTimelineName,
      mainTimeline.state.currentNodeId
    )

    setNewTimelineName('')
    setShowCreateModal(false)
    loadRouteTimelines(selectedRoute)
    toast.success('Timeline Created', {
      description: `"${newTimelineName}" is ready to explore`
    })
  }

  const handleDeleteTimeline = (id: string) => {
    deleteTimeline(selectedRoute, id)
    loadRouteTimelines(selectedRoute)
    toast.success('Timeline Deleted')
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

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
                    <GitMerge size={24} className="text-primary" />
                    What If Mode
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Explore alternate timelines without losing your main progress
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 glass px-4 py-2 rounded hover:bg-card/70 transition-all text-primary"
              >
                <Plus size={18} />
                <span className="hidden sm:inline">New Timeline</span>
              </button>
            </div>

            {/* Route Selector */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setSelectedRoute('verso')}
                className={`px-4 py-2 rounded text-sm transition-all ${
                  selectedRoute === 'verso'
                    ? 'bg-primary/20 text-primary border border-primary/50'
                    : 'glass hover:bg-card/70'
                }`}
              >
                Verso's Story
              </button>
              <button
                onClick={() => setSelectedRoute('maelle')}
                className={`px-4 py-2 rounded text-sm transition-all ${
                  selectedRoute === 'maelle'
                    ? 'bg-primary/20 text-primary border border-primary/50'
                    : 'glass hover:bg-card/70'
                }`}
              >
                Maelle's Story
              </button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
          {/* Info Card */}
          <div className="glass rounded-xl p-6 mb-8 border border-primary/30">
            <h2 className="text-lg font-light text-foreground mb-2 flex items-center gap-2">
              <GitMerge size={20} className="text-primary" />
              How What If Mode Works
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Create alternate timelines to explore different story paths without affecting your main playthrough.
              Each timeline is a separate save that branches from your current progress, allowing you to
              experiment with different choices and see how the story unfolds.
            </p>
          </div>

          {/* Main Timeline */}
          {mainTimeline && (
            <div className="mb-8">
              <h2 className="text-xl font-light text-foreground mb-4">Main Timeline</h2>
              <div className="glass rounded-xl p-6 border-2 border-primary/50">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-light text-primary mb-1">
                      {mainTimeline.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your primary story progression
                    </p>
                  </div>
                  <Link
                    href={`/stories/${selectedRoute}/play`}
                    className="flex items-center gap-2 glass px-4 py-2 rounded hover:bg-primary/10 transition-all text-primary"
                  >
                    <Play size={16} />
                    Continue
                  </Link>
                </div>

                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Chapter
                    </div>
                    <div className="text-lg font-light text-foreground">
                      {mainTimeline.state.currentChapter}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Choices Made
                    </div>
                    <div className="text-lg font-light text-foreground">
                      {mainTimeline.state.choiceHistory.length}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                      Nodes Visited
                    </div>
                    <div className="text-lg font-light text-foreground">
                      {mainTimeline.state.seenNodes.length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Alternate Timelines */}
          <div>
            <h2 className="text-xl font-light text-foreground mb-4">
              Alternate Timelines ({timelines.length})
            </h2>

            {timelines.length === 0 ? (
              <div className="glass rounded-xl p-12 text-center">
                <GitMerge size={48} className="mx-auto text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-light text-foreground mb-2">
                  No Alternate Timelines Yet
                </h3>
                <p className="text-sm text-muted-foreground mb-6 max-w-md mx-auto">
                  Create a new timeline to explore different story paths without affecting your main playthrough.
                </p>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="inline-flex items-center gap-2 glass px-6 py-2 rounded-lg hover:bg-card/70 transition-all text-primary"
                >
                  <Plus size={18} />
                  Create Your First Timeline
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {timelines.map((timeline) => (
                  <div
                    key={timeline.id}
                    className="glass rounded-xl p-6 hover:bg-card/70 transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-light text-foreground mb-1">
                          {timeline.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Created {formatDate(timeline.createdAt)}
                          {timeline.branchedFrom && ` • Branched from node ${timeline.branchedFrom}`}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Link
                          href={`/stories/${selectedRoute}/play?timeline=${timeline.id}`}
                          className="flex items-center gap-2 glass px-3 py-1.5 rounded hover:bg-primary/10 transition-all text-primary text-sm"
                        >
                          <Play size={14} />
                          Play
                        </Link>
                        <button
                          onClick={() => handleDeleteTimeline(timeline.id)}
                          className="p-2 rounded hover:bg-destructive/20 transition-colors text-muted-foreground hover:text-destructive"
                          title="Delete timeline"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border/30">
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Chapter
                        </div>
                        <div className="text-sm font-light text-foreground">
                          {timeline.state.currentChapter}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Choices
                        </div>
                        <div className="text-sm font-light text-foreground">
                          {timeline.state.choiceHistory.length}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Painter
                        </div>
                        <div className="text-sm font-light text-primary">
                          {timeline.state.stats.painterAlignment}
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                          Writer
                        </div>
                        <div className="text-sm font-light text-accent">
                          {timeline.state.stats.writerAlignment}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Create Timeline Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="glass rounded-xl p-6 max-w-md w-full border border-primary/30">
              <h2 className="text-xl font-light text-foreground mb-4">
                Create New Timeline
              </h2>
              <p className="text-sm text-muted-foreground mb-4">
                Give your alternate timeline a name. It will start from your current progress in the main timeline.
              </p>
              <input
                type="text"
                value={newTimelineName}
                onChange={(e) => setNewTimelineName(e.target.value)}
                placeholder="Timeline name (e.g., 'Painter Path', 'Different Ending')"
                className="w-full glass p-3 rounded border border-border/30 focus:outline-none focus:ring-2 focus:ring-primary/50 mb-4"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateTimeline()}
              />
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCreateTimeline}
                  disabled={!newTimelineName.trim()}
                  className="flex-1 bg-primary/20 text-primary px-4 py-2 rounded hover:bg-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Create Timeline
                </button>
                <button
                  onClick={() => {
                    setShowCreateModal(false)
                    setNewTimelineName('')
                  }}
                  className="px-4 py-2 rounded hover:bg-muted/50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
