'use client'

import { useState, useEffect } from 'react'
import {
  loadUnlockedEndings,
  getUnlockedEndingsCount,
  EndingUnlock
} from '@/lib/story/persistence'
import { StoryRouteId } from '@/lib/story/types'

export function useEndingsProgress() {
  const [unlockedEndings, setUnlockedEndings] = useState<EndingUnlock[]>([])
  const [totalUnlocked, setTotalUnlocked] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load from localStorage on client
    const endings = loadUnlockedEndings()
    const count = getUnlockedEndingsCount()

    setUnlockedEndings(endings)
    setTotalUnlocked(count)
    setIsLoading(false)
  }, [])

  const isUnlocked = (route: StoryRouteId, endingKey: string): boolean => {
    return unlockedEndings.some(
      e => e.route === route && e.endingKey === endingKey
    )
  }

  const getRouteEndings = (route: StoryRouteId): EndingUnlock[] => {
    return unlockedEndings.filter(e => e.route === route)
  }

  return {
    unlockedEndings,
    totalUnlocked,
    isUnlocked,
    getRouteEndings,
    isLoading
  }
}
