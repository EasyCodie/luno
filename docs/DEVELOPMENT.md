# Development Guide

This document describes the development workflow, architecture decisions, tooling, and best practices for contributing to Luno.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Architecture Overview](#architecture-overview)
- [Development Workflow](#development-workflow)
- [Scripts](#scripts)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Debugging Tips](#debugging-tips)
- [Chrome Extension Tips](#chrome-extension-tips)
- [Release Process](#release-process)
- [FAQ](#faq)

---

## Tech Stack

- **Language**: TypeScript (strict mode)
- **UI Library**: React 19 with Hooks
- **Styling**: styled-components
- **Animations**: Framer Motion
- **Bundler**: Vite
- **Chrome APIs**: `chrome.storage`, `chrome.contextMenus`, `chrome.runtime`, `chrome.commands`
- **Data Source**: [Free Dictionary API](https://dictionaryapi.dev/)

### Directory Structure

```
quickdefine/
├── src/
│   ├── background.ts         # Background service worker
│   ├── popup/
│   │   ├── App.tsx           # Popup root component
│   │   ├── components/       # Reusable React components
│   │   ├── styles/           # Global styles & theme
│   │   ├── utils/            # Popup-specific utilities
│   │   ├── popup.html        # Popup HTML entry point
│   │   └── popup.tsx         # Popup entry module
│   ├── shared/               # Shared logic between popup and background
│   └── types.ts              # Shared TypeScript types
├── public/
│   ├── manifest.json         # Chrome manifest (MV3)
│   ├── icons/                # Extension icons
│   └── fonts/                # Font files (Satoshi)
├── docs/                     # Documentation
└── dist/                     # Build output (generated)
```

## Architecture Overview

### Data Flow

1. **User action**: User searches via popup or context menu
2. **Background worker**: Handles dictionary lookup and history persistence
3. **Storage**: Results stored in `chrome.storage.local`
4. **Popup**: React UI listens for storage changes and updates views

### Storage

- Definition data: stored under key `currentDefinition`
- History: stored in `HISTORY_STORAGE_KEY` (`luno_history`)
- Settings: stored in `SETTINGS_STORAGE_KEY` (`luno_settings`)

### Messaging

- Popup sends `SEARCH_WORD` messages to background worker
- Background worker responds via storage changes, not direct message responses
- Context menu triggers reuse the same lookup pipeline

### UI Structure

- **Tabs**: Definition, History, Settings
- **Components**: Search input, definition view, history list, settings panels, splash screen, toasts
- **Theming**: `styled-components` theme with design tokens (spacing, colors, typography)
- **Animations**: `framer-motion` for transitions between UI states

## Development Workflow

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

- Vite watches for changes and rebuilds automatically
- Output files available in `dist/`

### 3. Load extension in Chrome

1. Open `chrome://extensions/`
2. Enable **Developer mode**
3. Click **Load unpacked** and select the `dist/` folder
4. Reload the extension after changes (click refresh icon)

### 4. Make changes and test

- Modify files inside `src/`
- Chrome popup auto reloads when reopened after extension refresh
- Right-click context menu requires reload of page after extension reload

### 5. Build for production

```bash
npm run build
```

- Runs TypeScript checks
- Generates optimized files in `dist/`

### 6. Preview production build (optional)

```bash
npm run preview
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite in development mode |
| `npm run build` | Type-check and build in production mode |
| `npm run preview` | Preview built extension |
| `npm run lint` | Run ESLint on the project |

## Coding Standards

- Use TypeScript for all files
- Prefer functional components and hooks
- Keep components small and focused
- Extract shared logic into `src/shared/`
- Use the theme for colors and spacing
- Use `framer-motion` for animations where needed
- Avoid inline styles; prefer styled-components
- Use consistent naming (camelCase for files/functions, PascalCase for components)
- Add meaningful comments for complex sections
- Maintain accessibility attributes

### TypeScript Guidelines

- Use explicit return types for functions
- Avoid `any`; use `unknown` if needed and narrow types
- Use discriminated unions for variant states when possible
- Leverage `Readonly` types when data should not mutate

### Git Guidelines

- Use feature branches: `feature/...`, `fix/...`, `docs/...`
- Follow Conventional Commit messages (`feat:`, `fix:`, `docs:`)
- Keep pull requests focused (1 feature/bug per PR)

## Testing

### Manual Testing Checklist

- Search for multiple words via popup and context menu
- Verify history adds words in order and deduplicates correctly
- Test clearing history
- Ensure settings persist after closing popup
- Verify theme changes (Auto->Dark->Light)
- Copy definitions and examples (check clipboard)
- Trigger splash screen (open after 60 seconds idle)
- Test error states (search nonsense word, offline)
- Confirm context menu works on web pages
- Test keyboard shortcuts (default and custom)

### Edge Cases

- Empty input / whitespace
- Words with hyphens/apostrophes
- Very long words
- Network errors/timeouts
- API returns empty definitions

## Debugging Tips

- Use `chrome://extensions/` → "Errors" button for background errors
- Right-click popup → Inspect to open DevTools for UI
- Check `Console`, `Network`, and `Application` tabs
- Use `console.debug` for debugging (remove before merging)
- For context menu issues, reload the page after updating extension

## Chrome Extension Tips

- `chrome.contextMenus.create` requires `contextMenus` permission in manifest
- Service worker restarts often; store state in `chrome.storage`
- Use `chrome.storage.local` for persistent storage
- Use `chrome.commands.getAll()` to read keyboard shortcuts
- Listen to `chrome.runtime.onInstalled` for setup tasks
- Use `chrome.action.openPopup()` to programmatically open popup

## Release Process

1. Update `CHANGELOG.md` with new version entries
2. Bump version in `package.json` and `public/manifest.json`
3. Run `npm run build`
4. Test build in Chrome (load `dist/` as unpacked)
5. Create Git tag: `git tag vX.Y.Z`
6. Push tag: `git push origin vX.Y.Z`
7. Create GitHub release with notes
8. Upload new version to Chrome Web Store (when ready)

## FAQ

### How do I add a new tab to the popup?
- Create a new component under `src/popup/components`
- Update `TabNavigation` in `src/popup/components/TabNavigation.tsx`
- Add new tab ID and panel inside `App.tsx`

### How do I store new settings?
- Update `DEFAULT_SETTINGS` in `src/shared/settings.ts`
- Add TypeScript fields to `SettingsState`
- Update `normalizeSettings` helper
- Update Settings UI

### How do I use external APIs?
- Create wrapper in `src/shared`
- Handle errors gracefully
- Update types in `src/types.ts`
- Consider feature flags for optional APIs

### How do I add tests?
- Currently testing is manual
- For automated tests, consider adding unit tests with Vitest
- Use React Testing Library for component tests

---

For additional guidance, see:
- [README](../README.md)
- [INSTALL](../INSTALL.md)
- [CONTRIBUTING](../CONTRIBUTING.md)
- [ARCHITECTURE](ARCHITECTURE.md)
