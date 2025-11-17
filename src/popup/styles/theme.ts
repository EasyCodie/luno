export const theme = {
  colors: {
    background: 'var(--theme-background, #1E201E)',
    container: 'var(--theme-container, #3C3D37)',
    border: 'var(--theme-border, rgba(60, 61, 55, 0.75))',
    borderLight: '#4A4B45',
    surface: '#3C3D37',
    card: '#3C3D37',
    textPrimary: 'var(--theme-text-primary, #ECDFCC)',
    textSecondary: 'var(--theme-text-secondary, #697565)',
    accent: '#ECDFCC',
    accentText: '#1E201E',
    accentHover: '#D8C9B2',
    error: '#FF6B6B',
    hoverBg: 'var(--theme-hover-bg, #4A4B45)',
    scrollbarThumb: '#697565',
  },
  typography: {
    fontFamily: "'Satoshi', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    sizes: {
      title: '18px',
      large: '20px',
      xlarge: '24px',
      body: '14px',
      small: '12px',
    },
    weights: {
      regular: 400,
      medium: 500,
      bold: 700,
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  borderRadius: '12px',
  shadows: {
    subtle: '0 2px 8px rgba(0, 0, 0, 0.4)',
  },
  mode: 'dark' as ThemeMode,
};

export type ThemeMode = 'dark' | 'light';
export type Theme = typeof theme;
