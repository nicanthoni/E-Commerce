import { Button } from '@mui/material';

// Reusable Get Started button component
export default function GetStarted() {
    
  return (
    <Button
      variant='contained'
      href='/signup'
      color='secondary'
      sx={{ color: 'primary.main', textTransform: 'none' }}
    >
      Get Started
    </Button>
  );
}
