# Luno - Project Overview

**Version:** 1.0.0  
**Status:** Ready for public release (pending screenshots and final review)  
**Type:** Chrome Extension (Manifest V3)  
**Tech Stack:** React 19, TypeScript, Vite, styled-components, Framer Motion

---

## What is Luno?

Luno is a beautiful Chrome extension that provides instant word definitions through an elegant, modern interface. Users can:
- Right-click any word to get instant definitions
- Search manually via the popup
- Track their search history (last 20 words)
- Copy definitions and examples to clipboard
- Customize settings (theme, shortcuts)

---

## Quick Start for Developers

```bash
# Clone and setup
git clone https://github.com/yourusername/luno.git
cd luno/quickdefine

# Install and build
npm install
npm run build

# Load in Chrome
# 1. Open chrome://extensions/
# 2. Enable Developer mode
# 3. Load unpacked → select dist/ folder
```

See [INSTALL.md](INSTALL.md) for detailed instructions.

---

## Repository Structure

```
quickdefine/
├── src/                     # Source code
│   ├── background.ts        # Background service worker
│   ├── popup/               # React popup UI
│   ├── shared/              # Shared logic (API, storage)
│   └── types.ts             # TypeScript types
├── public/                  # Static assets
│   ├── manifest.json        # Chrome extension manifest
│   ├── icons/               # Extension icons
│   └── fonts/               # Satoshi font
├── docs/                    # Documentation
│   ├── screenshots/         # Screenshots for README
│   ├── SETUP.md             # Setup guide
│   ├── DEVELOPMENT.md       # Development guide
│   ├── ARCHITECTURE.md      # Architecture overview
│   └── API.md               # API reference
├── .github/                 # GitHub templates
│   ├── ISSUE_TEMPLATE/      # Issue templates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── REPOSITORY_SETTINGS.md
├── README.md                # Main documentation
├── CONTRIBUTING.md          # Contribution guidelines
├── CODE_OF_CONDUCT.md       # Community standards
├── CHANGELOG.md             # Version history
├── LICENSE                  # MIT License
├── INSTALL.md               # Installation instructions
├── TODO_BEFORE_PUBLIC.md    # Pre-launch checklist
└── package.json             # Dependencies and scripts
```

---

## Key Features

✅ Instant word lookup via context menu  
✅ Search input with live results  
✅ History tracking (20 most recent)  
✅ Copy to clipboard (word, definitions, examples)  
✅ Modern dark theme (Linear/Raycast inspired)  
✅ Animated splash screen  
✅ Customizable settings  
✅ Keyboard shortcuts (Ctrl+Shift+L)  
✅ Toast notifications  
✅ Smooth animations (Framer Motion)  
✅ Fully typed with TypeScript  
✅ Chrome storage persistence  

---

## Documentation Index

### For Users
- **[README.md](README.md)** - Complete project overview and features
- **[INSTALL.md](INSTALL.md)** - Installation instructions and troubleshooting
- **[CHANGELOG.md](CHANGELOG.md)** - Version history and release notes

### For Contributors
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - How to contribute
- **[CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)** - Community guidelines
- **[docs/SETUP.md](docs/SETUP.md)** - Development environment setup
- **[docs/DEVELOPMENT.md](docs/DEVELOPMENT.md)** - Development workflow
- **[docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Technical architecture
- **[docs/API.md](docs/API.md)** - API integration details

### For Maintainers
- **[TODO_BEFORE_PUBLIC.md](TODO_BEFORE_PUBLIC.md)** - Pre-launch checklist
- **[.github/REPOSITORY_SETTINGS.md](.github/REPOSITORY_SETTINGS.md)** - GitHub configuration guide

---

## Tech Stack Details

| Layer | Technology | Purpose |
|-------|------------|---------|
| **UI Framework** | React 19 | Component-based UI |
| **Language** | TypeScript | Type safety |
| **Styling** | styled-components | CSS-in-JS |
| **Animations** | Framer Motion | Smooth transitions |
| **Build Tool** | Vite | Fast builds |
| **API** | Free Dictionary API | Word definitions |
| **Storage** | Chrome Storage API | Persistence |
| **Linting** | ESLint | Code quality |

---

## Project Status

### ✅ Completed
- Core functionality (search, history, settings)
- UI/UX implementation
- Comprehensive documentation
- GitHub templates
- License and contribution guidelines

### 📸 Pending
- Real screenshots (currently using placeholders)
- Social preview image for repository
- Chrome Web Store listing assets

### 🚀 Planned (Future Releases)
- Audio pronunciation playback
- Favorites/bookmarks system
- Multi-language support
- Firefox extension port
- Synonyms and antonyms display

---

## Scripts

```bash
npm run dev      # Development mode with hot reload
npm run build    # Production build
npm run lint     # Lint code with ESLint
npm run preview  # Preview built extension
```

---

## Community

- **Issues**: [GitHub Issues](https://github.com/yourusername/luno/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/luno/discussions)
- **Email**: support@lunoapp.dev

---

## License

MIT License - see [LICENSE](LICENSE) for details.

---

## Credits

- **API**: [Free Dictionary API](https://dictionaryapi.dev/)
- **Design Inspiration**: [Linear](https://linear.app), [Raycast](https://raycast.com)
- **Font**: [Satoshi](https://www.fontshare.com/fonts/satoshi)

---

## Quick Links

- 📖 [Full Documentation](README.md)
- 🐛 [Report Bug](https://github.com/yourusername/luno/issues/new?template=bug_report.md)
- 💡 [Request Feature](https://github.com/yourusername/luno/issues/new?template=feature_request.md)
- 🤝 [Contribute](CONTRIBUTING.md)
- 📜 [Changelog](CHANGELOG.md)

---

**Ready to contribute?** Read [CONTRIBUTING.md](CONTRIBUTING.md) and start coding! 🚀
