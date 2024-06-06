import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { Typography, Box, Grid, Stack, Checkbox, Tooltip } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useWishlist } from '../../../hooks/Products/useWishlist';
import { useState, useEffect } from 'react';
import ProductFilters from '../Filters/ProductFilters';
import placeholder from '../../../assets/images/brand/no-products.svg';
import AddToCart from '../../../components/Buttons/AddToCart';
import WishlistSuccess from '../../../components/Alerts/Wishlist/WishlistSuccess';
import WishlistWarning from '../../../components/Alerts/Wishlist/WishlistWarning';
import WishlistError from '../../../components/Alerts/Wishlist/WishlistError';


export default function ProductsMain({ products, wishlistedItems, refetchWishlist }) {
  const { user, id } = useAuthContext();
  const [inWishlist , setInWishlist] = useState({}); // set to true if item in users wishlist


  // Hook - add/remove wishlist item
  const { addWishlist, deleteWishlist, isLoading, stateError } = useWishlist();

  // Wishlist Alerts
  const [successMessage, setSuccessMessage] = useState(''); 
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [warningAlertVisible, setWarningAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

  // if wishlistedItems is an array of Ids, for each Id, create an object that is truthy
  // Run on initial render, and if wishlistedItems changes
  useEffect(() => {
    if (Array.isArray(wishlistedItems)) {
      const wishlistMap = {};
      wishlistedItems.forEach((itemId) => {
        wishlistMap[itemId] = true;
      });
      setInWishlist(wishlistMap);
    }
  }, [wishlistedItems]);
  

  // OnChange - Refetch (loadWishlist()) from parent updating items wishlist state
  const handleWishlistChange = async (userId, itemId) => {
    if (user) {
      try {
        if (inWishlist[itemId]) { // Item already wishlisted, so delete it
          await deleteWishlist(itemId, userId) // delete item from wishlist
          setSuccessMessage('Removed'); // set message
          setSuccessAlertVisible(true); // set alert
          setInWishlist((prev) => ({ ...prev, [itemId]: false })); // update inWishlist value
          setTimeout(() => { // remove alert
            setSuccessAlertVisible(false);
          }, 2500);
        } else { // Item not in wishlist, so add it
          await addWishlist(itemId, userId); //  add item to wishlist
          setSuccessMessage('Added'); // set message
          setSuccessAlertVisible(true); // set alert
          setInWishlist((prev) => ({ ...prev, [itemId]: true })); // update inWishlist value
          setTimeout(() => { // remove alert
            setSuccessAlertVisible(false);
          }, 2500);
        }
      } catch (e) {
        console.log('Error: ', e);
        setErrorAlertVisible(true);
        setTimeout(() => {
          setErrorAlertVisible(false);
        }, 2500);
      }
      } else {
        setWarningAlertVisible(true);
        setTimeout(() => {
        setWarningAlertVisible(false);
        }, 2500);
      }
      refetchWishlist();
    }


  return (
    <Grid container spacing={3} marginBottom={6}>

    {/* Wishlist Alerts - passing {visible} prop to wishlist components */}
    <WishlistSuccess visible={successAlertVisible && successMessage === 'Added'} message="Added to wishlist." />
    <WishlistSuccess visible={successAlertVisible && successMessage === 'Removed'} message="Removed." />
    <WishlistWarning visible={warningAlertVisible} /> 
    <WishlistError visible={errorAlertVisible}/>

      {/* If no products in selected categor, render message, else map */}
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
          <Grid item xs={12} marginY={1}>
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

                      {/* Button &  Icon */}
                      <Stack direction='row' flexWrap='wrap'>
                        <AddToCart />

                        <Box>
                          <Tooltip title='Add to wishlist' placement='right'>
                            <Checkbox
                              color='error'
                              checked={inWishlist[result._id] || false} // Check if id exists in inWishlist array
                              onChange={() =>
                                handleWishlistChange(id, result._id)}
                              icon={<FavoriteBorder />}
                              checkedIcon={<Favorite />}
                            />
                          </Tooltip>
                        </Box>
                      </Stack>
                    </CardContent>
                  </Stack>
                </Stack>
              </Card>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  );
}
