import {
  Typography,
  Container,
  Box,
  CircularProgress,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useLazyQuery } from '@apollo/client';
import { User } from '../../../../graphql/queries';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { Grid, Avatar, Stack } from '@mui/material';
import { useAuthContext } from '../../../../hooks/useAuthContext';
import ProfileTabs from '../../../../components/Tabs/ProfileTabs';
import { useLogout } from '../../../../hooks/useLogout';
import { delete_user } from '../../../../graphql/mutations';
import { formatDate } from '../../../../utils/formatters/formatDate';
import AuthAlert from '../../../../components/Alerts/Auth/AuthAlert';
import { useWishlist } from '../../../../hooks/Products/useWishlist';
import { useCart } from '../../../../hooks/Products/useCart';
import ProductReviewModal from '../../../../components/Modals/EditReview';
import 'react-multi-carousel/lib/styles.css';

export default function BuyerProfile() {
  // Hooks
  const { user, id: userId, type } = useAuthContext();
  const { logout } = useLogout();
  const { deleteWishlist } = useWishlist();
  const { addCart, deleteCart } = useCart();

  // Mobile check
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // mediaQuery for mobile/medium screens

  // Alert states
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // Mutation
  const [
    DeleteUser,
    { loading: deletionLoading, data: deletionData, error: deletionError },
  ] = useMutation(delete_user);

  // Query - load user data
  const [loadUser, { loading, data, error, refetch: refetchUserData }] =
    useLazyQuery(User, {
      variables: { userId },
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
      <Container maxWidth='lg'>
        <Box mt={13}>
          <CircularProgress size={60} color='primary' />
        </Box>
      </Container>
    );
  }
  if (!data || !data.user) {
    return <Typography>No user data found</Typography>;
  }

  // User data
  const userData = data.user;

  // Users cart data - ids
  const cartData = data.user.cart.map((cartItem) => cartItem.item._id);

  // Handle account deletion
  const handleDeleteAccount = async () => {
    try {
      await DeleteUser({ variables: { userId } }); // delete user
      setAlertMessage('Account successfuly deleted.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        logout();
      }, 2000);
    } catch (e) {
      console.log('User Deletion error: ', e);
    }
  };

  // Handle wishlist item (removal)
  const handleWishlist = async (itemId) => {
    try {
      await deleteWishlist(itemId, userId);
      refetchUserData(); // refetch data
    } catch (e) {
      // console.log('Error removing wishlist item: ', e);
    }
  };

  // Handle cart item (add & remove)
  const handleCart = async (itemId) => {
    const isInCart = cartData.includes(itemId); // Check if item with matching id is in wishlist
    try {
      if (isInCart) {
        await deleteCart(itemId, userId);
        refetchUserData();
      } else {
        await addCart(itemId, userId);
        refetchUserData();
      }
    } catch (e) {
      console.log('Add to cart error:', e);
    }
  };

  return (
    <>
      <Container maxWidth='lg'>
        <Grid container marginTop={6} gap={4}>
          {/* OVERVIEW stats */}
          <Grid item xs={12}>
            <Stack direction='column' alignItems='center' spacing={2}>
              <Avatar
                sx={{ bgcolor: 'action.active' }}
                alt={`${userData.firstName}'s Avatar`}
              />

              <Typography textAlign='center' variant='h6'>
                Hi, {userData.firstName}
              </Typography>

              <Stack
                direction='row'
                justifyContent='space-around'
                alignItems='center'
                textAlign='center'
                spacing={5}
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

          <Grid item xs={12}>
            <ProfileTabs
              refetchUserData={refetchUserData}
              loadUser={loadUser}
              userData={userData}
              userId={userId}
              name={userData.firstName + ' ' + userData.lastName}
              email={userData.email}
              accountType={type}
              memberSince={formatDate(userData.createdAt)}
              onClick={handleDeleteAccount}
              isAuthenticated={user ? true : false}
              handleWishlist={handleWishlist}
              handleCart={handleCart}
              isMobile={isMobile}
            />
          </Grid>
        </Grid>

        {/* Alert - visibility controlled by local state */}
        <AuthAlert visible={showAlert} message={alertMessage} />
      </Container>
    </>
  );
}
