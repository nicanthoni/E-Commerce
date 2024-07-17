import { Switch, styled } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';



export default function ToggleTheme() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(theme === 'light');

  useEffect(() => {
    setChecked(theme === 'light');
  }, [theme]);

  const handleToggleMode = (event) => {
    toggleTheme();
  };

  return (
    <Switch
      color='secondary'
      checked={checked}
      onChange={handleToggleMode}
      inputProps={{ 'aria-label': 'controlled' }}
    />
  );
}
