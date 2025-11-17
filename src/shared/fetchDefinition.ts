import type { DictionaryApiEntry, NormalizedDefinition } from '../types';

const API_TIMEOUT = 10000;

export async function fetchDefinition(word: string): Promise<NormalizedDefinition> {
  const trimmedWord = word.trim();
  const cleanedWord = trimmedWord
    .replace(/[^\p{L}\p{M}'-]+/gu, ' ')
    .split(/\s+/)[0]
    ?.toLowerCase() ?? '';

  if (!cleanedWord) {
    throw new Error('Please select a valid word');
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

  try {
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanedWord)}`,
      { signal: controller.signal }
    );

    clearTimeout(timeoutId);

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`No definition found for "${trimmedWord}"`);
      }
      throw new Error('Failed to fetch definition');
    }

    const data: DictionaryApiEntry[] = await response.json();

    if (!data || data.length === 0) {
      throw new Error(`No definition found for "${trimmedWord}"`);
    }

    const entry = data[0];
    const phonetic = entry.phonetic || entry.phonetics?.find((p) => p.text)?.text || '';
    const normalizedMeanings = entry.meanings
      .map((meaning) => ({
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions
          .filter((definitionItem) => Boolean(definitionItem.definition))
          .map((definitionItem) => ({
            definition: definitionItem.definition,
            example: definitionItem.example,
          })),
      }))
      .filter((meaning) => meaning.definitions.length > 0);

    if (normalizedMeanings.length === 0) {
      throw new Error(`No definition found for "${trimmedWord}"`);
    }

    return {
      word: entry.word || trimmedWord,
      phonetic,
      meanings: normalizedMeanings,
      timestamp: Date.now(),
    };
  } catch (error) {
    clearTimeout(timeoutId);

    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new Error('Request timed out. Please try again.');
      }
      throw error;
    }

    throw new Error('An unexpected error occurred');
  }
}
