// 4.4 Context API — tema (cor primária) compartilhado globalmente.
import { createContext, ReactNode, useContext, useState } from 'react';

export const PRIMARY_OPTIONS = [
  '#006633', // Verde IFRN clássico
  '#00843D', // Verde mais vivo
  '#1B4332', // Verde sóbrio
] as const;

type ThemeContextValue = {
  primary: string;
  setPrimary: (color: string) => void;
  options: readonly string[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [primary, setPrimary] = useState<string>(PRIMARY_OPTIONS[0]);

  return (
    <ThemeContext.Provider value={{ primary, setPrimary, options: PRIMARY_OPTIONS }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  return ctx;
}
