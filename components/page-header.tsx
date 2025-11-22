import SubtleParticleEffect from './subtle-particle-effect'
import ParticleEffect from './particle-effect'

interface PageHeaderProps {
  title: string
  subtitle?: string
  description?: string
  withParticles?: boolean
  glowParticles?: boolean // Use the unlocked ending particle effect
}

export default function PageHeader({ title, subtitle, description, withParticles = true, glowParticles = false }: PageHeaderProps) {
  return (
    <div className="relative mb-12 px-4 md:px-8">
      <div className="glass rounded-xl p-8 md:p-12 max-w-5xl mx-auto relative overflow-hidden">
        {withParticles && !glowParticles && <SubtleParticleEffect />}
        {glowParticles && <ParticleEffect />}
        <div className="relative z-10 text-center">
          {subtitle && (
            <p className="text-sm md:text-base tracking-[0.25em] text-foreground/70 mb-4 uppercase font-serif">
              {subtitle}
            </p>
          )}
          <h1 className="text-4xl md:text-6xl font-decorative text-gold mb-4 leading-tight drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            {title}
          </h1>
          {description && (
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
