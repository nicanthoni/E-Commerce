import StorefrontIcon from '@mui/icons-material/Storefront'; // Discover products icon
import AddBusinessIcon from '@mui/icons-material/AddBusiness'; // Become vendor icon
import ContactSupportIcon from '@mui/icons-material/ContactSupport'; // Support icon
import { Box, Stack, Typography, Button } from '@mui/material';

export default function HomeServices() {
  return (
    <Stack
      direction='row'
      justifyContent={'space-around'}
      alignItems={'center'}
      // On small screens, change direction to column
      sx={{
        flexDirection: { xs: 'column', sm: 'row' },
        marginY: { xs: 1, sm: 2, lg: 4 },
      }}>
      <Stack padding={4} alignItems='center'>
        <StorefrontIcon sx={{ fontSize: 90, color: 'primary.main' }} />
        <Button 
        variant='contained' href='signup/buyer'
        sx={{ color: 'primary.main' , bgcolor: 'secondary.main', textTransform: 'none' }}
        >
          Shop
        </Button>
      </Stack>

      <Stack padding={4} alignItems='center'>
        <AddBusinessIcon sx={{ fontSize: 90, color: 'primary.main' }} />
        <Button 
        variant='contained' href='/signup/vendor'
        sx={{ color: 'primary.main' , bgcolor: 'secondary.main', textTransform: 'none' }}
        >
          Sell
        </Button>
      </Stack>

      <Stack padding={4} alignItems='center'>
        <ContactSupportIcon sx={{ fontSize: 90, color: 'primary.main' }} />
        <Button 
        variant='contained' href='#'
        sx={{ color: 'primary.main' , bgcolor: 'secondary.main', textTransform: 'none' }}
        >
          Support
        </Button>
      </Stack>
    </Stack>
  );
}
