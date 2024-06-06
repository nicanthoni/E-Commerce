import { Alert, Box, Slide } from '@mui/material';


//  'visible' prop - passed from parents to control alert visbility 
const CartError = ({ visible }) => {
  const alert = (
    <Alert severity='success' sx={{ maxWidth: '100%', mb: 2 }}>
        Error adding item to your cart.
    </Alert>
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        left: '50%', //  Positions the left edge of the Box at the center of the viewport
        transform: 'translateX(-50%)', // Shifts Box left by 50% of its own width, centering it horizontally
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
      }}
    >
      <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
        {alert}
      </Slide>
    </Box>
  );
};

export default CartError;