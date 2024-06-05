import { Alert, Box, Slide } from '@mui/material';


//  'visible' prop - passed from parents to control alert visbility 
const WishlistSuccess = ({ visible }) => {
  const alert = (
    <Alert severity='success' sx={{ width: '100%', mb: 2 }}>
        Item added to wishlist.
    </Alert>
  );

  return (
    <Box
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
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

export default WishlistSuccess;
