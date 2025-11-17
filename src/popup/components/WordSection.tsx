import styled from 'styled-components';
import { CopyButton } from './CopyButton';

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const WordRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const WordHeading = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.xlarge};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  text-transform: capitalize;
  letter-spacing: 0.01em;
`;

const Phonetic = styled.span`
  font-size: ${({ theme }) => theme.typography.sizes.body};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
`;

interface WordSectionProps {
  word: string;
  phonetic?: string;
}

export function WordSection({ word, phonetic }: WordSectionProps) {
  const copyText = phonetic ? `${word} ${phonetic}` : word;

  return (
    <Section>
      <WordRow>
        <WordHeading>{word}</WordHeading>
        <CopyButton text={copyText} ariaLabel={`Copy word ${word}`} />
      </WordRow>
      {phonetic ? <Phonetic>{phonetic}</Phonetic> : null}
    </Section>
  );
}
