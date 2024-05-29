import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { Typography, Box, Grid, Stack, Checkbox, Tooltip } from '@mui/material';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import Data from '../../../data/productData.json'; // Sample product data
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useWishlist } from '../../../hooks/_tests_/useWishlist';
import AddToCart from '../../../components/Buttons/AddToCart';

export default function ProductCards() {
  const { user } = useAuthContext(); // auth
  const { addWishlist, isLoading, stateError } = useWishlist(); // custom hook

  // OnChange handle wishlist
  const handleWishlistChange = () => {
    if (user) {
      console.log('Product added to wishlist!');
    } else {
      console.log('Log in first to add items');
    }
  };

  return (
    <Grid container spacing={3} marginTop={4} marginBottom={6}>
      {Data.map((result, index) => (
        // Grid item created for each product
        <Grid item xs={12} sm={6} md={4} key={index} align='center'>
          <Card sx={{ maxWidth: 350, padding: '6px' }}>
            <Stack direction='row' textAlign='left'>
              {/* Clickable area of card */}
              <CardActionArea component={Link} to={`/product/${result.id}`}>
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
                      textOverflow: 'ellipsis', // ellipsis + hidden overflow when content exceeds 2 lines length
                      overflow: 'hidden',
                    }}
                  >
                    {result.description}
                  </Typography>

                  {/* Price */}
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
                          onChange={handleWishlistChange}
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
    </Grid>
  );
}
