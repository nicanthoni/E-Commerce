import { Typography, Box, Button, Container, Stack, Rating, Checkbox, Tooltip } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { IndividualProduct, WishlistedItemCheck } from '../../../utils/queries';
import { useWishlist } from '../../../hooks/Products/useWishlist';
import { User } from '../../../utils/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';
import WishlistWarning from '../../../components/Alerts/Wishlist/WishlistWarning'; 
import WishlistSuccess from '../../../components/Alerts/Wishlist/WishlistSuccess';
import WishlistError from '../../../components/Alerts/Wishlist/WishlistError';


export default function SingleProduct() {
  const { user, id } = useAuthContext();
  const { productId } = useParams();
  const [inWishlist , setInWishlist] = useState(false); // set to true if item is in users wishlist

  // Query - Load Product
  const [loadProduct,{ loading: productLoading, data: productData, error: productError }] = 
  useLazyQuery(IndividualProduct, { variables: { id: productId } });

  // Query - Check (boolean) if item associated with productId is in the users wishlist
  const [checkWishlistForItem, {loading: wishlistLoading, data: wishlistData, error: wishlistError, refetch}] = 
  useLazyQuery(WishlistedItemCheck, {variables: {itemId: productId, userId: id} })

  // Hook
  const { addWishlist, deleteWishlist, isLoading, stateError } = useWishlist(refetch);

  // Wishlist Alert States
  const [successMessage, setSuccessMessage] = useState(''); 
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [warningAlertVisible, setWarningAlertVisible] = useState(false);
  const [errorAlertVisible, setErrorAlertVisible] = useState(false);

 // Load product data and check wishlist for item
useEffect(() => {
  loadProduct();
  checkWishlistForItem();
}, [loadProduct, checkWishlistForItem]);

// Update inWishlist state based on wishlistData
useEffect(() => {
  if (wishlistData && wishlistData.itemInWishlist !== undefined) {
    setInWishlist(wishlistData.itemInWishlist);
  }
}, [wishlistData]);


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

  // Product ratings
  const ratings = productData.item.ratings;
  // console.log('Product ratings: ', productData.item);
  
  // Calculate average rating of item
  const calculateAvgRating = () => {
    const ratingCount = ratings.length; // number of ratings
    if (ratingCount === 0) {
      return 0; // case with no ratings
    }
    // Sum of each rating's star value
    const sumOfRatings = ratings.reduce((sum, rating) => sum + rating.stars, 0);
    // Calculate average
    const avgRating = sumOfRatings / ratingCount;
    return avgRating;
  };


  // OnChange handle wishlist
  const handleWishlistChange = async (userId, itemId) => {
    if (user) {
      try {
        await addWishlist(itemId, userId); // hook to add to wishlist
        setInWishlist(true)
        setSuccessMessage('Added')
        setSuccessAlertVisible(true);
        setTimeout(() => {
          setSuccessAlertVisible(false);
        }, 2500);
      } catch (e) {
        console.log(' addWishlist() Error: ', e);
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
      return;
    }
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

        {/* Wishlist Alerts - passing {visible} prop to wishlist components */}
        <WishlistSuccess visible={successAlertVisible && successMessage === 'Added'} message="Added to wishlist." />
        <WishlistWarning visible={warningAlertVisible} /> 
        <WishlistError visible={errorAlertVisible}/>


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
            <Rating name='read-only' value={calculateAvgRating()} readOnly />
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

          {/* Button & Wishlist Stack */}
          <Stack direction='row' gap={1}>
            <Button
              variant='contained'
              color='secondary'
              sx={{
                color: 'primary.main',
                textTransform: 'none',
              }}
            >
              Add to cart
            </Button>
            <Tooltip title='Add to wishlist' placement='right'>
              <Checkbox
                checked={inWishlist}
                onChange={() => handleWishlistChange(id, productId)}
                color='error'
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
            </Tooltip>
          </Stack>

        </Stack>
      </Stack>
    </Container>
  );
}
