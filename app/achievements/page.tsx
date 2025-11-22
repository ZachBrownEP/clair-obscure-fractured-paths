'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronLeft, Lock, CheckCircle, Trophy, Sparkles } from 'lucide-react'
import { getAllAchievementsWithProgress, Achievement } from '@/lib/story/persistence'
import NavigationDropdown from '@/components/navigation-dropdown'
import PageHeader from '@/components/page-header'
import SpoilerWarning from '@/components/spoiler-warning'
import Expedition33Recap from '@/components/expedition-33-recap'
import EnhancedBackground from '@/components/enhanced-background'

type AchievementCategory = 'all' | 'completion' | 'exploration' | 'alignment' | 'speed' | 'secret'

export default function AchievementsPage() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [selectedCategory, setSelectedCategory] = useState<AchievementCategory>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadAchievements = () => {
      const allAchievements = getAllAchievementsWithProgress()
      setAchievements(allAchievements)
      setIsLoading(false)
    }

    loadAchievements()
  }, [])

  const filteredAchievements = achievements.filter(achievement => {
    if (selectedCategory === 'all') return true
    return achievement.category === selectedCategory
  })

  const unlockedCount = achievements.filter(a => a.unlockedAt).length
  const totalCount = achievements.length

  const categories: { value: AchievementCategory; label: string; icon: string }[] = [
    { value: 'all', label: 'All', icon: '🏆' },
    { value: 'completion', label: 'Completion', icon: '👑' },
    { value: 'exploration', label: 'Exploration', icon: '🗺️' },
    { value: 'alignment', label: 'Alignment', icon: '⚖️' },
    { value: 'speed', label: 'Speed', icon: '⚡' },
    { value: 'secret', label: 'Secret', icon: '✨' }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'completion':
        return 'text-yellow-500 border-yellow-500/20 bg-yellow-500/5'
      case 'exploration':
        return 'text-blue-500 border-blue-500/20 bg-blue-500/5'
      case 'alignment':
        return 'text-purple-500 border-purple-500/20 bg-purple-500/5'
      case 'speed':
        return 'text-green-500 border-green-500/20 bg-green-500/5'
      case 'secret':
        return 'text-pink-500 border-pink-500/20 bg-pink-500/5'
      default:
        return 'text-muted-foreground border-border/20 bg-muted/5'
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <EnhancedBackground />
      <NavigationDropdown />
      <main className="max-w-6xl mx-auto px-4 md:px-8 py-16 relative z-10">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-8"
        >
          <ChevronLeft size={18} />
          Back to Dashboard
        </Link>

        <PageHeader
          subtitle="Clair Obscur"
          title="Achievements"
          description="Track your accomplishments and milestones throughout your journey"
        />

        <SpoilerWarning />

        <div className="mb-8">
          <Expedition33Recap />
        </div>

        <div className="mb-12">
          <div className="glass inline-block px-6 py-3 rounded-lg">
            <span className="text-sm text-muted-foreground">
              Unlocked:{' '}
              <span className="text-primary font-light text-lg">
                {isLoading ? '...' : `${unlockedCount}/${totalCount}`}
              </span>
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map(category => {
            const categoryAchievements = category.value === 'all'
              ? achievements
              : achievements.filter(a => a.category === category.value)
            const categoryUnlocked = categoryAchievements.filter(a => a.unlockedAt).length

            return (
              <button
                key={category.value}
                onClick={() => setSelectedCategory(category.value)}
                className={`glass px-4 py-2 rounded-lg transition-all text-sm flex items-center gap-2 ${
                  selectedCategory === category.value
                    ? 'bg-primary/10 border-primary/30 text-primary'
                    : 'hover:bg-card/70 text-muted-foreground'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.label}</span>
                {!isLoading && (
                  <span className="text-xs opacity-70">
                    ({categoryUnlocked}/{categoryAchievements.length})
                  </span>
                )}
              </button>
            )
          })}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredAchievements.map(achievement => {
            const isUnlocked = !!achievement.unlockedAt
            const hasProgress = achievement.maxProgress && achievement.maxProgress > 0
            const progress = achievement.progress || 0
            const progressPercent = hasProgress
              ? Math.round((progress / achievement.maxProgress!) * 100)
              : 0

            return (
              <div
                key={achievement.id}
                className={`glass rounded-xl p-6 transition-all ${
                  isUnlocked
                    ? 'border-primary/20 hover:bg-card/70'
                    : 'opacity-60'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className={`text-4xl ${isUnlocked ? '' : 'grayscale opacity-50'}`}>
                      {achievement.icon || '🏆'}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl font-light text-foreground">
                        {isUnlocked ? achievement.title : '???'}
                      </h3>
                      {isUnlocked && (
                        <CheckCircle size={20} className="text-primary flex-shrink-0 mt-1" />
                      )}
                      {!isUnlocked && (
                        <Lock size={20} className="text-muted-foreground flex-shrink-0 mt-1" />
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                      {isUnlocked
                        ? achievement.description
                        : 'Continue your journey to unlock this achievement.'}
                    </p>

                    {/* Category Badge */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`inline-block px-2 py-1 rounded text-xs border ${getCategoryColor(achievement.category)}`}>
                        {achievement.category.charAt(0).toUpperCase() + achievement.category.slice(1)}
                      </span>
                    </div>

                    {/* Progress Bar (if applicable) */}
                    {hasProgress && (
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <span>Progress</span>
                          <span>
                            {progress}/{achievement.maxProgress}
                          </span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Unlock Date */}
                    {isUnlocked && achievement.unlockedAt && (
                      <p className="text-xs text-muted-foreground mt-3">
                        Unlocked on {new Date(achievement.unlockedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Empty State */}
        {filteredAchievements.length === 0 && !isLoading && (
          <div className="glass rounded-xl p-12 text-center">
            <Sparkles className="mx-auto text-muted-foreground mb-4" size={48} />
            <p className="text-muted-foreground">
              No achievements in this category yet.
            </p>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12 glass rounded-lg p-6">
          <p className="text-sm text-muted-foreground leading-relaxed">
            <strong className="text-foreground">About Achievements:</strong> Achievements are
            automatically unlocked as you explore the fractured paths. Some track your progress
            over time, while others unlock when you reach specific milestones or endings. Keep
            playing to discover them all!
          </p>
        </div>

        {/* Stats Summary */}
        {unlockedCount > 0 && (
          <div className="mt-8 grid grid-cols-2 md:grid-cols-5 gap-4">
            {categories.slice(1).map(category => {
              const categoryAchievements = achievements.filter(a => a.category === category.value)
              const categoryUnlocked = categoryAchievements.filter(a => a.unlockedAt).length
              const percentage = categoryAchievements.length > 0
                ? Math.round((categoryUnlocked / categoryAchievements.length) * 100)
                : 0

              return (
                <div key={category.value} className="glass rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">{category.icon}</div>
                  <div className="text-sm text-muted-foreground mb-1">{category.label}</div>
                  <div className="text-xl font-light text-primary">
                    {percentage}%
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {categoryUnlocked}/{categoryAchievements.length}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
    </div>
  )
}
