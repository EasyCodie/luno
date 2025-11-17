const SPLASH_STORAGE_KEY = 'luno_last_opened';
const ONE_MINUTE_MS = 60 * 1000;

/**
 * Check if the splash screen should be shown.
 * Returns true if:
 * - This is the first time opening the extension (no stored timestamp)
 * - More than 1 minute has passed since the last open
 */
export async function checkShouldShowSplash(): Promise<boolean> {
  if (!chrome.storage?.local) {
    return false;
  }

  return new Promise<boolean>((resolve) => {
    chrome.storage.local.get(SPLASH_STORAGE_KEY, (result) => {
      if (chrome.runtime?.lastError) {
        resolve(false);
        return;
      }

      const lastOpened = result[SPLASH_STORAGE_KEY];

      if (!lastOpened || typeof lastOpened !== 'number') {
        resolve(true);
        return;
      }

      const timeSinceLastOpen = Date.now() - lastOpened;
      resolve(timeSinceLastOpen > ONE_MINUTE_MS);
    });
  });
}

/**
 * Update the last opened timestamp to the current time.
 */
export async function updateLastOpenedTime(): Promise<void> {
  if (!chrome.storage?.local) {
    return;
  }

  return new Promise<void>((resolve) => {
    chrome.storage.local.set(
      {
        [SPLASH_STORAGE_KEY]: Date.now(),
      },
      () => {
        resolve();
      }
    );
  });
}
