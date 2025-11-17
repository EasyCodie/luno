import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { HistoryEntry } from '../../types';

interface HistoryListProps {
  items: HistoryEntry[];
  onItemClick: (word: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

const containerVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.05, staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.2 },
  },
};

const Container = styled(motion.section)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const IconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border-radius: 999px;
  background: rgba(105, 117, 101, 0.2);
`;

const ClockIconGraphic = styled.svg`
  width: 12px;
  height: 12px;
  stroke: ${({ theme }) => theme.colors.textSecondary};
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
`;

const ClearButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 12px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover:not(:disabled) {
    color: ${({ theme }) => theme.colors.accent};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const List = styled(motion.ul)`
  list-style: none;
  margin: 0;
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadius};
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const HistoryItem = styled(motion.li)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:last-of-type {
    border-bottom: none;
  }
`;

const HistoryButton = styled(motion.button)`
  width: 100%;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: 10px 12px;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 13px;
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  text-align: left;
  cursor: pointer;
  border-left: 3px solid transparent;
  transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;

  &:hover,
  &:focus-visible {
    background: ${({ theme }) => theme.colors.hoverBg};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-left-color: ${({ theme }) => theme.colors.accent};
    outline: none;
  }
`;

const Bullet = styled.span`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.textSecondary};
  opacity: 0.6;
  flex-shrink: 0;
`;

const Word = styled.span`
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Count = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const EmptyState = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-align: center;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const LoadingState = styled(EmptyState)`
  animation: pulse 1.2s ease-in-out infinite;

  @keyframes pulse {
    0% {
      opacity: 0.8;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.8;
    }
  }
`;

const RefreshIconGraphic = styled.svg`
  width: 14px;
  height: 14px;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill: none;
  transition: transform 0.3s ease;

  ${ClearButton}:hover & {
    transform: rotate(-90deg);
  }
`;

export function HistoryList({ items, onItemClick, onClear, isLoading }: HistoryListProps) {
  const disableClear = isLoading || items.length === 0;
  const content =
    isLoading ? (
      <LoadingState>Loading history...</LoadingState>
    ) : items.length > 0 ? (
      <List variants={listVariants} initial="hidden" animate="visible">
        {items.map((item) => (
          <HistoryItem key={`${item.word}-${item.timestamp}`} variants={itemVariants}>
            <HistoryButton
              type="button"
              onClick={() => onItemClick(item.word)}
              whileTap={{ scale: 0.98 }}
            >
              <Bullet aria-hidden="true" />
              <Word>{item.word}</Word>
              {item.count > 1 && <Count>x{item.count}</Count>}
            </HistoryButton>
          </HistoryItem>
        ))}
      </List>
    ) : (
      <EmptyState>No search history yet</EmptyState>
    );

  return (
    <Container variants={containerVariants} initial="hidden" animate="visible">
      <Header>
        <Title>
          <IconWrapper aria-hidden="true">
            <ClockIconGraphic viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="8" />
              <path d="M12 8v4l2 2" />
            </ClockIconGraphic>
          </IconWrapper>
          Recent Searches
        </Title>
        <ClearButton type="button" onClick={onClear} disabled={disableClear}>
          <RefreshIconGraphic viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 4v6h6" />
            <path d="M20 20v-6h-6" />
            <path d="M5 15a7 7 0 0 0 11 3l1-1" />
            <path d="M19 9A7 7 0 0 0 8 6l-1 1" />
          </RefreshIconGraphic>
          Clear History
        </ClearButton>
      </Header>
      {content}
    </Container>
  );
}
