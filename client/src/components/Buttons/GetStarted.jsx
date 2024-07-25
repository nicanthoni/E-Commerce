import { Button } from '@mui/material';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function GetStarted() {
  const { user } = useAuthContext();

  return (
    <Button
      color='secondary'
      variant='contained'
      href={!user ? '/signup' : '/profile'} // if already logged in, send to profile instead
      sx={{ textTransform: 'none', borderRadius: 6, textWrap: 'nowrap',}}
    >
      Get Started
    </Button>
  );
}
