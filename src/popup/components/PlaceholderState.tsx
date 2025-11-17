import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Icon = styled.div`
  font-size: 48px;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  opacity: 0.4;
`;

const Message = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  max-width: 280px;
  font-weight: ${({ theme }) => theme.typography.weights.regular};
`;

export function PlaceholderState() {
  return (
    <Container initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <Icon>📖</Icon>
      <Message>
        Search for a word above or highlight text on any page and choose "Luno" to see
        definitions.
      </Message>
    </Container>
  );
}
