# Luno - Define. Instantly.

> A beautiful, lightning-fast Chrome extension for instant word definitions.

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen)](https://github.com/EasyCodie/luno)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/EasyCodie/luno/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

![Luno Demo](docs/screenshots/hero.gif)

## Features

### Core Features
- 📖 **Instant word definitions** - Right-click any word or use the popup search
- 🔍 **Quick search input** - Type and search directly from the popup
- 📜 **Search history** - Track your last 20 searched words
- 📋 **Copy to clipboard** - One-click copy for words, definitions, and examples
- 🎨 **Modern dark theme** - Sleek UI inspired by Linear and Raycast
- ⏱️ **Animated splash screen** - Welcoming first-time experience
- ⚙️ **Customizable settings** - Theme preferences and keyboard shortcuts
- 🎯 **One-click pronunciation** - See phonetic pronunciation instantly

### Coming Soon
- 🔊 Audio pronunciation playback
- ⭐ Favorites/bookmarks system
- 🔄 Synonyms & antonyms display
- ⌨️ Custom keyboard shortcuts
- 🌍 Multiple language support

## Screenshots

| Definition View | History | Settings |
|----------------|---------|----------|
| ![Definition](docs/screenshots/definition-view.png) | ![History](docs/screenshots/history.png) | ![Settings](docs/screenshots/settings.png) |

> 📸 Looking for high-quality assets? See [docs/screenshots/README.md](docs/screenshots/README.md) for guidelines on capturing and replacing these placeholder images.

## Installation

### From Chrome Web Store
🚀 Coming soon to Chrome Web Store

### Manual Installation (Development)

1. Clone the repository
```bash
git clone https://github.com/EasyCodie/luno.git
cd luno/quickdefine
```

2. Install dependencies
```bash
npm install
```

3. Build the extension
```bash
npm run build
```

4. Load in Chrome
   - Open `chrome://extensions/`
   - Enable **Developer mode** (top-right toggle)
   - Click **Load unpacked**
   - Select the `dist/` folder

See the [Setup Guide](#setup-guide) below for detailed instructions.

## Quick Start

### For Users
1. Install Luno from Chrome Web Store (or manually)
2. Right-click any word on a webpage → Select **"Define"**
3. Or click the Luno icon and search manually
4. View definitions, history, and adjust settings

### For Developers
See [Development](#development) section below for local development setup.

## Setup Guide

### Prerequisites
- **Node.js** v16 or higher
- **npm** v8 or higher
- **Chrome browser** (or Chromium-based browser)
- **Git**

### Installation Steps

1. **Clone Repository**
```bash
git clone https://github.com/EasyCodie/luno.git
cd luno/quickdefine
```

2. **Install Dependencies**
```bash
npm install
```

3. **Build Extension**
```bash
npm run build
```

4. **Load in Chrome**
   - Open `chrome://extensions/`
   - Enable **Developer mode** (top-right toggle)
   - Click **Load unpacked**
   - Select the `dist/` folder from the project

5. **Test**
   - Right-click any word on a webpage → **"Quick Define"**
   - Or click the Luno icon in your extensions toolbar
   - Try the keyboard shortcut: `Ctrl+Shift+L` (or `Cmd+Shift+L` on Mac)

## Development

### Project Structure
```
luno/quickdefine/
├── src/
│   ├── background.ts              # Service worker (context menu, messaging)
│   ├── popup/
│   │   ├── App.tsx                # Main popup component
│   │   ├── popup.html             # HTML entry point
│   │   ├── popup.tsx              # React entry point
│   │   ├── components/            # React components
│   │   │   ├── SearchInput.tsx
│   │   │   ├── DefinitionView.tsx
│   │   │   ├── DefinitionsList.tsx
│   │   │   ├── HistoryList.tsx
│   │   │   ├── Settings.tsx
│   │   │   ├── SplashScreen.tsx
│   │   │   ├── TabNavigation.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── ...
│   │   ├── styles/
│   │   │   ├── globalStyles.ts
│   │   │   ├── theme.ts
│   │   │   └── animations.ts
│   │   └── utils/
│   ├── shared/
│   │   ├── fetchDefinition.ts     # API integration
│   │   ├── history.ts             # History management
│   │   └── settings.ts            # Settings management
│   └── types.ts                   # TypeScript types
├── public/
│   ├── icons/                     # Extension icons
│   ├── fonts/
│   │   └── satoshi/               # Satoshi font files
│   └── manifest.json              # Chrome extension manifest
├── dist/                          # Build output (generated)
├── vite.config.ts                 # Vite configuration
├── tsconfig.json                  # TypeScript config
├── eslint.config.js               # ESLint configuration
├── package.json
└── README.md
```

### Available Scripts

```bash
# Development mode (watch mode with hot reload)
npm run dev

# Production build
npm run build

# Lint code
npm run lint

# Preview built extension
npm run preview
```

### Tech Stack
- **React 19** - UI framework with hooks
- **TypeScript** - Static type checking
- **Vite** - Lightning-fast build tool
- **styled-components** - CSS-in-JS styling
- **Framer Motion** - Smooth animations
- **Free Dictionary API** - Definition data source
- **Chrome Extensions API** - Browser integration

### Code Style & Standards
- TypeScript strict mode enabled
- ESLint configuration for code quality
- Component-based architecture
- Reusable styled components
- Functional React components with hooks
- Type-safe Chrome API usage

### Development Workflow

1. **Make Changes**
   - Edit files in `src/`
   - Vite will rebuild automatically in dev mode

2. **Test Changes**
   - Reload extension in Chrome: go to `chrome://extensions/` and click refresh icon
   - Test features in popup and context menu

3. **Build for Production**
```bash
npm run build
```

4. **Verify Build**
   - Load the new `dist/` folder as unpacked extension
   - Test all features work correctly

## Features Deep Dive

### Search
- **Manual Search**: Type any word in the popup search bar
- **Context Menu**: Right-click selected text → "Quick Define"
- **Instant Results**: Fast API fetch with loading states
- **Error Handling**: Clear error messages for invalid words or network issues

### History
- Automatically tracks all searched words
- Shows last 20 unique entries
- One-click to re-search any word
- Clear all history option
- Persists across browser sessions

### Copy to Clipboard
- Copy word, definition, or example sentence
- Toast notification feedback
- Keyboard accessible
- Works from any view

### Settings
- **Theme Selection**: Auto (system), Dark, or Light
- **Keyboard Shortcuts**: View and customize shortcuts
- **About Section**: Version info and attribution
- **Quick Links**: Access documentation and support

### Animated Splash Screen
- Welcome screen for first-time users
- Re-appears after 1 minute of inactivity
- 3-second auto-dismiss with smooth animations
- Skip anytime by clicking anywhere

## API Reference

### Free Dictionary API
- **Endpoint**: `https://api.dictionaryapi.dev/api/v2/entries/en/{word}`
- **Authentication**: None required
- **Rate Limiting**: No strict limits for personal use
- **Response Format**: JSON

**Response includes:**
- Word and phonetic pronunciation
- Multiple definitions by part of speech (noun, verb, etc.)
- Example sentences
- Synonyms and antonyms (when available)

**Example Request:**
```bash
curl https://api.dictionaryapi.dev/api/v2/entries/en/hello
```

## Browser Support
- **Chrome** 90+
- **Edge** (Chromium-based)
- **Brave**
- **Opera**
- Other Chromium-based browsers

Firefox and Safari support planned for future releases.

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Contribution Guide

1. **Fork the repository**
2. **Create a feature branch**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
   - Follow existing code style
   - Add TypeScript types
   - Test thoroughly

4. **Commit your changes**
```bash
git commit -m "Add amazing feature"
```

5. **Push to your fork**
```bash
git push origin feature/amazing-feature
```

6. **Open a Pull Request**
   - Describe your changes
   - Link any related issues
   - Wait for code review

### Development Guidelines
- Use TypeScript strict mode
- Write functional React components
- Create reusable styled components
- Add proper types for all functions
- Include comments for complex logic
- Test in Chrome before submitting PR
- Follow existing patterns and conventions

## Issues & Bug Reports

### Report a Bug
Use [GitHub Issues](https://github.com/EasyCodie/luno/issues) to report bugs:

1. Check if the issue already exists
2. Provide a clear title and description
3. Include steps to reproduce
4. Attach screenshots if applicable
5. List your environment (OS, Chrome version, Luno version)

### Feature Requests
Same process as bug reports - tag your issue as `enhancement`.

## Troubleshooting

### Extension Not Loading
- Verify `dist/` folder exists after running `npm run build`
- Check that `manifest.json` is valid (no syntax errors)
- Ensure all icon files exist in `public/icons/`
- Clear Chrome cache: Settings → Privacy → Clear browsing data

### Definitions Not Loading
- Check your internet connection
- Verify API is accessible: visit `https://api.dictionaryapi.dev/api/v2/entries/en/hello`
- Open browser console (F12) and check for errors
- Try searching a different word

### Search Bar Not Working
- Reload extension: go to `chrome://extensions/` and click refresh icon
- Clear Chrome cache
- Try closing and reopening the popup
- Check browser console for JavaScript errors

### Settings Not Persisting
- Ensure Chrome storage permissions are granted
- Check that popup closes properly before reopening
- Try clearing extension data and rebuilding
- Verify no browser extensions are interfering

### Context Menu Not Appearing
- Ensure extension is enabled in `chrome://extensions/`
- Check that you've selected text before right-clicking
- Look for "Quick Define" in the context menu
- Reload extension if issue persists

## Performance

Luno is designed to be lightweight and fast:
- **Bundle Size**: ~100KB total
- **API Response**: Typically < 200ms
- **Animations**: Smooth 60fps with Framer Motion
- **Memory Usage**: Minimal footprint
- **Offline Support**: History cached in Chrome storage

## Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Open Luno | `Ctrl+Shift+L` | `Cmd+Shift+L` |

Configure custom shortcuts in Chrome:
1. Go to `chrome://extensions/shortcuts`
2. Find Luno
3. Set your preferred key combination

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and release notes.

### v1.0.0 (Current)
- Initial public release
- Core definition lookup with Free Dictionary API
- Search input with instant results
- Word history (last 20 entries)
- Copy to clipboard functionality
- Dark theme UI with styled-components
- Animated splash screen
- Settings panel with theme selector
- Chrome context menu integration
- Keyboard shortcuts support

## Roadmap

### Planned Features
- [ ] Audio pronunciation playback
- [ ] Favorites/bookmarks system
- [ ] Synonyms & antonyms display
- [ ] Custom keyboard shortcuts editor
- [ ] Multiple language support
- [ ] Firefox extension
- [ ] Safari extension
- [ ] Word of the day feature
- [ ] Search analytics dashboard

### Future Improvements
- [ ] Cloud sync for history and favorites
- [ ] Light theme option
- [ ] Custom API source support
- [ ] Offline definitions cache
- [ ] Export history as JSON/CSV
- [ ] Browser history integration
- [ ] Advanced search filters
- [ ] Pronunciation audio from API

## Credits & Acknowledgments

### APIs Used
- [Free Dictionary API](https://dictionaryapi.dev/) - Word definitions and pronunciations

### Libraries & Tools
- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [styled-components](https://styled-components.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations

### Fonts
- [Satoshi](https://www.fontshare.com/fonts/satoshi) - Beautiful geometric sans-serif

## Contact & Support

- **Issues**: [GitHub Issues](https://github.com/EasyCodie/luno/issues)
- **Discussions**: [GitHub Discussions](https://github.com/EasyCodie/luno/discussions)
- **Email**: ivangolovin200809@gmail.com

## Author

Created with ❤️ by Ivan Golovin

Follow development updates:
- Discord: @ivanmolotovic
- GitHub: [@EasyCodie](https://github.com/EasyCodie)

---

**Star this repo if you find it useful!** ⭐
