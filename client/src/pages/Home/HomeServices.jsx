import StorefrontIcon from '@mui/icons-material/Storefront'; // Discover products icon
import AddBusinessIcon from '@mui/icons-material/AddBusiness'; // Become vendor icon
import ContactSupportIcon from '@mui/icons-material/ContactSupport'; // Support icon
import {  Stack, Button } from '@mui/material';

export default function HomeServices() {
  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        justifyContent: {xs: 'center', sm: 'space-around'}
      }}>
      <Stack padding={4} alignItems='center'>
        <StorefrontIcon sx={{ fontSize: 90, color: 'primary.main' }} />
        <Button 
        variant='contained' href='signup/buyer' color='secondary'
        sx={{ color: 'primary.main', textTransform: 'none', borderRadius: 6, }}
        >
          Shop
        </Button>
      </Stack>

      <Stack padding={4} alignItems='center'>
        <AddBusinessIcon sx={{ fontSize: 90, color: 'primary.main' }} />
        <Button 
        variant='contained' href='/signup/vendor' color='secondary'
        sx={{ color: 'primary.main', textTransform: 'none', borderRadius: 6, }}
        >
          Sell
        </Button>
      </Stack>

      <Stack padding={4} alignItems='center'>
        <ContactSupportIcon sx={{ fontSize: 90, color: 'primary.main' }} />
        <Button 
        variant='contained' href='/support' color='secondary'
        sx={{ color: 'primary.main', textTransform: 'none', borderRadius: 6, }}
        >
          Support
        </Button>
      </Stack>
    </Stack>
  );
}
