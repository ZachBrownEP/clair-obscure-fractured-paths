'use client'

import Link from 'next/link'
import { ChevronRight, Book, Gamepad2, Trophy, Users, BarChart3, BookOpen } from 'lucide-react'
import EnhancedBackground from '@/components/enhanced-background'
import SubtleParticleEffect from '@/components/subtle-particle-effect'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex items-center">
      <EnhancedBackground />
      <main className="relative z-10 w-full">
        {/* Hero Section */}
        <section className="relative px-4 md:px-8 py-16 md:py-24 overflow-hidden">
          <SubtleParticleEffect />

          <div className="relative max-w-5xl mx-auto text-center">
            <p className="text-sm md:text-base tracking-[0.25em] text-foreground/70 mb-6 uppercase font-serif drop-shadow-[0_0_15px_rgba(212,175,55,0.2)]">
              Welcome to
            </p>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-decorative text-gold mb-8 leading-tight drop-shadow-[0_0_40px_rgba(212,175,55,0.5)] [text-shadow:_0_0_80px_rgba(212,175,55,0.3),_0_0_40px_rgba(212,175,55,0.4)]">
              Clair Obscur:<br />Fractured Paths
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 leading-relaxed drop-shadow-[0_0_10px_rgba(212,175,55,0.1)]">
              An interactive companion experience that continues the story beyond Expedition 33
            </p>

            {/* Main CTA */}
            <Link href="/dashboard">
              <button className="glass px-12 py-5 rounded-xl hover:bg-primary/20 transition-all border-2 border-primary/30 hover:border-primary/50 font-light tracking-wide text-lg group relative overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  Enter the App
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
            </Link>
          </div>
        </section>

        {/* What is This Section */}
        <section className="px-4 md:px-8 py-16 max-w-6xl mx-auto">
          <div className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
            <SubtleParticleEffect />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-6 text-center">
                What is Fractured Paths?
              </h2>
              <div className="space-y-6 text-foreground/90 leading-relaxed max-w-4xl mx-auto text-center">
                <p className="text-lg">
                  <strong className="text-primary">Clair Obscur: Expedition 33</strong> is a dark fantasy turn-based RPG where a group of warriors battles against the Painter—a mysterious entity who condemns people to erasure based on their age each year.
                </p>
                <p className="text-lg">
                  <strong className="text-primary">Fractured Paths</strong> is your companion to this world. This interactive experience lets you explore what happens <em>after</em> the events of Expedition 33, diving deeper into characters like <strong>Verso</strong> and <strong>Maelle</strong> through branching narratives shaped by your choices.
                </p>
                <p className="text-lg">
                  This is a <strong className="text-gold">fan-made companion app</strong> designed to extend your journey beyond the main game.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light text-foreground mb-12 text-center">
            What Awaits You
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Interactive Stories */}
            <div className="glass rounded-xl p-8 relative overflow-hidden">
              <SubtleParticleEffect />
              <div className="relative z-10">
                <div className="text-primary mb-4 flex justify-center">
                  <Gamepad2 size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 text-center">
                  Interactive Stories
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  Shape the narrative through meaningful choices. Every decision affects relationships and unlocks different paths.
                </p>
              </div>
            </div>

            {/* Story Journey Mode */}
            <div className="glass rounded-xl p-8 relative overflow-hidden">
              <SubtleParticleEffect />
              <div className="relative z-10">
                <div className="text-primary mb-4 flex justify-center">
                  <Book size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 text-center">
                  Story Journey Mode
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  Prefer a linear experience? Read the canonical narrative without making choices.
                </p>
              </div>
            </div>

            {/* 50 Endings */}
            <div className="glass rounded-xl p-8 relative overflow-hidden">
              <SubtleParticleEffect />
              <div className="relative z-10">
                <div className="text-primary mb-4 flex justify-center">
                  <Trophy size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 text-center">
                  50 Unique Endings
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  Discover 25 endings for Verso and 25 for Maelle. Each reflects your choices.
                </p>
              </div>
            </div>

            {/* Alignment System */}
            <div className="glass rounded-xl p-8 relative overflow-hidden">
              <SubtleParticleEffect />
              <div className="relative z-10">
                <div className="text-primary mb-4 flex justify-center">
                  <Users size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 text-center">
                  Dynamic Alignment
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  Your choices shift alignments (Painter, Writer, Balance) which unlock different story branches.
                </p>
              </div>
            </div>

            {/* Progress Tracking */}
            <div className="glass rounded-xl p-8 relative overflow-hidden">
              <SubtleParticleEffect />
              <div className="relative z-10">
                <div className="text-primary mb-4 flex justify-center">
                  <BarChart3 size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 text-center">
                  Complete Tracking
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  Automatically save progress. Track endings, achievements, choice history, and statistics.
                </p>
              </div>
            </div>

            {/* Lore Codex */}
            <div className="glass rounded-xl p-8 relative overflow-hidden">
              <SubtleParticleEffect />
              <div className="relative z-10">
                <div className="text-primary mb-4 flex justify-center">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-xl font-light text-foreground mb-3 text-center">
                  Deep Lore Codex
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed text-center">
                  Explore characters, locations, factions, magic, and the history of Clair Obscur.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-4 md:px-8 py-16 max-w-4xl mx-auto text-center">
          <div className="glass rounded-2xl p-12 relative overflow-hidden">
            <SubtleParticleEffect />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-light text-foreground mb-4">
                Ready to Begin?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg">
                The fractured world awaits. Your choices will shape the destinies of those who survived Expedition 33.
              </p>
              <Link href="/dashboard">
                <button className="glass px-10 py-4 rounded-xl hover:bg-primary/20 transition-all border-2 border-primary/30 hover:border-primary/50 font-light tracking-wide text-lg group">
                  <span className="flex items-center gap-3">
                    Enter the App
                    <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
