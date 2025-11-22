'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    // Always start unmuted (auto-play enabled)
    setIsMuted(false)
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    if (!audioRef.current || !isLoaded) return

    const audio = audioRef.current
    audio.volume = 0.3 // Set to 30% volume for background music

    // Attempt to start playback immediately
    const attemptPlay = async () => {
      try {
        await audio.play()
        setIsPlaying(true)
        console.log('Autoplay started successfully')
      } catch (error) {
        console.log('Autoplay prevented by browser, waiting for user interaction:', error)

        // Add a one-time listener for any user interaction to start playback
        const startOnInteraction = async () => {
          try {
            await audio.play()
            setIsPlaying(true)
            console.log('Playback started after user interaction')
            // Remove listeners after successful play
            document.removeEventListener('click', startOnInteraction)
            document.removeEventListener('keydown', startOnInteraction)
            document.removeEventListener('touchstart', startOnInteraction)
          } catch (err) {
            console.log('Failed to play:', err)
          }
        }

        document.addEventListener('click', startOnInteraction, { once: true })
        document.addEventListener('keydown', startOnInteraction, { once: true })
        document.addEventListener('touchstart', startOnInteraction, { once: true })
      }
    }

    if (!isMuted) {
      attemptPlay()
    }
  }, [isLoaded, isMuted])

  useEffect(() => {
    if (!audioRef.current || !isLoaded) return

    const audio = audioRef.current

    if (isMuted) {
      audio.pause()
    } else if (isPlaying) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.log('Play error:', error)
        })
      }
    }

    // Save mute state to localStorage
    localStorage.setItem('backgroundMusicMuted', String(isMuted))
  }, [isMuted, isLoaded, isPlaying])

  const toggleMute = () => {
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
