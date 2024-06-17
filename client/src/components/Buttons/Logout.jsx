import { Button } from '@mui/material';
import { useLogout } from '../../hooks/useLogout';


// accepts onClick prop from parent components (MenuDrawer & TopNavbar)
export default function LogoutButton({ onClick }) {

  return (
    <Button
      onClick={onClick}
      variant='contained'
      color='secondary'
      sx={{
        color: 'primary.main',
        textTransform: 'none',
      }}
    >
      Logout
    </Button>
  );
}
