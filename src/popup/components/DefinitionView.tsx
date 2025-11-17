import { motion } from 'framer-motion';
import styled from 'styled-components';
import type { NormalizedDefinition } from '../../types';
import { contentVariants } from '../styles/animations';
import { DefinitionsList } from './DefinitionsList';
import { WordSection } from './WordSection';

const Card = styled(motion.section)`
  background: ${({ theme }) => theme.colors.container};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadows.subtle};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

interface DefinitionViewProps {
  definition: NormalizedDefinition;
}

export function DefinitionView({ definition }: DefinitionViewProps) {
  return (
    <Card variants={contentVariants} initial="hidden" animate="visible">
      <WordSection word={definition.word} phonetic={definition.phonetic} />
      <DefinitionsList definition={definition} />
    </Card>
  );
}
