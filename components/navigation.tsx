'use client'

interface NavigationProps {
  activePage: string
  onPageChange: (page: string) => void
}

export default function Navigation({ activePage, onPageChange }: NavigationProps) {
  const links = [
    { href: '#', label: 'Home', id: 'home' },
    { href: '#', label: 'Stories', id: 'stories' },
    { href: '#', label: 'Codex', id: 'codex' },
    { href: '#', label: 'Map', id: 'map' },
    { href: '#', label: 'Endings', id: 'endings' },
    { href: '#', label: 'Settings', id: 'settings' },
  ]

  return (
    <nav className="hidden md:block sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-light text-primary tracking-wide">
          Clair Obscur
        </h1>
        
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <button
              key={link.id}
              onClick={() => onPageChange(link.id)}
              className={`text-sm tracking-widest transition-colors ${
                activePage === link.id
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
