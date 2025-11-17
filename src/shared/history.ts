import type { HistoryEntry } from '../types';

export const HISTORY_STORAGE_KEY = 'luno_history';
export const HISTORY_LIMIT = 20;

function getStorageArea(): chrome.storage.LocalStorageArea | undefined {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) {
    return undefined;
  }
  return chrome.storage.local;
}

export function sanitizeHistoryEntries(value: unknown): HistoryEntry[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const normalizedEntries: HistoryEntry[] = [];
  const seenWords = new Set<string>();

  for (const entry of value) {
    if (!entry || typeof entry !== 'object') {
      continue;
    }

    const rawWord = (entry as { word?: unknown }).word;
    if (typeof rawWord !== 'string') {
      continue;
    }

    const trimmedWord = rawWord.trim();
    if (!trimmedWord) {
      continue;
    }

    const normalizedKey = trimmedWord.toLowerCase();
    if (seenWords.has(normalizedKey)) {
      continue;
    }

    const rawTimestamp = (entry as { timestamp?: unknown }).timestamp;
    const rawCount = (entry as { count?: unknown }).count;

    const timestamp =
      typeof rawTimestamp === 'number' && Number.isFinite(rawTimestamp) ? rawTimestamp : Date.now();
    const count =
      typeof rawCount === 'number' && Number.isFinite(rawCount) && rawCount > 0
        ? Math.floor(rawCount)
        : 1;

    normalizedEntries.push({
      word: trimmedWord,
      timestamp,
      count,
    });
    seenWords.add(normalizedKey);

    if (normalizedEntries.length >= HISTORY_LIMIT) {
      break;
    }
  }

  return normalizedEntries;
}

async function saveHistoryEntries(entries: HistoryEntry[]): Promise<void> {
  const storage = getStorageArea();
  if (!storage) {
    return;
  }

  await new Promise<void>((resolve) => {
    storage.set(
      { [HISTORY_STORAGE_KEY]: entries.slice(0, HISTORY_LIMIT) },
      () => resolve()
    );
  });
}

export async function getStoredHistory(): Promise<HistoryEntry[]> {
  const storage = getStorageArea();
  if (!storage) {
    return [];
  }

  return new Promise<HistoryEntry[]>((resolve) => {
    storage.get(HISTORY_STORAGE_KEY, (result) => {
      if (typeof chrome !== 'undefined' && chrome.runtime?.lastError) {
        resolve([]);
        return;
      }

      resolve(sanitizeHistoryEntries(result[HISTORY_STORAGE_KEY]));
    });
  });
}

export async function addWordToHistory(word: string): Promise<HistoryEntry[]> {
  const normalizedWord = word.trim();
  if (!normalizedWord) {
    return getStoredHistory();
  }

  const history = await getStoredHistory();
  const normalizedKey = normalizedWord.toLowerCase();

  const existingEntry = history.find((entry) => entry.word.toLowerCase() === normalizedKey);
  const filtered = history.filter((entry) => entry.word.toLowerCase() !== normalizedKey);

  const updatedEntry: HistoryEntry = {
    word: normalizedWord,
    timestamp: Date.now(),
    count: existingEntry ? existingEntry.count + 1 : 1,
  };

  const updatedHistory = [updatedEntry, ...filtered].slice(0, HISTORY_LIMIT);

  await saveHistoryEntries(updatedHistory);

  return updatedHistory;
}

export async function removeFromHistory(word: string): Promise<HistoryEntry[]> {
  const normalizedWord = word.trim().toLowerCase();
  if (!normalizedWord) {
    return getStoredHistory();
  }

  const history = await getStoredHistory();
  const filtered = history.filter((entry) => entry.word.toLowerCase() !== normalizedWord);

  await saveHistoryEntries(filtered);

  return filtered;
}

export async function clearStoredHistory(): Promise<void> {
  const storage = getStorageArea();
  if (!storage) {
    return;
  }

  await new Promise<void>((resolve) => {
    storage.remove(HISTORY_STORAGE_KEY, () => resolve());
  });
}
