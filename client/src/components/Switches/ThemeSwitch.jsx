import { Switch, Box, ButtonGroup, Divider } from '@mui/material';
import { useContext, useState, useEffect } from 'react';
import { ThemeContext } from '../../contexts/ThemeContext';
import { IconButton } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

export default function ThemeSwitch() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [checked, setChecked] = useState(theme === 'light');

  useEffect(() => {
    setChecked(theme === 'light');
  }, [theme]);

  const handleToggleMode = () => {
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

// WORKING VARIANTS:

// Single Button
{
  /* <IconButton onClick={handleToggleMode} color='secondary' checked={checked}>
      {theme === 'dark' ? <LightModeIcon/> : <DarkModeIcon />}
    </IconButton> */
}

// Button Group
{
  /* <Box
display='flex'
border='1.5px solid'
borderRadius={4}
justifyContent='center'
alignItems='center'
sx={{ color: theme === 'light' ? 'text.primary' : 'white.main' }}
>
<IconButton
  onClick={handleToggleMode}
  disabled={theme === 'light'}
  sx={{ color: theme === 'light' ? 'secondary.main' : 'secondary.main' }}
>
  <LightModeIcon />
</IconButton>
<Divider

  flexItem
  fullWidth
  orientation='vertical'
  sx={{
    borderColor: theme === 'light' ? 'text.primary' : 'white.main',
  }}
/>
<IconButton
  onClick={handleToggleMode}
  disabled={theme === 'dark'}
  sx={{
    color: theme === 'dark' ? 'secondary.main' : 'text.primary',
  }}
>
  <DarkModeIcon />
</IconButton>
</Box> */
}

// Switch
{
  /* <Switch
      color='secondary'
      checked={checked}
      onChange={handleToggleMode}
      inputProps={{ 'aria-label': 'controlled' }}
    /> */
}
