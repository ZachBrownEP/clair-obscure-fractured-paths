'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    // Load mute preference from localStorage
    const savedMuteState = localStorage.getItem('backgroundMusicMuted')
    if (savedMuteState !== null) {
      setIsMuted(savedMuteState === 'true')
    }
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!audioRef.current || !isLoaded) return

    const audio = audioRef.current
    audio.volume = 0.3 // Set to 30% volume for background music

    // Try to autoplay on mount if not muted
    if (!hasInteracted && !isMuted) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            // Autoplay succeeded
            setHasInteracted(true)
          })
          .catch((error) => {
            console.log('Autoplay prevented by browser:', error)
            // Autoplay was prevented - audio will start on first user interaction
          })
      }
    }
  }, [isLoaded, hasInteracted, isMuted])

  useEffect(() => {
    if (!audioRef.current || !isLoaded || !hasInteracted) return

    const audio = audioRef.current

    if (isMuted) {
      audio.pause()
    } else {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Play error:', error)
        })
      }
    }

    // Save mute state to localStorage
    localStorage.setItem('backgroundMusicMuted', String(isMuted))
  }, [isMuted, isLoaded, hasInteracted])

  const toggleMute = () => {
    if (!hasInteracted) {
      setHasInteracted(true)
    }
    setIsMuted(!isMuted)
  }

  if (!isLoaded) return null

  return (
    <>
      <audio
        ref={audioRef}
        loop
        preload="auto"
      >
        <source src="/songs/Lumière-Clair Obscur_ Expedition 33 (Original Soundtrack) 03 - Lumière.mp3" type="audio/mpeg" />
      </audio>

      <button
        onClick={toggleMute}
        className="fixed top-4 right-4 z-50 glass p-3 rounded-full hover:bg-card/70 transition-all group"
        aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
        title={isMuted ? 'Play background music' : 'Pause background music'}
      >
        {isMuted ? (
          <VolumeX size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
        ) : (
          <Volume2 size={20} className="text-primary group-hover:text-accent transition-colors" />
        )}
      </button>
    </>
  )
}
