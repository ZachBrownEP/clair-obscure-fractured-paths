'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

interface ParticleEffectsProps {
  count?: number
  color?: 'gold' | 'accent' | 'primary'
  intensity?: 'subtle' | 'medium' | 'high'
}

export default function ParticleEffects({
  count = 20,
  color = 'gold',
  intensity = 'subtle'
}: ParticleEffectsProps) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (intensity === 'subtle' ? 2 : intensity === 'medium' ? 3 : 4) + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }))
    setParticles(newParticles)
  }, [count, intensity])

  const getColorClass = () => {
    switch (color) {
      case 'gold':
        return 'bg-primary'
      case 'accent':
        return 'bg-accent'
      case 'primary':
        return 'bg-primary'
      default:
        return 'bg-primary'
    }
  }

  const getOpacity = () => {
    switch (intensity) {
      case 'subtle':
        return 0.15
      case 'medium':
        return 0.3
      case 'high':
        return 0.5
      default:
        return 0.15
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${getColorClass()}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            opacity: getOpacity()
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [getOpacity(), getOpacity() * 1.5, getOpacity()],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        />
      ))}
    </div>
  )
}
