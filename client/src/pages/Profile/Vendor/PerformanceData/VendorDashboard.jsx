import {
  Typography,
  Container,
  Stack,
  Grid,
  Divider,
} from '@mui/material';
import InsightsIcon from '@mui/icons-material/Insights';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import Auth from '../../../../utils/auth';
import { Vendor } from '../../../../utils/queries';

export default function VendorDashboard() {
  return (
    <>
    <Container maxWidth='xl'>
      <Stack
        my={12}
        direction='column'
        alignItems={'center'}
        spacing={2}
        textAlign='center'
      >
        <InsightsIcon fontSize='large' sx={{ color: 'primary.main' }} />

        <Typography variant='h5' fontStyle='italic'>
          Vendors' dashboard is undergoing maintenence.
        </Typography>
        <Typography variant='h6' fontStyle='italic'>
          Check back later!
        </Typography>
      </Stack>
    </Container>
    </>
  );
}
