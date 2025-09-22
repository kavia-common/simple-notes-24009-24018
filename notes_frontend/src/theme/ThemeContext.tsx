import React, { createContext, useContext, ReactNode, useMemo } from 'react';

export type AppColors = {
  primary: string;
  secondary: string;
  success: string;
  error: string;
  background: string;
  surface: string;
  text: string;
  card: string;
  subtleText: string;
  shadow: string;
  gradientStart: string;
  gradientEnd: string;
};

type ThemeValue = {
  colors: AppColors;
  radius: number;
  spacing: (n: number) => number;
};

const defaultColors: AppColors = {
  primary: '#2563EB',
  secondary: '#F59E0B',
  success: '#F59E0B',
  error: '#EF4444',
  background: '#f9fafb',
  surface: '#ffffff',
  text: '#111827',
  card: '#ffffff',
  subtleText: '#6B7280',
  shadow: 'rgba(17,24,39,0.08)',
  gradientStart: 'rgba(59,130,246,0.08)', // blue-500/10
  gradientEnd: 'rgba(249,250,251,1)',     // gray-50
};

const ThemeContext = createContext<ThemeValue>({
  colors: defaultColors,
  radius: 14,
  spacing: (n) => n * 8,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const value = useMemo<ThemeValue>(() => {
    return {
      colors: defaultColors,
      radius: 14,
      spacing: (n) => n * 8,
    };
  }, []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// PUBLIC_INTERFACE
export const useTheme = () => {
  /** Provides Ocean Professional theme values throughout the app. */
  return useContext(ThemeContext);
};
