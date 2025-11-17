import { useCallback, useEffect, useMemo, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import type { DefinitionStorageState, HistoryEntry, SettingsState } from '../types';
import {
  clearStoredHistory,
  getStoredHistory,
  HISTORY_STORAGE_KEY,
  sanitizeHistoryEntries,
} from '../shared/history';
import {
  DEFAULT_SETTINGS,
  SETTINGS_STORAGE_KEY,
  getStoredSettings,
  normalizeSettings,
  updateSetting,
} from '../shared/settings';
import { GlobalStyle } from './styles/globalStyles';
import { theme } from './styles/theme';
import { popupContainerVariants } from './styles/animations';
import {
  Header,
  DefinitionView,
  LoadingState,
  ErrorState,
  PlaceholderState,
  HistoryList,
  ToastProvider,
  TabNavigation,
  SplashScreen,
  Settings,
  type TabId,
} from './components';
import { checkShouldShowSplash, updateLastOpenedTime } from './utils/splash';
import { applyTheme, setupThemeListener } from './utils/theme';

const STORAGE_KEY = 'currentDefinition';
const DEFAULT_STATE: DefinitionStorageState = {
  data: null,
  loading: false,
  error: null,
  requestedWord: undefined,
};

function createDefaultState(): DefinitionStorageState {
  return { ...DEFAULT_STATE };
}

const PopupContainer = styled(motion.div)`
  width: 400px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.background};
  overflow: hidden;
`;

const TabPanel = styled(motion.section)`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.background};
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.textSecondary};
    }
  }
`;

const TABS: Array<{ id: TabId; label: string }> = [
  { id: 'definition', label: 'Definition' },
  { id: 'history', label: 'History' },
  { id: 'settings', label: 'Settings' },
];

const tabPanelVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2 },
  },
};

export default function App() {
  const [state, setState] = useState<DefinitionStorageState>(createDefaultState);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [isClearingHistory, setIsClearingHistory] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('definition');
  const [showSplash, setShowSplash] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(DEFAULT_SETTINGS);
  const [settingsLoading, setSettingsLoading] = useState(true);
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  const loadHistory = useCallback(async () => {
    const entries = await getStoredHistory();
    setHistory(entries);
    return entries;
  }, []);

  useEffect(() => {
    let isMounted = true;

    const initializeSplash = async () => {
      const shouldShow = await checkShouldShowSplash();
      if (!isMounted) {
        return;
      }

      setShowSplash(shouldShow);

      void updateLastOpenedTime();
    };

    void initializeSplash();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    chrome.storage.local.get(STORAGE_KEY, (result) => {
      const stored = result[STORAGE_KEY] as DefinitionStorageState | undefined;
      if (stored) {
        setState(stored);
      } else {
        setState(createDefaultState());
      }
    });

    const listener = (changes: { [key: string]: chrome.storage.StorageChange }) => {
      if (changes[STORAGE_KEY]) {
        const newValue = changes[STORAGE_KEY].newValue as DefinitionStorageState | undefined;
        setState(newValue ?? createDefaultState());
      }
    };

    chrome.storage.onChanged.addListener(listener);

    return () => {
      chrome.storage.onChanged.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    let isActive = true;
    setHistoryLoading(true);

    void loadHistory().finally(() => {
      if (isActive) {
        setHistoryLoading(false);
      }
    });

    const historyListener = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: chrome.storage.AreaName
    ) => {
      if (areaName !== 'local' || !changes[HISTORY_STORAGE_KEY]) {
        return;
      }

      const newValue = changes[HISTORY_STORAGE_KEY].newValue;
      if (Array.isArray(newValue)) {
        setHistory(sanitizeHistoryEntries(newValue));
      } else {
        setHistory([]);
      }
      setHistoryLoading(false);
    };

    chrome.storage.onChanged.addListener(historyListener);

    return () => {
      isActive = false;
      chrome.storage.onChanged.removeListener(historyListener);
    };
  }, [loadHistory]);

  useEffect(() => {
    const loadSettings = async () => {
      const storedSettings = await getStoredSettings();
      setSettings(storedSettings);
      const resolvedTheme = applyTheme(storedSettings.theme);
      setThemeMode(resolvedTheme);
      setSettingsLoading(false);
    };

    void loadSettings();
  }, []);

  useEffect(() => {
    const resolved = applyTheme(settings.theme);
    setThemeMode(resolved);

    if (settings.theme === 'auto') {
      const cleanup = setupThemeListener((autoResolved) => {
        setThemeMode(autoResolved);
        applyTheme(autoResolved);
      });
      return cleanup;
    }

    return undefined;
  }, [settings.theme]);

  useEffect(() => {
    const loadShortcut = async () => {
      try {
        const commands = await chrome.commands.getAll();
        const openLunoCommand = commands.find(
          (cmd) => cmd.name === '_execute_action' || cmd.name === 'open-luno'
        );

        if (openLunoCommand) {
          const shortcut = openLunoCommand.shortcut ?? '';
          setSettings((prev) => ({ ...prev, shortcut }));

          // Persist the latest shortcut value so we show accurate information on next launch
          await updateSetting('shortcut', shortcut);
        }
      } catch (error) {
        console.error('Failed to load shortcut:', error);
      }
    };

    void loadShortcut();
  }, []);

  useEffect(() => {
    const settingsListener = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: chrome.storage.AreaName
    ) => {
      if (areaName !== 'local' || !changes[SETTINGS_STORAGE_KEY]) {
        return;
      }

      const newValue = changes[SETTINGS_STORAGE_KEY].newValue;
      if (newValue) {
        setSettings(normalizeSettings(newValue));
      }
    };

    chrome.storage.onChanged.addListener(settingsListener);

    return () => {
      chrome.storage.onChanged.removeListener(settingsListener);
    };
  }, []);

  const handleSearch = useCallback(
    async (word: string) => {
      const searchWord = word.trim();
      if (!searchWord) {
        return;
      }

      const loadingState: DefinitionStorageState = {
        data: null,
        loading: true,
        error: null,
        requestedWord: searchWord,
      };

      setActiveTab('definition');
      setState(loadingState);

      if (!chrome.runtime?.sendMessage) {
        const errorState: DefinitionStorageState = {
          data: null,
          loading: false,
          error: 'Search is unavailable in this environment.',
          requestedWord: searchWord,
        };

        setState(errorState);

        if (chrome.storage?.local) {
          void chrome.storage.local.set({
            [STORAGE_KEY]: errorState,
          });
        }
        return;
      }

      try {
        await chrome.runtime.sendMessage({ type: 'SEARCH_WORD', word: searchWord });
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to fetch definition';

        const errorState: DefinitionStorageState = {
          data: null,
          loading: false,
          error: errorMessage,
          requestedWord: searchWord,
        };

        setState(errorState);

        if (chrome.storage?.local) {
          void chrome.storage.local.set({
            [STORAGE_KEY]: errorState,
          });
        }
      }
    },
    [setActiveTab]
  );

  const handleHistorySearch = useCallback(
    (word: string) => {
      void handleSearch(word);
      setActiveTab('definition');
    },
    [handleSearch, setActiveTab]
  );

  const handleClearHistory = useCallback(async () => {
    if (isClearingHistory) {
      return;
    }

    setIsClearingHistory(true);
    try {
      await clearStoredHistory();
      setHistory([]);
    } finally {
      setIsClearingHistory(false);
    }
  }, [isClearingHistory]);

  const handleTabChange = (tabId: TabId) => {
    setActiveTab(tabId);
  };

  const handleSplashDismiss = useCallback(() => {
    setShowSplash(false);
  }, []);

  const handleThemeChange = useCallback(async (newTheme: SettingsState['theme']) => {
    setSettings((prev) => ({ ...prev, theme: newTheme }));
    await updateSetting('theme', newTheme);
    const resolvedTheme = applyTheme(newTheme);
    setThemeMode(resolvedTheme);
  }, []);

  const currentTheme = useMemo(
    () => ({
      ...theme,
      mode: themeMode,
    }),
    [themeMode]
  );

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <ToastProvider>
        <PopupContainer
          variants={popupContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {showSplash ? (
            <SplashScreen onDismiss={handleSplashDismiss} />
          ) : (
            <>
              <Header onSearch={handleSearch} isLoading={state.loading} />
              <TabNavigation tabs={TABS} activeTab={activeTab} onTabChange={handleTabChange} />
              <AnimatePresence mode="wait">
                {activeTab === 'definition' && (
                  <TabPanel
                    key="definition"
                    id="definition-panel"
                    role="tabpanel"
                    aria-labelledby="definition-tab"
                    variants={tabPanelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    {state.loading && <LoadingState word={state.requestedWord} />}
                    {state.error && <ErrorState error={state.error} />}
                    {state.data && !state.loading && !state.error && (
                      <DefinitionView definition={state.data} />
                    )}
                    {!state.loading && !state.error && !state.data && <PlaceholderState />}
                  </TabPanel>
                )}
                {activeTab === 'history' && (
                  <TabPanel
                    key="history"
                    id="history-panel"
                    role="tabpanel"
                    aria-labelledby="history-tab"
                    variants={tabPanelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <HistoryList
                      items={history}
                      onItemClick={handleHistorySearch}
                      onClear={handleClearHistory}
                      isLoading={historyLoading || isClearingHistory}
                    />
                  </TabPanel>
                )}
                {activeTab === 'settings' && (
                  <TabPanel
                    key="settings"
                    id="settings-panel"
                    role="tabpanel"
                    aria-labelledby="settings-tab"
                    variants={tabPanelVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                  >
                    <Settings
                      settings={settings}
                      onThemeChange={handleThemeChange}
                      isLoading={settingsLoading}
                    />
                  </TabPanel>
                )}
              </AnimatePresence>
            </>
          )}
        </PopupContainer>
      </ToastProvider>
    </ThemeProvider>
  );
}
