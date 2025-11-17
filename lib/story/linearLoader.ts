/**
 * Linear Story Loader
 *
 * Loads and provides access to linear story JSON files.
 * These are canon, page-based reading experiences.
 */

import versoLinear from '@/data/linear-story/verso_linear.json'
import maelleLinear from '@/data/linear-story/maelle_linear.json'
import { LinearStoryRoute, LinearStorySummary } from './linearTypes'

const linearStories: Record<string, LinearStoryRoute> = {
  verso: versoLinear as LinearStoryRoute,
  maelle: maelleLinear as LinearStoryRoute,
}

/**
 * Get a linear story by route ID
 */
export function getLinearStory(routeId: 'verso' | 'maelle'): LinearStoryRoute | null {
  return linearStories[routeId] ?? null
}

/**
 * Get all available linear story summaries
 */
export function getAllLinearStorySummaries(): LinearStorySummary[] {
  return Object.entries(linearStories).map(([key, value]) => ({
    id: key,
    meta: value.route,
    chapterCount: value.chapters.length,
    totalPages: value.chapters.reduce((sum, ch) => sum + ch.pages.length, 0),
  }))
}

/**
 * Check if a linear story exists for a given route ID
 */
export function hasLinearStory(routeId: string): boolean {
  return routeId in linearStories
}
