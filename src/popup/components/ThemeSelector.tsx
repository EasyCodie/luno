import styled from 'styled-components';
import type { SettingsState } from '../../types';

interface ThemeSelectorProps {
  currentTheme: SettingsState['theme'];
  onThemeChange: (theme: SettingsState['theme']) => void;
}

const RadioGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
`;

const RadioOption = styled.label<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 13px;
  color: ${({ theme, $selected }) => ($selected ? theme.colors.textPrimary : theme.colors.textSecondary)};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`;

const RadioButton = styled.div<{ $selected: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 1px solid ${({ theme, $selected }) => ($selected ? theme.colors.accent : theme.colors.border)};
  background: ${({ theme, $selected }) => ($selected ? theme.colors.accent : 'transparent')};
  position: relative;
  transition: all 0.2s ease;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({ theme }) => theme.colors.accentText};
    opacity: ${({ $selected }) => ($selected ? 1 : 0)};
    transition: opacity 0.2s ease;
  }

  ${RadioOption}:hover & {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const themes: Array<{ value: SettingsState['theme']; label: string }> = [
  { value: 'auto', label: 'Auto' },
  { value: 'dark', label: 'Dark' },
  { value: 'light', label: 'Light' },
];

export function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <RadioGroup>
      {themes.map((theme) => (
        <RadioOption key={theme.value} $selected={currentTheme === theme.value}>
          <HiddenRadio
            type="radio"
            name="theme"
            value={theme.value}
            checked={currentTheme === theme.value}
            onChange={() => onThemeChange(theme.value)}
          />
          <RadioButton $selected={currentTheme === theme.value} />
          {theme.label}
        </RadioOption>
      ))}
    </RadioGroup>
  );
}
