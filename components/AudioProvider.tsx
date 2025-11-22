'use client'

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'

interface AudioContextType {
  isPlaying: boolean
  isMuted: boolean
  volume: number
  togglePlay: () => void
  toggleMute: () => void
  setVolume: (volume: number) => void
}

const AudioContext = createContext<AudioContextType | null>(null)

export function useAudio() {
  const context = useContext(AudioContext)
  if (!context) {
    throw new Error('useAudio must be used within AudioProvider')
  }
  return context
}

interface AudioProviderProps {
  children: ReactNode
  src: string
  volume?: number
}

export function AudioProvider({ children, src, volume: initialVolume = 0.3 }: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolumeState] = useState(initialVolume)
  const audioStarted = useRef(false)
  const cleanupListenersRef = useRef<(() => void) | null>(null)

  // Initialize audio element once on mount
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Create audio element only if it doesn't exist
    if (!audioRef.current) {
      const audio = new Audio(src)
      audio.loop = true
      audio.volume = initialVolume
      audio.preload = 'auto'
      audioRef.current = audio

      // Add event listeners
      audio.addEventListener('play', () => setIsPlaying(true))
      audio.addEventListener('pause', () => setIsPlaying(false))
      audio.addEventListener('ended', () => setIsPlaying(false))
    }

    return () => {
      // Clean up interaction listeners if they exist
      if (cleanupListenersRef.current) {
        cleanupListenersRef.current()
        cleanupListenersRef.current = null
      }
      // Do NOT destroy the audio element on unmount
      // This ensures it persists across navigation
    }
  }, [src, initialVolume])

  // Attempt autoplay on first mount
  useEffect(() => {
    if (!audioRef.current || audioStarted.current) return

    const attemptAutoplay = async () => {
      try {
        // Try to play immediately
        await audioRef.current?.play()
        audioStarted.current = true
        console.log('✓ Autoplay successful')
      } catch (error) {
        // Autoplay was blocked - set up user interaction listeners
        // Suppress the error since we handle it gracefully
        console.log('⏸ Autoplay blocked - waiting for user interaction')
        attachInteractionListeners()
      }
    }

    // Small delay to ensure DOM is ready
    const timer = setTimeout(attemptAutoplay, 100)
    return () => clearTimeout(timer)
  }, [])

  // Attach interaction listeners to start audio on first user interaction
  const attachInteractionListeners = () => {
    if (!audioRef.current || cleanupListenersRef.current) return

    const handleInteraction = async (event: Event) => {
      if (!audioRef.current || audioStarted.current) return

      try {
        await audioRef.current.play()
        audioStarted.current = true
        console.log('✓ Audio started after user interaction')

        // Remove all listeners after successful start
        if (cleanupListenersRef.current) {
          cleanupListenersRef.current()
          cleanupListenersRef.current = null
        }
      } catch (error) {
        // If it still fails, log but don't crash
        console.warn('Audio play attempt failed:', error)
      }
    }

    // Listen to multiple interaction types
    const events: Array<keyof WindowEventMap> = ['click', 'touchstart', 'keydown']

    const handlers: Array<() => void> = []

    events.forEach(event => {
      const handler = (e: Event) => handleInteraction(e)
      window.addEventListener(event, handler, { passive: true })
      handlers.push(() => window.removeEventListener(event, handler))
    })

    // Store cleanup function
    cleanupListenersRef.current = () => {
      handlers.forEach(cleanup => cleanup())
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(err => {
        console.warn('Play error:', err)
      })
    }
  }

  const toggleMute = () => {
    if (!audioRef.current) return

    const newMutedState = !isMuted
    setIsMuted(newMutedState)

    if (newMutedState) {
      audioRef.current.pause()
    } else {
      audioRef.current.play().catch(err => {
        console.warn('Play error:', err)
      })
    }
  }

  const setVolume = (newVolume: number) => {
    if (!audioRef.current) return

    const clampedVolume = Math.max(0, Math.min(1, newVolume))
    setVolumeState(clampedVolume)
    audioRef.current.volume = clampedVolume
  }

  const value: AudioContextType = {
    isPlaying,
    isMuted,
    volume,
    togglePlay,
    toggleMute,
    setVolume,
  }

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  )
}
