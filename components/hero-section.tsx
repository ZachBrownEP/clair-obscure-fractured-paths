import EnhancedBackground from '@/components/enhanced-background'

export default function HeroSection() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 overflow-hidden">
      <EnhancedBackground />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-sm md:text-base tracking-[0.25em] text-foreground/70 mb-6 uppercase font-serif">
          Clair Obscur
        </p>

        <h1 className="text-5xl md:text-7xl font-decorative text-gold mb-6 leading-tight drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          Fractured Paths
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Beyond Expedition 33 lies a fractured world where choices echo across realities.
          Step into the shadows and paint your own destiny.
        </p>
      </div>
    </section>
  )
}
