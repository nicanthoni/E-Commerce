import StorefrontIcon from '@mui/icons-material/Storefront';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { Stack, Button } from '@mui/material';

export default function HomeServices() {
  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        justifyContent: { xs: 'center', sm: 'space-around' },
      }}
    >
      <Stack padding={4} alignItems='center'>
        <StorefrontIcon sx={{ fontSize: 90, color: 'action.active' }} />
        <Button
          variant='contained'
          href='signup/buyer'
          color='secondary'
          sx={{ color: 'primary.main', textTransform: 'none', borderRadius: 6 }}
        >
          Shop
        </Button>
      </Stack>

      <Stack padding={4} alignItems='center'>
        <LocalAtmIcon sx={{ fontSize: 90, color: 'action.active' }} />
        <Button
          variant='contained'
          href='/signup/vendor'
          color='secondary'
          sx={{ color: 'primary.main', textTransform: 'none', borderRadius: 6 }}
        >
          Sell
        </Button>
      </Stack>

      <Stack padding={4} alignItems='center'>
        <SupportAgentIcon sx={{ fontSize: 90, color: 'action.active' }} />
        <Button
          variant='contained'
          href='/support'
          color='secondary'
          sx={{ color: 'primary.main', textTransform: 'none', borderRadius: 6 }}
        >
          Support
        </Button>
      </Stack>
    </Stack>
  );
}
