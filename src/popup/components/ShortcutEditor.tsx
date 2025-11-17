import styled from 'styled-components';

interface ShortcutEditorProps {
  currentShortcut: string;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const ShortcutDisplay = styled.div`
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

const EditButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.accent};
  font-family: ${({ theme }) => theme.typography.fontFamily};
  font-size: 12px;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.hoverBg};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export function ShortcutEditor({ currentShortcut }: ShortcutEditorProps) {
  const handleEdit = () => {
    // Open Chrome's keyboard shortcuts settings page
    // Users must change extension shortcuts through Chrome's settings
    window.open('chrome://extensions/shortcuts', '_blank');
  };

  return (
    <Container>
      <ShortcutDisplay>{currentShortcut || 'Not set'}</ShortcutDisplay>
      <EditButton type="button" onClick={handleEdit} aria-label="Edit shortcut">
        Edit
      </EditButton>
    </Container>
  );
}
