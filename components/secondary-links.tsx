import { BookOpen, Map, Trophy } from 'lucide-react'

interface SecondaryLink {
  icon: React.ReactNode
  title: string
  description: string
}

const links: SecondaryLink[] = [
  {
    icon: <BookOpen size={24} />,
    title: 'Lore Codex',
    description: 'Characters, locations, factions, and the magic that binds them.',
  },
  {
    icon: <Map size={24} />,
    title: 'World Map',
    description: 'Explore the fractured lands and discover hidden connections.',
  },
  {
    icon: <Trophy size={24} />,
    title: 'Endings Gallery',
    description: 'View the fates you have unlocked across all routes.',
  },
]

export default function SecondaryLinks() {
  return (
    <section>
      <h2 className="text-3xl font-light text-foreground mb-8">Explore</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {links.map((link, idx) => (
          <div key={idx} className="glass p-6 rounded-lg hover:bg-card/70 transition-all cursor-pointer group">
            <div className="text-primary mb-3 group-hover:scale-110 transition-transform">
              {link.icon}
            </div>
            <h3 className="text-lg font-light text-foreground mb-2">{link.title}</h3>
            <p className="text-sm text-muted-foreground">{link.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
