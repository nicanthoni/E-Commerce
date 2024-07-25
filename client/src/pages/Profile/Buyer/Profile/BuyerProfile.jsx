import { Typography, Container, Box, CircularProgress } from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { User } from '../../../../graphql/queries';
import { useEffect } from 'react';
import { Grid, Avatar, Stack } from '@mui/material';
import ProfileAccordions from './Accordion/AccordionMain';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import { formatDate } from '../../../../utils/formatters/formatDate';

export default function BuyerProfile() {
  const { user, id } = useAuthContext();
  const [loadUser, { loading, data, error, refetch: refetchUserData }] =
    useLazyQuery(User, {
      variables: { userId: id },
    });

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
    return (
      <Box sx={{ width: '100%' }}>
        <CircularProgress color='primary' />
      </Box>
    );
  }
  if (!data || !data.user) {
    return <Typography>No user data found</Typography>;
  }

  // User data object
  const userData = data.user;
  // console.log('user data: ', userData)

  return (
    <>
      <Container maxWidth='md'>
        <Grid container direction='column' marginTop={12}>
          {/* OVERVIEW stats */}
          <Grid item marginBottom={4}>
            <Stack direction='column' alignItems='center' spacing={1}>
              <Avatar
                sx={{ bgcolor: 'action.active' }}
                alt={`${userData.firstName}'s Avatar`}
              />

              <Typography textAlign='center' variant='h6'>
                Hi, {userData.firstName}
              </Typography>

              <Typography textAlign='center' variant='caption'>
                Member since {formatDate(userData.createdAt)}
              </Typography>

              <Stack
                direction='row'
                justifyContent='space-around'
                alignItems='center'
                textAlign='center'
                spacing={3}
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
            <ProfileAccordions
              refetchUserData={refetchUserData}
              loadUser={loadUser}
              userData={userData}
              userId={id}
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
