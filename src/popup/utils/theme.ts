import type { SettingsState } from '../../types';

const DARK_THEME_VARIABLES: Record<string, string> = {
  '--theme-background': '#1E201E',
  '--theme-container': '#3C3D37',
  '--theme-border': 'rgba(60, 61, 55, 0.75)',
  '--theme-text-primary': '#ECDFCC',
  '--theme-text-secondary': '#697565',
  '--theme-hover-bg': '#4A4B45',
};

const LIGHT_THEME_VARIABLES: Record<string, string> = {
  '--theme-background': '#F7F9FF',
  '--theme-container': '#FFFFFF',
  '--theme-border': '#D8E0F3',
  '--theme-text-primary': '#1F2937',
  '--theme-text-secondary': '#4B5563',
  '--theme-hover-bg': '#E2E8F0',
};

export function applyTheme(theme: SettingsState['theme']): 'dark' | 'light' {
  const resolvedTheme = resolveTheme(theme);
  const variables = resolvedTheme === 'dark' ? DARK_THEME_VARIABLES : LIGHT_THEME_VARIABLES;

  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(variables)) {
      root.style.setProperty(key, value);
    }
  }

  return resolvedTheme;
}

export function setupThemeListener(callback: (theme: 'dark' | 'light') => void): () => void {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const listener = (event: MediaQueryListEvent) => {
    callback(event.matches ? 'dark' : 'light');
  };

  mediaQuery.addEventListener('change', listener);

  return () => {
    mediaQuery.removeEventListener('change', listener);
  };
}

export function resolveTheme(theme: SettingsState['theme']): 'dark' | 'light' {
  if (theme === 'auto') {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  }

  return theme;
}
