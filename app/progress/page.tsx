'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, BarChart3, Trophy, History, BookOpen } from 'lucide-react'
import { loadStoryState, loadUnlockedEndings, getAllAchievementsWithProgress } from '@/lib/story/persistence'
import EnhancedBackground from '@/components/enhanced-background'
import NavigationSidebar from '@/components/navigation-sidebar'
import PageHeader from '@/components/page-header'
import SpoilerWarning from '@/components/spoiler-warning'
import Expedition33Recap from '@/components/expedition-33-recap'

export default function ProgressPage() {
  const [stats, setStats] = useState({
    totalChoices: 0,
    versoChoices: 0,
    maelleChoices: 0,
    totalEndings: 0,
    versoEndings: 0,
    maelleEndings: 0,
    unlockedAchievements: 0,
    totalAchievements: 0,
    totalNodesVisited: 0
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    loadStats()
  }, [])

  const loadStats = () => {
    try {
      // Load story states
      const versoState = loadStoryState('verso', 'v_start')
      const maelleState = loadStoryState('maelle', 'm_start')

      // Load endings
      const allEndings = loadUnlockedEndings()
      const versoEndingsCount = allEndings.filter(e => e.route === 'verso').length
      const maelleEndingsCount = allEndings.filter(e => e.route === 'maelle').length

      // Load achievements
      const achievements = getAllAchievementsWithProgress()
      const unlockedCount = achievements.filter(a => a.unlockedAt).length

      // Calculate stats
      setStats({
        totalChoices: (versoState.choiceHistory?.length || 0) + (maelleState.choiceHistory?.length || 0),
        versoChoices: versoState.choiceHistory?.length || 0,
        maelleChoices: maelleState.choiceHistory?.length || 0,
        totalEndings: allEndings.length,
        versoEndings: versoEndingsCount,
        maelleEndings: maelleEndingsCount,
        unlockedAchievements: unlockedCount,
        totalAchievements: achievements.length,
        totalNodesVisited: versoState.seenNodes.length + maelleState.seenNodes.length
      })
    } catch (error) {
      console.error('Error loading stats:', error)
    }
  }

  const getCompletionPercentage = () => {
    // 50 total endings possible
    return Math.round((stats.totalEndings / 50) * 100)
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <EnhancedBackground />
      <NavigationSidebar />
      <div className="relative z-10 pt-20">
        {/* Header */}
        <header className="glass sticky top-20 z-20 border-b border-border/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft size={24} />
              </Link>
              <div>
                <h1 className="text-2xl font-light text-foreground flex items-center gap-2">
                  <BarChart3 size={24} className="text-primary" />
                  Your Progress
                </h1>
                <p className="text-sm text-muted-foreground">
                  Track your journey through the fractured paths
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
          {/* Spoiler Warning */}
          <SpoilerWarning />

          {/* Expedition 33 Recap */}
          <div className="mb-8">
            <Expedition33Recap />
          </div>
          {/* Overall Completion */}
          <div className="glass rounded-xl p-8 mb-8 text-center">
            <h2 className="text-3xl font-light text-foreground mb-2">Overall Completion</h2>
            <div className="text-6xl font-light text-primary mb-2">
              {getCompletionPercentage()}%
            </div>
            <p className="text-muted-foreground">
              {stats.totalEndings} of 50 endings unlocked
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {/* Choices Made */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <History size={24} className="text-primary" />
                <h3 className="text-xl font-light text-foreground">Choices Made</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-3xl font-light text-primary mb-1">{stats.totalChoices}</div>
                  <div className="text-sm text-muted-foreground">Total Decisions</div>
                </div>
                <div className="pt-3 border-t border-border/30">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Verso</span>
                    <span className="text-foreground">{stats.versoChoices}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Maelle</span>
                    <span className="text-foreground">{stats.maelleChoices}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Endings Unlocked */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy size={24} className="text-primary" />
                <h3 className="text-xl font-light text-foreground">Endings Unlocked</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-3xl font-light text-primary mb-1">{stats.totalEndings}</div>
                  <div className="text-sm text-muted-foreground">Out of 50</div>
                </div>
                <div className="pt-3 border-t border-border/30">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-muted-foreground">Verso</span>
                    <span className="text-foreground">{stats.versoEndings} / 25</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Maelle</span>
                    <span className="text-foreground">{stats.maelleEndings} / 25</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="glass rounded-xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <Trophy size={24} className="text-primary" />
                <h3 className="text-xl font-light text-foreground">Achievements</h3>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="text-3xl font-light text-primary mb-1">{stats.unlockedAchievements}</div>
                  <div className="text-sm text-muted-foreground">Out of {stats.totalAchievements}</div>
                </div>
                <div className="pt-3 border-t border-border/30">
                  <div className="w-full bg-muted/30 rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${(stats.unlockedAchievements / stats.totalAchievements) * 100}%` }}
                    />
                  </div>
                  <div className="text-center text-sm text-muted-foreground mt-2">
                    {Math.round((stats.unlockedAchievements / stats.totalAchievements) * 100)}% Complete
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Exploration */}
          <div className="glass rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen size={24} className="text-primary" />
              <h3 className="text-xl font-light text-foreground">Exploration</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="text-3xl font-light text-primary mb-1">{stats.totalNodesVisited}</div>
                <div className="text-sm text-muted-foreground">Unique Nodes Visited</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-2">Journey Status</div>
                <div className="space-y-1 text-sm">
                  {stats.versoChoices > 0 && (
                    <div className="text-foreground">✓ Started Verso's Story</div>
                  )}
                  {stats.maelleChoices > 0 && (
                    <div className="text-foreground">✓ Started Maelle's Story</div>
                  )}
                  {stats.totalEndings === 0 && (
                    <div className="text-muted-foreground">No endings reached yet</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <Link href="/history" className="glass p-4 rounded-lg hover:bg-card/70 transition-all text-center">
              <History size={20} className="mx-auto mb-2 text-primary" />
              <div className="text-sm font-light">View Choice History</div>
            </Link>
            <Link href="/achievements" className="glass p-4 rounded-lg hover:bg-card/70 transition-all text-center">
              <Trophy size={20} className="mx-auto mb-2 text-primary" />
              <div className="text-sm font-light">View Achievements</div>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}
