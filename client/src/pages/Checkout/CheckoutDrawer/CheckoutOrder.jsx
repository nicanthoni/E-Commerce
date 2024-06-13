import { Stack, Box, Typography, Button } from '@mui/material';
import QuantityIncrementer from './QuantityIncrementer';


// For each item in cart
export default function CheckoutOrder({ userData }) {
  return (
    <>
    {userData.cart.map((item, index) => (
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


        <Stack gap={2}>
        {/* Product img & Incrementer */}
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
  
        <QuantityIncrementer/>
        </Stack>
      

        {/* Product details */}
        <Stack
          direction='column'
          justifyContent='flex-end'

        >

        {/* Name, Description, Price, & Button */}
            <Typography
            textAlign='left'
            variant='body1'
            sx={{ fontSize: 14 }}
          >
            {item.item.name}
          </Typography>


          <Typography
            textAlign='left'
            variant='body1'
            fontWeight={'bold'}
            sx={{ fontSize: 14}}
          >
            ${item.item.price}
          </Typography>

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

          <Button 
            size='small'
            variant='contained'
            color='grey'
            sx={{
              backgroundColor: 'white',
              color: 'primary.main',
              textTransform: 'none',
            }}
            >
              Delete
          </Button>


      </Stack>
    </Stack>
  ))}
  </>
  );
}
