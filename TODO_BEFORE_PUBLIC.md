# TODO Before Publishing Repository

This checklist outlines the remaining tasks to complete before publishing Luno as a public repository.

## ✅ Completed

- [x] Comprehensive README with all sections
- [x] CONTRIBUTING guide with detailed guidelines
- [x] CODE_OF_CONDUCT for community standards
- [x] CHANGELOG for version tracking
- [x] Issue templates (bug report, feature request)
- [x] Pull request template
- [x] .gitignore with proper exclusions
- [x] LICENSE (MIT)
- [x] INSTALL guide for users
- [x] Documentation files (SETUP, DEVELOPMENT, ARCHITECTURE, API)
- [x] Package.json updated (name, version)
- [x] Manifest.json description improved
- [x] Package-lock.json synced

## 📸 Assets Needed (High Priority)

- [ ] **Hero GIF** (`docs/screenshots/hero.gif`)
  - Show right-click → Quick Define → popup with definition
  - Duration: 2-3 seconds
  - Size: 800x600px recommended
  - Tools: OBS, ScreenFlow, LICEcap, or similar

- [ ] **Definition View Screenshot** (`docs/screenshots/definition-view.png`)
  - Main popup with definition loaded
  - Dark theme, clean example word (e.g., "serendipity")
  - Size: 400x600px (actual popup dimensions)

- [ ] **History Screenshot** (`docs/screenshots/history.png`)
  - History tab with 5-10 entries
  - Show timestamps and word list
  - Size: 400x600px

- [ ] **Settings Screenshot** (`docs/screenshots/settings.png`)
  - Settings tab with theme selector, shortcuts, about section
  - Size: 400x600px

*Note: Placeholder 1x1 images are currently in place. Replace with real screenshots.*

## 🔧 Repository Configuration

### GitHub Settings

Once repository is created:

1. **Basic Info**
   - [ ] Set repository description: "Luno - A beautiful Chrome extension for instant word definitions with search, history, and modern UI. Built with React, TypeScript, and Vite."
   - [ ] Add website URL (if applicable)

2. **Topics/Tags**
   - [ ] Add topics: `chrome-extension`, `definition`, `dictionary`, `productivity`, `react`, `typescript`, `vite`, `dark-theme`, `styled-components`, `framer-motion`

3. **Repository Features**
   - [ ] Enable Issues
   - [ ] Enable Discussions
   - [ ] Enable Wiki (optional)
   - [ ] Set up Projects board for roadmap (optional)

4. **Branch Protection**
   - [ ] Protect `main` branch
   - [ ] Require PR reviews before merging
   - [ ] Require status checks to pass
   - [ ] Require conversation resolution

5. **Social Preview**
   - [ ] Create 1280x640px social preview image
   - [ ] Upload to repository settings

### GitHub Discussions

Set up discussion categories:
- [ ] General
- [ ] Ideas (feature requests)
- [ ] Q&A
- [ ] Show and Tell
- [ ] Announcements

### Issue Labels

Beyond defaults, add:
- [ ] `priority: high`, `priority: medium`, `priority: low`
- [ ] `good first issue`
- [ ] `help wanted`
- [ ] `area: ui`, `area: api`, `area: build`

## 📝 Update Placeholders

Ensure GitHub username `EasyCodie` is referenced in these files:

- [ ] README.md (multiple instances)
- [ ] CONTRIBUTING.md
- [ ] INSTALL.md
- [ ] docs/SETUP.md
- [ ] docs/API.md
- [ ] docs/REPOSITORY_SETTINGS.md
- [ ] src/popup/components/AboutSection.tsx

Ensure contact email `ivangolovin200809@gmail.com` is referenced instead of outdated values:
- [ ] README.md
- [ ] CONTRIBUTING.md
- [ ] CODE_OF_CONDUCT.md
- [ ] INSTALL.md
- [ ] docs/SETUP.md

## 🎨 Branding (Optional)

- [ ] Create logo for Luno (current uses book icon)
- [ ] Design custom icon set for extension
- [ ] Create favicon for any documentation site

## 🚀 Chrome Web Store

When ready to publish:

1. **Prepare Assets**
   - [ ] Extension icon (128x128px)
   - [ ] Promotional images (440x280px, 920x680px, 1400x560px)
   - [ ] Detailed description
   - [ ] Screenshots (1280x800px or 640x400px)

2. **Developer Account**
   - [ ] Create Chrome Web Store developer account ($5 one-time fee)
   - [ ] Verify email and payment info

3. **Listing Details**
   - [ ] Extension name: "Luno"
   - [ ] Category: Productivity
   - [ ] Description (short and detailed)
   - [ ] Privacy policy URL (if collecting data - not currently needed)

4. **Upload**
   - [ ] Build production version: `npm run build`
   - [ ] Zip the `dist/` folder
   - [ ] Upload to Chrome Web Store
   - [ ] Submit for review

5. **Post-Publish**
   - [ ] Update README with Chrome Web Store badge and link
   - [ ] Add extension ID to AboutSection.tsx
   - [ ] Announce launch (Twitter, ProductHunt, Reddit, etc.)

## 🧪 Testing

Before public release:

- [ ] Test on fresh Chrome profile
- [ ] Verify all features work (search, history, settings, copy, splash)
- [ ] Test context menu on various websites
- [ ] Check for console errors
- [ ] Verify keyboard shortcuts
- [ ] Test with slow/offline network
- [ ] Try edge cases (long words, special characters, invalid words)
- [ ] Verify accessibility (keyboard navigation, screen readers)

## 📢 Marketing & Outreach

- [ ] Write launch blog post (Medium, Dev.to, personal blog)
- [ ] Create Product Hunt listing
- [ ] Share on Reddit (r/chrome, r/productivity, r/webdev)
- [ ] Tweet about launch
- [ ] Post in relevant Discord/Slack communities
- [ ] Submit to extension directories/lists

## 📊 Analytics (Optional)

- [ ] Set up Google Analytics (with user consent)
- [ ] Track install/uninstall rates
- [ ] Monitor usage patterns (if implementing analytics)

## 🔒 Security

- [ ] Create SECURITY.md with vulnerability reporting process
- [ ] Review code for security issues
- [ ] Ensure no API keys or secrets in code
- [ ] Validate all user inputs

## 📦 Release Process

For v1.0.0 release:

1. [ ] Ensure all tests pass
2. [ ] Update CHANGELOG.md with release notes
3. [ ] Create Git tag: `git tag v1.0.0`
4. [ ] Push tag: `git push origin v1.0.0`
5. [ ] Create GitHub Release with notes and ZIP of dist/
6. [ ] Announce release in Discussions

## 🎯 Future Enhancements

Consider for future versions:
- Audio pronunciation playback
- Favorites/bookmarks system
- Synonyms & antonyms display
- Multi-language support
- Firefox extension port
- Offline definitions cache
- Cloud sync (history, favorites)
- Dark/Light theme toggle

## ✅ Final Checklist

Before publishing:

- [ ] All documentation reviewed and accurate
- [ ] All placeholder text replaced
- [ ] Screenshots added
- [ ] Repository configured
- [ ] Extension tested thoroughly
- [ ] Chrome Web Store listing prepared (optional)
- [ ] Marketing plan in place
- [ ] Community guidelines communicated
- [ ] License finalized
- [ ] Contact information correct

---

## Notes

- Screenshot placeholders are currently 1x1 transparent pixels
- Replace with actual screenshots before public release
- Keep BUILD.md for archival but point users to README/INSTALL
- IMPLEMENTATION_SUMMARY.md can stay for historical context
- Remember to update year in LICENSE if publishing in a future year

Good luck with the launch! 🚀🌙
