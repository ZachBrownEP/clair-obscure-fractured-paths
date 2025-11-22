import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import HeroSection from '@/components/hero-section'
import EnhancedBackground from '@/components/enhanced-background'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <EnhancedBackground />
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <HeroSection />

        <div className="max-w-3xl mx-auto text-center mt-12">
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
            Continue your journey beyond the game.<br />
            Original stories. Branching paths. Your choices matter.
          </p>

          <Link href="/dashboard">
            <button className="group px-12 py-5 bg-primary/20 hover:bg-primary/30 text-primary border-2 border-primary/40 hover:border-primary/60 rounded-xl transition-all font-light uppercase tracking-wider text-lg relative overflow-hidden">
              <span className="relative z-10 flex items-center gap-3">
                Enter the Experience
                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 group-hover:via-primary/20 transition-all" />
            </button>
          </Link>

          <p className="text-sm text-muted-foreground mt-8">
            A fan-made companion experience for Clair Obscur: Expedition 33
          </p>
        </div>
      </main>
    </div>
  )
}
