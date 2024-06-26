import {
  Typography,
  Container,
  Stack,
  Grid,
  Avatar,
  Divider,
} from '@mui/material';
import { Vendor } from '../../../../graphql/queries';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import StorefrontIcon from '@mui/icons-material/Storefront';

export default function VendorProfile() {
  const { user, id } = useAuthContext();
  const [loadVendor, { loading, data, error }] = useLazyQuery(Vendor, {
    variables: { vendorId: id },
  });

  // Auth check
  useEffect(() => {
    if (user) {
      loadVendor();
    }
  }, [loadVendor, user]);

  if (error) {
    console.error('GraphQL Error:', error);
  }
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  if (!data || !data.vendor) {
    return <Typography>No vendor data found</Typography>;
  }

  // Vendor data
  const vendorData = data.vendor;
  // console.log('Vendor data: ', vendorData);

  return (
    <>
      <Container maxWidth='xl'>
        <Grid container direction='column' marginTop={12}>
          {/* OVERVIEW stats */}
          <Grid item marginBottom={4}>
            <Stack direction='column' alignItems='center' spacing={2}>
              <Avatar
                sx={{ bgcolor: 'primary.main' }}
                alt={`${vendorData.vendorName}'s Logo`}
              >
                <StorefrontIcon />
              </Avatar>

              <Typography textAlign='center' variant='h6'>
                Hi, {vendorData.vendorName} 👋
              </Typography>

              <Stack
                direction='row'
                justifyContent='space-around'
                alignItems='center'
                textAlign='center'
                spacing={4}
              >
                <Stack alignItems='center'>
                  <Typography fontWeight='bold' color='secondary.main'>
                    {vendorData.inventory.length}
                  </Typography>
                  <Typography variant='caption'>Inventory</Typography>
                </Stack>
                <Stack alignItems='center'>
                  <Typography fontWeight='bold' color='secondary.main'>
                    {vendorData.sales.length}
                  </Typography>
                  <Typography variant='caption'>Sales</Typography>
                </Stack>
                <Stack alignItems='center'>
                  <Typography fontWeight='bold' color='secondary.main'>
                    0
                  </Typography>
                  <Typography variant='caption'>Followers</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          <Divider />

          {/* Metrics/Stats to go here */}
          <Grid item>
            <Stack
              my={6}
              direction='column'
              alignItems={'center'}
              spacing={3}
              textAlign='center'
            >
              <Typography variant='subtitle2'>
                Vendor profile's are undergoing maintenence. Soon, you will see
                your businesses performance data here.
              </Typography>

              <Typography variant='subtitle2' fontStyle='italic'>
                Thank you for your patience.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
