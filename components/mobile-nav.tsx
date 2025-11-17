'use client'

import { Home, BookOpen, Map, User } from 'lucide-react'

interface MobileNavProps {
  activePage: string
  onPageChange: (page: string) => void
}

export default function MobileNav({ activePage, onPageChange }: MobileNavProps) {
  const links = [
    { icon: Home, label: 'Home', id: 'home' },
    { icon: BookOpen, label: 'Stories', id: 'stories' },
    { icon: Map, label: 'Map', id: 'map' },
    { icon: User, label: 'Profile', id: 'codex' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border">
      <div className="flex items-center justify-around">
        {links.map((link) => {
          const Icon = link.icon
          return (
            <button
              key={link.id}
              onClick={() => onPageChange(link.id)}
              className={`flex flex-col items-center gap-1 py-3 px-4 flex-1 transition-colors ${
                activePage === link.id
                  ? 'text-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <Icon size={24} />
              <span className="text-xs">{link.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
