'use client'

import { useEffect, useState } from 'react'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
}

// Seeded random number generator for consistent particle positions
function seededRandom(seed: number) {
  let x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export default function ParticleEffect() {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate particles with seeded randomness for consistency
    const seed = 12345 // Fixed seed for consistent particle positions
    const newParticles: Particle[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: seededRandom(seed + i * 4) * 100,
      y: seededRandom(seed + i * 4 + 1) * 100,
      size: seededRandom(seed + i * 4 + 2) * 4 + 2,
      duration: seededRandom(seed + i * 4 + 3) * 3 + 2,
      delay: seededRandom(seed + i * 4 + 4) * 2,
    }))

    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-primary/30 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animation: `float ${particle.duration}s ease-in-out infinite`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100px) translateX(20px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
