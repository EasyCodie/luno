import styled from 'styled-components';
import SearchInput from './SearchInput';

interface HeaderProps {
  onSearch: (word: string) => void;
  isLoading?: boolean;
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.background};
  border-bottom: 1px solid rgba(60, 61, 55, 0.5);
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-shrink: 0;
`;

const Icon = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: ${({ theme }) => theme.typography.weights.bold};
  color: ${({ theme }) => theme.colors.textPrimary};
  margin: 0;
`;

const SearchWrapper = styled.div`
  flex: 0 1 60%;
  min-width: 180px;
  margin-left: auto;
`;

export function Header({ onSearch, isLoading }: HeaderProps) {
  return (
    <HeaderContainer>
      <LogoSection>
        <Icon src="/icons/icons8-book-48.png" alt="Luno" />
        <Title>Luno</Title>
      </LogoSection>
      <SearchWrapper>
        <SearchInput onSearch={onSearch} isLoading={isLoading} />
      </SearchWrapper>
    </HeaderContainer>
  );
}
