// 4.4 Context API — tema (claro/escuro + cor primária) compartilhado globalmente.
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

export const THEME_MODES: ThemeMode[] = ['light', 'dark'];
const PRIMARY = '#006633';

type ThemeColors = {
  background: string;
  surface: string;
  text: string;
  textMuted: string;
  border: string;
  primary: string;
};

const PALETTES: Record<ThemeMode, ThemeColors> = {
  light: {
    background: '#F2F2F7',
    surface: '#FFFFFF',
    text: '#000000',
    textMuted: 'rgba(60,60,67,0.7)',
    border: 'rgba(60,60,67,0.15)',
    primary: PRIMARY,
  },
  dark: {
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textMuted: 'rgba(235,235,245,0.6)',
    border: 'rgba(235,235,245,0.2)',
    primary: '#2FBF6A',
  },
};

type ThemeContextValue = {
  mode: ThemeMode;
  setMode: (m: ThemeMode) => void;
  colors: ThemeColors;
  primary: string;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  const value = useMemo<ThemeContextValue>(() => {
    const colors = PALETTES[mode];
    return { mode, setMode, colors, primary: colors.primary };
  }, [mode]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  return ctx;
}
