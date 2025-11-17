# Clair Obscur: Fractured Paths - Structure Documentation

## Project Overview

**Clair Obscur: Fractured Paths** is a fan-made companion and interactive story application for the game *Clair Obscur: Expedition 33*. This web app offers two main experiences:

1. **Interactive Story System** - Choice-based narratives with branching paths and multiple endings
2. **Lore Companion / Codex** - Comprehensive documentation of characters, locations, factions, and magic

The app is designed to extend the world of Clair Obscur beyond the original game, allowing fans to explore additional narratives and deepen their understanding of the lore.

---

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **UI Components:** Radix UI
- **Icons:** Lucide React
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

### ✅ Completed in Phase 2
- [x] **Save/Load System**: Persist story progress to localStorage
- [x] **Ending Tracking**: Unlock endings in `/endings` page based on completed routes
- [x] **UI Polish**: Enhanced alignment indicators and ending screens

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
- `/lib/story/types.ts` - All TypeScript interfaces for story system
- `/lib/story/persistence.ts` - localStorage utilities for progress and endings
- `/lib/hooks/useEndingsProgress.ts` - React hook for endings gallery

### Components
- `/components/story/StoryEngine.tsx` - Main story engine with persistence
- `/components/choice-button.tsx` - Choice button with alignment indicators
- `/components/alignment-indicator.tsx` - Shows painter/writer scores
- `/components/progress-bar.tsx` - Chapter progress bar

### Data
- `/data/stories/verso.json` - Verso's complete story (3 endings)
- `/data/stories/maelle.json` - Maelle's complete story (4 endings)
- `/data/codex/entries.json` - All codex entries (19 entries)

### Pages
- `/app/page.tsx` - Home page
- `/app/stories/[route]/page.tsx` - Story detail
- `/app/stories/[route]/play/page.tsx` - Story playthrough with engine
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
