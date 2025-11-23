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

// Global singleton to prevent multiple audio instances
let globalAudioInstance: HTMLAudioElement | null = null
let globalAudioStarted = false

export function AudioProvider({ children, src, volume: initialVolume = 0.3 }: AudioProviderProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [volume, setVolumeState] = useState(initialVolume)
  const audioStarted = useRef(false)
  const cleanupListenersRef = useRef<(() => void) | null>(null)

  // Initialize audio element and start playback
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Use global singleton to prevent multiple instances
    if (!globalAudioInstance) {
      const audio = new Audio(src)
      audio.loop = true
      audio.volume = 0
      audio.muted = true
      audio.preload = 'auto'
      globalAudioInstance = audio
      console.log('🎵 Global audio instance created')
    }

    // Set local ref to global instance
    audioRef.current = globalAudioInstance

    // Add event listeners for this component instance
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audioRef.current.addEventListener('play', handlePlay)
    audioRef.current.addEventListener('pause', handlePause)
    audioRef.current.addEventListener('ended', handleEnded)

    // Attempt to start playback if not already started
    const attemptAutoplay = async () => {
      if (!audioRef.current || globalAudioStarted) return

      try {
        console.log('🔇 Attempting muted autoplay...')
        await audioRef.current.play()
        globalAudioStarted = true
        audioStarted.current = true
        console.log('✓ Audio playing (muted)')

        // Unmute after a brief delay
        setTimeout(() => {
          if (audioRef.current && globalAudioStarted) {
            audioRef.current.muted = false
            audioRef.current.volume = initialVolume
            console.log('✓ Audio unmuted and playing at volume:', initialVolume)
          }
        }, 200)
      } catch (error) {
        console.log('⏸ Autoplay blocked - waiting for user interaction', error)
        attachInteractionListeners()
      }
    }

    const timer = setTimeout(attemptAutoplay, 150)

    return () => {
      clearTimeout(timer)
      // Remove event listeners for this component instance
      if (audioRef.current) {
        audioRef.current.removeEventListener('play', handlePlay)
        audioRef.current.removeEventListener('pause', handlePause)
        audioRef.current.removeEventListener('ended', handleEnded)
      }
      // Clean up interaction listeners if they exist
      if (cleanupListenersRef.current) {
        cleanupListenersRef.current()
        cleanupListenersRef.current = null
      }
      // Do NOT destroy the global audio instance - it persists
    }
  }, [src, initialVolume])

  // Attach interaction listeners to start audio on first user interaction
  const attachInteractionListeners = () => {
    if (!audioRef.current || cleanupListenersRef.current) return

    const handleInteraction = async (event: Event) => {
      if (!audioRef.current || globalAudioStarted) return

      try {
        console.log('👆 User interaction detected, starting audio...')
        // Unmute and set volume before playing
        audioRef.current.muted = false
        audioRef.current.volume = initialVolume

        await audioRef.current.play()
        globalAudioStarted = true
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
