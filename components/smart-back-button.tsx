'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'

interface SmartBackButtonProps {
  fallbackUrl?: string
  fallbackLabel?: string
  className?: string
}

export default function SmartBackButton({
  fallbackUrl = '/dashboard',
  fallbackLabel = 'Back',
  className = 'inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm'
}: SmartBackButtonProps) {
  const router = useRouter()

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back()
    } else {
      // Fallback to specified URL
      router.push(fallbackUrl)
    }
  }

  return (
    <button onClick={handleBack} className={className}>
      <ChevronLeft size={18} />
      {fallbackLabel && <span>{fallbackLabel}</span>}
    </button>
  )
}
