# Installation Guide

This guide walks you through installing Luno, both from the Chrome Web Store (once published) and manually for development or testing.

## Table of Contents

- [Chrome Web Store Installation](#chrome-web-store-installation)
- [Manual Installation](#manual-installation)
- [Updating the Extension](#updating-the-extension)
- [Troubleshooting](#troubleshooting)
- [FAQ](#faq)
- [Support](#support)

---

## Chrome Web Store Installation

> ⚠️ Luno is not yet available on the Chrome Web Store. This section will be updated with the official listing link once the extension is published.

Once Luno is live on the Chrome Web Store, installation will be as simple as:

1. Visit the Chrome Web Store listing page
2. Click **Add to Chrome**
3. Confirm by clicking **Add extension**
4. Pin the Luno icon for easy access (optional)

## Manual Installation

Use this method to load Luno locally for development, testing, or if the Web Store version isn’t available in your region.

### Prerequisites

- Chrome browser (or any Chromium-based browser like Edge, Brave, Opera)
- Node.js v16 or newer
- npm v8 or newer
- Git (optional but recommended)

### Step 1: Download the Source Code

Choose one of the following methods:

**Option A: Clone the repository (recommended)**

```bash
git clone https://github.com/EasyCodie/luno.git
cd luno/quickdefine
```

**Option B: Download ZIP**

1. Go to [https://github.com/EasyCodie/luno](https://github.com/EasyCodie/luno)
2. Click **Code** → **Download ZIP**
3. Extract the ZIP file
4. Open the `luno/quickdefine` directory in your terminal or file explorer

### Step 2: Install Dependencies

```bash
npm install
```

> Tip: If you encounter permission errors, try running the command with `sudo` (macOS/Linux) or run your terminal as Administrator (Windows).

### Step 3: Build the Extension

```bash
npm run build
```

This command generates the production-ready files in the `dist/` directory.

### Step 4: Load the Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Toggle **Developer mode** ON (top-right corner)
3. Click **Load unpacked**
4. Select the `dist/` folder inside the project directory
5. Luno should now appear in your extensions list

### Step 5: Pin and Test Luno

- Pin the Luno icon for quick access (click the puzzle icon → pin the Luno extension)
- Click the icon to open the popup
- Right-click a word on any webpage → choose **Quick Define**
- Verify that the definition appears in the popup

---

## Updating the Extension

### Chrome Web Store Users

Updates will be handled automatically by Chrome. You’ll receive the latest version without any action required.

### Manual Installation Users

1. Pull the latest changes:

```bash
git pull origin main
```

2. Rebuild the project:

```bash
npm install
npm run build
```

3. In `chrome://extensions/`, click the refresh icon on the Luno card to reload the updated build.

---

## Troubleshooting

### Extension Doesn’t Load

- Ensure `dist/` folder exists after running `npm run build`
- Check the Chrome Extensions page for error messages
- Ensure Developer mode is enabled
- Verify that all files in `dist/` were generated correctly
- Try removing and re-adding the extension

### "Manifest is not valid JSON" Error

- Make sure `manifest.json` is not modified and is located in the `dist/` folder
- Re-run `npm run build` to regenerate the dist folder

### Definitions Not Appearing

- Check your internet connection
- Verify the popup console for errors (Right-click popup → Inspect → Console)
- Check the [Free Dictionary API status](https://dictionaryapi.dev)

### Build Errors

- Ensure your Node.js and npm versions meet the prerequisites
- Delete `node_modules` and reinstall dependencies:

```bash
rm -rf node_modules package-lock.json
npm install
```

### Permission Errors on macOS/Linux

- You may need to grant execution permissions:

```bash
chmod +x node_modules/.bin/*
```

### Windows Path Issues

- Use PowerShell or Git Bash for Git commands
- Ensure Node.js is added to your PATH

---

## FAQ

**Q: Do I need to rebuild after every code change?**

A: Yes, for manual installation you will need to run `npm run build` after making changes, then reload the extension in Chrome.

**Q: Can I load the extension in Firefox?**

A: Not yet. Firefox support is on the roadmap.

**Q: Where is my search history stored?**

A: Luno uses Chrome’s local storage for storing search history and settings. This data stays in your browser.

**Q: How do I reset my settings?**

A: In Chrome, go to `chrome://settings/clearBrowserData` and clear "Hosted app data" for the extension.

**Q: How do I customize keyboard shortcuts?**

A: Go to `chrome://extensions/shortcuts` and find Luno to configure custom shortcuts.

---

## Support

Need help? We’re happy to assist.

- Open an issue: [https://github.com/EasyCodie/luno/issues](https://github.com/EasyCodie/luno/issues)
- Start a discussion: [https://github.com/EasyCodie/luno/discussions](https://github.com/EasyCodie/luno/discussions)
- Email: ivangolovin200809@gmail.com

Thank you for installing Luno! 🌙✨
