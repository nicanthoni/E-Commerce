import { Typography, Container, Stack } from '@mui/material';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Auth from '../../../../utils/auth';
import { Vendor } from '../../../../utils/queries';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import LogoutButton from '../../../../components/Buttons/Logout';

// Vendor profile
export default function VendorProfile() {
  // const id = Auth.getProfile().data._id;
  // const [loadUser, { loading, data, error }] = useLazyQuery(Vendor, {
  //   variables: { vendorId: id },
  // });
  // // Check if user is logged in
  // if (!Auth.loggedIn()) {
  //   // If not logged in, navigate to '/'
  //   return null; // Render nothing
  // }

  // useEffect(() => {
  //   loadUser();
  // }, [loadUser]);

  // if (error) {
  //   console.error('GraphQL Error:', error);
  //   return <p>Error fetching data</p>;
  // }

  // if (loading) {
  //   return <p>Loading...</p>; // Replace with loading spinner
  // }
  // if (!data || !data.vendor) {
  //   return <p>No vendor data found</p>;
  // }
  // const vendor = data.vendor;
  // console.log(vendor.sales);


  return (
    // <Container maxWidth='xl'>
    //   <Typography variant='h6' textAlign='center'>
    //     Welcome, {vendor.vendorName}
    //   </Typography>
    //   <>
    //     email: {vendor.email}
    //     <br />
    //     inventory:{' '}
    //     {vendor.inventory &&
    //       vendor.inventory.map((inventoryItem) => (
    //         <div key={inventoryItem.id}>
    //           <p>Name: {inventoryItem.name}</p>
    //           <p>Stock: {inventoryItem.inventory}</p>
    //         </div>
    //       ))}
    //     <br />
    //     sales:{' '}
    //     {vendor.sales &&
    //       vendor.sales.map((soldItem) => (
    //         <div key={soldItem.id}>
    //           <p>name: {soldItem.item.name}</p>
    //           <p>sold: {soldItem.sold}</p>
    //         </div>
    //       ))}
    //   </>
    //   <br />
    //   {/* LOGOUT Button */}
    //   <LogoutButton />
    // </Container>

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
            Vendor profile page's are undergoing maintenence.
        </Typography>
        <Typography variant='h6' fontStyle='italic'>
            Check back later!
        </Typography>

    </Stack>
</Container>

  );
}
