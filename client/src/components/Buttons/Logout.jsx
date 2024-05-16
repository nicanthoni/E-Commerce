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
      sx={{
        bgcolor: 'secondary.main',
        color: 'primary.main',
        textTransform: 'none',
      }}
    >
      Logout
    </Button>
  );
}
