import { Typography, Box, Button, Container, Stack, Rating, Checkbox, Tooltip, Alert } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { IndividualProduct } from '../../../utils/queries';
import { useWishlist } from '../../../hooks/Products/useWishlist';
import { User } from '../../../utils/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';

export default function SingleProduct() {
  const { user, id } = useAuthContext();
  const { productId } = useParams();

  // Load Product
  const [loadProduct, { loading: productLoading, data: productData, error: productError }] = useLazyQuery(
    IndividualProduct,
    { variables: { id: productId } 
  });

  // Load Wishlist
  const [loadWishlist, { loading: wishlistLoading, data: wishlistData, error: wishlistError, refetch }] = useLazyQuery(User,
    { variables: { userId: id }, 
  });

  const { addWishlist, deleteWishlist, isLoading, stateError } = useWishlist(refetch);


  // Error & Alert States
  const [clickedItemId, setClickedItemId] = useState(null); // store itemId - assign alert
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);


  // Load product data
  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

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

  // OnChange handle wishlist
  const handleWishlistChange = async (userId, itemId) => {
    if (user) {
      try {
        await addWishlist(itemId, userId); // custom hook to add to wishlist
        setShowSuccessAlert(true);
        setClickedItemId(itemId); // Set item ID
        setTimeout(() => {
          setShowSuccessAlert(false);
        }, 2500);
      } catch (e) {
        console.log(' addWishlist() Error: ', e);
        setShowErrorAlert(true);
        setClickedItemId(itemId); // Set item ID
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 2500);
      }
    } else {
      setShowWarningAlert(true);
      setClickedItemId(itemId); // Set item ID
      setTimeout(() => {
        setShowWarningAlert(false);
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
            <Rating name='read-only' value={productData.item.rating} readOnly />
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
                onChange={() =>
                  handleWishlistChange(
                    id,
                    productId,
                  )}
                color='error'
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
              />
            </Tooltip>
          </Stack>

            {/* ALERTS  */}

            {/* Wishlist alerts */}
            {clickedItemId === productId && (
                  <>
                    {showSuccessAlert && (
                      <Alert severity='success' sx={{ width: '100%', mb: 2 }}>
                        Added to wishlist.
                      </Alert>
                    )}
                    {showErrorAlert && (
                      <Alert severity='error' sx={{ width: '100%', mb: 2 }}>
                        Error adding this item to your wishlist.
                      </Alert>
                    )}
                    {showWarningAlert && (
                      <Alert severity='warning' sx={{ width: '100%', mb: 2 }}>
                        Sign in first.
                      </Alert>
                    )}
                  </>
                )}
        </Stack>
      </Stack>
    </Container>
  );
}
