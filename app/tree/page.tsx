'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Download, GitBranch, Eye, EyeOff } from 'lucide-react'
import { loadStoryState } from '@/lib/story/persistence'
import EnhancedBackground from '@/components/enhanced-background'
import NavigationSidebar from '@/components/navigation-sidebar'
import { StoryNode, StoryRouteId } from '@/lib/story/types'

interface TreeNode extends StoryNode {
  x: number
  y: number
  visited: boolean
  onPath: boolean
}

export default function DecisionTreePage() {
  const [selectedRoute, setSelectedRoute] = useState<StoryRouteId>('verso')
  const [nodes, setNodes] = useState<TreeNode[]>([])
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(null)
  const [showUnvisited, setShowUnvisited] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    loadTreeData(selectedRoute)
  }, [selectedRoute])

  const loadTreeData = async (routeId: StoryRouteId) => {
    try {
      // Load the story data
      const response = await fetch(`/data/stories/${routeId}.json`)
      const storyData = await response.json()

      // Load player's state
      const state = loadStoryState(routeId, storyData.startNodeId)

      // Build tree structure with positioning
      const treeNodes: TreeNode[] = storyData.nodes.map((node: StoryNode, index: number) => {
        const visited = state.seenNodes.includes(node.id)
        const onPath = state.choiceHistory.some(h => h.nodeId === node.id)

        // Simple layout: chapters vertically, nodes horizontally within chapters
        const nodesInChapter = storyData.nodes.filter((n: StoryNode) => n.chapter === node.chapter)
        const indexInChapter = nodesInChapter.findIndex((n: StoryNode) => n.id === node.id)

        return {
          ...node,
          x: indexInChapter * 200 + 100,
          y: (node.chapter - 1) * 150 + 100,
          visited,
          onPath
        }
      })

      setNodes(treeNodes)
    } catch (error) {
      console.error('Error loading tree data:', error)
    }
  }

  const getIncomingChoices = (nodeId: string) => {
    const incoming: { fromNode: TreeNode; choice: string }[] = []

    nodes.forEach(node => {
      node.choices.forEach(choice => {
        if (choice.nextId === nodeId) {
          incoming.push({
            fromNode: node,
            choice: choice.label
          })
        }
      })
    })

    return incoming
  }

  const handleExportTree = () => {
    // Simple export - could be enhanced with actual image generation
    const pathData = nodes.filter(n => n.onPath).map(n => ({
      title: n.title,
      chapter: n.chapter,
      id: n.id
    }))

    const dataStr = JSON.stringify(pathData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${selectedRoute}-tree-path.json`
    link.click()
  }

  const filteredNodes = showUnvisited ? nodes : nodes.filter(n => n.visited)

  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <EnhancedBackground />
      <NavigationSidebar />
      <div className="relative z-10">
        {/* Header */}
        <header className="glass sticky top-0 z-20 border-b border-border/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <ArrowLeft size={24} />
                </Link>
                <div>
                  <h1 className="text-2xl font-light text-foreground flex items-center gap-2">
                    <GitBranch size={24} className="text-primary" />
                    Decision Tree
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Visualize your journey through the fractured paths
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowUnvisited(!showUnvisited)}
                  className="flex items-center gap-2 glass px-3 py-1.5 rounded text-sm hover:bg-card/70 transition-all"
                >
                  {showUnvisited ? <Eye size={16} /> : <EyeOff size={16} />}
                  <span className="hidden sm:inline">
                    {showUnvisited ? 'Hide Unvisited' : 'Show All'}
                  </span>
                </button>
                <button
                  onClick={handleExportTree}
                  className="flex items-center gap-2 glass px-3 py-1.5 rounded text-sm hover:bg-card/70 transition-all"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Export Path</span>
                </button>
              </div>
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

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Tree Visualization */}
            <div className="md:col-span-2">
              <div className="glass rounded-xl p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h2 className="text-lg font-light text-foreground">Story Structure</h2>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <span className="text-muted-foreground">On Path</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-accent/50"></div>
                      <span className="text-muted-foreground">Visited</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-muted"></div>
                      <span className="text-muted-foreground">Unvisited</span>
                    </div>
                  </div>
                </div>

                {/* Simple List View (can be enhanced with actual tree visualization) */}
                <div className="space-y-6">
                  {Array.from(new Set(filteredNodes.map(n => n.chapter))).sort().map(chapter => (
                    <div key={chapter}>
                      <h3 className="text-sm text-muted-foreground uppercase tracking-wide mb-3">
                        Chapter {chapter}
                      </h3>
                      <div className="grid gap-2">
                        {filteredNodes
                          .filter(n => n.chapter === chapter)
                          .map(node => (
                            <button
                              key={node.id}
                              onClick={() => setSelectedNode(node)}
                              className={`text-left p-3 rounded-lg border transition-all ${
                                selectedNode?.id === node.id
                                  ? 'border-primary bg-primary/10'
                                  : node.onPath
                                  ? 'border-primary/50 bg-primary/5'
                                  : node.visited
                                  ? 'border-accent/50 bg-accent/5'
                                  : 'border-border/30 bg-muted/20'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-2 h-2 rounded-full ${
                                    node.onPath
                                      ? 'bg-primary'
                                      : node.visited
                                      ? 'bg-accent/50'
                                      : 'bg-muted'
                                  }`}
                                ></div>
                                <span className="text-sm font-light">
                                  {node.title || node.id}
                                </span>
                                {node.isEnding && (
                                  <span className="text-xs text-primary ml-auto">Ending</span>
                                )}
                              </div>
                            </button>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Node Details */}
            <div className="md:col-span-1">
              <div className="glass rounded-xl p-6 sticky top-24">
                {selectedNode ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-light text-foreground mb-1">
                        {selectedNode.title || selectedNode.id}
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Chapter {selectedNode.chapter}
                        {selectedNode.isEnding && ' • Ending'}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/30">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            selectedNode.onPath
                              ? 'bg-primary'
                              : selectedNode.visited
                              ? 'bg-accent/50'
                              : 'bg-muted'
                          }`}
                        ></div>
                        <span className="text-sm text-muted-foreground">
                          {selectedNode.onPath
                            ? 'On your path'
                            : selectedNode.visited
                            ? 'Visited'
                            : 'Not visited'}
                        </span>
                      </div>
                    </div>

                    {/* Incoming Choices */}
                    <div className="pt-4 border-t border-border/30">
                      <h4 className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                        How to reach this node:
                      </h4>
                      {getIncomingChoices(selectedNode.id).length > 0 ? (
                        <div className="space-y-2">
                          {getIncomingChoices(selectedNode.id).map((incoming, idx) => (
                            <div key={idx} className="text-sm">
                              <p className="text-muted-foreground text-xs mb-1">
                                From: {incoming.fromNode.title || incoming.fromNode.id}
                              </p>
                              <p className="text-foreground">"{incoming.choice}"</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground italic">
                          Starting node
                        </p>
                      )}
                    </div>

                    {/* Outgoing Choices */}
                    {selectedNode.choices.length > 0 && (
                      <div className="pt-4 border-t border-border/30">
                        <h4 className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                          Available Choices: ({selectedNode.choices.length})
                        </h4>
                        <div className="space-y-1">
                          {selectedNode.choices.map((choice, idx) => (
                            <p key={idx} className="text-sm text-foreground">
                              • {choice.label}
                            </p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Preview Text */}
                    <div className="pt-4 border-t border-border/30">
                      <h4 className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                        Preview
                      </h4>
                      <p className="text-sm text-foreground line-clamp-6">
                        {selectedNode.text}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    <GitBranch size={48} className="mx-auto mb-4 opacity-50" />
                    <p className="text-sm">Select a node to view details</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
