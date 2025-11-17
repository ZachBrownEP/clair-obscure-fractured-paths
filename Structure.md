# Clair Obscur: Fractured Paths - Structure Documentation

## Project Overview

**Clair Obscur: Fractured Paths** is a fan-made companion and interactive story application for the game *Clair Obscur: Expedition 33*. This web app offers three main experiences:

1. **Interactive Story System** - Choice-based narratives with branching paths and multiple endings
2. **Linear Story Journeys** - Canon, page-based reading experiences for immersive storytelling
3. **Lore Companion / Codex** - Comprehensive documentation of characters, locations, factions, and magic

The app is designed to extend the world of Clair Obscur beyond the original game, allowing fans to explore additional narratives and deepen their understanding of the lore.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Animations:** Framer Motion
- **Fonts:** Cinzel (serif), Cinzel Decorative (decorative), Geist (sans-serif)
- **Deployment:** Optimized for Vercel

---

## Project Structure

```
clair-obscure-fractured-paths/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with fonts and metadata
│   ├── page.tsx                 # Home page
│   ├── globals.css              # Global styles and CSS variables
│   ├── stories/
│   │   └── [route]/
│   │       ├── page.tsx         # Story route detail page
│   │       └── play/
│   │           └── page.tsx     # Story play page with engine
│   ├── codex/
│   │   └── page.tsx             # Lore codex page
│   ├── map/
│   │   └── page.tsx             # World map page
│   └── endings/
│       └── page.tsx             # Endings gallery page
│
├── components/                   # Reusable React components
│   ├── story/
│   │   └── StoryEngine.tsx      # Main story engine component
│   ├── hero-section.tsx
│   ├── choice-button.tsx
│   ├── alignment-indicator.tsx
│   ├── progress-bar.tsx
│   ├── map-viewer.tsx
│   └── ui/                      # shadcn/ui components
│
├── lib/                          # Utility functions and types
│   ├── story/
│   │   └── types.ts             # TypeScript types for story system
│   └── utils.ts
│
├── data/                         # JSON data files
│   ├── stories/
│   │   ├── verso.json           # Verso's story nodes and metadata
│   │   └── maelle.json          # Maelle's story nodes and metadata
│   ├── linear-story/
│   │   ├── verso_linear.json    # Verso's linear story journey
│   │   └── maelle_linear.json   # Maelle's linear story journey
│   └── codex/
│       └── entries.json         # Codex entries (characters, locations, etc.)
│
└── public/                       # Static assets
```

---

## Routing Structure

### Main Routes

| Route | Purpose |
|-------|---------|
| `/` | Home page with hero section and story/feature cards |
| `/stories/[route]` | Individual story route detail page (`/stories/verso`, `/stories/maelle`) |
| `/stories/[route]/play` | Story playthrough page with interactive engine |
| `/stories/[route]/read` | Linear story reading experience (Story Journey mode) |
| `/codex` | Lore codex with filterable entries |
| `/map` | World map with location information |
| `/endings` | Gallery of all possible story endings |

### Dynamic Routes

- `[route]` parameter accepts: `verso` | `maelle`
- Static generation is configured for both routes via `generateStaticParams()`

---

## Story System

### How It Works

The story system is a **node-based narrative engine** where each scene (node) presents story text and multiple choices. Choices lead to other nodes, and some nodes are endings.

### Data Structure

Stories are defined in JSON files (`/data/stories/*.json`):

```json
{
  "route": {
    "id": "verso",
    "name": "The Fractured Canvas",
    "startNodeId": "verso_ch1_intro",
    "totalChapters": 12
  },
  "nodes": [
    {
      "id": "verso_ch1_intro",
      "route": "verso",
      "chapter": 1,
      "title": "Rain and Remembrance",
      "text": "Story text here...",
      "choices": [
        {
          "id": "choice1",
          "label": "Choice text",
          "nextId": "verso_ch1_next_node",
          "effects": [
            { "type": "stat", "key": "painterAlignment", "delta": 5 }
          ]
        }
      ]
    }
  ]
}
```

### Key Concepts

**Nodes** (`StoryNode`):
- `id`: Unique identifier
- `chapter`: Chapter number
- `text`: Narrative content
- `choices`: Array of available choices
- `isEnding`: Boolean flag for ending nodes
- `endingKey`: Unique key for tracking unlocked endings

**Choices** (`StoryChoice`):
- `id`: Choice identifier
- `label`: Text shown to player
- `nextId`: ID of next node to navigate to
- `effects`: Optional array of stat/flag changes
- `condition`: Optional visibility condition

**Effects** (`StoryChoiceEffect`):
- **Stat effects**: Modify alignment scores (Painter, Writer, Compassion)
- **Flag effects**: Set boolean flags for branching logic

**State** (`StoryState`):
- `currentNodeId`: Current position in story
- `stats`: Alignment scores (0-100)
- `flags`: Boolean flags for conditional branching
- `seenNodes`: History of visited nodes
- `currentChapter`: Current chapter number

### Story Engine Component

Location: `/components/story/StoryEngine.tsx`

Responsibilities:
- Load story nodes from JSON
- Manage player state (stats, flags, current node)
- Render current node text and choices
- Handle choice selection and state updates
- Display alignment indicators and progress
- Handle ending conditions and restart

---

## Adding New Story Content

### Adding New Nodes

1. Open the appropriate story JSON file (`/data/stories/verso.json` or `maelle.json`)
2. Add new node objects to the `nodes` array:

```json
{
  "id": "unique_node_id",
  "route": "verso",
  "chapter": 2,
  "title": "Scene Title",
  "text": "Your narrative text...",
  "choices": [
    {
      "id": "choice_id",
      "label": "Choice text for player",
      "nextId": "next_node_id",
      "effects": [
        { "type": "stat", "key": "painterAlignment", "delta": 5 }
      ]
    }
  ]
}
```

3. Ensure `nextId` values reference valid node IDs
4. For ending nodes, add:
```json
{
  "isEnding": true,
  "endingKey": "unique_ending_key",
  "endingTitle": "Ending Title"
}
```

### Adding New Story Routes

1. Create new JSON file in `/data/stories/your-route.json`
2. Add route to type definition in `/lib/story/types.ts`:
```typescript
export type StoryRouteId = "verso" | "maelle" | "your-route";
```
3. Add route metadata to `/app/stories/[route]/page.tsx` in the `routes` object
4. Add to `generateStaticParams()` in both `page.tsx` files
5. Update home page (`/app/page.tsx`) to display new route card

---

## Linear Story Journeys

### Overview

Linear Story Journeys provide a **canon, page-based reading experience** that complements the interactive branching story system. Unlike the choice-driven Interactive Path, Story Journeys present a fixed narrative divided into chapters and pages, allowing readers to immerse themselves in the complete canonical story at their own pace.

### Key Differences from Interactive Stories

| Feature | Interactive Path | Story Journey |
|---------|-----------------|---------------|
| **Format** | Node-based with choices | Chapter and page-based |
| **Navigation** | Choice selection | Previous/Next page |
| **Endings** | Multiple based on choices | Single canonical ending |
| **Alignment** | Tracked (Painter, Writer, Compassion) | No tracking |
| **Purpose** | Branching exploration | Linear storytelling |

### Data Structure

Linear stories are stored in `/data/linear-story/` as JSON files:

```json
{
  "route": {
    "id": "verso_linear",
    "baseRouteId": "verso",
    "name": "The Fractured Canvas (Verso – Canon Route)",
    "character": "Verso",
    "subtitle": "A journey through painted realities",
    "description": "Follow Verso's canonical journey...",
    "totalChapters": 4
  },
  "chapters": [
    {
      "id": "verso_prologue",
      "number": 0,
      "title": "PROLOGUE — The World After Collapse",
      "pages": [
        {
          "id": "verso_prologue_p1",
          "pageNumber": 1,
          "text": "The rain had not stopped for three days..."
        },
        {
          "id": "verso_prologue_p2",
          "pageNumber": 2,
          "text": "You're pushing too hard..."
        }
      ]
    },
    {
      "id": "verso_ch1",
      "number": 1,
      "title": "CHAPTER 1 — The Return to Lumière",
      "pages": [
        {
          "id": "verso_ch1_p1",
          "pageNumber": 1,
          "text": "Lumière looked different..."
        }
      ]
    }
  ]
}
```

### File Locations

- **Types**: `/lib/story/linearTypes.ts` - TypeScript interfaces for linear stories
- **Loader**: `/lib/story/linearLoader.ts` - Functions to load and access linear story data
- **Data Files**:
  - `/data/linear-story/verso_linear.json` - Verso's canonical story
  - `/data/linear-story/maelle_linear.json` - Maelle's canonical story
- **Reading UI**: `/app/stories/[route]/read/page.tsx` - The reading experience page

### TypeScript Types

```typescript
export interface LinearPage {
  id: string          // Unique page identifier (e.g., "verso_ch1_p1")
  pageNumber: number  // Page number within chapter (1-indexed)
  text: string        // Page content (supports line breaks via \n)
}

export interface LinearChapter {
  id: string          // Unique chapter identifier
  number: number      // Chapter number (0 for prologue, 1+ for chapters)
  title: string       // Chapter title (e.g., "CHAPTER 1 — The Return to Lumière")
  pages: LinearPage[]
}

export interface LinearRouteMeta {
  id: string          // Full route ID (e.g., "verso_linear")
  baseRouteId: string // Base route (e.g., "verso" or "maelle")
  name: string        // Full story name
  character: string   // Character name
  subtitle?: string   // Optional subtitle
  description?: string // Story description
  totalChapters: number // Total number of chapters
}

export interface LinearStoryRoute {
  route: LinearRouteMeta
  chapters: LinearChapter[]
}
```

### Reading Experience Features

The reading UI (`/stories/[route]/read`) provides:

1. **Chapter Navigation**
   - Horizontal chapter pills (Prologue, Ch. 1, Ch. 2, etc.)
   - Click any chapter to jump to its first page
   - Current chapter highlighted

2. **Page Navigation**
   - Previous/Next buttons with disabled states at boundaries
   - Automatic chapter transitions (last page → next chapter's first page)
   - Keyboard shortcuts: ← (previous) and → (next)

3. **Progress Tracking**
   - Visual progress bar showing position across all pages
   - "Page X of Y" display for current chapter
   - Overall "Page X of Y" for entire story

4. **Animations**
   - Smooth fade-in/slide-up transitions between pages (Framer Motion)
   - Hover effects on navigation buttons
   - Chapter pill transitions

5. **URL Deep Linking**
   - URL params track current position: `?chapter=1&page=3`
   - Shareable links to specific pages
   - Browser back/forward support

6. **Story Complete Screen**
   - Special end state when reaching the final page
   - Options to:
     - Restart from beginning
     - Try Interactive Path
     - Return to character page

### Adding New Linear Story Content

#### For Writers (No Code Required)

To add more content to an existing linear story:

1. **Open the JSON file**: `/data/linear-story/verso_linear.json` or `maelle_linear.json`

2. **To add a new chapter**:
```json
{
  "id": "verso_ch4",
  "number": 4,
  "title": "CHAPTER 4 — Your Chapter Title",
  "pages": [
    {
      "id": "verso_ch4_p1",
      "pageNumber": 1,
      "text": "Your story text here...\n\nUse \\n for line breaks."
    }
  ]
}
```

3. **To add pages to an existing chapter**:
   - Find the chapter in the `chapters` array
   - Add new page objects to the `pages` array:
```json
{
  "id": "verso_ch1_p5",
  "pageNumber": 5,
  "text": "New page content..."
}
```

4. **Update `totalChapters`** in the `route` object if adding chapters

5. **Formatting Guidelines**:
   - Use `\n` for single line breaks
   - Use `\n\n` for paragraph breaks
   - Keep pages to a comfortable reading length (300-600 words)
   - Number pages sequentially within each chapter (1, 2, 3...)
   - Number chapters sequentially (0 for Prologue, 1, 2, 3...)

#### For Developers

To add a new character's linear story:

1. **Create JSON file**: `/data/linear-story/character_linear.json`
2. **Add to loader**: `/lib/story/linearLoader.ts`
```typescript
import characterLinear from '@/data/linear-story/character_linear.json'

const linearStories: Record<string, LinearStoryRoute> = {
  verso: versoLinear as LinearStoryRoute,
  maelle: maelleLinear as LinearStoryRoute,
  character: characterLinear as LinearStoryRoute, // Add this
}
```
3. **Update route types** if needed
4. The UI will automatically support the new story

### Accessing Linear Stories

```typescript
// Check if a linear story exists for a route
import { hasLinearStory } from '@/lib/story/linearLoader'
if (hasLinearStory('verso')) {
  // Story exists
}

// Load a linear story
import { getLinearStory } from '@/lib/story/linearLoader'
const story = getLinearStory('verso')

// Get all linear story summaries
import { getAllLinearStorySummaries } from '@/lib/story/linearLoader'
const summaries = getAllLinearStorySummaries()
```

### UI Integration

Linear stories are presented alongside interactive stories:

- **Story detail pages** (`/stories/[route]`) show two options:
  - **Interactive Path** → `/stories/[route]/play`
  - **Story Journey** → `/stories/[route]/read`

- If no linear story exists for a route, the Story Journey option shows "Coming soon"

---

## Codex System

### How It Works

The codex is a filterable database of lore entries organized by category.

### Data Location

`/data/codex/entries.json` - Single JSON file with all entries

### Entry Structure

```json
{
  "id": "unique-id",
  "name": "Entry Name",
  "category": "character" | "location" | "faction" | "magic" | "event",
  "tags": ["tag1", "tag2"],
  "shortDescription": "Brief description for list view",
  "fullDescription": "Detailed description for detail view"
}
```

### Adding New Codex Entries

1. Open `/data/codex/entries.json`
2. Add new entry object to the array:
```json
{
  "id": "new-entry-id",
  "name": "Entry Name",
  "category": "character",
  "tags": ["Relevant", "Tags"],
  "shortDescription": "One sentence description",
  "fullDescription": "Full detailed lore description with multiple sentences."
}
```

3. Entries will automatically appear in the codex, filterable by category
4. Related entries are automatically suggested based on shared tags

---

## Styling & Theme

### Color Palette

The app uses a dark fantasy aesthetic inspired by the Clair Obscur: Expedition 33 visual style:

- **Background**: Deep charcoal/black (`oklch(0.10 0.005 280)`)
- **Primary**: Antiqued gold (`oklch(0.72 0.10 75)`)
- **Accent**: Teal/cyan glow (`oklch(0.60 0.08 200)`)
- **Secondary**: Atmospheric gray-blue (`oklch(0.42 0.04 240)`)

### Typography

- **Headings**: Cinzel (serif) - elegant, classical feel
- **Decorative**: Cinzel Decorative - for title text
- **Body**: Geist (sans-serif) - modern readability

### Custom Styles

Defined in `/app/globals.css`:

- `.glass` - Glassmorphism effect for cards
- `.text-gold` - Gold text with subtle glow
- `.font-decorative` - Decorative font with increased letter spacing

---

## Running the Project

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Production

```bash
npm start
```

---

## State Management & Persistence

### ✅ Implemented Features

The app now includes full localStorage persistence for story progress and ending unlocks.

### Story Progress Persistence

**Location:** `/lib/story/persistence.ts`

Each story route saves progress automatically:

- **What's saved per route:**
  - Current node ID
  - Alignment stats (Painter, Writer, Compassion)
  - Flags set by choices
  - Seen nodes history
  - Current chapter

- **Storage key format:** `fractured_paths_route_{routeId}`

**How it works:**

1. On page load, `StoryEngine` checks for saved progress:
```typescript
const [state, setState] = useState<StoryState>(() =>
  loadStoryState(routeId, startNodeId)
)
```

2. Every state change auto-saves to localStorage:
```typescript
useEffect(() => {
  saveStoryState(state)
}, [state])
```

3. **Restart button** clears saved progress:
```typescript
const handleRestart = () => {
  clearStoryState(routeId)
  setState(getInitialState(routeId, startNodeId))
}
```

### Ending Unlock Tracking

**Location:** `/lib/story/persistence.ts`

When a player reaches an ending node (`isEnding: true`), it's automatically unlocked:

```typescript
// In StoryEngine.tsx
if (nextNode?.isEnding && nextNode.endingKey) {
  unlockEnding(routeId, nextNode.endingKey)
}
```

**Data structure:**
```typescript
interface EndingUnlock {
  route: StoryRouteId
  endingKey: string
  unlockedAt: string // ISO timestamp
}
```

**Storage key:** `fractured_paths_endings`

**Unlocked endings are:**
- Stored as an array in localStorage
- Idempotent (no duplicates)
- Persistent across all routes
- Displayed in the `/endings` gallery

### Endings Gallery Integration

**Location:** `/app/endings/page.tsx`

The endings page uses `useEndingsProgress` hook to:

1. Load all unlocked endings from localStorage
2. Display locked vs unlocked states
3. Show unlock counts: "3/7 Unlocked"

**Locked endings show:**
- "???" as title
- Generic "Complete this path to unlock" message
- Lock icon

**Unlocked endings show:**
- Full title and description
- CheckCircle icon
- "Experience again →" link

### SSR Handling

All localStorage access is SSR-safe:

```typescript
const isClient = typeof window !== 'undefined'

if (!isClient) return getInitialState(...)
```

This prevents errors during Next.js server-side rendering.

### Adding New Endings

To add a new ending:

1. **In story JSON**, create an ending node:
```json
{
  "id": "new_ending_node",
  "route": "verso",
  "chapter": 5,
  "isEnding": true,
  "endingKey": "verso_new_ending",
  "endingTitle": "The New Path",
  "text": "Your ending narrative...",
  "choices": []
}
```

2. **In `/app/endings/page.tsx`**, add metadata to `ENDINGS_METADATA`:
```typescript
{
  key: 'verso_new_ending',
  route: 'verso',
  title: 'The New Path',
  description: 'Description shown after unlock...'
}
```

That's it! The ending will auto-unlock when reached and appear in the gallery.

---

## UI Features

### Alignment Indicators

The story play page shows three alignment stats as progress bars:

- **Painter** (gold/primary) - Choices favoring artistic creation and imagination
- **Writer** (teal/accent) - Choices favoring truth-seeking and documentation
- **Compassion** (gray-blue/secondary) - Choices showing empathy and connection

**Display:**
- Shown below the route title during story play
- Three horizontal bars with numeric values (0-100)
- Updated in real-time as choices affect stats
- Hidden on ending screens

**Implementation:**
```typescript
<div className="grid grid-cols-3 gap-4">
  {/* Painter, Writer, Compassion bars */}
</div>
```

---

## Future TODOs

### ✅ Completed
- [x] **Phase 1**: Interactive story system with branching paths and choices
- [x] **Phase 2**: Save/Load system, ending tracking, and UI polish
- [x] **Phase 3**: Linear Story Journeys - Canon reading mode with chapters and pages

### High Priority
- [ ] **Chapter 2+ Content**: Expand Verso and Maelle stories beyond Chapter 1
- [ ] **Responsive Testing**: Comprehensive mobile/tablet testing and refinement
- [ ] **Continue vs Start**: Show "Continue" on home page if saved progress exists

### Medium Priority
- [ ] **Animations**: Add page transitions and choice selection animations
- [ ] **Sound Design**: Background music and sound effects
- [ ] **Achievement System**: Track player choices and play style beyond endings
- [ ] **Character Portraits**: Add visual character art to story nodes
- [ ] **Map Interactivity**: Make world map clickable with location navigation
- [ ] **Stats Dashboard**: Page showing player's overall alignment trends

### Low Priority
- [ ] **Multiple Language Support**: i18n for story content
- [ ] **Export Progress**: Allow users to export/import save data
- [ ] **Social Sharing**: Share endings or story moments
- [ ] **Analytics**: Track popular story paths and endings (privacy-respecting)

---

## Key Files Reference

### Types & Utilities
- `/lib/story/types.ts` - TypeScript interfaces for interactive story system
- `/lib/story/linearTypes.ts` - TypeScript interfaces for linear story system
- `/lib/story/linearLoader.ts` - Loader functions for linear stories
- `/lib/story/persistence.ts` - localStorage utilities for progress and endings
- `/lib/hooks/useEndingsProgress.ts` - React hook for endings gallery

### Components
- `/components/story/StoryEngine.tsx` - Main story engine with persistence
- `/components/choice-button.tsx` - Choice button with alignment indicators
- `/components/alignment-indicator.tsx` - Shows painter/writer scores
- `/components/progress-bar.tsx` - Chapter progress bar

### Data
- `/data/stories/verso.json` - Verso's interactive story (3 endings)
- `/data/stories/maelle.json` - Maelle's interactive story (4 endings)
- `/data/linear-story/verso_linear.json` - Verso's linear story journey
- `/data/linear-story/maelle_linear.json` - Maelle's linear story journey
- `/data/codex/entries.json` - All codex entries (19 entries)

### Pages
- `/app/page.tsx` - Home page
- `/app/stories/[route]/page.tsx` - Story detail with mode selection
- `/app/stories/[route]/play/page.tsx` - Interactive story playthrough with engine
- `/app/stories/[route]/read/page.tsx` - Linear story reading experience
- `/app/codex/page.tsx` - Lore codex with filters
- `/app/map/page.tsx` - World map
- `/app/endings/page.tsx` - Endings gallery with unlock tracking

---

## Contributing

When adding content:

1. **Maintain tone**: Keep the dark fantasy, literary style consistent
2. **Test thoroughly**: Ensure all `nextId` references are valid
3. **Balance choices**: Provide meaningful alternatives, not just flavor
4. **Update docs**: If adding new systems, update this Structure.md

---

## Credits

- **Inspired by**: Clair Obscur: Expedition 33 by Sandfall Interactive
- **Built with**: Next.js, React, TypeScript, Tailwind CSS
- **Font**: Cinzel by Natanael Gama

This is a fan-made, non-commercial project created out of love for the Clair Obscur universe.
