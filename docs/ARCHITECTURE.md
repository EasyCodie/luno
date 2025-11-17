# Luno Architecture

This document describes the technical architecture of Luno, a Chrome extension for instant word definitions.

## Overview

Luno is a Chrome Manifest V3 extension built with React, TypeScript, and Vite. It consists of two main parts:
1. **Background service worker** - Handles API calls, context menu, and storage
2. **Popup UI** - React-based interface for searching and viewing definitions

## High-Level Architecture

```
┌──────────────────────────────────────────┐
│           User Actions                    │
├──────────────────────────────────────────┤
│ • Click extension icon                    │
│ • Right-click selected text               │
│ • Use keyboard shortcut (Ctrl+Shift+L)   │
└─────────────┬────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────┐
│      Background Service Worker            │
│  (src/background.ts)                      │
├──────────────────────────────────────────┤
│ • Context menu registration               │
│ • Dictionary API integration              │
│ • History persistence                     │
│ • Message handling from popup             │
│ • Storage state management                │
└─────────────┬────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────┐
│        Chrome Storage API                 │
│  (chrome.storage.local)                   │
├──────────────────────────────────────────┤
│ • currentDefinition (search result)       │
│ • luno_history (search history)           │
│ • luno_settings (user preferences)        │
│ • luno_lastOpened (splash screen)         │
└─────────────┬────────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────┐
│           Popup UI                        │
│  (src/popup/)                             │
├──────────────────────────────────────────┤
│ • React components                        │
│ • styled-components theming               │
│ • framer-motion animations                │
│ • Tab navigation (Definition/History/    │
│   Settings)                               │
│ • Storage change listeners                │
└──────────────────────────────────────────┘
```

## Component Breakdown

### Background Worker (`src/background.ts`)

**Responsibilities:**
- Register "Quick Define" context menu item
- Listen for context menu clicks
- Handle `SEARCH_WORD` messages from popup
- Fetch definitions from Dictionary API
- Persist search history
- Manage storage state

**Key Functions:**
- `registerContextMenu()` - Sets up right-click context menu
- `handleDefinitionLookup()` - Core definition lookup logic
- `addWordToHistory()` - Adds search to history (max 20 entries)
- `getStoredHistory()` / `persistHistory()` - Read/write history

### Popup UI (`src/popup/`)

**Responsibilities:**
- Display search input, definitions, history, and settings
- Provide tab navigation
- Listen for storage changes from background
- Show loading/error/empty states
- Manage user interactions (search, copy, clear history)

**Key Components:**

| Component | Purpose |
|-----------|---------|
| `App.tsx` | Root component, manages tabs, state, and storage listeners |
| `SearchInput.tsx` | Search bar with submit button |
| `DefinitionView.tsx` | Displays word definition |
| `DefinitionsList.tsx` | Renders meanings, definitions, and examples |
| `HistoryList.tsx` | List of past searches with timestamps |
| `Settings.tsx` | Settings panel with theme and shortcuts |
| `SplashScreen.tsx` | Animated welcome screen |
| `Toast.tsx` / `ToastContext.tsx` | Toast notifications for copy actions |
| `CopyButton.tsx` | Reusable copy-to-clipboard button |
| `TabNavigation.tsx` | Tab switcher (Definition, History, Settings) |
| `Header.tsx` | Top header with logo and search |

### Shared Logic (`src/shared/`)

**Purpose:** Reusable logic for both popup and background

| File | Purpose |
|------|---------|
| `fetchDefinition.ts` | API integration with Free Dictionary API |
| `history.ts` | History read/write/clear helpers |
| `settings.ts` | Settings read/write/normalize helpers |

### Types (`src/types.ts`)

Centralized TypeScript types for:
- `NormalizedDefinition` - Parsed definition from API
- `HistoryEntry` - Search history entry
- `SettingsState` - User settings
- `DefinitionStorageState` - Storage state for current definition

## Data Flow

### Search via Popup

```
User types word → SearchInput → App.tsx
  ↓
chrome.runtime.sendMessage({ type: 'SEARCH_WORD', word })
  ↓
Background receives message → handleDefinitionLookup()
  ↓
fetchDefinition() calls Free Dictionary API
  ↓
addWordToHistory() persists search
  ↓
chrome.storage.local.set({ currentDefinition: {...} })
  ↓
Popup receives storage change event
  ↓
App.tsx updates state → DefinitionView renders
```

### Search via Context Menu

```
User selects text → Right-click → "Quick Define"
  ↓
chrome.contextMenus.onClicked listener
  ↓
handleDefinitionLookup(selectionText)
  ↓
(Same flow as above)
  ↓
chrome.action.openPopup() (if supported)
  ↓
Popup shows definition
```

## Storage Keys

| Key | Type | Purpose |
|-----|------|---------|
| `currentDefinition` | `DefinitionStorageState` | Current search result and state |
| `luno_history` | `HistoryEntry[]` | Last 20 searches |
| `luno_settings` | `SettingsState` | User preferences (theme, shortcut) |
| `luno_lastOpened` | `number` | Timestamp for splash screen logic |

## External APIs

### Free Dictionary API

**Endpoint:** `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`

**Authentication:** None

**Rate Limiting:** No strict limits for personal use

**Response:**
- Returns array of definition entries
- Each entry contains word, phonetic, meanings
- Meanings have part-of-speech, definitions, and examples

**Error Handling:**
- 404 → "No definition found"
- Network errors → Timeout fallback (10 seconds)

## Styling & Theming

**Approach:** styled-components with centralized theme

**Theme (`src/popup/styles/theme.ts`):**
- Colors (background, text, accent, borders)
- Spacing (xs, sm, md, lg, xl)
- Typography (font family, sizes)
- Mode (`dark` or `light` - currently dark is primary)

**Design System:**
- Inspired by Linear and Raycast
- Dark background (#0F111A)
- Accent blue (#3B82F6)
- Rounded corners (8px, 12px)
- Smooth 200ms transitions

## Animations

**Library:** Framer Motion

**Usage:**
- Tab transitions (fade in/out)
- Splash screen (fade + scale)
- Loading states (shimmer effects)
- Toast notifications (slide + fade)

**Performance:**
- All animations target transform and opacity for 60fps
- AnimatePresence for exit animations

## Accessibility

- Semantic HTML (buttons, headings, labels)
- ARIA attributes on components
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators (2px blue outline)
- Screen reader support (aria-labels)

## Security

- No external scripts in popup (CSP compliant)
- No inline styles in HTML
- API calls only to trusted endpoints
- No user credentials required
- No analytics or tracking

## Build & Bundling

**Tool:** Vite

**Entry Points:**
- `popup.tsx` → `dist/popup/popup.js`
- `background.ts` → `dist/background.js`

**Static Assets:**
- `manifest.json` → `dist/manifest.json`
- Icons → `dist/icons/`
- Fonts → `dist/fonts/`

**Output:**
- `dist/` folder ready to load as unpacked extension

## Performance

- **Bundle size:** ~115KB gzipped (popup)
- **API latency:** ~200ms average
- **Popup load:** <100ms
- **Memory:** <10MB typical usage
- **Smooth animations:** 60fps

## Browser Compatibility

- Chrome 90+
- Edge 90+ (Chromium-based)
- Brave, Opera, Vivaldi
- *Firefox support planned*

## Future Architecture Considerations

- **Offline support:** IndexedDB cache for definitions
- **Sync storage:** Cross-device history and settings
- **Multi-language:** Support for non-English dictionaries
- **Audio API:** Pronunciation playback
- **Content script:** Inline definition tooltips on pages

---

For technical questions, see:
- [DEVELOPMENT.md](DEVELOPMENT.md)
- [README.md](../README.md)
- [CONTRIBUTING.md](../CONTRIBUTING.md)
