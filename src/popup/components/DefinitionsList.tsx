import { motion } from 'framer-motion';
import styled from 'styled-components';
import { listContainerVariants, listItemVariants, nestedListVariants } from '../styles/animations';
import type { NormalizedDefinition } from '../../types';
import { CopyButton } from './CopyButton';

const Container = styled(motion.div)`
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  max-height: 300px;
  min-height: 0;
  flex: 1 1 auto;
  overflow-y: auto;
  padding-right: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.scrollbarThumb};
    border-radius: 4px;

    &:hover {
      background: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const MeaningWrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};

  &:not(:first-of-type) {
    padding-top: ${({ theme }) => theme.spacing.lg};
    border-top: 1px solid ${({ theme }) => theme.colors.border};
  }
`;

const PartOfSpeech = styled.h3`
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.medium};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  margin: 0;
`;

const DefinitionsStack = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const DefinitionItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: 8px;
  border: 1px solid transparent;
  transition: background-color 200ms ease, border-color 200ms ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hoverBg};
    border-color: ${({ theme }) => theme.colors.border};
  }
`;

const DefinitionRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: space-between;
`;

const DefinitionText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  font-weight: ${({ theme }) => theme.typography.weights.regular};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.6;
  flex: 1;
`;

const ExampleRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing.sm};
  justify-content: space-between;
`;

const Example = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  font-style: italic;
  padding-left: ${({ theme }) => theme.spacing.md};
  border-left: 2px solid ${({ theme }) => theme.colors.border};
  line-height: 1.5;
  flex: 1;
`;

interface DefinitionsListProps {
  definition: NormalizedDefinition;
}

export function DefinitionsList({ definition }: DefinitionsListProps) {
  return (
    <Container variants={listContainerVariants} initial="hidden" animate="visible">
      {definition.meanings.map((meaning, meaningIndex) => (
        <MeaningWrapper key={meaningIndex} variants={listItemVariants}>
          <PartOfSpeech>{meaning.partOfSpeech}</PartOfSpeech>
          <DefinitionsStack variants={nestedListVariants} initial="hidden" animate="visible">
            {meaning.definitions.map((def, defIndex) => {
              const definitionCopyText = `${meaning.partOfSpeech}\n${def.definition}`;
              const exampleCopyText = def.example || '';

              return (
                <DefinitionItem key={defIndex} variants={listItemVariants}>
                  <DefinitionRow>
                    <DefinitionText>{def.definition}</DefinitionText>
                    <CopyButton text={definitionCopyText} ariaLabel="Copy definition" />
                  </DefinitionRow>
                  {def.example ? (
                    <ExampleRow>
                      <Example>"{def.example}"</Example>
                      <CopyButton text={exampleCopyText} ariaLabel="Copy example" />
                    </ExampleRow>
                  ) : null}
                </DefinitionItem>
              );
            })}
          </DefinitionsStack>
        </MeaningWrapper>
      ))}
    </Container>
  );
}
