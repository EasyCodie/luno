import React, { useState } from 'react';
import styled from 'styled-components';

interface SearchInputProps {
  onSearch: (word: string) => void;
  isLoading?: boolean;
  className?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch, isLoading = false, className }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSearch = () => {
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <StyledWrapper className={className}>
      <div className="input-container">
        <input
          type="text"
          className="input"
          placeholder="Search definition..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
        />
        {inputValue && (
          <button
            type="button"
            className="clear-btn"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
        <span className="icon">
          <svg
            width="19px"
            height="19px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
            <g id="SVGRepo_iconCarrier">
              <path
                opacity={1}
                d="M14 5H20"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                opacity={1}
                d="M14 8H17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21 11.5C21 16.75 16.75 21 11.5 21C6.25 21 2 16.75 2 11.5C2 6.25 6.25 2 11.5 2"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                opacity={1}
                d="M22 22L20 20"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
        </span>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .input-container {
    width: 100%;
    position: relative;
  }

  .icon {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.2s ease;
  }

  .input {
    width: 100%;
    height: 36px;
    padding: 6px 12px;
    padding-right: 70px;
    transition: 0.2s linear;
    border: 1px solid ${({ theme }) => theme.colors.surface};
    font-size: 14px;
    letter-spacing: 1.5px;
    font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.textPrimary};
    border-radius: 8px;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textSecondary};
    }

    &:focus {
      outline: none;
      border: 1px solid ${({ theme }) => theme.colors.accent};
      box-shadow: -5px -5px 0px ${({ theme }) => theme.colors.accent};
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }

  .input-container:hover > .icon {
    animation: anim 1s linear infinite;
    color: ${({ theme }) => theme.colors.textPrimary};
  }

  .clear-btn {
    position: absolute;
    right: 35px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.textSecondary};
    font-size: 16px;
    cursor: pointer;
    padding: 4px 6px;
    transition: 0.2s linear;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      color: ${({ theme }) => theme.colors.accent};
    }
  }

  @keyframes anim {
    0%,
    100% {
      transform: translateY(-50%) scale(1);
    }

    50% {
      transform: translateY(-50%) scale(1.1);
    }
  }
`;

export default SearchInput;
