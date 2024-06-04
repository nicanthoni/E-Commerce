import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { Typography, Box, Grid, Stack, Checkbox, Alert, AlertTitle, Fade, Tooltip } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useWishlist } from '../../../hooks/_tests_/useWishlist';
import { useState } from 'react';
import { useEffect } from 'react';
import ProductFilters from '../Filters/ProductFilters';
import placeholder from '../../../assets/images/brand/no-products.svg';
import AddToCart from '../../../components/Buttons/AddToCart';
import { useLazyQuery } from '@apollo/client';
import { User } from '../../../utils/queries';



export default function ProductsMain({ products }) {
  const { user, id } = useAuthContext(); 
  const [loadWishlist, { loading, data, error, refetch }] = useLazyQuery(User, {
    variables: { userId: id },
  });
  const { addWishlist, deleteWishlist, isLoading, stateError } = useWishlist(refetch); 

    // Error & Alert States
    const [clickedItemId, setClickedItemId] = useState(null);// store itemId - assign alert to specific item
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showWarningAlert, setShowWarningAlert] = useState(false);

  // const [wishlistState,  setWishlistState] = useState({})


  // check a users wishlist for any items with ids that match items in their wishlist
  // => set the wishlist icon as active
  useEffect(() => {
    loadWishlist();
    // console.log('User data: ', data)
  }, [])


  // OnChange - handle wishlist
  const handleWishlistChange = async (userId, itemId, itemName) => {
    if (user) {
      try {
      // console.log(`Product added to user ${userId} wishlist: itemId=${itemId}, Name=${itemName}`);
      await addWishlist(itemId, userId); // custom hook to add to wishlist
      setShowSuccessAlert(true)
      setClickedItemId(itemId); // Set item ID
      setTimeout(() => {
        setShowSuccessAlert(false)
        }, 2500);

    } catch (e) {
      console.log(' addWishlist() Error: ', e);
      setShowErrorAlert(true)
      setClickedItemId(itemId); // Set item ID
      setTimeout(() => {
        setShowErrorAlert(false)
        }, 2500);
    }
  } else {
      setShowWarningAlert(true);
      setClickedItemId(itemId); // Set item ID
      setTimeout(() => {
        setShowWarningAlert(false)
        }, 2500);
      return;
  }
}



  return (
    
    <Grid container spacing={3} marginBottom={6}>

    
      {/* If no selected categories, render message, else map through each product... */}
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
            <Link
                href='https://storyset.com/data'>
                People illustrations by Storyset
            </Link>
          </Typography>
        </Grid>
      ) : (
        <>
          {/* Product Filters */}
          <Grid item xs={12} marginY={1}>
            <ProductFilters />
          </Grid>
        
          {/* Product Map and create card */}
          {products.map((result, index) => (

            // Grid item/card created for each product
            <Grid item xs={12} sm={6} md={4} key={index} align='center'>

         
              
              <Card sx={{ maxWidth: 400 }}>
                <Stack direction='row' justifyContent='center' alignItems='center'>
                  {/* Clickable area of card */}
                  <CardActionArea 
                  component={Link} 
                  to={`/product/${result._id}`}
                  sx={{ width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
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
                      <Typography  textAlign='left' fontWeight={'bold'}>
                        ${result.price}
                      </Typography>

                      {/* Button &  Icon */}
                      <Stack direction='row' flexWrap='wrap'>
                        <AddToCart/>

                        <Box>
                          <Tooltip title='Add to wishlist' placement='right'>
                            <Checkbox
                              color='error'
                              // If theres a decodedUser....
                              onChange={() => handleWishlistChange(id, result._id, result.name)}
                              icon={<FavoriteBorder />}
                              checkedIcon={<Favorite />}
                            />
                          </Tooltip>
                        </Box>
                      </Stack>
                    </CardContent>                
                  </Stack>                 
                </Stack>

              {/* ALERTS for the specific item */}
              {clickedItemId === result._id && (
                <>
                  {showSuccessAlert && (
                    <Alert
                    severity='success' 
                    sx={{ width: '60%', mb: 2 }}>
                      Added to wishlist.
                    </Alert>
                  )}
                  {showErrorAlert && (
                    <Alert
                      severity='error'
                      sx={{ width: '60%', mb: 2 }}
                    >
                      Error adding this item to your wishlist.
                    </Alert>
                  )}
                   {showWarningAlert && (
                    <Alert
                    severity='warning' 
                    sx={{ width: '60%', mb: 2 }}>
                      Sign in first.
                    </Alert>
                  )}
                  </> 
                  )}
              </Card>
            </Grid>
          ))}
        </>
      )}
    </Grid>
  )};

