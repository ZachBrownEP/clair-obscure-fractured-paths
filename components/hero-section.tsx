import ParticleEffects from '@/components/particle-effects'

export default function HeroSection() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 overflow-hidden">
      {/* Enhanced background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-accent/5 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-primary/10 pointer-events-none" />

      {/* Radial glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/20 via-accent/10 to-transparent blur-3xl pointer-events-none" />

      {/* Subtle light beams */}
      <div className="absolute top-0 left-1/4 w-px h-64 bg-gradient-to-b from-gold/30 via-gold/10 to-transparent pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-px h-48 bg-gradient-to-b from-primary/30 via-primary/10 to-transparent pointer-events-none" />

      {/* Particle effects */}
      <ParticleEffects count={15} color="gold" intensity="subtle" />

      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-sm md:text-base tracking-[0.25em] text-foreground/70 mb-6 uppercase font-serif">
          Clair Obscur
        </p>

        <h1 className="text-5xl md:text-7xl font-decorative text-gold mb-6 leading-tight drop-shadow-[0_0_30px_rgba(212,175,55,0.3)] relative">
          Fractured Paths
          <div className="absolute inset-0 pointer-events-none">
            <ParticleEffects count={10} color="gold" intensity="subtle" />
          </div>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Beyond Expedition 33 lies a fractured world where choices echo across realities.
          Step into the shadows and paint your own destiny.
        </p>
      </div>
    </section>
  )
}
