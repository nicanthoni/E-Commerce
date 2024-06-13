import { Link } from 'react-router-dom';
import { Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { Typography, Box, Grid, Stack, Checkbox, Tooltip } from '@mui/material';
import { useAuthContext } from '../../../hooks/useAuthContext';
import ProductFilters from '../Filters/ProductFilters';
import placeholder from '../../../assets/images/brand/no-products.svg';
import CartButton from '../../../components/Buttons/CartButton';
import WishlistButton from '../../../components/Buttons/WishlistButton';


export default function ProductsMain({ products, wishlistedItems, refetchWishlist, cartedItems, refetchCart }) {
  const { user, id } = useAuthContext();

  return (
    <Grid container spacing={3} marginBottom={6}>
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
                        <CartButton
                          user={user}
                          userId={id}
                          itemId={result._id}
                          cartedItems={cartedItems}
                          refetchCart={refetchCart}
                        />
                        <WishlistButton
                          user={user}
                          userId={id}
                          itemId={result._id}
                          wishlistedItems={wishlistedItems}
                          refetchWishlist={refetchWishlist}
                        />
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
