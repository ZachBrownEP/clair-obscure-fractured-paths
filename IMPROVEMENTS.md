# Clair Obscur - Improvements Roadmap

Track progress on app enhancements and new features.

---

## 🎯 HIGH IMPACT - Quick Wins

### ⏭️ Deferred
- [ ] **1. Stats Dashboard Page**
  - Total playtime tracking
  - Choices made vs available
  - Most chosen paths with percentages
  - Rarest endings unlocked
  - Character alignment trends over time

### ✅ Completed
- [x] **2. Choice History Viewer**
  - Show all decisions made in current playthrough
  - Display stat/flag changes for each choice
  - Ability to jump back to key decision points
  - Visual branching tree of player's path

- [x] **3. Achievements System**
  - Unlock achievements beyond endings
  - "Completionist" - Unlock all endings for one character
  - "The Balanced" - Reach ending with perfectly balanced stats
  - "Speed Reader" - Complete story in under 30 minutes
  - "Explorer" - Visit 50+ unique nodes
  - Badge display system

### ✅ Completed
- [x] **4. Auto-Save Indicators**
  - Visual "Saved" toast notifications
  - Timestamp of last save
  - Auto-save on every state change with debounced notifications

- [x] **5. Reading Progress Indicators**
  - Chapter progress display (Chapter X of Y)
  - Percentage complete
  - Estimated time remaining
  - Node counter (seen X/Y nodes)

---

## 🎨 VISUAL ENHANCEMENTS

- [ ] **6. Character Portraits**
  - Character art for Verso and Maelle
  - Dynamic expressions based on stat alignment
  - Portrait appears during key story moments
  - Unlockable concept art in codex

- [ ] **7. Choice Preview Tooltips**
  - Hover hints showing stat changes
  - Alignment tendency indicators
  - "Irreversible choice" warnings
  - Rarity indicator (common/rare choice)

- [x] **8. Animated Transitions**
  - Fade effects between story nodes
  - Particle effects for endings
  - Stat change animations
  - Enhanced choice button hover effects with scale and shadow

- [ ] **9. Dark/Light Mode Polish**
  - Unique backgrounds per theme
  - Character-specific color schemes (Verso = paint, Maelle = ink)
  - Smooth color transitions
  - Theme preference saved per character

---

## 📊 STORY FEATURES

- [x] **10. Decision Tree Visualizer**
  - Interactive branching diagram organized by chapters
  - Show visited/unvisited nodes with color coding
  - Highlight player's path through the story
  - Click nodes to see incoming/outgoing choices
  - Export path as JSON data

- [x] **11. "What If" Mode**
  - Create alternate timelines without losing main progress
  - Branch from current progress to explore different paths
  - Manage multiple timelines per route
  - Return to main timeline anytime
  - View timeline stats and progress

- [ ] **12. Character Stat Display**
  - Persistent stat bars (collapsible)
  - Stat milestone notifications
  - Ending prediction based on current stats
  - Active flag tracker

- [x] **13. Story Bookmarks**
  - Bookmark favorite scenes during reading
  - Add personal notes to bookmarks
  - Edit and delete bookmarks
  - View all bookmarks by route
  - Quick access to continue reading from bookmark

- [ ] **14. Codex Auto-Updates**
  - New entries unlock during play
  - "New Entry!" notifications
  - Character relationship diagrams
  - Location details expand as explored

---

## 🔥 ADVANCED FEATURES

- [ ] **15. Ending Rarity System**
  - Show percentage of players who achieved each ending
  - Rarity tiers: Common, Uncommon, Rare, Legendary, Mythic
  - Global stats (requires backend)
  - Rarest ending leaderboard

- [ ] **16. Share Your Story**
  - Generate shareable story summary cards
  - "I achieved X ending!" social posts
  - QR code to your ending
  - Twitter/Discord share buttons
  - Export full playthrough as PDF

- [ ] **17. Story Replay with Notes**
  - Side-by-side playthrough comparison
  - Highlight different choices
  - Show stat changes comparisons
  - "Speedrun mode" - skip seen text

- [ ] **18. Interactive Map Enhancement**
  - Show current location in story
  - Animate journey as player progresses
  - Unlock new map areas through exploration
  - Hidden locations revealed by specific endings

- [ ] **19. Sound Design System**
  - Unique ambient sound per location
  - Sound effects for stat changes
  - Character voice samples
  - Music intensity changes with alignment

- [ ] **20. Mobile App Features**
  - Swipe gestures for choices
  - Offline mode with cached stories
  - Push notifications for new content
  - Haptic feedback on choices

---

## 🎁 BONUS IDEAS (Polish & Delight)

- [ ] **21. Easter Eggs**
  - Hidden nodes accessible only through specific stat combinations
  - Secret endings requiring very specific paths
  - Developer commentary mode

- [ ] **22. New Game+**
  - Carry over one stat or unlock to new playthrough
  - Harder difficulty with more complex choices
  - Bonus endings only available in NG+

- [ ] **23. Time-Limited Events**
  - Special story branches available at certain times
  - Seasonal content
  - Community challenges

- [ ] **24. Character Creator**
  - Customize avatar name and appearance
  - Choose pronouns
  - Appearance reflected in story text

- [ ] **25. Story Difficulty Modes**
  - Casual: More forgiving, easier to unlock endings
  - Normal: Standard experience
  - Hardcore: Permanent consequences, limited saves

---

## 📝 Implementation Notes

### Priority Order
1. ✅ Choice History Viewer (Completed)
2. ✅ Achievements System (Completed)
3. Stats Dashboard
4. Decision Tree Visualizer
5. Everything else based on user feedback

### Technical Stack
- React/Next.js
- TypeScript
- Tailwind CSS
- localStorage for persistence
- Potential backend: Supabase or Firebase for global stats

---

## 🎯 Current Sprint
- [x] Create improvements tracking document
- [x] Implement Choice History Viewer
- [x] Implement Achievements System
- [x] Auto-Save Indicators
- [x] Reading Progress Indicators
- [x] Animated Transitions
- [x] Decision Tree Visualizer
- [x] What If Mode / Timelines
- [x] Story Bookmarks
- [ ] User testing and feedback

Last Updated: 2025-11-17
