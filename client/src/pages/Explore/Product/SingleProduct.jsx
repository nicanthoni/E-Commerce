import { Typography, Box, Container, Stack, Rating } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { IndividualProduct, Cart, Wishlist } from '../../../graphql/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';
import AddToCart from '../../../components/Buttons/AddToCart';
import WishlistButton from '../../../components/Buttons/WishlistButton';
import { getAverage } from '../../../utils/getAverage';
import { useWishlist } from '../../../hooks/Products/useWishlist';
import { useCart } from '../../../hooks/Products/useCart';
import ItemAlert from '../../../components/Alerts/Items/ItemUpdate';
import RemoveFromCart from '../../../components/Buttons/RemoveFromCart';

export default function SingleProduct() {
  const { user, id: userId } = useAuthContext();
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

  // loadWishlist Query - returns array of productIds (in users wishlist). Refetch when item is added/removed
  const [loadWishlist, { data: wishlistData, refetch: refetchWishlist }] =
    useLazyQuery(Wishlist, {
      variables: { id: userId },
    });

  // loadCart Query - returns array of productIds (in users' cart). Refetch when item is added/removed
  const [loadCart, { data: cartData, refetch: refetchCart }] = useLazyQuery(
    Cart,
    { variables: { id: userId } }
  );

  // Grab cartItems IDs
  const cartedItems = cartData ? cartData.usersCart : [];

  // Check if item with matching id is in cart
  const isInCart = cartedItems.includes(itemId);

  // Grab wishlistedItems IDs
  const wishlistedItems = wishlistData ? wishlistData.usersWishlist : [];

  // Check if item with matching id is in users wishlist
  const isInWishlist = wishlistedItems.includes(itemId);

  // Load product data, check users wishlist & cart for item
  useEffect(() => {
    loadWishlist();
    loadCart();
    loadProduct();
  }, [loadProduct, loadCart, loadWishlist]);

  // check if current item is in array of users wishlistedItems - setWishlistStatus state accoordingly
  useEffect(() => {
    if (Array.isArray(wishlistedItems)) {
      setWishlistStatus(wishlistedItems.includes(itemId));
    }
  }, [wishlistedItems, itemId]);

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
      <Typography variant='h6' textAlign='center' marginTop={15}>
        Loading product data...
      </Typography>
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
    if (user) {
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
        refetchWishlist(); // refetch wishlist after deleting or adding item
      } catch (e) {
        console.log('Error: ', e);
      }
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
    if (user) {
      try {
        if (isInCart) {
          // if item's in the cart already, delete it
          await deleteCart(itemId, userId); // delete item from users cart
          setAlertMessage('Removed'); // set message
          setItemAlertVisible(true);
          setTimeout(() => {
            setItemAlertVisible(false);
          }, 1000);
          refetchCart();
        } else {
          // if item's not in cart, add it
          await addCart(itemId, userId); // call add to cart hook
          setAlertMessage('Added'); // set message
          setItemAlertVisible(true); // show alert
          setTimeout(() => {
            setItemAlertVisible(false);
          }, 1000);
          refetchCart();
        }
      } catch (e) {
        console.log('Add to cart error:', e);
      }
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
    <Container maxWidth='md'>
      {/* Parent Stack */}
      <Stack
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-end' },
          marginTop: { xs: 10, md: 20 },
        }}
      >
        {/* Image & Rating Stack */}
        <Stack alignItems={'center'} gap={2}>
          <Box
            sx={{
              height: { xs: '200px', md: '400px' },
              width: { xs: '200px', md: '400px' },
              overflow: 'hidden',
            }}
          >
            <img
              src={productData.item.img}
              alt='Product Photo'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>

          <Box sx={{ marginBottom: { xs: 2, md: 0 } }}>
            <Rating name='read-only' value={avgStars(ratings)} readOnly />
          </Box>
        </Stack>

        {/* Price, Name, and Description Stack */}
        <Stack
          direction='column'
          gap={1}
          sx={{
            alignItems: { xs: 'center', md: 'flex-start' },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant='h6' component='div'>
            ${productData.item.price}
          </Typography>

          <Typography variant='h5' component='div' fontWeight='bold'>
            {productData.item.name}
          </Typography>

          <Typography variant='body1' color='text.secondary'>
            {productData.item.description}
          </Typography>

          {/* Buttons */}
          <Stack direction='row' gap={1}>
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
