import { Typography, Container, Stack, Grid, Avatar } from '@mui/material';
import Auth from '../../../../utils/auth';
import { Vendor } from '../../../../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import StorefrontIcon from '@mui/icons-material/Storefront';



export default function VendorProfile() {
const { user } = useAuthContext(); 
const id = Auth.getProfile().data._id;
const [loadVendor, { loading, data, error }] = useLazyQuery(Vendor, {
variables: { vendorId: id },});

// Auth check 
useEffect(() => {
  // Call loadVendor only if user is truthy
  if (user) {
    loadVendor();
  
  } 
}, [loadVendor, user]); 

if (error) {
  console.error('GraphQL Error:', error);
}
if (loading) {
  return <p>Loading...</p>; 
}
if (!data || !data.vendor) {
  return <p>No vendor data found</p>;
}


  // Vendor data 
  const vendorData = data.vendor;
  // console.log('Vendor data: ', vendorData);

  return (
    <>
    <Container maxWidth='lg'>
      <Grid container direction='column' marginTop={12}>

        {/* OVERVIEW stats */}
        <Grid item marginBottom={4}>
          <Stack direction='column' alignItems='center' spacing={2}>

            <Avatar
              sx={{ bgcolor: 'primary.main' }}
              alt={`${vendorData.vendorName}'s Logo`}
              >
              <StorefrontIcon/>
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

          {/* Metrics/Stats to go here */}
          <Grid item>
            
          </Grid>

      </Grid>
    </Container>
  </>
  );
}
