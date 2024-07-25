import { Container, Typography, Box, CircularProgress } from '@mui/material';
import { useWishlist } from '../../../hooks/Products/useWishlist';
import { useCart } from '../../../hooks/Products/useCart';
import { useLazyQuery } from '@apollo/client';
import { User, Wishlist, Cart } from '../../../graphql/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Product from '../../../components/Cards/Product';

export default function WishlistPage() {
  // contexts
  const { user, id: userId } = useAuthContext();

  // Hooks
  const { deleteWishlist } = useWishlist();
  const { addCart, deleteCart } = useCart();

  // Carousel settings:
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 1024 },
      items: 6,
      slidesToSlide: 3,
    },
    desktop: {
      breakpoint: { max: 1024, min: 800 },
      items: 5,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 800, min: 464 },
      items: 5,
      slidesToSlide: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
      slidesToSlide: 2,
    },
  };

  // Query user data
  const [loadUser, { loading, data, error, refetch: refetchUserData }] =
    useLazyQuery(User, {
      variables: { userId },
    });

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (error) {
    console.error('GraphQL Error:', error);
  }
  if (loading) {
    return (
      <Box mt={12} px={10} sx={{ width: '100%' }}>
        <CircularProgress color='primary' />
      </Box>
    );
  }
  if (!data || !data.user) {
    return <Typography mt={12}>No user data found</Typography>;
  }

  // Users cart data - ids
  const cartData = data.user.cart.map((cartItem) => cartItem.item._id);

  // Users Wishlist data - ids
  const wishlistData = data.user.wishlist.map(
    (wishlistItem) => wishlistItem.item._id
  );

  // Handle wishlist item removal
  const handleWishlist = async (itemId) => {
    try {
      await deleteWishlist(itemId, userId);
      refetchUserData(); // refetch data
    } catch (e) {
      // console.log('Error removing wishlist item: ', e);
    }
  };

  // Handle wishlist item removal
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

  // Users wishlist data
  const wishlist = data.user.wishlist.map((item, index) => (
    <Box key={index} mx={1} mb={4}>
      <Product
        isAuthenticated={user ? true : false}
        id={item.item._id}
        userId={userId}
        img={item.item.img}
        name={item.item.name}
        price={item.item.price}
        ratings={item.item.ratings}
        inCart={cartData.includes(item.item._id) ? true : false}
        inWishlist={wishlistData.includes(item.item._id) ? true : false}
        handleWishlist={() => handleWishlist(item.item._id)}
        handleCart={() => handleCart(item.item._id, userId)}
      />
    </Box>
  ));

  return (
    <Container maxWidth='xl' className='Wishlist container'>
      <Typography
        variant='h6'
        fontWeight='bold'
        textAlign='left'
        ml={1}
        mb={2}
        mt={12}
      >
        My Wishlist ({wishlist.length})
      </Typography>
      <Box>
        <Carousel responsive={responsive} showDots>
          {wishlist}
        </Carousel>
      </Box>
    </Container>
  );
}
