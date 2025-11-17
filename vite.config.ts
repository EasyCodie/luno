import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { readFileSync, writeFileSync, rmSync } from 'fs';

export default defineConfig(({ mode }) => {
  const isDevelopment = mode === 'development';

  return {
    base: '',
    plugins: [
      react(),
      {
        name: 'chrome-extension-build',
        closeBundle() {
          try {
            const srcPath = resolve(__dirname, 'dist/src/popup/popup.html');
            const destPath = resolve(__dirname, 'dist/popup.html');
            let content = readFileSync(srcPath, 'utf-8');
            content = content.replace(/\.\.\/\.\.\//g, './');
            writeFileSync(destPath, content);
            rmSync(resolve(__dirname, 'dist/src'), { recursive: true, force: true });
          } catch (err) {
            console.warn('Failed to process popup.html:', err);
          }
        },
      },
    ],
    publicDir: 'public',
    build: {
      outDir: 'dist',
      target: 'es2020',
      emptyOutDir: true,
      sourcemap: isDevelopment,
      copyPublicDir: true,
      rollupOptions: {
        input: {
          background: resolve(__dirname, 'src/background.ts'),
          popup: resolve(__dirname, 'src/popup/popup.html'),
        },
        output: {
          format: 'es',
          entryFileNames: (chunkInfo) => {
            if (chunkInfo.name === 'background') {
              return '[name].js';
            }
            return 'popup/[name].js';
          },
          chunkFileNames: 'popup/[name].js',
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith('.css')) {
              return 'popup/[name][extname]';
            }
            return '[name][extname]';
          },
        },
      },
    },
    esbuild: {
      jsx: 'automatic',
      jsxDev: isDevelopment,
      jsxImportSource: 'react',
    },
  };
});
