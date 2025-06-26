import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Colors {
  primary: string;
  secondary: string;
  cricket: string;
  football: string;
  tennis: string;
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  card: string;
  success: string;
  warning: string;
  error: string;
}

const lightColors: Colors = {
  primary: '#10B981',
  secondary: '#1E293B',
  cricket: '#4CAF50',
  football: '#2196F3',
  tennis: '#FF9800',
  background: '#FFFFFF',
  backgroundSecondary: '#F8FAFC',
  text: '#1E293B',
  textSecondary: '#475569',
  textMuted: '#64748B',
  border: '#E2E8F0',
  card: '#FFFFFF',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

const darkColors: Colors = {
  primary: '#10B981',
  secondary: '#0F172A',
  cricket: '#4CAF50',
  football: '#2196F3',
  tennis: '#FF9800',
  background: '#0F172A',
  backgroundSecondary: '#1E293B',
  text: '#F8FAFC',
  textSecondary: '#CBD5E1',
  textMuted: '#94A3B8',
  border: '#334155',
  card: '#1E293B',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
};

interface ThemeContextType {
  colors: Colors;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        setIsDark(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    try {
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <ThemeContext.Provider value={{ colors, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}