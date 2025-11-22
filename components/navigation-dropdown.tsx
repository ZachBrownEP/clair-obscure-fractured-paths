'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Home, BookOpen, Map, Trophy, Award, History, BarChart3, GitBranch, Bookmark, GitMerge, Book } from 'lucide-react'

export default function NavigationDropdown() {
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
    { href: '/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { href: '/timelines', label: 'What If Mode', icon: GitMerge },
  ]

  return (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="glass p-3 rounded-lg hover:bg-card/70 transition-all border border-primary/30 hover:border-primary/50"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={24} className="text-primary" /> : <Menu size={24} className="text-primary" />}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm -z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown Menu */}
          <div className="absolute top-16 right-0 glass rounded-xl border border-primary/30 shadow-2xl min-w-[280px] max-h-[80vh] overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-light text-foreground mb-4 border-b border-primary/20 pb-2">
                Navigation
              </h3>
              <nav className="space-y-1">
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
                      <Icon size={18} />
                      <span className="text-sm font-light">{link.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
