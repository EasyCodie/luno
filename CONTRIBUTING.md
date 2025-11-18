# Contributing to Luno

Thank you for your interest in contributing to Luno! We welcome contributions from the community and are grateful for any help you can provide.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

This project adheres to a [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

### Prerequisites

- Node.js v16 or higher
- npm v8 or higher
- Chrome browser (for testing)
- Git
- Basic knowledge of React, TypeScript, and Chrome Extensions

### Setup Development Environment

1. **Fork the repository** on GitHub

2. **Clone your fork**
```bash
git clone https://github.com/YOUR-USERNAME/luno.git
cd luno/quickdefine
```

3. **Add upstream remote**
```bash
git remote add upstream https://github.com/EasyCodie/luno.git
```

4. **Install dependencies**
```bash
npm install
```

5. **Build the extension**
```bash
npm run build
```

6. **Load in Chrome**
   - Open `chrome://extensions/`
   - Enable Developer mode
   - Click "Load unpacked"
   - Select the `dist/` folder

## Development Process

### 1. Pick an Issue

- Check the [issues page](https://github.com/EasyCodie/luno/issues)
- Look for issues labeled `good first issue` or `help wanted`
- Comment on the issue to let others know you're working on it
- If you want to work on something not listed, create an issue first to discuss

### 2. Create a Branch

Create a feature branch from `main`:

```bash
git checkout main
git pull upstream main
git checkout -b feature/your-feature-name
```

Branch naming conventions:
- `feature/` - New features (e.g., `feature/audio-pronunciation`)
- `fix/` - Bug fixes (e.g., `fix/search-input-crash`)
- `docs/` - Documentation updates (e.g., `docs/update-readme`)
- `refactor/` - Code refactoring (e.g., `refactor/api-layer`)
- `style/` - Code style changes (e.g., `style/eslint-fixes`)

### 3. Make Changes

- Write clean, readable code
- Follow the [Coding Standards](#coding-standards)
- Add comments for complex logic
- Update documentation as needed
- Keep changes focused and atomic

### 4. Test Your Changes

- Test the extension in Chrome
- Verify all existing features still work
- Test edge cases
- Check browser console for errors
- Test on different screen sizes if UI changes

### 5. Commit Your Changes

Follow the [Commit Guidelines](#commit-guidelines):

```bash
git add .
git commit -m "feat: add audio pronunciation feature"
```

### 6. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then open a Pull Request on GitHub.

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Define explicit types for function parameters and return values
- Avoid `any` type - use `unknown` or proper types
- Use interfaces for object shapes
- Export types that are used across files

**Example:**
```typescript
interface Definition {
  word: string;
  phonetic: string;
  meanings: Meaning[];
}

async function fetchDefinition(word: string): Promise<Definition> {
  // Implementation
}
```

### React Components

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use meaningful component and prop names
- Add prop types using TypeScript interfaces

**Example:**
```typescript
interface SearchInputProps {
  onSearch: (word: string) => void;
  isLoading: boolean;
}

export function SearchInput({ onSearch, isLoading }: SearchInputProps) {
  // Implementation
}
```

### Styled Components

- Use styled-components for styling
- Follow existing theme patterns
- Use theme variables for colors, spacing, etc.
- Keep styles colocated with components
- Use meaningful component names

**Example:**
```typescript
const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.primary};
  border: none;
  border-radius: 8px;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;
```

### File Organization

- Group related files in directories
- Use `index.ts` for public exports
- Keep file names lowercase with hyphens or camelCase
- Place shared utilities in `src/shared/`
- Place types in `src/types.ts` or colocated with components

### Code Style

- Use 2 spaces for indentation
- Use single quotes for strings
- Add semicolons
- Use trailing commas in multi-line structures
- Keep lines under 100 characters when possible
- Use meaningful variable names

### ESLint

Run ESLint before committing:

```bash
npm run lint
```

Fix auto-fixable issues:

```bash
npm run lint -- --fix
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/) specification.

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, semicolons, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `build`: Build system changes
- `ci`: CI/CD changes

### Examples

```bash
feat(search): add keyboard navigation to search results

Add up/down arrow key support for navigating search results.
Users can now use arrow keys to select definitions.

Closes #123
```

```bash
fix(popup): prevent crash when API returns invalid data

Add null checks and error handling for malformed API responses.
Display user-friendly error message instead of crashing.

Fixes #456
```

```bash
docs: update installation instructions in README

Add troubleshooting section for common installation issues.
```

### Scope

Optional, but helpful. Common scopes:
- `search` - Search functionality
- `history` - History feature
- `settings` - Settings panel
- `popup` - Popup UI
- `background` - Background service worker
- `api` - API integration
- `ui` - UI components
- `types` - TypeScript types

## Pull Request Process

### Before Submitting

1. **Update your branch** with the latest main:
```bash
git checkout main
git pull upstream main
git checkout your-branch
git rebase main
```

2. **Test thoroughly**
   - Test all affected features
   - Check console for errors
   - Test in fresh Chrome profile if possible

3. **Update documentation**
   - Update README if needed
   - Add/update code comments
   - Update CHANGELOG if applicable

4. **Review your own changes**
   - Read through your diff
   - Remove debugging code
   - Check for unintended changes

### PR Template

When you create a PR, fill out the template:

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring
- [ ] Performance improvement

## Changes Made
- List specific changes
- Use bullet points
- Be concise but clear

## Testing Done
- [ ] Tested in Chrome
- [ ] No console errors
- [ ] Existing features work
- [ ] Edge cases tested

## Screenshots (if applicable)
Add screenshots for UI changes

## Related Issues
Closes #123
Relates to #456
```

### Review Process

1. **Automated checks** must pass:
   - TypeScript compilation
   - ESLint checks
   - Build success

2. **Code review** by maintainers:
   - Code quality and style
   - Functionality
   - Tests and documentation
   - Overall approach

3. **Address feedback**:
   - Make requested changes
   - Push to same branch
   - Respond to comments

4. **Approval and merge**:
   - Requires at least one approval
   - Maintainer will merge when ready

### After Merge

- Delete your feature branch
- Update your local main branch
- Celebrate! 🎉

## Testing

### Manual Testing Checklist

Before submitting a PR, verify:

- [ ] Extension loads without errors
- [ ] Search functionality works
- [ ] Context menu appears and works
- [ ] History saves and displays correctly
- [ ] Settings persist across sessions
- [ ] Copy to clipboard works
- [ ] No console errors or warnings
- [ ] Splash screen displays correctly
- [ ] Keyboard shortcuts work
- [ ] UI looks correct at different window sizes
- [ ] Dark theme displays properly

### Testing UI Changes

If you change the UI:
- Test at minimum popup width (400px)
- Test with long words/definitions
- Test with no data (empty states)
- Test loading states
- Test error states
- Check animations are smooth

### Testing API Changes

If you modify API integration:
- Test with valid words
- Test with invalid words
- Test with special characters
- Test with slow network (Chrome DevTools throttling)
- Test with network failure
- Test timeout handling

## Documentation

### Code Comments

Add comments for:
- Complex logic
- Non-obvious decisions
- Workarounds for bugs
- Important TODOs

Avoid comments that:
- State the obvious
- Repeat the code
- Are outdated

### Documentation Updates

Update documentation when:
- Adding new features
- Changing user-facing behavior
- Modifying setup/installation steps
- Adding new dependencies
- Changing configuration

Files to update:
- `README.md` - Main documentation
- `CHANGELOG.md` - Version history
- Code comments - In-code documentation
- `BUILD.md` - Build instructions (if applicable)

## Community

### Getting Help

- **GitHub Discussions** - For questions and general discussion
- **GitHub Issues** - For bugs and feature requests
- **Discord/Slack** - (if available) For real-time chat

### Staying Updated

- Watch the repository for notifications
- Check the roadmap for planned features
- Read CHANGELOG for recent changes
- Join discussions on open issues

### Recognition

Contributors will be:
- Listed in README credits
- Mentioned in release notes
- Thanked in commit messages

## Questions?

If you have questions about contributing, feel free to:
- Open a discussion on GitHub
- Comment on relevant issues
- Reach out to maintainers

Thank you for contributing to Luno! 🎉
