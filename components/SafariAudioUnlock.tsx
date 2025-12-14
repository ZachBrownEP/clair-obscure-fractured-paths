'use client'

import { useEffect, useRef } from 'react'

/**
 * Invisible component that unlocks Safari audio autoplay on first user interaction.
 * Listens for any gesture (scroll, touch, click, pointer, keydown) and plays the global audio.
 */
export function SafariAudioUnlock() {
  const unlockedRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (unlockedRef.current) return

    const unlockAudio = async (eventType: string) => {
      if (unlockedRef.current) return

      // Check if user has granted permission
      const permissionAsked = localStorage.getItem('audioPermissionAsked')
      if (!permissionAsked) {
        // First visit - let the modal handle it
        return
      }

      // Check localStorage preference before unmuting
      const savedMuteState = localStorage.getItem('backgroundMusicMuted')
      const shouldBeMuted = savedMuteState === 'true'

      if (shouldBeMuted) {
        console.log('⏸ User preference: muted - not unlocking audio')
        return
      }

      console.log(`🔓 Safari unlock: ${eventType} detected, attempting to unlock audio...`)

      // Try to access the global AudioProvider instance (programmatically created)
      if (typeof window !== 'undefined' && (window as any).globalAudioInstance) {
        const audio = (window as any).globalAudioInstance
        try {
          // Unmute and set volume
          audio.muted = false
          audio.volume = 0.3
          await audio.play()
          console.log(`✓ Safari unlock SUCCESS via ${eventType}!`)
          unlockedRef.current = true
          cleanup()
        } catch (error) {
          console.log(`⚠ Safari unlock failed via ${eventType}:`, error)
        }
      }

      // Also try DOM audio elements
      const audioElements = document.querySelectorAll('audio')
      for (const audio of audioElements) {
        try {
          if (audio.muted) {
            audio.muted = false
            audio.volume = 0.3
          }
          await audio.play()
        } catch (error) {
          // Ignore
        }
      }
    }

    // ONLY use events that grant "user activation" in Safari
    // scroll/wheel/move events do NOT grant activation and will fail
    const events = [
      'click',
      'mousedown',
      'touchstart',
      'touchend',
      'pointerup',
      'keydown'
    ] as const

    const handlers: Array<() => void> = []

    events.forEach(eventName => {
      const handler = () => unlockAudio(eventName)
      window.addEventListener(eventName, handler, { passive: true })
      handlers.push(() => window.removeEventListener(eventName, handler))
    })

    const cleanup = () => {
      handlers.forEach(remove => remove())
    }

    return cleanup
  }, [])

  return null // Invisible component
}
