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
      painterAlignment: 50,
      writerAlignment: 50,
      compassion: 50
    },
    flags: {},
    seenNodes: [startNodeId],
    currentChapter: 1
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
      typeof parsed.stats.compassion === 'number' &&
      parsed.flags &&
      Array.isArray(parsed.seenNodes)
    ) {
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
