import { fetchDefinition } from './shared/fetchDefinition';
import type { HistoryEntry } from './types';

const MENU_ID = 'quickDefine';
const STORAGE_KEY = 'currentDefinition';
const HISTORY_STORAGE_KEY = 'luno_history';
const HISTORY_LIMIT = 20;

function sanitizeStoredHistory(value: unknown): HistoryEntry[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const normalized: HistoryEntry[] = [];
  const seen = new Set<string>();

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

    const key = trimmedWord.toLowerCase();
    if (seen.has(key)) {
      continue;
    }

    const rawTimestamp = (entry as { timestamp?: unknown }).timestamp;
    const rawCount = (entry as { count?: unknown }).count;

    const timestamp =
      typeof rawTimestamp === 'number' && Number.isFinite(rawTimestamp)
        ? rawTimestamp
        : Date.now();
    const count =
      typeof rawCount === 'number' && Number.isFinite(rawCount) && rawCount > 0
        ? Math.floor(rawCount)
        : 1;

    normalized.push({
      word: trimmedWord,
      timestamp,
      count,
    });

    seen.add(key);

    if (normalized.length >= HISTORY_LIMIT) {
      break;
    }
  }

  return normalized;
}

async function getStoredHistory(): Promise<HistoryEntry[]> {
  return new Promise((resolve) => {
    chrome.storage.local.get(HISTORY_STORAGE_KEY, (result) => {
      if (typeof chrome !== 'undefined' && chrome.runtime?.lastError) {
        resolve([]);
        return;
      }

      resolve(sanitizeStoredHistory(result[HISTORY_STORAGE_KEY]));
    });
  });
}

async function persistHistory(entries: HistoryEntry[]): Promise<void> {
  await new Promise<void>((resolve) => {
    chrome.storage.local.set(
      { [HISTORY_STORAGE_KEY]: entries.slice(0, HISTORY_LIMIT) },
      () => resolve()
    );
  });
}

async function addWordToHistory(word: string): Promise<void> {
  const normalizedWord = word.trim();
  if (!normalizedWord) {
    return;
  }

  const history = await getStoredHistory();
  const normalizedKey = normalizedWord.toLowerCase();

  const existingEntry = history.find((entry) => entry.word.toLowerCase() === normalizedKey);
  const filteredHistory = history.filter((entry) => entry.word.toLowerCase() !== normalizedKey);

  const updatedEntry: HistoryEntry = {
    word: normalizedWord,
    timestamp: Date.now(),
    count: existingEntry ? existingEntry.count + 1 : 1,
  };

  await persistHistory([updatedEntry, ...filteredHistory]);
}

function registerContextMenu() {
  chrome.contextMenus.removeAll(() => {
    chrome.contextMenus.create({
      id: MENU_ID,
      title: 'Luno',
      contexts: ['selection'],
    });
  });
}

async function handleDefinitionLookup(word: string) {
  const selectedWord = word.trim();

  const openPopupIfAvailable = () => {
    if (chrome.action?.openPopup) {
      void chrome.action.openPopup().catch(() => undefined);
    }
  };

  if (!selectedWord) {
    const updatePromise = chrome.storage.local.set({
      [STORAGE_KEY]: {
        loading: false,
        error: 'Please highlight a word to look up.',
        data: null,
        requestedWord: undefined,
      },
    });

    openPopupIfAvailable();
    await updatePromise;
    return;
  }

  const loadingState = {
    loading: true,
    error: null,
    data: null,
    requestedWord: selectedWord,
  } as const;

  const loadingPromise = chrome.storage.local.set({
    [STORAGE_KEY]: loadingState,
  });

  openPopupIfAvailable();
  await loadingPromise;

  try {
    const definition = await fetchDefinition(selectedWord);

    await addWordToHistory(selectedWord);

    await chrome.storage.local.set({
      [STORAGE_KEY]: {
        loading: false,
        error: null,
        data: definition,
        requestedWord: definition.word,
      },
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch definition';

    await chrome.storage.local.set({
      [STORAGE_KEY]: {
        loading: false,
        error: errorMessage,
        data: null,
        requestedWord: selectedWord,
      },
    });
  }
}

chrome.runtime.onInstalled.addListener(registerContextMenu);
chrome.runtime.onStartup.addListener(registerContextMenu);

chrome.contextMenus.onClicked.addListener((info: chrome.contextMenus.OnClickData) => {
  if (info.menuItemId === MENU_ID && info.selectionText) {
    handleDefinitionLookup(info.selectionText);
  }
});

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === 'SEARCH_WORD' && typeof message.word === 'string') {
    handleDefinitionLookup(message.word)
      .then(() => {
        sendResponse({ success: true });
      })
      .catch((error) => {
        sendResponse({ success: false, error: error.message });
      });
    return true;
  }
});
