# Luno Setup Guide

This guide helps you set up Luno for local development and testing.

## Prerequisites

- **Node.js** v16 or later
- **npm** v8 or later
- **Git** (optional when downloading as ZIP)
- **Chrome** or Chromium-based browser (Edge, Brave, Opera)

Check your Node.js and npm versions:

```bash
node -v
npm -v
```

## Getting the Source Code

### Option 1: Clone the Repository (Recommended)

```bash
git clone https://github.com/EasyCodie/luno.git
cd luno/quickdefine
```

### Option 2: Download ZIP

1. Go to the [Luno GitHub repo](https://github.com/EasyCodie/luno)
2. Click **Code** → **Download ZIP**
3. Extract the archive
4. Navigate to `luno/quickdefine`

## Install Dependencies

```bash
npm install
```

> If you see permission errors, try running as Administrator (Windows) or prepend `sudo` (macOS/Linux).

## Environment Variables (Optional)

Luno does not require environment variables for basic usage. If you want to add custom configuration, create a `.env.local` file and add variables there.

## Run in Development Mode

```bash
npm run dev
```

This starts Vite in development mode. The dev server outputs files to `dist/` so you can load the extension with live rebuilds.

### Watching for Changes

Vite rebuilds automatically on file changes. To see updates in Chrome:
1. Reload the extension in `chrome://extensions/`
2. Reopen the popup or context menu as needed

## Build for Production

```bash
npm run build
```

This runs TypeScript checks and builds optimized production files in `dist/`.

## Load the Extension in Chrome

1. Open `chrome://extensions/`
2. Enable **Developer mode** in the top-right
3. Click **Load unpacked**
4. Choose the `dist/` directory

## Preview Built Extension

To preview the built extension using Vite:

```bash
npm run preview
```

Then load the extension from the generated `dist/` folder.

## Directory Structure Overview

```
quickdefine/
├── public/               # Static assets (manifest, icons, fonts)
├── src/
│   ├── background.ts     # Service worker (context menu, messaging)
│   ├── popup/            # Popup UI (React)
│   ├── shared/           # Shared logic (API, storage)
│   └── types.ts          # Shared TypeScript types
├── docs/                 # Documentation
├── dist/                 # Build output (generated)
├── package.json
└── README.md
```

## Recommended Tools

- **Editor**: VS Code, WebStorm, or any TypeScript-capable editor
- **Extensions**: Prettier, ESLint, styled-components snippets
- **Browser Tools**: Chrome DevTools, React Developer Tools

## Testing Checklist

Before submitting a pull request:

- [ ] `npm run build` succeeds
- [ ] No TypeScript errors
- [ ] No ESLint errors (`npm run lint`)
- [ ] Extension loads without errors
- [ ] Search works for multiple words
- [ ] History captures and displays searches
- [ ] Copy to clipboard works with toast notifications
- [ ] Settings persist across sessions
- [ ] Context menu works on selected text
- [ ] Splash screen behaves as expected

## Troubleshooting

See the [main README](../README.md#troubleshooting) or [INSTALL](../INSTALL.md) for additional help.

## Support

If you run into issues:
- Open an issue: <https://github.com/EasyCodie/luno/issues>
- Start a discussion: <https://github.com/EasyCodie/luno/discussions>
- Email: ivangolovin200809@gmail.com
