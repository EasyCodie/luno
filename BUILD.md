# Luno Chrome Extension - Build Instructions

## Building the Extension

1. Install dependencies:
   ```bash
   npm install
   ```

2. Build the extension:
   ```bash
   npm run build
   ```

3. The output will be in the `dist/` folder, ready to be loaded as an unpacked Chrome extension.

## Loading in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top right)
3. Click **Load unpacked**
4. Select the `dist/` folder from this project
5. The Luno extension should now appear in your extensions list

## Testing

1. After loading the extension, click the Luno icon in the toolbar to open the popup
2. Select any text on a webpage
3. Right-click and choose "Luno" from the context menu
4. Check the browser console (F12) to see the selected text logged

## Development

- Run `npm run dev` to start the Vite dev server (for development)
- Run `npm run build` to create a production build
- Run `npm run lint` to check for code issues

## Structure

- `dist/` - Build output (load this folder as unpacked extension)
- `src/background.ts` - Service worker (context menu registration)
- `src/popup/` - React popup UI components
- `public/manifest.json` - Chrome extension manifest
- `public/icons/` - Extension icons
