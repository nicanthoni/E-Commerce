import { Button } from '@mui/material';
import { useLogout } from '../../hooks/useLogout';


// accepts prop from parent components with Logout button
export default function LogoutButton({ onLogoutSuccess }) {
  const { logout } = useLogout(); // custom logout() hook

  const handleLogout = async () => {
    try {
      await logout(); // call logout hook
      onLogoutSuccess(true); // show alert via parent component
      setTimeout(() => { // hide alert after delay
        onLogoutSuccess(false);
      }, 2000);
    } catch (e) {
      console.log('Logout error: ', e);
    }
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
