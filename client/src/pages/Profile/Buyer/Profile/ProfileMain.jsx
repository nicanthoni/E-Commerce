import { Typography, Container } from '@mui/material';
import Auth from '../../../../utils/auth';
import { useLazyQuery } from '@apollo/client';
import { User } from '../../../../utils/queries';
import { useEffect } from 'react';
import { Grid, Avatar, Stack } from '@mui/material';
import NicsAvatar from '../../../../assets/images/MyAvatar-PNG.png';
import LogoutButton from '../../../../components/Buttons/Logout';
import ProfileAccordions from './Accordion/AccordionMain';
import { useAuthContext } from '../../../../hooks/useAuthContext';


export default function BuyerProfile() {
  const { user } = useAuthContext()
  const id = Auth.getProfile().data._id;
  const [loadUser, { loading, data, error }] = useLazyQuery(User, {
    variables: { userId: id },
  });

  // Auth check 
  useEffect(() => {
    // Call loadUser only if user is truthy
    if (user) {
      loadUser();
    } 
  }, [loadUser, user]); 

  if (error) {
    console.error('GraphQL Error:', error);
  }
  if (loading) {
    return <p>Loading...</p>; 
  }
  if (!data || !data.user) {
    return <p>No user data found</p>;
  }

  // User data object
  const userData = data.user;
  // console.log('User data: ', user);

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container direction='column' marginTop={12}>
          {/* OVERVIEW stats */}
          <Grid item marginBottom={4}>
            <Stack direction='column' alignItems='center' spacing={2}>
              <Avatar
                sx={{ bgcolor: 'primary.main' }}
                alt={`${userData.firstName}'s Avatar`}
                src={NicsAvatar}
              />
              <Typography textAlign='center' variant='h6'>
                Hi, {userData.firstName} {userData.lastName} 👋
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
                    {userData.ratings.length}
                  </Typography>
                  <Typography variant='caption'>Reviews</Typography>
                </Stack>
                <Stack alignItems='center'>
                  <Typography fontWeight='bold' color='secondary.main'>
                    {userData.wishlist.length}
                  </Typography>
                  <Typography variant='caption'>Wishlist</Typography>
                </Stack>
                <Stack alignItems='center'>
                  <Typography fontWeight='bold' color='secondary.main'>
                    {userData.buyHistory.length}
                  </Typography>
                  <Typography variant='caption'>Orders</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>

          {/* ACCORDIONS - component  */}
          <Grid item>
            <ProfileAccordions />
          </Grid>
        </Grid>
        {/* LOGOUT Button - component */}
        <br />
        <LogoutButton />
      </Container>
    </>
  );
}
