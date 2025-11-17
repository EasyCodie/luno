import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Satoshi';
    src: url('/fonts/satoshi/Fonts/WEB/fonts/Satoshi-Regular.woff2') format('woff2'),
         url('/fonts/satoshi/Fonts/WEB/fonts/Satoshi-Regular.woff') format('woff');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Satoshi';
    src: url('/fonts/satoshi/Fonts/WEB/fonts/Satoshi-Medium.woff2') format('woff2'),
         url('/fonts/satoshi/Fonts/WEB/fonts/Satoshi-Medium.woff') format('woff');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Satoshi';
    src: url('/fonts/satoshi/Fonts/WEB/fonts/Satoshi-Bold.woff2') format('woff2'),
         url('/fonts/satoshi/Fonts/WEB/fonts/Satoshi-Bold.woff') format('woff');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }

  *, *::before, *::after {
    box-sizing: border-box;
  }

  :root {
    --theme-background: #1E201E;
    --theme-container: #3C3D37;
    --theme-border: rgba(60, 61, 55, 0.75);
    --theme-text-primary: #ECDFCC;
    --theme-text-secondary: #697565;
    --theme-hover-bg: #4A4B45;
  }

  html, body {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.textPrimary};
    font-family: 'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
  }

  body {
    display: flex;
    align-items: stretch;
    justify-content: center;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;
