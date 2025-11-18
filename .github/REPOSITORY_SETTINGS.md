# GitHub Repository Settings

This document outlines the recommended settings for the Luno repository once it is published to GitHub.

## Repository Details

### Basic Information

**Name**: `luno`

**Description**: 
```
Luno - A beautiful Chrome extension for instant word definitions with search, history, and modern UI. Built with React, TypeScript, and Vite.
```

**Website**: (optional - add if you create a landing page)

### Topics/Tags

Add the following topics to improve discoverability:

- `chrome-extension`
- `definition`
- `dictionary`
- `productivity`
- `react`
- `typescript`
- `vite`
- `dark-theme`
- `styled-components`
- `framer-motion`
- `free-dictionary-api`
- `word-lookup`
- `manifest-v3`

## Repository Settings

### General

- [ ] Enable "Template repository" (if you want others to fork as template)
- [x] Enable "Issues" - ✅ Required for bug reports and feature requests
- [x] Enable "Discussions" - ✅ Required for community engagement
- [ ] Enable "Projects" (optional - for roadmap tracking)
- [x] Enable "Wiki" (optional - for extended documentation)
- [ ] Disable "Sponsorship" (unless you want to enable GitHub Sponsors)

### Features

- [x] Enable "Automatically delete head branches" - Keeps repo clean after PRs merge
- [x] Enable "Allow merge commits" - Standard merge strategy
- [x] Enable "Allow squash merging" - Good for clean history
- [ ] Enable "Allow rebase merging" (optional)

### Pull Requests

- [x] Require pull request reviews before merging (at least 1 approval)
- [x] Dismiss stale pull request approvals when new commits are pushed
- [x] Require status checks to pass before merging
- [x] Require conversation resolution before merging

### Branch Protection Rules

**Protected Branch**: `main`

- [x] Require pull request before merging
- [x] Require approvals (at least 1)
- [x] Dismiss stale pull request approvals
- [x] Require status checks to pass:
  - Build
  - Lint
  - Type check
- [x] Require branches to be up to date before merging
- [x] Include administrators (enforce rules on maintainers too)

### Discussions

**Categories to Create:**

1. **General** - General discussion about Luno
2. **Ideas** - Feature requests and brainstorming
3. **Q&A** - Questions from users and developers
4. **Show and Tell** - Share your Luno customizations or use cases
5. **Announcements** - Project updates and releases

### Issue Labels

Suggested labels (in addition to defaults):

**Type:**
- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements or additions to documentation
- `question` - Further information is requested
- `duplicate` - This issue already exists
- `wontfix` - This will not be worked on
- `invalid` - This doesn't seem right

**Priority:**
- `priority: high` - Critical issues
- `priority: medium` - Important but not urgent
- `priority: low` - Nice to have

**Status:**
- `status: needs-triage` - Needs review by maintainers
- `status: in-progress` - Currently being worked on
- `status: blocked` - Cannot proceed due to dependencies
- `status: ready` - Ready for implementation

**Area:**
- `area: ui` - User interface issues
- `area: api` - API integration issues
- `area: build` - Build/development issues
- `area: performance` - Performance-related

**Difficulty:**
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed

## README Badges

Add these badges to the top of README.md:

```markdown
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-brightgreen)](https://github.com/EasyCodie/luno)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/EasyCodie/luno/releases)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
[![GitHub Issues](https://img.shields.io/github/issues/EasyCodie/luno)](https://github.com/EasyCodie/luno/issues)
[![GitHub Stars](https://img.shields.io/github/stars/EasyCodie/luno)](https://github.com/EasyCodie/luno/stargazers)
```

## Social Preview Image

Create a social preview image (1280x640px) showing:
- Luno logo/name
- Tagline: "Define. Instantly."
- Screenshot of the extension in action
- Technologies: React, TypeScript, Chrome Extension

Upload to: Repository Settings → Social preview

## Release Strategy

### Version Numbering

Follow [Semantic Versioning](https://semver.org/):
- **Major** (1.0.0): Breaking changes
- **Minor** (1.1.0): New features, backward compatible
- **Patch** (1.0.1): Bug fixes

### Release Process

1. Update `CHANGELOG.md`
2. Update version in `package.json` and `manifest.json`
3. Commit changes: `git commit -m "chore: bump version to X.Y.Z"`
4. Create Git tag: `git tag vX.Y.Z`
5. Push: `git push && git push --tags`
6. Create GitHub Release with release notes
7. Build and publish to Chrome Web Store (when ready)

## Security

### Reporting Security Issues

Create `SECURITY.md`:

```markdown
# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please email ivangolovin200809@gmail.com instead of using the public issue tracker.

We'll respond within 48 hours and work with you to understand and address the issue.
```

## GitHub Actions (Optional)

Create workflows for automated checks:

**`.github/workflows/ci.yml`** (CI/CD pipeline):
- Run on PRs and pushes to main
- Install dependencies
- Run linter (`npm run lint`)
- Run type check (`npm run build`)
- Create build artifact

**`.github/workflows/release.yml`** (Release automation):
- Trigger on version tags
- Build production version
- Create GitHub release
- Upload dist folder as release asset

## Community Files

All required files are created:
- [x] `README.md`
- [x] `CONTRIBUTING.md`
- [x] `CODE_OF_CONDUCT.md`
- [x] `LICENSE`
- [x] `CHANGELOG.md`
- [x] `.github/ISSUE_TEMPLATE/bug_report.md`
- [x] `.github/ISSUE_TEMPLATE/feature_request.md`
- [x] `.github/PULL_REQUEST_TEMPLATE.md`

## SEO & Discoverability

- Use descriptive repository name
- Write clear, keyword-rich description
- Add relevant topics/tags
- Keep README updated with screenshots
- Link to Chrome Web Store (once published)
- Share on social media and communities

## Analytics (Optional)

Consider adding:
- Google Analytics in the popup (with user consent)
- GitHub Insights for repo metrics
- Chrome Web Store analytics for user growth

## Maintenance

Regular maintenance tasks:
- Respond to issues within 48 hours
- Review PRs within 1 week
- Update dependencies monthly
- Release patches for bugs quickly
- Communicate roadmap changes in Discussions

---

**Note**: All references have been updated to use the GitHub username `EasyCodie` and contact email `ivangolovin200809@gmail.com`.
