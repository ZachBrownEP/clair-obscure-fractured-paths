export default function HeroSection() {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 px-4 md:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto text-center">
        <p className="text-sm md:text-base tracking-[0.2em] text-accent mb-6 uppercase">
          Continue the story
        </p>
        
        <h1 className="text-5xl md:text-7xl font-light text-foreground mb-6 leading-tight">
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
