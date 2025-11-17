import { motion } from 'framer-motion';
import styled from 'styled-components';

const Container = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  text-align: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.container};
  border-radius: ${({ theme }) => theme.borderRadius};
  border: 1px solid rgba(255, 107, 107, 0.35);
  box-shadow: ${({ theme }) => theme.shadows.subtle};
  min-height: 200px;
`;

const Title = styled.h2`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.large};
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.error};
`;

const Message = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.body};
  color: ${({ theme }) => theme.colors.textPrimary};
  line-height: 1.6;
`;

const Hint = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.typography.sizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
`;

interface ErrorStateProps {
  error: string;
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <Container initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
      <Title>Something went wrong</Title>
      <Message>{error}</Message>
      <Hint>Try selecting another word or check your connection.</Hint>
    </Container>
  );
}
