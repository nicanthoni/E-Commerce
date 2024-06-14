import { Stack, Box, Typography, Button } from '@mui/material';
import DeleteItem from '../../../components/Buttons/_tests_/DeleteItem';
import QuantityIncrementer from '../../../components/_tests_/QuantityIncrementer';


// For each item in cart
export default function CartItem({ userData, refetchCart, refetchUserData }) {

  return (
    <>
    {userData.user.cart.map((item, index) => (
    <Stack
      key={index}
      borderBottom='inset'
      borderColor='white'
      direction='row'
      gap={2}
      padding={3}
      flexWrap='nowrap'
      justifyContent='center'
      bgcolor='#F2F2F2'
    >

        {/* Product img & Incrementer */}
        <Stack gap={2}>
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
  
          <QuantityIncrementer userData={userData} />
        </Stack>
      

        {/* Product details */}
        <Stack direction='column' justifyContent='flex-end' >

        {/* Name */}
            <Typography
            textAlign='left'
            variant='body1'
            sx={{ fontSize: 14 }}
          >
            {item.item.name}
          </Typography>

        {/* Price */}
          <Typography
            textAlign='left'
            variant='body1'
            fontWeight={'bold'}
            sx={{ fontSize: 14}}
          >
            ${item.item.price}
          </Typography>

        {/* Description */}
          <Typography
            textAlign='left'
            variant='caption'
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              textOverflow: 'ellipsis', // ellipsis + hidden overflow if content exceeds 2 lines
              overflow: 'hidden',
            }}
          >
            {item.item.description}
          </Typography>

        {/* Button  */}
          <DeleteItem itemId={item.item._id} refetchCart={refetchCart} refetchUserData={refetchUserData}/> 

      </Stack>
    </Stack>
  ))}
  </>
  );
}
