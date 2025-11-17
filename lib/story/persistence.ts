// Story progress persistence utilities for Clair Obscur: Fractured Paths
// Handles localStorage with SSR-safe access

import { StoryState, StoryRouteId } from './types'

// Ending unlock tracking
export interface EndingUnlock {
  route: StoryRouteId
  endingKey: string
  unlockedAt: string // ISO timestamp
}

// Storage keys
const STORAGE_PREFIX = 'fractured_paths_'
const getRouteKey = (routeId: StoryRouteId) => `${STORAGE_PREFIX}route_${routeId}`
const ENDINGS_KEY = `${STORAGE_PREFIX}endings`

// SSR-safe localStorage access
const isClient = typeof window !== 'undefined'

// Get initial state for a route
export function getInitialState(routeId: StoryRouteId, startNodeId: string): StoryState {
  return {
    routeId,
    currentNodeId: startNodeId,
    stats: {
      painterAlignment: 0,
      writerAlignment: 0,
      balance: 0
    },
    flags: {},
    seenNodes: [startNodeId],
    currentChapter: 1,
    choiceHistory: [],
    startTime: Date.now()
  }
}

// Load story state from localStorage
export function loadStoryState(routeId: StoryRouteId, startNodeId: string): StoryState {
  if (!isClient) {
    return getInitialState(routeId, startNodeId)
  }

  try {
    const saved = localStorage.getItem(getRouteKey(routeId))
    if (!saved) {
      return getInitialState(routeId, startNodeId)
    }

    const parsed = JSON.parse(saved) as StoryState

    // Validate that parsed state has expected structure
    if (
      parsed.routeId === routeId &&
      parsed.currentNodeId &&
      parsed.stats &&
      typeof parsed.stats.painterAlignment === 'number' &&
      typeof parsed.stats.writerAlignment === 'number' &&
      typeof parsed.stats.balance === 'number' &&
      parsed.flags &&
      Array.isArray(parsed.seenNodes)
    ) {
      // Add default values for new fields if missing (backwards compatibility)
      if (!Array.isArray(parsed.choiceHistory)) {
        parsed.choiceHistory = []
      }
      if (!parsed.startTime) {
        parsed.startTime = Date.now()
      }
      return parsed
    }

    // If validation fails, return initial state
    console.warn('Invalid saved state format, using initial state')
    return getInitialState(routeId, startNodeId)
  } catch (error) {
    console.error('Error loading story state:', error)
    return getInitialState(routeId, startNodeId)
  }
}

// Save story state to localStorage
export function saveStoryState(state: StoryState): void {
  if (!isClient) return

  try {
    localStorage.setItem(getRouteKey(state.routeId), JSON.stringify(state))
  } catch (error) {
    console.error('Error saving story state:', error)
  }
}

// Clear saved state for a route (for restart)
export function clearStoryState(routeId: StoryRouteId): void {
  if (!isClient) return

  try {
    localStorage.removeItem(getRouteKey(routeId))
  } catch (error) {
    console.error('Error clearing story state:', error)
  }
}

// Check if there's saved progress for a route
export function hasSavedProgress(routeId: StoryRouteId): boolean {
  if (!isClient) return false

  try {
    return localStorage.getItem(getRouteKey(routeId)) !== null
  } catch (error) {
    return false
  }
}

// === Ending Unlock Tracking ===

// Load all unlocked endings
export function loadUnlockedEndings(): EndingUnlock[] {
  if (!isClient) return []

  try {
    const saved = localStorage.getItem(ENDINGS_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    if (Array.isArray(parsed)) {
      return parsed as EndingUnlock[]
    }

    return []
  } catch (error) {
    console.error('Error loading unlocked endings:', error)
    return []
  }
}

// Save unlocked endings
function saveUnlockedEndings(endings: EndingUnlock[]): void {
  if (!isClient) return

  try {
    localStorage.setItem(ENDINGS_KEY, JSON.stringify(endings))
  } catch (error) {
    console.error('Error saving unlocked endings:', error)
  }
}

// Unlock an ending (idempotent - won't create duplicates)
export function unlockEnding(route: StoryRouteId, endingKey: string): void {
  if (!isClient) return

  try {
    const current = loadUnlockedEndings()

    // Check if already unlocked
    const exists = current.some(
      e => e.route === route && e.endingKey === endingKey
    )

    if (!exists) {
      const newEnding: EndingUnlock = {
        route,
        endingKey,
        unlockedAt: new Date().toISOString()
      }

      saveUnlockedEndings([...current, newEnding])
    }
  } catch (error) {
    console.error('Error unlocking ending:', error)
  }
}

// Check if a specific ending is unlocked
export function isEndingUnlocked(route: StoryRouteId, endingKey: string): boolean {
  if (!isClient) return false

  const endings = loadUnlockedEndings()
  return endings.some(e => e.route === route && e.endingKey === endingKey)
}

// Get all unlocked endings for a specific route
export function getRouteUnlockedEndings(route: StoryRouteId): EndingUnlock[] {
  const all = loadUnlockedEndings()
  return all.filter(e => e.route === route)
}

// Get total count of unlocked endings
export function getUnlockedEndingsCount(): number {
  return loadUnlockedEndings().length
}

// Clear all endings (for debugging/reset)
export function clearAllEndings(): void {
  if (!isClient) return

  try {
    localStorage.removeItem(ENDINGS_KEY)
  } catch (error) {
    console.error('Error clearing endings:', error)
  }
}

// === Achievements System ===

export interface Achievement {
  id: string
  title: string
  description: string
  category: 'completion' | 'exploration' | 'alignment' | 'speed' | 'secret'
  icon?: string
  unlockedAt?: string // ISO timestamp
  progress?: number // 0-100 for achievements with progress
  maxProgress?: number // For "X out of Y" achievements
}

const ACHIEVEMENTS_KEY = `${STORAGE_PREFIX}achievements`

// Define all possible achievements
export const ALL_ACHIEVEMENTS: Achievement[] = [
  // Completion Achievements
  {
    id: 'verso_completionist',
    title: 'Canvas Master',
    description: 'Unlock all 25 endings for Verso',
    category: 'completion',
    icon: '🎨',
    maxProgress: 25
  },
  {
    id: 'maelle_completionist',
    title: 'Archive Keeper',
    description: 'Unlock all 25 endings for Maelle',
    category: 'completion',
    icon: '📖',
    maxProgress: 25
  },
  {
    id: 'true_completionist',
    title: 'Fractured Paths Master',
    description: 'Unlock all 50 endings across both characters',
    category: 'completion',
    icon: '👑',
    maxProgress: 50
  },

  // Exploration Achievements
  {
    id: 'explorer_50',
    title: 'Curious Explorer',
    description: 'Visit 50 unique story nodes',
    category: 'exploration',
    icon: '🔍',
    maxProgress: 50
  },
  {
    id: 'explorer_100',
    title: 'Dedicated Seeker',
    description: 'Visit 100 unique story nodes',
    category: 'exploration',
    icon: '🗺️',
    maxProgress: 100
  },
  {
    id: 'explorer_200',
    title: 'Path Master',
    description: 'Visit 200 unique story nodes',
    category: 'exploration',
    icon: '🌟',
    maxProgress: 200
  },

  // Alignment Achievements
  {
    id: 'balanced',
    title: 'The Balanced',
    description: 'Reach an ending with all three alignments within 15 points of each other',
    category: 'alignment',
    icon: '⚖️'
  },
  {
    id: 'pure_painter',
    title: 'Pure Painter',
    description: 'Reach an ending with Painter Alignment at 90+',
    category: 'alignment',
    icon: '🖌️'
  },
  {
    id: 'pure_writer',
    title: 'Pure Writer',
    description: 'Reach an ending with Writer Alignment at 90+',
    category: 'alignment',
    icon: '✒️'
  },
  {
    id: 'balanced_soul',
    title: 'Balanced Soul',
    description: 'Reach an ending with Balance at 90+',
    category: 'alignment',
    icon: '⚖️'
  },

  // Speed Achievements
  {
    id: 'speed_reader',
    title: 'Speed Reader',
    description: 'Complete a story in under 30 minutes',
    category: 'speed',
    icon: '⚡'
  },
  {
    id: 'marathon_reader',
    title: 'Marathon Reader',
    description: 'Spend more than 2 hours in a single playthrough',
    category: 'speed',
    icon: '📚'
  },

  // Secret Achievements
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Begin your first story',
    category: 'secret',
    icon: '👣'
  },
  {
    id: 'first_ending',
    title: 'Path\'s End',
    description: 'Reach your first ending',
    category: 'secret',
    icon: '🏁'
  },
  {
    id: 'both_paths',
    title: 'Dual Perspective',
    description: 'Complete stories for both Verso and Maelle',
    category: 'secret',
    icon: '🔄'
  }
]

// Load unlocked achievements
export function loadAchievements(): Achievement[] {
  if (!isClient) return []

  try {
    const saved = localStorage.getItem(ACHIEVEMENTS_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    if (Array.isArray(parsed)) {
      return parsed as Achievement[]
    }

    return []
  } catch (error) {
    console.error('Error loading achievements:', error)
    return []
  }
}

// Save achievements
function saveAchievements(achievements: Achievement[]): void {
  if (!isClient) return

  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements))
  } catch (error) {
    console.error('Error saving achievements:', error)
  }
}

// Unlock an achievement
export function unlockAchievement(achievementId: string): boolean {
  if (!isClient) return false

  try {
    const current = loadAchievements()

    // Check if already unlocked
    const exists = current.find(a => a.id === achievementId)
    if (exists && exists.unlockedAt) return false

    // Find achievement definition
    const definition = ALL_ACHIEVEMENTS.find(a => a.id === achievementId)
    if (!definition) return false

    // Add unlock timestamp
    const unlocked: Achievement = {
      ...definition,
      unlockedAt: new Date().toISOString()
    }

    // Remove old version if exists and add new
    const filtered = current.filter(a => a.id !== achievementId)
    saveAchievements([...filtered, unlocked])

    return true // Returns true if newly unlocked
  } catch (error) {
    console.error('Error unlocking achievement:', error)
    return false
  }
}

// Update achievement progress
export function updateAchievementProgress(achievementId: string, progress: number): void {
  if (!isClient) return

  try {
    const current = loadAchievements()
    const definition = ALL_ACHIEVEMENTS.find(a => a.id === achievementId)
    if (!definition || !definition.maxProgress) return

    // Find existing or create new
    let achievement = current.find(a => a.id === achievementId)
    if (!achievement) {
      achievement = { ...definition, progress: 0 }
    }

    // Update progress
    achievement.progress = Math.min(progress, definition.maxProgress)

    // Auto-unlock if reached max
    if (achievement.progress >= definition.maxProgress && !achievement.unlockedAt) {
      achievement.unlockedAt = new Date().toISOString()
    }

    // Save updated list
    const filtered = current.filter(a => a.id !== achievementId)
    saveAchievements([...filtered, achievement])
  } catch (error) {
    console.error('Error updating achievement progress:', error)
  }
}

// Check if achievement is unlocked
export function isAchievementUnlocked(achievementId: string): boolean {
  if (!isClient) return false

  const achievements = loadAchievements()
  const achievement = achievements.find(a => a.id === achievementId)
  return achievement ? !!achievement.unlockedAt : false
}

// Get achievement by ID with current progress
export function getAchievement(achievementId: string): Achievement | null {
  const saved = loadAchievements()
  const savedAchievement = saved.find(a => a.id === achievementId)
  const definition = ALL_ACHIEVEMENTS.find(a => a.id === achievementId)

  if (!definition) return null

  if (savedAchievement) {
    return savedAchievement
  }

  // Return definition with no progress if not started
  return { ...definition, progress: 0 }
}

// Get all achievements with current progress
export function getAllAchievementsWithProgress(): Achievement[] {
  const saved = loadAchievements()

  return ALL_ACHIEVEMENTS.map(definition => {
    const savedVersion = saved.find(a => a.id === definition.id)
    if (savedVersion) {
      return savedVersion
    }
    return { ...definition, progress: 0 }
  })
}

// Check and update achievements based on game state
export function checkAndUnlockAchievements(state: StoryState, isEnding: boolean = false): string[] {
  const newUnlocks: string[] = []

  // First steps
  if (state.seenNodes.length === 1 && !isAchievementUnlocked('first_steps')) {
    if (unlockAchievement('first_steps')) newUnlocks.push('first_steps')
  }

  // First ending
  if (isEnding && !isAchievementUnlocked('first_ending')) {
    if (unlockAchievement('first_ending')) newUnlocks.push('first_ending')
  }

  // Explorer achievements
  const uniqueNodes = state.seenNodes.length
  updateAchievementProgress('explorer_50', uniqueNodes)
  updateAchievementProgress('explorer_100', uniqueNodes)
  updateAchievementProgress('explorer_200', uniqueNodes)

  if (uniqueNodes >= 50 && !isAchievementUnlocked('explorer_50')) {
    if (unlockAchievement('explorer_50')) newUnlocks.push('explorer_50')
  }
  if (uniqueNodes >= 100 && !isAchievementUnlocked('explorer_100')) {
    if (unlockAchievement('explorer_100')) newUnlocks.push('explorer_100')
  }
  if (uniqueNodes >= 200 && !isAchievementUnlocked('explorer_200')) {
    if (unlockAchievement('explorer_200')) newUnlocks.push('explorer_200')
  }

  // Alignment achievements (only check at endings)
  if (isEnding) {
    const { painterAlignment, writerAlignment, balance } = state.stats

    // Balanced (all three stats within 15 points of each other)
    const maxStat = Math.max(painterAlignment, writerAlignment, balance)
    const minStat = Math.min(painterAlignment, writerAlignment, balance)
    const isBalanced = (maxStat - minStat) <= 15

    if (isBalanced && maxStat > 0) {
      if (unlockAchievement('balanced')) newUnlocks.push('balanced')
    }

    // Pure alignments
    if (painterAlignment >= 90 && !isAchievementUnlocked('pure_painter')) {
      if (unlockAchievement('pure_painter')) newUnlocks.push('pure_painter')
    }
    if (writerAlignment >= 90 && !isAchievementUnlocked('pure_writer')) {
      if (unlockAchievement('pure_writer')) newUnlocks.push('pure_writer')
    }
    if (balance >= 90 && !isAchievementUnlocked('balanced_soul')) {
      if (unlockAchievement('balanced_soul')) newUnlocks.push('balanced_soul')
    }

    // Speed achievements
    if (state.startTime) {
      const playTime = Date.now() - state.startTime
      const minutes = playTime / 1000 / 60

      if (minutes < 30 && !isAchievementUnlocked('speed_reader')) {
        if (unlockAchievement('speed_reader')) newUnlocks.push('speed_reader')
      }
      if (minutes > 120 && !isAchievementUnlocked('marathon_reader')) {
        if (unlockAchievement('marathon_reader')) newUnlocks.push('marathon_reader')
      }
    }

    // Completionist achievements
    const versoEndings = getRouteUnlockedEndings('verso')
    const maelleEndings = getRouteUnlockedEndings('maelle')
    const totalEndings = versoEndings.length + maelleEndings.length

    updateAchievementProgress('verso_completionist', versoEndings.length)
    updateAchievementProgress('maelle_completionist', maelleEndings.length)
    updateAchievementProgress('true_completionist', totalEndings)

    if (versoEndings.length >= 25) {
      if (unlockAchievement('verso_completionist')) newUnlocks.push('verso_completionist')
    }
    if (maelleEndings.length >= 25) {
      if (unlockAchievement('maelle_completionist')) newUnlocks.push('maelle_completionist')
    }
    if (totalEndings >= 50) {
      if (unlockAchievement('true_completionist')) newUnlocks.push('true_completionist')
    }

    // Both paths
    if (versoEndings.length > 0 && maelleEndings.length > 0) {
      if (unlockAchievement('both_paths')) newUnlocks.push('both_paths')
    }
  }

  return newUnlocks
}

// === Story Bookmarks System ===

export interface Bookmark {
  id: string
  route: StoryRouteId
  nodeId: string
  nodeTitle?: string
  quote?: string
  note?: string
  createdAt: string
  chapter: number
}

const BOOKMARKS_KEY = `${STORAGE_PREFIX}bookmarks`

// Load all bookmarks
export function loadBookmarks(): Bookmark[] {
  if (!isClient) return []

  try {
    const saved = localStorage.getItem(BOOKMARKS_KEY)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    if (Array.isArray(parsed)) {
      return parsed as Bookmark[]
    }

    return []
  } catch (error) {
    console.error('Error loading bookmarks:', error)
    return []
  }
}

// Save bookmarks
function saveBookmarks(bookmarks: Bookmark[]): void {
  if (!isClient) return

  try {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks))
  } catch (error) {
    console.error('Error saving bookmarks:', error)
  }
}

// Add a bookmark
export function addBookmark(bookmark: Omit<Bookmark, 'id' | 'createdAt'>): Bookmark {
  const newBookmark: Bookmark = {
    ...bookmark,
    id: `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString()
  }

  const current = loadBookmarks()
  saveBookmarks([...current, newBookmark])

  return newBookmark
}

// Remove a bookmark
export function removeBookmark(bookmarkId: string): void {
  const current = loadBookmarks()
  const filtered = current.filter(b => b.id !== bookmarkId)
  saveBookmarks(filtered)
}

// Update bookmark note
export function updateBookmarkNote(bookmarkId: string, note: string): void {
  const current = loadBookmarks()
  const updated = current.map(b =>
    b.id === bookmarkId ? { ...b, note } : b
  )
  saveBookmarks(updated)
}

// Get bookmarks for a specific route
export function getRouteBookmarks(route: StoryRouteId): Bookmark[] {
  return loadBookmarks().filter(b => b.route === route)
}

// Check if node is bookmarked
export function isNodeBookmarked(route: StoryRouteId, nodeId: string): boolean {
  const bookmarks = loadBookmarks()
  return bookmarks.some(b => b.route === route && b.nodeId === nodeId)
}

// === What If Mode / Timeline Management ===

export interface Timeline {
  id: string
  name: string
  route: StoryRouteId
  state: StoryState
  branchedFrom?: string // bookmark or node ID where it branched
  createdAt: string
  isMain: boolean
}

const TIMELINES_KEY = `${STORAGE_PREFIX}timelines`

// Load all timelines
export function loadTimelines(route: StoryRouteId): Timeline[] {
  if (!isClient) return []

  try {
    const saved = localStorage.getItem(`${TIMELINES_KEY}_${route}`)
    if (!saved) return []

    const parsed = JSON.parse(saved)
    if (Array.isArray(parsed)) {
      return parsed as Timeline[]
    }

    return []
  } catch (error) {
    console.error('Error loading timelines:', error)
    return []
  }
}

// Save timelines for a route
function saveTimelines(route: StoryRouteId, timelines: Timeline[]): void {
  if (!isClient) return

  try {
    localStorage.setItem(`${TIMELINES_KEY}_${route}`, JSON.stringify(timelines))
  } catch (error) {
    console.error('Error saving timelines:', error)
  }
}

// Create a new timeline (for What If mode)
export function createTimeline(
  route: StoryRouteId,
  state: StoryState,
  name: string,
  branchedFrom?: string
): Timeline {
  const timeline: Timeline = {
    id: `timeline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    route,
    state: { ...state },
    branchedFrom,
    createdAt: new Date().toISOString(),
    isMain: false
  }

  const timelines = loadTimelines(route)
  saveTimelines(route, [...timelines, timeline])

  return timeline
}

// Load a timeline
export function loadTimeline(route: StoryRouteId, timelineId: string): Timeline | null {
  const timelines = loadTimelines(route)
  return timelines.find(t => t.id === timelineId) || null
}

// Delete a timeline
export function deleteTimeline(route: StoryRouteId, timelineId: string): void {
  const timelines = loadTimelines(route)
  const filtered = timelines.filter(t => t.id !== timelineId && !t.isMain)
  saveTimelines(route, filtered)
}

// Get main timeline
export function getMainTimeline(route: StoryRouteId): Timeline | null {
  const state = loadStoryState(route, route === 'verso' ? 'v_start' : 'm_start')
  return {
    id: 'main',
    name: 'Main Timeline',
    route,
    state,
    createdAt: new Date(state.startTime).toISOString(),
    isMain: true
  }
}
