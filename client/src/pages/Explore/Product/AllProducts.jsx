import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { Typography, Grid, Stack } from '@mui/material';
import { useAuthContext } from '../../../hooks/useAuthContext';
import ProductFilters from '../Filters/ProductFilters';
import placeholder from '../../../assets/images/brand/no-products.svg';
import AddToCart from '../../../components/Buttons/AddToCart';
import WishlistButton from '../../../components/Buttons/WishlistButton';
import { useState, useEffect } from 'react';
import { useWishlist } from '../../../hooks/Products/useWishlist';
import { useCart } from '../../../hooks/Products/useCart';
import ItemAlert from '../../../components/Alerts/Items/ItemUpdate';
import RemoveFromCart from '../../../components/Buttons/RemoveFromCart';

export default function AllProducts({
  products,
  wishlistedItems,
  refetchWishlist,
  cartedItems,
  refetchCart,
}) {
  const { user, id: userId } = useAuthContext();

  // Wishlist & Cart statuses
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [cartStatus, setCartStatus] = useState({});

  // Alert vsibility and contents
  const [alertMessage, setAlertMessage] = useState('');
  const [itemAlertVisible, setItemAlertVisible] = useState(false);

  // Hook - add/remove wishlist item
  const { addWishlist, deleteWishlist } = useWishlist();
  const { addCart, deleteCart } = useCart();

  // Update wishlistStatus state based on wishlistedItems
  useEffect(() => {
    if (Array.isArray(wishlistedItems)) {
      const status = {};
      products.forEach((product) => {
        status[product._id] = wishlistedItems.includes(product._id);
      });
      setWishlistStatus(status);
    }
  }, [wishlistedItems, products]);

  // Update cartStatuses state based on cartedItems
  useEffect(() => {
    if (Array.isArray(cartedItems)) {
      const status = {};
      products.forEach((product) => {
        status[product._id] = cartedItems.includes(product._id);
      });
      setCartStatus(status);
    }
  }, [cartedItems, products]);

  // Handle wishlist onClick
  const handleWishlist = async (itemId) => {
    if (user) {
      const isInWishlist = wishlistedItems.includes(itemId); // Check if item with matching id is in wishlist
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
  const handleCart = async (itemId) => {
    if (user) {
      const isInCart = cartedItems.includes(itemId); // Check if item with matching id is in wishlist
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
      }, 2500);
    }
  };

  return (
    <Grid container spacing={3} marginBottom={6}>
      {/* If no products in selected category, render message, else map */}
      {!products || products.length === 0 ? (
        <Grid item xs={12} textAlign='center'>
          <Typography variant='h6'>
            No items in stock for this category. Select a different one!
          </Typography>
          <img
            src={placeholder}
            alt='No products'
            style={{ maxWidth: '100%' }}
          />
          {/* Link required without premium sub */}
          <Typography variant='caption'>
            <Link href='https://storyset.com/data'>
              People illustrations by Storyset
            </Link>
          </Typography>
        </Grid>
      ) : (
        <>
          {/* Product Filters - Price and Date */}
          <Grid item xs={12} marginBottom={2}>
            <ProductFilters />
          </Grid>

          {/* Product Map and create card */}
          {products.map((result, index) => (
            // Grid item/card created for each product
            <Grid item xs={12} sm={6} md={4} key={index} align='center'>
              <Card sx={{ maxWidth: 400 }}>
                <Stack
                  direction='row'
                  justifyContent='center'
                  alignItems='center'
                >
                  {/* Clickable area of card */}
                  <CardActionArea
                    component={Link}
                    to={`/product/${result._id}`}
                    sx={{
                      width: 200,
                      height: 200,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CardMedia
                      component='img'
                      image={result.img}
                      alt={`Photo of a ${result.name}`}
                      sx={{
                        width: 150,
                        height: 150,
                        objectFit: 'contain',
                      }}
                    />
                  </CardActionArea>

                  {/* Product Info */}
                  <Stack direction='column' width='50%'>
                    <CardContent>
                      {/* Product Name */}
                      <Typography fontWeight='bold' textAlign='left'>
                        {result.name}
                      </Typography>

                      {/* Product Description */}
                      <Typography
                        variant='body2'
                        textAlign='left'
                        color='text.secondary'
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          textOverflow: 'ellipsis', // ellipsis + hidden overflow if content exceeds 2 lines
                          overflow: 'hidden',
                        }}
                      >
                        {result.description}
                      </Typography>

                      {/* Product Price */}
                      <Typography textAlign='left' fontWeight={'bold'}>
                        ${result.price}
                      </Typography>

                      {/* Buttons - Cart & Wishlist */}

                      <Stack direction='row' flexWrap='wrap'>
                        <>
                          {cartedItems.includes(result._id) ? (
                            <RemoveFromCart
                              onClick={() => handleCart(result._id)} // pass result._id to function as itemId
                            />
                          ) : (
                            <AddToCart
                              onClick={() => handleCart(result._id)} // pass result._id to function as itemId
                            />
                          )}

                          <WishlistButton
                            wishlistStatus={wishlistStatus[result._id] || false} // pass wishlist status (in or out) for product
                            onClick={() => handleWishlist(result._id)} // pass result._id to function as itemId
                          />
                        </>
                      </Stack>
                    </CardContent>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </>
      )}
      {/* ⚠️ Alerts ⚠️ - visibility controlled by local state */}
      <ItemAlert visible={itemAlertVisible} message={alertMessage} />
    </Grid>
  );
}
