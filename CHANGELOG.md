# Changelog

All notable changes to Luno will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-11-17

### Added
- Initial public release of Luno
- **Core Features**:
  - Instant word definitions via Free Dictionary API
  - Context menu integration for quick word lookup
  - Search input in popup for manual queries
  - Word history tracking (last 20 searches)
  - Copy to clipboard for words, definitions, and examples
  - Toast notifications for user feedback
- **UI/UX**:
  - Modern dark theme using styled-components
  - Animated splash screen for first-time users
  - Tab navigation (Definition, History, Settings)
  - Smooth animations with Framer Motion
  - Loading, error, and empty states
  - Responsive design for popup window
- **Settings**:
  - Theme selector (Auto, Dark, Light)
  - Keyboard shortcuts display
  - About section with version information
- **Technical**:
  - React 19 with TypeScript
  - Vite build system
  - Chrome Extension Manifest V3
  - Chrome storage for persistence
  - Service worker for background tasks
  - ESLint configuration
  - Modular component architecture

### Known Issues
- Audio pronunciation not yet implemented
- Light theme not fully supported (planned for future release)

## [Unreleased]

### Planned
- Audio pronunciation playback
- Favorites/bookmarks system
- Synonyms and antonyms display
- Custom keyboard shortcuts editor
- Multiple language support
- Firefox extension port
- Safari extension port
- Word of the day feature
- Export history functionality
- Offline definitions cache

---

## Version History

### Version 1.0.0 - Initial Release
First public release with core dictionary lookup functionality, modern UI, and essential features.

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for information on how to contribute to Luno.

## Questions or Feedback?

- Open an [issue](https://github.com/EasyCodie/luno/issues)
- Start a [discussion](https://github.com/EasyCodie/luno/discussions)
- Email us at ivangolovin200809@gmail.com
