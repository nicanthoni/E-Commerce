import {
  Typography,
  Box,
  Container,
  Stack,
  Rating,
  Link,
  Divider,
  CircularProgress,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState, useMemo } from 'react';
import { IndividualProduct, User } from '../../../graphql/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';
import AddToCart from '../../../components/Buttons/AddToCart';
import WishlistButton from '../../../components/Buttons/WishlistButton';
import { getAverage } from '../../../utils/calculations/getAverage';
import { useWishlist } from '../../../hooks/Products/useWishlist';
import { useCart } from '../../../hooks/Products/useCart';
import ItemAlert from '../../../components/Alerts/Items/ItemUpdate';
import RemoveFromCart from '../../../components/Buttons/RemoveFromCart';

export default function SingleProduct() {
  const { user, type, id: userId } = useAuthContext();
  const { itemId } = useParams();

  // Wishlist & Cart statuses
  const [wishlistStatus, setWishlistStatus] = useState(false);

  // Alert vsibility and contents
  const [alertMessage, setAlertMessage] = useState('');
  const [itemAlertVisible, setItemAlertVisible] = useState(false);

  // Hooks - Cart & Wishlist
  const { addWishlist, deleteWishlist } = useWishlist();
  const { addCart, deleteCart } = useCart();

  //  loadProduct Query - returns data associated with single item
  const [
    loadProduct,
    { loading: productLoading, data: productData, error: productError },
  ] = useLazyQuery(IndividualProduct, { variables: { id: itemId } });

  // Load User data (includes cart, wishlist, etc)
  const [
    loadUser,
    {
      loading: loadingUser,
      data: userData,
      error: userError,
      refetch: refetchUserData,
    },
  ] = useLazyQuery(User, {
    variables: { userId },
  });

  // Wishlist & Cart data
  const usersWishlist = useMemo(
    () =>
      userData
        ? userData.user.wishlist.map((cartItem) => cartItem.item._id)
        : [],
    [userData]
  );

  const usersCart = useMemo(
    () =>
      userData ? userData.user.cart.map((cartItem) => cartItem.item._id) : [],
    [userData]
  );

  // Check cart/wishlist for item
  const isInCart = usersCart.includes(itemId);
  const isInWishlist = usersWishlist.includes(itemId);

  // Load product & user data
  useEffect(() => {
    loadUser();
    loadProduct();
  }, [loadProduct, loadUser]);

  // check if current item is in array of users wishlist - setWishlistStatus state accoordingly
  useEffect(() => {
    if (Array.isArray(usersWishlist)) {
      setWishlistStatus(usersWishlist.includes(itemId));
    }
  }, [usersWishlist, itemId]);

  if (productError) {
    console.error('GraphQL Error:', productError);
    return (
      <Typography variant='h6' textAlign='center' marginTop={15}>
        Error fetching product data...
      </Typography>
    );
  }
  if (productLoading) {
    return (
      <Box sx={{ width: '100%' }}>
        <CircularProgress color='primary' />
      </Box>
    );
  }
  if (!productData) {
    return (
      <Typography variant='h6' textAlign='center' marginTop={15}>
        Product not found 🤔
      </Typography>
    );
  }

  // Handle wishlist onClick
  const handleWishlist = async () => {
    if (user && type === 'buyer') {
      try {
        if (isInWishlist) {
          // Item already wishlisted, so delete it
          await deleteWishlist(itemId, userId);
          setAlertMessage('Removed');
          setItemAlertVisible(true);
          setTimeout(() => {
            setItemAlertVisible(false);
          }, 1000);
        } else {
          // Item not in wishlist, so add it
          await addWishlist(itemId, userId);
          setAlertMessage('Added');
          setItemAlertVisible(true);
          setTimeout(() => {
            setItemAlertVisible(false);
          }, 1000);
        }
        refetchUserData(); // refetch wishlist after deleting or adding item
      } catch (e) {
        console.log('Error: ', e);
      }
    } else if (user && type === 'vendor') {
      // for vendors
      setAlertMessage('Switch to buyer account');
      setItemAlertVisible(true);
      setTimeout(() => {
        setItemAlertVisible(false);
      }, 1000);
    } else {
      // for non-authenticated users
      setAlertMessage('Sign in first');
      setItemAlertVisible(true);
      setTimeout(() => {
        setItemAlertVisible(false);
      }, 1000);
    }
  };

  // Handle Cart onClick
  const handleCart = async () => {
    if (user && type === 'buyer') {
      try {
        if (isInCart) {
          // if item's in the cart already, delete it
          await deleteCart(itemId, userId); // delete item from users cart
          setAlertMessage('Removed'); // set message
          setItemAlertVisible(true);
          setTimeout(() => {
            setItemAlertVisible(false);
          }, 1000);
          refetchUserData();
        } else {
          // if item's not in cart, add it
          await addCart(itemId, userId); // call add to cart hook
          setAlertMessage('Added'); // set message
          setItemAlertVisible(true); // show alert
          setTimeout(() => {
            setItemAlertVisible(false);
          }, 1000);
          refetchUserData();
        }
      } catch (e) {
        console.log('Add to cart error:', e);
      }
    } else if (user && type === 'vendor') {
      // for vendors
      setAlertMessage('Switch to buyer account');
      setItemAlertVisible(true);
      setTimeout(() => {
        setItemAlertVisible(false);
      }, 1000);
    } else {
      // for non-authenticated users
      setAlertMessage('Sign in first');
      setItemAlertVisible(true);
      setTimeout(() => {
        setItemAlertVisible(false);
      }, 1000);
    }
  };

  // Average Rating  - getAverage() utility to calculate avg rating
  const ratings = productData.item.ratings;
  const avgStars = (ratings) => {
    if (ratings.length === 0) {
      return 0; // case with no ratings
    }
    const starsArray = ratings.map((rating) => rating.stars);
    return getAverage(starsArray);
  };

  return (
    <Container maxWidth='xl'>
      {/* Parent Stack */}
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'center',

          marginTop: { xs: 12, md: 14 },
        }}
      >
        {/* Image & Rating Stack */}
        <Stack alignItems='center' gap={1}>
          <Box
            sx={{
              height: { xs: '200px', md: '400px' },
              width: { xs: '200px', md: '400px' },
              overflow: 'hidden',
            }}
          >
            <img // check img property for if a seeded img or img added via multer upload
              src={
                productData.item.img.startsWith('/images/seededItems')
                  ? productData.item.img
                  : `http://localhost:3001/${productData.item.img}`
              }
              alt='Product Photo'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>

          <Box textAlign='center'>
            <Rating name='read-only' value={avgStars(ratings)} readOnly />
            <Typography variant='body2'>({ratings.length} reviews)</Typography>
          </Box>
        </Stack>

        {/* Price, Name, and Description Stack */}
        <Stack
          direction='column'
          sx={{
            alignItems: 'flex-start',
          }}
        >
          <Typography>
            <Link
              variant='caption'
              href='#'
              underline='hover'
              sx={{
                color: 'primary.main',
                '&:hover': { color: 'secondary.main' },
              }}
            >
              {productData.item.vendor.vendorName}
            </Link>
          </Typography>

          <Typography variant='h6' component='div'>
            {productData.item.name}
          </Typography>

          <Typography component='div'>${productData.item.price}</Typography>

          <Typography variant='caption' component='div'>
            {productData.item.description}
          </Typography>

          <Divider variant='unset' sx={{ my: 0.5 }} />

          {/* Buttons */}
          <Stack direction='row' flexWrap='wrap'>
            <>
              {isInCart ? (
                <RemoveFromCart onClick={handleCart} />
              ) : (
                <AddToCart onClick={handleCart} />
              )}

              <WishlistButton
                wishlistStatus={wishlistStatus}
                onClick={handleWishlist}
              />
            </>
          </Stack>
        </Stack>
      </Stack>

      {/* ⚠️ Alerts ⚠️ - visibility controlled by local state */}
      <ItemAlert visible={itemAlertVisible} message={alertMessage} />
    </Container>
  );
}
