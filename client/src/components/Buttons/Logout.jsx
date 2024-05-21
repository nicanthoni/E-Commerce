import { Button } from '@mui/material';
import { useLogout } from '../../hooks/useLogout';


export default function LogoutButton() {

  const { logout } = useLogout() // customer logout() hook
  const handleLogout = () => {
    logout()
  };


  return (
    <Button
      onClick={handleLogout}
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
