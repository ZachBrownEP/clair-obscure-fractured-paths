'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

export default function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    // Unmute after a brief moment - this allows autoplay to work
    // The audio starts muted (via HTML attribute) which browsers allow,
    // then we unmute it immediately
    const timer = setTimeout(() => {
      audio.muted = false
      audio.volume = 0.3
      console.log('Music unmuted and playing')
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isMuted) {
      audio.pause()
    } else {
      audio.muted = false
      audio.volume = 0.3
      audio.play().catch(err => console.log('Play error:', err))
    }
  }, [isMuted])

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  return (
    <>
      <audio
        ref={audioRef}
        loop
        autoPlay
        muted
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
