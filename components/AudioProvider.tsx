'use client'

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Music2, Volume2, VolumeX } from 'lucide-react'

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
  const [showPreferenceModal, setShowPreferenceModal] = useState(false)
  const [isMuted, setIsMuted] = useState(true) // Always start as muted to avoid hydration mismatch
  const [volume, setVolumeState] = useState(initialVolume)
  const [isClient, setIsClient] = useState(false)
  const audioStarted = useRef(false)
  const cleanupListenersRef = useRef<(() => void) | null>(null)
  const preferenceChecked = useRef(false)

  // Load preference from localStorage after hydration
  useEffect(() => {
    setIsClient(true)
    const savedMuteState = localStorage.getItem('backgroundMusicMuted')
    if (savedMuteState !== null) {
      setIsMuted(savedMuteState === 'true')
    }
  }, [])

  // Initialize audio element and start playback
  useEffect(() => {
    if (typeof window === 'undefined' || !isClient) return

    // Use global singleton to prevent multiple instances
    if (!globalAudioInstance) {
      const audio = new Audio(src)
      audio.loop = true
      audio.volume = 0
      audio.muted = true
      audio.preload = 'auto'
      globalAudioInstance = audio

      // Expose on window for Safari unlock component
      if (typeof window !== 'undefined') {
        (window as any).globalAudioInstance = audio
      }

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

    // Check if user has set a preference
    const checkPreference = () => {
      if (preferenceChecked.current) return

      const musicPreferenceSet = localStorage.getItem('musicPreferenceSet')
      const savedMuteState = localStorage.getItem('backgroundMusicMuted')

      if (musicPreferenceSet !== 'true') {
        // First time visitor - show the modal (don't set preferenceChecked yet)
        setShowPreferenceModal(true)
      } else if (savedMuteState !== 'true') {
        // User has enabled music - proceed with autoplay
        preferenceChecked.current = true
        attemptAutoplay()
      } else {
        // User has disabled music - don't play
        preferenceChecked.current = true
        console.log('⏸ Music disabled by user preference')
      }
    }

    // Attempt to start playback if not already started
    const attemptAutoplay = async () => {
      if (!audioRef.current || globalAudioStarted) return

      // Only attempt autoplay if user wants music
      const savedMuteState = localStorage.getItem('backgroundMusicMuted')
      if (savedMuteState === 'true') {
        console.log('⏸ Music disabled by user preference, not autoplaying')
        return
      }

      try {
        console.log('🎵 Attempting autoplay...')
        audioRef.current.muted = false
        audioRef.current.volume = initialVolume
        await audioRef.current.play()
        globalAudioStarted = true
        audioStarted.current = true
        console.log('✓ Audio playing at volume:', initialVolume)
      } catch (error) {
        console.log('⏸ Autoplay blocked - waiting for user interaction', error)
        attachInteractionListeners()
      }
    }

    const timer = setTimeout(checkPreference, 150)

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
  }, [src, initialVolume, isClient])

  // Attach interaction listeners to start audio on first user interaction
  const attachInteractionListeners = () => {
    if (!audioRef.current || cleanupListenersRef.current) return

    const handleInteraction = async (event: Event) => {
      if (!audioRef.current || globalAudioStarted) return

      // Check if user wants music enabled
      const savedMuteState = localStorage.getItem('backgroundMusicMuted')
      if (savedMuteState === 'true') {
        console.log('⏸ User has disabled music, not starting on interaction')
        return
      }

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

    // Listen to multiple interaction types as fallback
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

    // Save preference to localStorage
    localStorage.setItem('backgroundMusicMuted', String(newMutedState))

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

  const handleMusicChoice = async (enableMusic: boolean) => {
    // Store the preference
    localStorage.setItem('musicPreferenceSet', 'true')
    localStorage.setItem('backgroundMusicMuted', String(!enableMusic))

    // Update state
    setIsMuted(!enableMusic)
    setShowPreferenceModal(false)

    // Mark preference as checked
    preferenceChecked.current = true

    if (enableMusic && audioRef.current) {
      // User enabled music, start playback
      try {
        console.log('🎵 User enabled music, starting playback...')
        audioRef.current.muted = false
        audioRef.current.volume = initialVolume
        await audioRef.current.play()
        globalAudioStarted = true
        audioStarted.current = true
        console.log('✓ Music playing')
      } catch (error) {
        console.log('⏸ Autoplay blocked - waiting for user interaction', error)
        attachInteractionListeners()
      }
    } else if (!enableMusic && audioRef.current) {
      // User disabled music, make sure it's stopped
      console.log('🔇 User disabled music')
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current.muted = true
      // Remove any pending interaction listeners
      if (cleanupListenersRef.current) {
        cleanupListenersRef.current()
        cleanupListenersRef.current = null
      }
    }
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
      <Dialog open={showPreferenceModal} onOpenChange={setShowPreferenceModal}>
        <DialogContent
          showCloseButton={false}
          className="glass border-2 border-gold/60 shadow-2xl max-w-md backdrop-blur-xl bg-background/95"
        >
          <DialogHeader className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-amber-400/20 rounded-full blur-xl animate-pulse" />
                <div className="relative glass p-4 rounded-full border-2 border-gold/50">
                  <Music2 className="w-12 h-12 text-gold" />
                </div>
              </div>
            </div>
            <DialogTitle className="text-3xl text-center font-bold bg-gradient-to-r from-gold via-amber-400 to-gold bg-clip-text text-transparent">
              Sound On?
            </DialogTitle>
            <DialogDescription className="text-center text-base leading-relaxed px-2 text-foreground/80">
              For a more interactive experience, would you like to turn on the sound?
              <br />
              <span className="text-sm text-muted-foreground mt-2 block">
                You can change this anytime using the{' '}
                <Volume2 className="inline w-4 h-4 mx-1" />
                button
              </span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex-col sm:flex-col gap-3 pt-6">
            <button
              onClick={() => handleMusicChoice(true)}
              className="w-full group relative glass px-8 py-4 rounded-xl transition-all duration-300 border-2 border-gold/60 hover:border-gold hover:bg-gold/10 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              <div className="relative flex items-center justify-center gap-2 text-lg font-semibold">
                <Volume2 className="w-5 h-5 text-gold" />
                <span className="text-gold">Yes, Turn On Sound</span>
              </div>
            </button>
            <button
              onClick={() => handleMusicChoice(false)}
              className="w-full glass px-8 py-4 rounded-xl transition-all duration-300 border border-muted-foreground/30 hover:border-muted-foreground/50 hover:bg-muted/30"
            >
              <div className="flex items-center justify-center gap-2 text-base font-medium text-muted-foreground">
                <VolumeX className="w-4 h-4" />
                <span>No Thanks</span>
              </div>
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AudioContext.Provider>
  )
}
