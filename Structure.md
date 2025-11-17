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

### Current Implementation

- **In-memory state**: Story progress is tracked during a session
- **No persistence**: Progress resets on page reload

### Future Enhancement

To add localStorage persistence:

1. Create a hook `/lib/hooks/useStoryProgress.ts`:
```typescript
export function useStoryProgress(routeId: StoryRouteId) {
  const [state, setState] = useState<StoryState>(() => {
    const saved = localStorage.getItem(`story-${routeId}`)
    return saved ? JSON.parse(saved) : getInitialState(routeId)
  })

  useEffect(() => {
    localStorage.setItem(`story-${routeId}`, JSON.stringify(state))
  }, [state, routeId])

  return [state, setState]
}
```

2. Update `StoryEngine` to use this hook instead of plain `useState`

---

## Future TODOs

### High Priority
- [ ] **Save/Load System**: Persist story progress to localStorage
- [ ] **Ending Tracking**: Unlock endings in `/endings` page based on completed routes
- [ ] **Responsive Polish**: Test and refine mobile experience
- [ ] **Chapter 2+ Content**: Expand Verso and Maelle stories beyond Chapter 1

### Medium Priority
- [ ] **Animations**: Add page transitions and choice selection animations
- [ ] **Sound Design**: Background music and sound effects
- [ ] **Achievement System**: Track player choices and play style
- [ ] **Character Portraits**: Add visual character art to story nodes
- [ ] **Map Interactivity**: Make world map clickable with location navigation

### Low Priority
- [ ] **Multiple Language Support**: i18n for story content
- [ ] **Dark/Light Mode Toggle**: Despite dark theme being primary
- [ ] **Social Sharing**: Share endings or story moments
- [ ] **Analytics**: Track popular story paths and endings

---

## Key Files Reference

### Types
- `/lib/story/types.ts` - All TypeScript interfaces for story system

### Components
- `/components/story/StoryEngine.tsx` - Main story engine
- `/components/choice-button.tsx` - Choice button with alignment indicators
- `/components/alignment-indicator.tsx` - Shows painter/writer scores
- `/components/progress-bar.tsx` - Chapter progress bar

### Data
- `/data/stories/verso.json` - Verso's complete story
- `/data/stories/maelle.json` - Maelle's complete story
- `/data/codex/entries.json` - All codex entries

### Pages
- `/app/page.tsx` - Home page
- `/app/stories/[route]/page.tsx` - Story detail
- `/app/stories/[route]/play/page.tsx` - Story playthrough
- `/app/codex/page.tsx` - Lore codex
- `/app/map/page.tsx` - World map
- `/app/endings/page.tsx` - Endings gallery

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
