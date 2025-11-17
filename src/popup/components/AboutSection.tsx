import styled from 'styled-components';

const AboutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const VersionText = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const SecondaryButton = styled.button`
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: 8px 12px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export function AboutSection() {
  const version = chrome.runtime.getManifest().version;

  const handleCheckUpdates = () => {
    const extensionId = chrome.runtime.id;
    const storeUrl = `https://chrome.google.com/webstore/detail/${extensionId}`;
    window.open(storeUrl, '_blank');
  };

  const handleReportIssue = () => {
    const issueUrl = 'https://github.com/yourusername/luno/issues';
    window.open(issueUrl, '_blank');
  };

  return (
    <AboutContainer>
      <VersionText>Version: {version}</VersionText>
      <ButtonGroup>
        <SecondaryButton onClick={handleCheckUpdates}>Check for Updates</SecondaryButton>
        <SecondaryButton onClick={handleReportIssue}>Report Issue</SecondaryButton>
      </ButtonGroup>
    </AboutContainer>
  );
}
