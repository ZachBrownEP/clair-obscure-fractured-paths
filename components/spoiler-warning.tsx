'use client'

import { useState } from 'react'
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

export default function SpoilerWarning() {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="glass rounded-xl border-2 border-amber-500/30 p-6 mb-8 relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-start gap-4">
          <div className="text-amber-500 mt-1 flex-shrink-0">
            <AlertTriangle size={28} />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-light text-amber-500">
                Spoiler Warning
              </h3>
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-amber-500 hover:text-amber-400 transition-colors"
                aria-label={isExpanded ? 'Collapse warning' : 'Expand warning'}
              >
                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
            </div>

            {isExpanded && (
              <div className="text-foreground/90 space-y-3">
                <p className="text-sm leading-relaxed">
                  This section contains <strong className="text-amber-500">detailed information about story events, character fates, and narrative outcomes</strong> from Clair Obscur: Expedition 33 and its companion stories.
                </p>
                <p className="text-sm leading-relaxed">
                  If you haven't played the original game or completed the character stories in this app, scrolling further may reveal significant plot points and spoil your experience.
                </p>
                <p className="text-sm font-light text-muted-foreground italic">
                  Proceed with caution if you wish to discover these stories firsthand.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Subtle warning gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-transparent pointer-events-none" />
    </div>
  )
}
