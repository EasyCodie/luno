import type { ReactNode } from 'react';
import styled, { css } from 'styled-components';

export type TabId = 'definition' | 'history' | 'settings';

interface Tab {
  id: TabId;
  label: string;
  icon?: ReactNode;
}

interface TabNavigationProps {
  tabs: Tab[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

const TabsContainer = styled.nav`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0;
  background-color: ${({ theme }) => theme.colors.background};
`;

const TabButton = styled.button<{ $active: boolean }>`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: 12px 16px;
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 14px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  &:focus-visible {
    outline: none;
    color: ${({ theme }) => theme.colors.textPrimary};
    box-shadow: inset 0 -2px 0 ${({ theme }) => theme.colors.accent};
  }

  ${({ $active, theme }) =>
    $active &&
    css`
      color: ${theme.colors.textPrimary};

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 2px;
        background-color: ${theme.colors.accent};
      }
    `}
`;

export function TabNavigation({ tabs, activeTab, onTabChange }: TabNavigationProps) {
  return (
    <TabsContainer role="tablist" aria-label="Popup sections">
      {tabs.map((tab) => (
        <TabButton
          key={tab.id}
          id={`${tab.id}-tab`}
          type="button"
          role="tab"
          aria-selected={activeTab === tab.id}
          aria-controls={`${tab.id}-panel`}
          $active={activeTab === tab.id}
          onClick={() => {
            if (tab.id !== activeTab) {
              onTabChange(tab.id);
            }
          }}
        >
          {tab.label}
        </TabButton>
      ))}
    </TabsContainer>
  );
}
