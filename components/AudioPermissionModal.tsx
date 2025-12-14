'use client'

import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const PERMISSION_KEY = 'audioPermissionAsked'

export function AudioPermissionModal() {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    // Only show modal if we haven't asked before
    const hasAsked = localStorage.getItem(PERMISSION_KEY)
    if (!hasAsked) {
      // Wait for audio element to be created and ready
      const checkAudioReady = () => {
        const audio = (window as any).globalAudioInstance as HTMLAudioElement | undefined
        if (audio) {
          // Audio element exists, show modal
          setShowModal(true)
        } else {
          // Wait a bit more for audio to be created
          setTimeout(checkAudioReady, 100)
        }
      }
      // Initial delay to let the page load
      const timer = setTimeout(checkAudioReady, 300)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleEnableMusic = async () => {
    localStorage.setItem(PERMISSION_KEY, 'true')
    localStorage.setItem('backgroundMusicMuted', 'false')

    // Notify AudioProvider of the change
    window.dispatchEvent(new CustomEvent('audioPermissionChanged', { detail: { muted: false } }))

    // Play audio immediately - this click IS the user gesture
    const audio = (window as any).globalAudioInstance as HTMLAudioElement | undefined
    if (audio) {
      try {
        // Ensure audio is ready
        audio.muted = false
        audio.volume = 0.3

        // If audio is paused or hasn't started, play it
        if (audio.paused) {
          await audio.play()
          console.log('✓ Audio started via permission modal')
        }
      } catch (err) {
        console.warn('Could not start audio:', err)
        // Fallback: try again with a small delay
        setTimeout(() => {
          if (audio.paused) {
            audio.play().catch(() => {})
          }
        }, 100)
      }
    }

    setShowModal(false)
  }

  const handleDecline = () => {
    localStorage.setItem(PERMISSION_KEY, 'true')
    localStorage.setItem('backgroundMusicMuted', 'true')

    // Notify AudioProvider of the change
    window.dispatchEvent(new CustomEvent('audioPermissionChanged', { detail: { muted: true } }))

    // Make sure audio is paused
    const audio = (window as any).globalAudioInstance
    if (audio) {
      audio.pause()
    }

    setShowModal(false)
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="glass border border-border/50 rounded-xl p-8 max-w-md mx-4 text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center">
          <Volume2 className="w-8 h-8 text-primary" />
        </div>

        <h2 className="text-2xl font-serif text-foreground mb-3">
          Enable Background Music?
        </h2>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          This experience features atmospheric music from the Clair Obscur: Expedition 33 soundtrack to enhance your journey.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleEnableMusic}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            <Volume2 size={18} />
            Enable Music
          </button>

          <button
            onClick={handleDecline}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
          >
            <VolumeX size={18} />
            No Thanks
          </button>
        </div>
      </div>
    </div>
  )
}
