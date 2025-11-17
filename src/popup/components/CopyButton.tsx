import { useState } from 'react';
import styled from 'styled-components';
import { useToast } from './ToastContext';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 6px;
  background: transparent;
  border: none;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.textSecondary};
  cursor: pointer;
  transition: all 200ms ease;
  flex-shrink: 0;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.hoverBg};
  }

  &:active {
    transform: scale(0.95);
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const CopyIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

interface CopyButtonProps {
  text: string;
  ariaLabel?: string;
  onCopied?: () => void;
}

export function CopyButton({ text, ariaLabel, onCopied }: CopyButtonProps) {
  const { showToast } = useToast();
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      showToast('Copied!');
      onCopied?.();

      setTimeout(() => {
        setIsCopied(false);
      }, 500);
    } catch (error) {
      showToast('Failed to copy');
      console.error('Failed to copy text:', error);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleCopy}
      aria-label={ariaLabel || 'Copy to clipboard'}
      title={ariaLabel || 'Copy to clipboard'}
    >
      {isCopied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}
