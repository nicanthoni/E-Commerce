import { createContext, useState, useMemo } from 'react';
import { ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from '../theme/Theme';

export const ThemeContext = createContext();

// Context provider globally accessible via switch component (ToggleTheme)
export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme((theme) => (theme === 'light' ? 'dark' : 'light'));
  };

  const currentTheme = useMemo(
    () => (theme === 'light' ? lightTheme : darkTheme),
    [theme]
  );

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
