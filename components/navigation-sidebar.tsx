'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, BookOpen, Map, Trophy, Award, History, BarChart3, GitBranch, Bookmark as BookmarkIcon, GitMerge, Book } from 'lucide-react'

interface NavigationSidebarProps {
  onBookmark?: () => void
  showBookmarkOption?: boolean
}

export default function NavigationSidebar({ onBookmark, showBookmarkOption = false }: NavigationSidebarProps = {}) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const navigationLinks = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/stories/verso', label: "Verso's Story", icon: Book },
    { href: '/stories/maelle', label: "Maelle's Story", icon: Book },
    { href: '/codex', label: 'Lore Codex', icon: BookOpen },
    { href: '/map', label: 'World Map', icon: Map },
    { href: '/endings', label: 'Endings Gallery', icon: Trophy },
    { href: '/achievements', label: 'Achievements', icon: Award },
    { href: '/history', label: 'Choice History', icon: History },
    { href: '/progress', label: 'Your Progress', icon: BarChart3 },
    { href: '/tree', label: 'Decision Tree', icon: GitBranch },
    { href: '/bookmarks', label: 'Bookmarks', icon: BookmarkIcon },
    { href: '/timelines', label: 'What If Mode', icon: GitMerge },
  ]

  const handleBookmark = () => {
    if (onBookmark) {
      onBookmark()
      setIsOpen(false)
    }
  }

  return (
    <>
      {/* Menu Button - Top Left */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-6 left-6 z-50 glass p-3 rounded-lg hover:bg-card/70 transition-all border border-primary/30 hover:border-primary/50"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      >
        {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
      </button>

      {/* Backdrop with blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-md z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 glass border-r border-primary/30 shadow-2xl z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-primary/20">
            <h2 className="text-xl font-decorative text-gold">Navigation</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors p-2"
              aria-label="Close navigation"
            >
              <X size={24} />
            </button>
          </div>

          {/* Bookmark Option (if in chapter) */}
          {showBookmarkOption && onBookmark && (
            <div className="p-4 border-b border-primary/20 bg-primary/5">
              <button
                onClick={handleBookmark}
                className="w-full glass px-4 py-3 rounded-lg hover:bg-primary/20 transition-all border border-primary/30 hover:border-primary/50 flex items-center gap-3"
              >
                <BookmarkIcon size={20} className="text-amber-500" />
                <span className="text-sm font-light text-foreground">Bookmark This Scene</span>
              </button>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="space-y-1">
              {navigationLinks.map((link) => {
                const Icon = link.icon
                const isActive = pathname === link.href || pathname?.startsWith(link.href + '/')

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                      ${isActive
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'hover:bg-card/50 text-foreground/80 hover:text-foreground'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span className="font-light">{link.label}</span>
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-primary/20">
            <p className="text-xs text-muted-foreground text-center">
              Clair Obscur: Fractured Paths
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
