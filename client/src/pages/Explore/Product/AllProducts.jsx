import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  useMediaQuery,
  useTheme,
  Divider,
  Box,
} from '@mui/material';
import { Typography, Grid, Stack } from '@mui/material';
import { useAuthContext } from '../../../hooks/useAuthContext';
import SortBy from '../../../components/Filters/SortBy';
import placeholder from '../../../assets/images/brand/no-products.svg';
import AddToCart from '../../../components/Buttons/AddToCart';
import WishlistButton from '../../../components/Buttons/WishlistButton';
import { useState, useEffect, useContext } from 'react';
import { useWishlist } from '../../../hooks/Products/useWishlist';
import { useCart } from '../../../hooks/Products/useCart';
import ItemAlert from '../../../components/Alerts/Items/ItemUpdate';
import RemoveFromCart from '../../../components/Buttons/RemoveFromCart';
import {
  sortByPriceAsc,
  sortByPriceDesc,
  sortByAlphabetical,
  sortByReverseAlphabetical,
  sortByNewest,
} from '../../../utils/filters/productFilters';
import { SortProductsContext } from '../../../contexts/SortContext';

export default function AllProducts({
  products, // product data
  wishlistedItems, // itemIds in users wishlist
  refetchWishlist, // refetch() itemIds in users wishlist
  cartedItems, // itemIds in users cart
  refetchCart, // refetch() itemIds in users cart
}) {
  // Contexts
  const { user, id: userId } = useAuthContext();
  const { selectedSortBy } = useContext(SortProductsContext);

  // Screen size check
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // mediaQuery hook for mobile/medium size screens

  // Wishlist & Cart statuses
  const [wishlistStatus, setWishlistStatus] = useState({});
  const [cartStatus, setCartStatus] = useState({});

  // SortBy state
  const [sortedProducts, setSortedProducts] = useState(products); // Product data passed from <Explore/>

  // Alert visibility and contents
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

  // Update cartStatus state based on cartedItems
  useEffect(() => {
    if (Array.isArray(cartedItems)) {
      const status = {};
      products.forEach((product) => {
        status[product._id] = cartedItems.includes(product._id);
      });
      setCartStatus(status);
    }
  }, [cartedItems, products]);

  // Effect to sort products based on selectedSortBy context value
  useEffect(() => {
    const sortFunction =
      {
        'Price: Low-High': sortByPriceAsc,
        'Price: High-Low': sortByPriceDesc,
        'Name: A-Z': sortByAlphabetical,
        'Name: Z-A': sortByReverseAlphabetical,
        Newest: sortByNewest,
      }[selectedSortBy] || ((products) => products);

    setSortedProducts(sortFunction([...products]));
  }, [products, selectedSortBy]);

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
    <Grid container marginBottom={0} spacing={2} justifyContent='center'>
      {/* If no products in  category.... else */}
      {!products || products.length === 0 ? (
        <Grid item xs={12} textAlign='center'>
          <Typography variant='h6'>
            No items in stock for this category.
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
          {/* Product cards */}
          {sortedProducts.map((result, index) => (
            <Grid item xs={6} sm={4} md={4} lg={3} key={index}>
              <Card sx={{ maxWidth: 300 }}>
                <Stack direction='column' alignItems='center'>
                  {/* Wishlist - button */}
                  <Box alignSelf='flex-end'>
                    <WishlistButton
                      wishlistStatus={wishlistStatus[result._id] || false} // pass wishlist status (in or out) for product
                      onClick={() => handleWishlist(result._id)} // pass result._id to function as itemId
                    />
                  </Box>
                  {/* Clickable area */}
                  <CardActionArea
                    component={Link}
                    to={`/product/${result._id}`}
                    sx={{
                      width: '100%',
                      height: { xs: 125, md: 150, lg: 175 },
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'center',
                    }}
                  >
                    <CardMedia
                      component='img'
                      image={
                        // check img property for if a seeded img, or img added via multer upload
                        result.img.startsWith('/images/seededItems')
                          ? result.img
                          : `http://localhost:3001/${result.img}`
                      }
                      alt={`Photo of a ${result.name}`}
                      sx={{
                        width: '85%',
                        height: '85%',
                        objectFit: 'contain',
                      }}
                    />
                  </CardActionArea>

                  <Stack direction='column' textAlign='center' >
                    <CardContent>
                      {/* Product Name */}
                      <Typography
                        fontWeight='bold'
                        fontSize='small'
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          textOverflow: 'ellipsis', // ellipsis + hidden overflow if content exceeds 1 lines
                          overflow: 'hidden',
                        }}
                      >
                        {result.name}
                      </Typography>

                      {/* Product Description */}
                      <Typography
                        fontSize='small'
                        variant='body2'
                        color='text.secondary'
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 1,
                          WebkitBoxOrient: 'vertical',
                          textOverflow: 'ellipsis', // ellipsis + hidden overflow if content exceeds 1 lines
                          overflow: 'hidden',
                        }}
                      >
                        {result.description}
                      </Typography>

                      {/* Product Price */}
                      <Typography fontWeight={'bold'} fontSize='small'>
                        ${result.price}
                      </Typography>

                      {/* Cart - button */}
                      {cartedItems.includes(result._id) ? (
                        <RemoveFromCart
                          onClick={() => handleCart(result._id)} // pass result._id to function as itemId
                        />
                      ) : (
                        <AddToCart
                          onClick={() => handleCart(result._id)} // pass result._id to function as itemId
                        />
                      )}
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
