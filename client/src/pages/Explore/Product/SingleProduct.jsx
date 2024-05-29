import {
  Typography,
  Box,
  Button,
  Container,
  Stack,
  Rating,
  Checkbox,
  Tooltip,
} from '@mui/material';
import { FavoriteBorder, Favorite, AddShoppingCart } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
import Data from '../../../data/productData.json'; // test data

export default function SingleProduct() {
  const { productId } = useParams();
  const product = Data.find((item) => item.id === parseInt(productId)); // Find product by ID

  // If no product match...
  if (!product) {
    return (
      <Typography variant='h6' textAlign='center' marginTop={15}>
        Product not found 🤔
      </Typography>
    );
  }

  // OnChange handle wishlist
  const handleWishlistChange = () => {
    console.log('added to wishlist');
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
              src={product.img}
              alt='Product Photo'
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
              }}
            />
          </Box>

          <Box sx={{ marginBottom: { xs: 2, md: 0 } }}>
            <Rating name='read-only' value={product.rating} readOnly />
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
            ${product.price}
          </Typography>

          <Typography variant='h5' component='div' fontWeight='bold'>
            {product.name}
          </Typography>

          <Typography variant='body1' color='text.secondary'>
            {product.description}
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
                onChange={handleWishlistChange}
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
