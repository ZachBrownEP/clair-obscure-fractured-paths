'use client'

import { useState, useEffect } from 'react'
import { AlertTriangle, X } from 'lucide-react'

export default function SpoilersWarning() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('spoilers-warning-dismissed')
    if (!dismissed) {
      setIsVisible(true)
    } else {
      setIsDismissed(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem('spoilers-warning-dismissed', 'true')
    setIsVisible(false)
    setIsDismissed(true)
  }

  if (!isVisible || isDismissed) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm">
      <div className="glass max-w-2xl w-full rounded-2xl p-8 md:p-12 relative">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-2 hover:bg-card/70 rounded-full transition-colors"
          aria-label="Dismiss warning"
        >
          <X size={20} className="text-muted-foreground" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-primary/10 rounded-full mb-6">
            <AlertTriangle size={48} className="text-primary" />
          </div>

          <h2 className="text-3xl font-light text-foreground mb-4">
            Spoilers Ahead
          </h2>

          <div className="space-y-4 text-foreground/90 leading-relaxed mb-8">
            <p>
              This companion experience contains <strong className="text-primary">story elements and lore</strong> from <em>Clair Obscur: Expedition 33</em>.
            </p>

            <p className="text-sm text-muted-foreground">
              If you haven't played the game yet, some content may reveal plot details, character backgrounds, and world-building elements that are best discovered through gameplay.
            </p>

            <p className="text-sm">
              However, a <strong>Story Recap</strong> is available to help new players understand the world and setting before diving into the branching narratives.
            </p>
          </div>

          <button
            onClick={handleDismiss}
            className="px-8 py-3 bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 rounded-lg transition-all font-light uppercase tracking-wider text-sm"
          >
            I Understand, Continue
          </button>
        </div>
      </div>
    </div>
  )
}
