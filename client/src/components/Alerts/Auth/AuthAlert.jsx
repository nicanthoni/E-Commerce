import { Alert, Box, Slide } from '@mui/material';

//  Props passed from parents to control alert visibility & alert's message content
const AuthAlert = ({ visible, message }) => {
  const alert = (
    <Alert
      severity={
        message === 'Login Successful.' ||
        message === 'Registration Successful.' ||
        message === 'Logout successful.' ||
        message == 'Account successfuly deleted.'
          ? 'success'
          : 'error'
      }
      sx={{ maxWidth: '100%', mb: 2 }}
    >
      {message}
    </Alert>
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%', // Positions the left edge of the Box at the center of the viewport
        transform: 'translateX(-50%)', // Shifts Box left by 50% of its own width, centering it horizontally
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <Slide direction='up' in={visible} mountOnEnter unmountOnExit>
        {alert}
      </Slide>
    </Box>
  );
};

export default AuthAlert;
