'use client'

import { useState } from 'react'
import { ChevronLeft, RotateCcw } from 'lucide-react'
import ChoiceButton from './choice-button'
import AlignmentIndicator from './alignment-indicator'
import ProgressBar from './progress-bar'

interface Choice {
  id: string
  text: string
  alignment?: 'painter' | 'writer'
}

interface StoryChapter {
  id: string
  title: string
  chapterNumber: number
  totalChapters: number
  text: string
  choices: Choice[]
}

interface StoryReaderProps {
  chapter: StoryChapter
  onChoice?: (choiceId: string) => void
  onBack?: () => void
  onRestart?: () => void
  painterScore?: number
  writerScore?: number
}

export default function StoryReader({
  chapter,
  onChoice,
  onBack,
  onRestart,
  painterScore = 50,
  writerScore = 50,
}: StoryReaderProps) {
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null)

  const handleChoice = (choiceId: string) => {
    setSelectedChoice(choiceId)
    setTimeout(() => {
      onChoice?.(choiceId)
      setSelectedChoice(null)
    }, 300)
  }

  const progressPercent = (chapter.chapterNumber / chapter.totalChapters) * 100

  return (
    <div className="min-h-screen bg-background py-8 md:py-16 px-4">
      <ProgressBar current={chapter.chapterNumber} total={chapter.totalChapters} />

      <div className="max-w-3xl mx-auto">
        <div className="glass rounded-2xl p-8 md:p-12">
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-border/30">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
            >
              <ChevronLeft size={18} />
              Back to routes
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={onRestart}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm"
              >
                <RotateCcw size={18} />
                Restart
              </button>
            </div>
          </div>

          <div className="flex gap-6 mb-8">
            <AlignmentIndicator
              type="painter"
              score={painterScore}
              label="Painter"
            />
            <AlignmentIndicator
              type="writer"
              score={writerScore}
              label="Writer"
            />
          </div>

          <div className="mb-12">
            <p className="text-xs tracking-widest text-muted-foreground uppercase mb-3">
              {chapter.title} • Chapter {chapter.chapterNumber} of {chapter.totalChapters}
            </p>

            <h1 className="text-4xl font-light text-foreground mb-8 leading-relaxed">
              {/* Placeholder chapter title */}
            </h1>

            <p className="text-lg leading-relaxed text-foreground mb-6 whitespace-pre-wrap">
              {chapter.text}
            </p>
          </div>

          <div className="space-y-3 pt-8 border-t border-border/30">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4">
              What do you do?
            </p>

            {chapter.choices.map((choice) => (
              <ChoiceButton
                key={choice.id}
                text={choice.text}
                alignment={choice.alignment}
                onClick={() => handleChoice(choice.id)}
                isSelected={selectedChoice === choice.id}
              />
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between text-sm text-muted-foreground">
          <span>Chapter {chapter.chapterNumber} of {chapter.totalChapters}</span>
          <span>{progressPercent.toFixed(0)}% complete</span>
        </div>
      </div>
    </div>
  )
}
