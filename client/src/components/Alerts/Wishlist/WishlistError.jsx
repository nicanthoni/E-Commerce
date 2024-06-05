import { Alert, Box, Slide } from '@mui/material';


//  'visible' prop - passed from parents to control alert visbility 
const WishlistError = ({ visible }) => {
  const alert = (
    <Alert severity='error' sx={{ width: '100%', mb: 2 }}>
        Error adding item to your wishlist.
    </Alert>
    );

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 1,
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

export default WishlistError;
