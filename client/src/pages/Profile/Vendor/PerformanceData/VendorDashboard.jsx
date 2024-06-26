import {
  Typography,
  Container,
  Stack,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import Auth from '../../../../auth/auth';
import { Vendor } from '../../../../graphql/queries';
import Traffic from './Traffic';
import VendorInventory from './Inventory';
import MonthlySales from './Sales';
import EngineeringIcon from '@mui/icons-material/Engineering';

export default function VendorDashboard() {
  return (
    <>
      <Container maxWidth='xl'>
        
        <Stack 
        my={12}
        direction='column' 
        alignItems={'center'}
        spacing={2} 
        textAlign='center'>

            <EngineeringIcon 
                fontSize='large' 
                sx={{ color: 'primary.main' }}
            />

            <Typography variant='h5' fontStyle='italic'>
                The Vendor Dashboard is undergoing maintenence.
            </Typography>
            <Typography variant='h6' fontStyle='italic'>
                Check back later!
            </Typography>

        </Stack>
    </Container>
    </>
  );
}
