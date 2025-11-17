import type { SettingsState } from '../types';

export const SETTINGS_STORAGE_KEY = 'luno_settings';

export const DEFAULT_SETTINGS: SettingsState = {
  theme: 'dark',
  shortcut: 'Ctrl+Shift+L',
};

export function normalizeSettings(value: unknown): SettingsState {
  if (!value || typeof value !== 'object') {
    return { ...DEFAULT_SETTINGS };
  }

  const candidate = value as Partial<SettingsState>;

  return {
    theme: isValidTheme(candidate.theme) ? candidate.theme : DEFAULT_SETTINGS.theme,
    shortcut: typeof candidate.shortcut === 'string' ? candidate.shortcut : DEFAULT_SETTINGS.shortcut,
  };
}

export async function getStoredSettings(): Promise<SettingsState> {
  return new Promise((resolve) => {
    chrome.storage.local.get(SETTINGS_STORAGE_KEY, (result) => {
      if (typeof chrome !== 'undefined' && chrome.runtime?.lastError) {
        resolve({ ...DEFAULT_SETTINGS });
        return;
      }

      resolve(normalizeSettings(result[SETTINGS_STORAGE_KEY]));
    });
  });
}

export async function saveSettings(settings: SettingsState): Promise<void> {
  return new Promise((resolve) => {
    chrome.storage.local.set({ [SETTINGS_STORAGE_KEY]: settings }, () => resolve());
  });
}

export async function updateSetting<K extends keyof SettingsState>(
  key: K,
  value: SettingsState[K]
): Promise<void> {
  const settings = await getStoredSettings();
  settings[key] = value;
  await saveSettings(settings);
}

function isValidTheme(value: unknown): value is SettingsState['theme'] {
  return value === 'auto' || value === 'dark' || value === 'light';
}
