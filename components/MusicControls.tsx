'use client'

import { Volume2, VolumeX } from 'lucide-react'
import { useAudio } from './AudioProvider'

export default function MusicControls() {
  const { isMuted, toggleMute } = useAudio()

  return (
    <button
      onClick={toggleMute}
      className="fixed top-4 right-4 z-[60] glass p-3 rounded-full hover:bg-card/70 transition-all group will-change-transform"
      style={{ position: 'fixed' }}
      aria-label={isMuted ? 'Unmute background music' : 'Mute background music'}
      title={isMuted ? 'Play background music' : 'Pause background music'}
    >
      {isMuted ? (
        <VolumeX size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
      ) : (
        <Volume2 size={20} className="text-primary group-hover:text-accent transition-colors" />
      )}
    </button>
  )
}
