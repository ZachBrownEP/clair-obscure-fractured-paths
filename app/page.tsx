'use client'

import { useState } from 'react'
import Navigation from '@/components/navigation'
import MobileNav from '@/components/mobile-nav'
import HeroSection from '@/components/hero-section'
import StoryCard from '@/components/story-card'
import SecondaryLinks from '@/components/secondary-links'
import StoriesPage from '@/components/stories-page'
import CodexPage from '@/components/codex-page'
import MapPage from '@/components/map-page'
import EndingsPage from '@/components/endings-page'

export default function Home() {
  const [activePage, setActivePage] = useState('home')

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation activePage={activePage} onPageChange={setActivePage} />
      
      <main className="pb-20 md:pb-0">
        {activePage === 'home' && (
          <>
            <HeroSection />
            
            <section className="px-4 md:px-8 py-16 max-w-7xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6 mb-20">
                <StoryCard
                  title="Verso's Story"
                  description="Follow Verso's journey through shadowed corridors and painted realities. Uncover the secrets of the Canvas Ghost."
                  progress={45}
                  buttonText="Continue"
                />
                <StoryCard
                  title="Maelle's Story"
                  description="Trace Maelle's path as a seeker of truth in a fractured world. Navigate between worlds and discover her destiny."
                  progress={0}
                  buttonText="Start"
                />
              </div>

              <SecondaryLinks />
            </section>
          </>
        )}

        {activePage === 'stories' && <StoriesPage />}
        {activePage === 'codex' && <CodexPage />}
        {activePage === 'map' && <MapPage />}
        {activePage === 'endings' && <EndingsPage />}
      </main>

      <MobileNav activePage={activePage} onPageChange={setActivePage} />
    </div>
  )
}
