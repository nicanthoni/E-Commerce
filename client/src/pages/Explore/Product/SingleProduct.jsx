import {Typography,Box,Container,Stack,Rating,Checkbox,Tooltip,} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { IndividualProduct, Cart, Wishlist } from '../../../utils/queries';
import { useAuthContext } from '../../../hooks/useAuthContext';
import CartButton from '../../../components/Buttons/CartButton';
import WishlistButton from '../../../components/Buttons/WishlistButton';
import { getAverage } from '../../../utils/calculations/getAverage';


export default function SingleProduct() {
  const { user, id } = useAuthContext();
  const { productId } = useParams();

  //  loadProduct Query - returns data associated with single item
  const [loadProduct, { loading: productLoading, data: productData, error: productError },] = useLazyQuery(IndividualProduct, 
    { variables: { id: productId } });

    // loadWishlist Query - returns array of productIds (in users wishlist). Refetch when item is added/removed
  const [loadWishlist, {loading: wishlistArrayLoading, data: wishlistArray, error: wishlistArrayError, refetch: refetchWishlist}] = useLazyQuery(Wishlist, {
    variables: {id: id}
  })

  // loadCart Query - returns array of productIds (in users' cart). Refetch when item is added/removed
  const [ loadCart, { loading: loadingCart, data: cartData, error: cartError, refetch: refetchCart },] = useLazyQuery(Cart, 
    { variables: { id: id } });

  // Grab cartItems IDs
  const cartedItems = cartData ? cartData.usersCart : [];

  // Grab wishlistedItems IDs
  const wishlistedItems = wishlistArray ? wishlistArray.usersWishlist : [];

  // Load product data, check users wishlist & cart for item
  useEffect(() => {
    loadWishlist();
    loadCart();
    loadProduct();
  }, [loadProduct, loadCart, loadWishlist]);

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

  // getAverage()  - utility to calculate avg of star ratings
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

          {/* Button & Wishlist Stack */}
          <Stack direction='row' gap={1}>
            <>
              <CartButton
                user={user} // auth
                userId={id} // user id
                itemId={productId} // item id
                cartedItems={cartedItems} // array of users carted item ids
                refetchCart={refetchCart}
              />

              <WishlistButton
                user={user} // auth
                userId={id} // user id
                itemId={productId} // item id
                wishlistedItems={wishlistedItems} // array of users wishlisted item ids
                refetchWishlist={refetchWishlist} // refetch Wishlist query
              />
            </>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
