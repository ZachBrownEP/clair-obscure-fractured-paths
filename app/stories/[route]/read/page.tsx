'use client'

import { useEffect, useMemo, useState } from 'react'
import { useRouter, useSearchParams, notFound } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight, Home, Gamepad2 } from 'lucide-react'
import { getLinearStory } from '@/lib/story/linearLoader'
import { LinearStoryRoute } from '@/lib/story/linearTypes'
import { motion, AnimatePresence } from 'framer-motion'

interface StoryReaderProps {
  params: {
    route: string
  }
}

export default function StoryReader({ params }: StoryReaderProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Load the story
  const story = useMemo(() => {
    return getLinearStory(params.route as 'verso' | 'maelle')
  }, [params.route])

  if (!story) {
    notFound()
  }

  // Get current chapter/page from URL params or default to first
  const chapterParam = parseInt(searchParams.get('chapter') || '0')
  const pageParam = parseInt(searchParams.get('page') || '1')

  const [currentChapterIndex, setCurrentChapterIndex] = useState(chapterParam)
  const [currentPageNumber, setCurrentPageNumber] = useState(pageParam)

  const currentChapter = story.chapters[currentChapterIndex]
  const currentPage = currentChapter?.pages.find(p => p.pageNumber === currentPageNumber)

  // Calculate total pages across all chapters
  const totalPages = useMemo(() => {
    return story.chapters.reduce((sum, ch) => sum + ch.pages.length, 0)
  }, [story])

  // Calculate absolute page index for progress
  const currentAbsolutePageIndex = useMemo(() => {
    let index = 0
    for (let i = 0; i < currentChapterIndex; i++) {
      index += story.chapters[i].pages.length
    }
    index += currentPageNumber
    return index
  }, [currentChapterIndex, currentPageNumber, story])

  // Update URL when chapter/page changes
  const updateURL = (chapterIndex: number, pageNum: number) => {
    const urlParams = new URLSearchParams()
    urlParams.set('chapter', chapterIndex.toString())
    urlParams.set('page', pageNum.toString())
    router.push(`/stories/${params.route}/read?${urlParams.toString()}`, { scroll: false })
  }

  // Navigation functions
  const goToNextPage = () => {
    if (!currentChapter || !currentPage) return

    const nextPageInChapter = currentChapter.pages.find(
      p => p.pageNumber === currentPageNumber + 1
    )

    if (nextPageInChapter) {
      // Stay in same chapter, next page
      setCurrentPageNumber(currentPageNumber + 1)
      updateURL(currentChapterIndex, currentPageNumber + 1)
    } else {
      // Move to next chapter
      const nextChapter = story.chapters[currentChapterIndex + 1]
      if (nextChapter && nextChapter.pages.length > 0) {
        setCurrentChapterIndex(currentChapterIndex + 1)
        setCurrentPageNumber(1)
        updateURL(currentChapterIndex + 1, 1)
      }
    }
  }

  const goToPreviousPage = () => {
    if (!currentChapter || !currentPage) return

    const prevPageInChapter = currentChapter.pages.find(
      p => p.pageNumber === currentPageNumber - 1
    )

    if (prevPageInChapter) {
      // Stay in same chapter, previous page
      setCurrentPageNumber(currentPageNumber - 1)
      updateURL(currentChapterIndex, currentPageNumber - 1)
    } else {
      // Move to previous chapter's last page
      const prevChapter = story.chapters[currentChapterIndex - 1]
      if (prevChapter && prevChapter.pages.length > 0) {
        const lastPageNum = prevChapter.pages[prevChapter.pages.length - 1].pageNumber
        setCurrentChapterIndex(currentChapterIndex - 1)
        setCurrentPageNumber(lastPageNum)
        updateURL(currentChapterIndex - 1, lastPageNum)
      }
    }
  }

  const goToChapter = (chapterIndex: number) => {
    const targetChapter = story.chapters[chapterIndex]
    if (targetChapter && targetChapter.pages.length > 0) {
      setCurrentChapterIndex(chapterIndex)
      setCurrentPageNumber(1)
      updateURL(chapterIndex, 1)
    }
  }

  // Check if we're at the beginning or end
  const isFirstPage = currentChapterIndex === 0 && currentPageNumber === 1
  const isLastPage =
    currentChapterIndex === story.chapters.length - 1 &&
    currentPageNumber === currentChapter?.pages[currentChapter.pages.length - 1]?.pageNumber

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isLastPage) {
        goToNextPage()
      } else if (e.key === 'ArrowLeft' && !isFirstPage) {
        goToPreviousPage()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentChapterIndex, currentPageNumber, isFirstPage, isLastPage])

  if (!currentChapter || !currentPage) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Chapter or page not found</p>
          <Link href={`/stories/${params.route}`} className="text-primary hover:underline">
            Return to story
          </Link>
        </div>
      </div>
    )
  }

  // Story complete state
  if (isLastPage) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80 flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-10 md:p-16 text-center shadow-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-6">
              Story Complete
            </h1>
            <p className="text-xl text-accent mb-4">
              {story.route.name}
            </p>
            <p className="text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
              You've reached the end of {story.route.character}'s canonical journey.
              Thank you for experiencing this story.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setCurrentChapterIndex(0)
                  setCurrentPageNumber(1)
                  updateURL(0, 1)
                }}
                className="glass px-8 py-4 rounded-lg hover:bg-card/70 transition-all text-foreground hover:text-primary"
              >
                <div className="flex items-center gap-2 justify-center">
                  <ArrowLeft size={20} />
                  <span>Restart from Beginning</span>
                </div>
              </button>

              <Link
                href={`/stories/${params.route}/play`}
                className="glass px-8 py-4 rounded-lg hover:bg-card/70 transition-all text-foreground hover:text-accent"
              >
                <div className="flex items-center gap-2 justify-center">
                  <Gamepad2 size={20} />
                  <span>Try Interactive Path</span>
                </div>
              </Link>

              <Link
                href={`/stories/${params.route}`}
                className="glass px-8 py-4 rounded-lg hover:bg-card/70 transition-all text-foreground hover:text-primary"
              >
                <div className="flex items-center gap-2 justify-center">
                  <Home size={20} />
                  <span>Back to Story</span>
                </div>
              </Link>
            </div>

            {/* Show last page text */}
            <div className="mt-12 pt-12 border-t border-border/30">
              <div className="prose prose-invert max-w-none">
                <p className="text-lg leading-relaxed whitespace-pre-wrap text-left">
                  {currentPage.text}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-background/80">
      <main className="max-w-4xl mx-auto px-4 md:px-8 py-8">
        {/* Back link */}
        <Link
          href={`/stories/${params.route}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm mb-6"
        >
          <ChevronLeft size={18} />
          Back to {story.route.character}
        </Link>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>{story.route.name}</span>
            <span>
              Page {currentAbsolutePageIndex} of {totalPages}
            </span>
          </div>
          <div className="h-1 bg-border/30 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${(currentAbsolutePageIndex / totalPages) * 100}%` }}
            />
          </div>
        </div>

        {/* Chapter navigation pills */}
        <div className="mb-8 overflow-x-auto pb-2">
          <div className="flex gap-2 min-w-max">
            {story.chapters.map((chapter, idx) => {
              const isActive = idx === currentChapterIndex
              const chapterLabel = chapter.number === 0 ? 'Prologue' : `Ch. ${chapter.number}`

              return (
                <button
                  key={chapter.id}
                  onClick={() => goToChapter(idx)}
                  className={`
                    px-4 py-2 rounded-full text-sm font-light transition-all
                    ${isActive
                      ? 'bg-primary text-background'
                      : 'glass text-muted-foreground hover:text-foreground hover:bg-card/70'
                    }
                  `}
                >
                  {chapterLabel}
                </button>
              )
            })}
          </div>
        </div>

        {/* Reading card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentChapter.id}-${currentPage.id}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="glass rounded-3xl p-8 md:p-12 shadow-2xl mb-8"
          >
            {/* Chapter header */}
            <div className="mb-8 pb-6 border-b border-border/30">
              <p className="text-sm text-muted-foreground uppercase tracking-widest mb-2">
                {currentChapter.number === 0 ? 'Prologue' : `Chapter ${currentChapter.number}`}
              </p>
              <h1 className="text-3xl md:text-4xl font-light text-foreground">
                {currentChapter.title}
              </h1>
            </div>

            {/* Page content */}
            <div className="prose prose-invert max-w-none mb-12">
              <div className="text-lg md:text-xl leading-relaxed md:leading-loose whitespace-pre-wrap">
                {currentPage.text}
              </div>
            </div>

            {/* Page navigation footer */}
            <div className="flex items-center justify-between pt-6 border-t border-border/30">
              <button
                onClick={goToPreviousPage}
                disabled={isFirstPage}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg transition-all
                  ${isFirstPage
                    ? 'opacity-30 cursor-not-allowed'
                    : 'glass hover:bg-card/70 text-foreground hover:text-primary'
                  }
                `}
              >
                <ArrowLeft size={20} />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <div className="text-sm text-muted-foreground">
                Page {currentPage.pageNumber} of {currentChapter.pages.length}
              </div>

              <button
                onClick={goToNextPage}
                disabled={isLastPage}
                className={`
                  flex items-center gap-2 px-6 py-3 rounded-lg transition-all
                  ${isLastPage
                    ? 'opacity-30 cursor-not-allowed'
                    : 'glass hover:bg-card/70 text-foreground hover:text-primary'
                  }
                `}
              >
                <span className="hidden sm:inline">Next</span>
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Keyboard hint */}
        <div className="text-center text-sm text-muted-foreground">
          <p className="hidden md:block">
            Use <kbd className="px-2 py-1 bg-card rounded text-xs">←</kbd> and{' '}
            <kbd className="px-2 py-1 bg-card rounded text-xs">→</kbd> arrow keys to navigate
          </p>
        </div>
      </main>
    </div>
  )
}
