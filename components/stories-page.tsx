'use client'

import { useState } from 'react'
import StoryRouteSelector from './story-route-selector'

export default function StoriesPage() {
  return (
    <div className="py-8 md:py-16">
      <StoryRouteSelector />
    </div>
  )
}
