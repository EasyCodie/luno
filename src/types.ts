export interface DictionaryApiDefinition {
  definition: string;
  example?: string;
  synonyms?: string[];
  antonyms?: string[];
}

export interface DictionaryApiMeaning {
  partOfSpeech: string;
  definitions: DictionaryApiDefinition[];
}

export interface DictionaryApiEntry {
  word: string;
  phonetic?: string;
  phonetics?: Array<{
    text?: string;
    audio?: string;
  }>;
  meanings: DictionaryApiMeaning[];
}

export interface NormalizedDefinition {
  word: string;
  phonetic?: string;
  meanings: Array<{
    partOfSpeech: string;
    definitions: Array<{
      definition: string;
      example?: string;
    }>;
  }>;
  timestamp: number;
}

export interface DefinitionStorageState {
  data: NormalizedDefinition | null;
  loading: boolean;
  error: string | null;
  requestedWord?: string;
}

export interface HistoryEntry {
  word: string;
  timestamp: number;
  count: number;
}

export interface SettingsState {
  theme: 'auto' | 'dark' | 'light';
  shortcut: string;
}
