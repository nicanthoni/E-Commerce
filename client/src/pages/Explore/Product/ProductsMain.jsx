import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { Typography, Box, Grid, Stack, Checkbox, Tooltip } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useWishlist } from '../../../hooks/_tests_/useWishlist';
import ProductFilters from '../Filters/ProductFilters';
import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // to decode user token
import noCategorySelected from '../../../assets/images/brand/no-products.svg';
import AddToCart from '../../../components/Buttons/AddToCart';


export default function ProductsMain({ products }) {
  const { user } = useAuthContext(); 
  const [decodedUser, setDecodedUser] = useState(null);
  const { addWishlist, isLoading, stateError } = useWishlist(); // custom hook



  // If user is auth & of type 'User' (buyer).. decode the JWT to get the userId (_id)
  useEffect(() => {
    if (user && user.Userlogin && user.Userlogin.user && user.Userlogin.user.__typename === 'User') {
      try {
        const token = typeof user === 'string' ? user : user.Userlogin?.token; // If user is a string, its the token. If not, get token through user.Userlogin?.token
        if (token) {
          setDecodedUser(jwtDecode(token)); // decode the token
        } else {
          console.log('No valid user (buyer) token found');
          setDecodedUser(null);
        }
      } catch (error) {
        console.log('Failed to decode token: ', error);
        setDecodedUser(null);
      }
    } else {
      setDecodedUser(null); // if user is not logged in or of type 'User' (buyer), set state to null
    }
  }, [user]);


  // OnChange - handle wishlist
  const handleWishlistChange = async (userId, itemId, itemName) => {
    if (user) {
      // console.log(`User ID: ${userId}`);
      console.log(`Product added to users wishlist: itemId=${itemId}, Name=${itemName}`);
      // custom hook to add to wishlist
      await addWishlist(itemId, userId);
    } else {
      console.log('Log in first to add items')
      return;
    }
  };


  return (
    <Grid container spacing={3} marginBottom={6}>
      {/* If no selected categories, render message, else map through each product... */}
      {!products || products.length === 0 ? (
        <Grid item xs={12} textAlign='center'>
          <Typography variant='h6'>
            Select a category to view products
          </Typography>
          <img 
            src={noCategorySelected} 
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
            // Grid item created for each product
            <Grid item xs={12} sm={6} md={4} key={index} align='center'>
              <Card sx={{ maxWidth: 350, padding: '6px' }}>
                <Stack direction='row' textAlign='left'>
                  {/* Clickable area of card */}
                  <CardActionArea component={Link} to={`/product/${result._id}`}>
                    <Box sx={{ height: '150px', width: '150px' }}>
                      <CardMedia
                        component='img'
                        image={result.img} /* IMAGE */
                        alt='Product Photo'
                        sx={{
                          marginTop: 2,
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                        }}
                      />
                    </Box>
                  </CardActionArea>

                  {/* Product Info */}
                  <Stack direction='column'>
                    <CardContent>

                      {/* Product Name */}
                      <Typography gutterBottom variant='h6'>
                        {result.name}
                      </Typography>

                      {/* Product Description */}
                      <Typography
                        variant='body2'
                        color='text.secondary'
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          textOverflow: 'ellipsis', // ellipsis + hidden overflow if content exceeds 2 lines
                          overflow: 'hidden',
                        }}
                      >
                        {result.description}
                      </Typography>

                      {/* Product Price */}
                      <Typography alignSelf='center' fontWeight={'bold'}>
                        ${result.price}
                      </Typography>

                      {/* Button &  Icon */}
                      <Stack direction='row'>
                        <AddToCart />

                        <Box>
                          <Tooltip title='Add to wishlist' placement='right'>
                            <Checkbox
                              color='error'
                              // If theres a decodedUser....
                              onChange={() => handleWishlistChange(decodedUser ? decodedUser.data._id : null, result._id, result.name)}
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