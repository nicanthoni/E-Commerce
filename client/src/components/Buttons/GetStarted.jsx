import { Button } from '@mui/material';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function GetStarted() {
  const { user } = useAuthContext();

  return (
    <Button
      variant='contained'
      href={!user ? '/signup' : '/profile'} // if already logged in, send to profile instead
      color='secondary'
      sx={{ color: 'primary.main', textTransform: 'none' }}
    >
      Get Started
    </Button>
  );
}
