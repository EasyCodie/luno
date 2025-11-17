import styled from 'styled-components';
import type { SettingsState } from '../../types';
import { ThemeSelector } from './ThemeSelector';
import { ShortcutEditor } from './ShortcutEditor';
import { AboutSection } from './AboutSection';

interface SettingsProps {
  settings: SettingsState;
  onThemeChange: (theme: SettingsState['theme']) => void | Promise<void>;
  isLoading?: boolean;
}

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  max-height: 400px;
  overflow-y: auto;
  padding: ${({ theme }) => theme.spacing.lg};

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

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const SectionHeader = styled.h3`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin: 0;
`;

const SettingRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const SettingLabel = styled.span`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const LoadingState = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export function Settings({ settings, onThemeChange, isLoading = false }: SettingsProps) {
  if (isLoading) {
    return (
      <SettingsContainer>
        <LoadingState>Loading settings...</LoadingState>
      </SettingsContainer>
    );
  }

  return (
    <SettingsContainer>
      <Section>
        <SectionHeader>Appearance</SectionHeader>
        <SettingRow>
          <SettingLabel>Theme</SettingLabel>
          <ThemeSelector currentTheme={settings.theme} onThemeChange={onThemeChange} />
        </SettingRow>
      </Section>

      <Section>
        <SectionHeader>Shortcuts</SectionHeader>
        <SettingRow>
          <SettingLabel>Open Luno</SettingLabel>
          <ShortcutEditor currentShortcut={settings.shortcut} />
        </SettingRow>
      </Section>

      <Section>
        <SectionHeader>About</SectionHeader>
        <AboutSection />
      </Section>
    </SettingsContainer>
  );
}
