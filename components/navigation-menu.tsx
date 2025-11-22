'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Home, BookOpen, Map, Trophy, BookMarked, X } from 'lucide-react'
import { useState } from 'react'

export default function NavigationMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/recap', label: 'Story Recap', icon: BookMarked },
    { href: '/stories/verso', label: "Verso's Path", icon: BookOpen },
    { href: '/stories/maelle', label: "Maelle's Path", icon: BookOpen },
    { href: '/codex', label: 'Lore Codex', icon: BookOpen },
    { href: '/map', label: 'World Map', icon: Map },
    { href: '/endings', label: 'Endings Gallery', icon: Trophy }
  ]

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 glass p-3 rounded-full hover:bg-card/70 transition-all group"
        aria-label="Navigation menu"
      >
        {isOpen ? (
          <X size={20} className="text-foreground" />
        ) : (
          <Menu size={20} className="text-foreground" />
        )}
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-card/95 backdrop-blur-md border-r border-primary/20 z-40 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-8 pt-20">
          <h2 className="text-2xl font-decorative text-gold mb-2">
            Fractured Paths
          </h2>
          <p className="text-sm text-muted-foreground mb-8">
            Navigate the world beyond Expedition 33
          </p>

          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-primary/20 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-card/70'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-light">{item.label}</span>
                </Link>
              )
            })}
          </nav>

          <div className="mt-12 pt-8 border-t border-border/30">
            <p className="text-xs text-muted-foreground leading-relaxed">
              A companion experience for Clair Obscur: Expedition 33. Explore branching narratives and unlock multiple endings.
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
