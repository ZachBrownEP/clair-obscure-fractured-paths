/**
 * Type definitions for Linear Story Journey system
 *
 * Linear stories are canon, page-based reading experiences
 * separate from the branching/choice-based interactive system.
 */

export interface LinearPage {
  id: string
  pageNumber: number
  text: string
}

export interface LinearChapter {
  id: string
  number: number
  title: string
  pages: LinearPage[]
}

export interface LinearRouteMeta {
  id: string
  baseRouteId: string
  name: string
  character: string
  subtitle?: string
  description?: string
  totalChapters: number
}

export interface LinearStoryRoute {
  route: LinearRouteMeta
  chapters: LinearChapter[]
}

/**
 * Summary type for listing available linear stories
 */
export interface LinearStorySummary {
  id: string
  meta: LinearRouteMeta
  chapterCount: number
  totalPages: number
}
