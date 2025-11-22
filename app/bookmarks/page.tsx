'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Bookmark as BookmarkIcon, Trash2, Edit2, Save, X } from 'lucide-react'
import { loadBookmarks, removeBookmark, updateBookmarkNote, Bookmark } from '@/lib/story/persistence'
import EnhancedBackground from '@/components/enhanced-background'
import NavigationSidebar from '@/components/navigation-sidebar'
import SmartBackButton from '@/components/smart-back-button'

export default function BookmarksPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [filter, setFilter] = useState<'all' | 'verso' | 'maelle'>('all')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editNote, setEditNote] = useState('')
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    loadAllBookmarks()
  }, [])

  const loadAllBookmarks = () => {
    const all = loadBookmarks()
    setBookmarks(all)
  }

  const handleDelete = (id: string) => {
    removeBookmark(id)
    loadAllBookmarks()
  }

  const handleStartEdit = (bookmark: Bookmark) => {
    setEditingId(bookmark.id)
    setEditNote(bookmark.note || '')
  }

  const handleSaveNote = (id: string) => {
    updateBookmarkNote(id, editNote)
    setEditingId(null)
    loadAllBookmarks()
  }

  const filteredBookmarks = filter === 'all'
    ? bookmarks
    : bookmarks.filter(b => b.route === filter)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (!isClient) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <EnhancedBackground />
      <NavigationSidebar />
      <div className="relative z-10 pt-20">
        {/* Header */}
        <header className="glass sticky top-20 z-20 border-b border-border/30">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-muted-foreground hover:text-primary transition-colors">
                  <SmartBackButton
                    fallbackLabel=""
                    className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-light text-foreground flex items-center gap-2">
                    <BookmarkIcon size={24} className="text-amber-500" />
                    Bookmarks
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    Your favorite scenes and moments
                  </p>
                </div>
              </div>

              {/* Filter */}
              <div className="flex items-center gap-2">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value as typeof filter)}
                  className="glass px-3 py-1.5 rounded text-sm border border-border/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="all">All Routes</option>
                  <option value="verso">Verso Only</option>
                  <option value="maelle">Maelle Only</option>
                </select>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-5xl mx-auto px-4 md:px-8 py-8">
          {filteredBookmarks.length === 0 ? (
            <div className="glass rounded-xl p-12 text-center">
              <BookmarkIcon size={48} className="mx-auto text-muted-foreground/50 mb-4" />
              <h2 className="text-xl font-light text-foreground mb-2">
                No Bookmarks Yet
              </h2>
              <p className="text-muted-foreground mb-6">
                Bookmark your favorite scenes while reading to save them here
              </p>
              <Link
                href="/dashboard"
                className="inline-block glass px-6 py-2 rounded-lg hover:bg-card/70 transition-all text-primary"
              >
                Start Reading
              </Link>
            </div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <div className="glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-light text-amber-500 mb-1">
                    {bookmarks.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Bookmarks
                  </div>
                </div>
                <div className="glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-light text-amber-500 mb-1">
                    {bookmarks.filter(b => b.route === 'verso').length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Verso Bookmarks
                  </div>
                </div>
                <div className="glass rounded-lg p-4 text-center">
                  <div className="text-3xl font-light text-amber-500 mb-1">
                    {bookmarks.filter(b => b.route === 'maelle').length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Maelle Bookmarks
                  </div>
                </div>
              </div>

              {/* Bookmarks List */}
              <div className="space-y-4">
                {filteredBookmarks
                  .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .map((bookmark) => (
                    <div
                      key={bookmark.id}
                      className="glass rounded-lg p-5 hover:bg-card/70 transition-all"
                    >
                      {/* Header */}
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <BookmarkIcon size={16} className="text-amber-500" />
                            <span className="text-xs font-mono px-2 py-0.5 rounded bg-primary/10 text-primary">
                              {bookmark.route === 'verso' ? "Verso's Story" : "Maelle's Story"}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              • Chapter {bookmark.chapter}
                            </span>
                          </div>
                          {bookmark.nodeTitle && (
                            <h3 className="text-lg font-light text-foreground mb-2">
                              {bookmark.nodeTitle}
                            </h3>
                          )}
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <button
                            onClick={() => handleStartEdit(bookmark)}
                            className="p-2 rounded hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
                            title="Edit note"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(bookmark.id)}
                            className="p-2 rounded hover:bg-destructive/20 transition-colors text-muted-foreground hover:text-destructive"
                            title="Delete bookmark"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* Quote */}
                      {bookmark.quote && (
                        <div className="mb-3 pl-4 border-l-2 border-amber-500/30">
                          <p className="text-sm text-muted-foreground italic">
                            "{bookmark.quote}..."
                          </p>
                        </div>
                      )}

                      {/* Note */}
                      {editingId === bookmark.id ? (
                        <div className="mb-3">
                          <textarea
                            value={editNote}
                            onChange={(e) => setEditNote(e.target.value)}
                            placeholder="Add your thoughts..."
                            className="w-full glass p-3 rounded text-sm border border-border/30 focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[80px]"
                          />
                          <div className="flex items-center gap-2 mt-2">
                            <button
                              onClick={() => handleSaveNote(bookmark.id)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded bg-primary/20 text-primary hover:bg-primary/30 text-sm"
                            >
                              <Save size={14} />
                              Save
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="flex items-center gap-1 px-3 py-1.5 rounded hover:bg-muted/50 text-sm"
                            >
                              <X size={14} />
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : bookmark.note ? (
                        <div className="mb-3 p-3 rounded bg-muted/20">
                          <p className="text-sm text-foreground whitespace-pre-wrap">{bookmark.note}</p>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(bookmark)}
                          className="text-xs text-muted-foreground hover:text-primary transition-colors mb-3"
                        >
                          + Add a note
                        </button>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/30">
                        <span>{formatDate(bookmark.createdAt)}</span>
                        <Link
                          href={`/stories/${bookmark.route}/play`}
                          className="text-primary hover:text-primary/80 transition-colors"
                        >
                          Continue Reading →
                        </Link>
                      </div>
                    </div>
                  ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
