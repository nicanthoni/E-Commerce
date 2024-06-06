import { Stack, Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import QuantityIncrementer from './QuantityIncrementer';


export default function CheckoutOrder( { refetchUserData, userData, loadUser } ) {

// Run loadUser 1x when component renders
// useEffect(() => {
//   refetchUserData();
// }, [loadUser]);


  return (
    <>
    {userData.cart.map((item, index) => (
    <Stack
      key={index}
      borderBottom='inset'
      direction='row'
      gap={1}
      padding={1}
      flexWrap='nowrap'
    >
      {/* Product img */}
      <Box sx={{ height: '100px', width: '100px' }}>
        <img
          src={item.item.img}
          alt='Product'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain', // ensures image fits within the Box
          }}
        />
      </Box>
      

      {/* STACK for product details */}
      <Stack
        direction='column'
        justifyContent='center'
        alignItems='center'
        width='60%'
        gap={2}
      >
        {/* Name & Price */}
        <Stack direction='row' justifyContent='center' width='100%' gap={2}>
          <Typography
            textAlign='left'
            variant='body1'
            fontWeight={'bold'}
            sx={{ fontSize: 14 }}
          >
            Product Name 
          </Typography>
          <Typography
          
            variant='body1'
            fontWeight={'bolder'}
            sx={{ fontSize: 14}}
          >
            ${item.item.price}
          </Typography>
        </Stack>

        {/* Quantity component */}
          <QuantityIncrementer/>
      </Stack>
    </Stack>
  ))}
  </>
  );
}
