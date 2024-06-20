import { Stack, Box, Typography } from '@mui/material';
import { useState } from 'react';
import DeleteItem from '../../../components/Buttons/DeleteItem';
import QuantityIncrementer from '../../../components/test.QuantityIncrementer';
import ItemAlert from '../../../components/Alerts/Items/ItemUpdate';
import { useCart } from '../../../hooks/Products/useCart';

// For each item in cart
export default function CartItem({
  userId,
  userData,
  refetchCart,
  refetchUserData,
}) {
  // Alert States
  const [alertMessage, setAlertMessage] = useState('');
  const [itemAlertVisible, setItemAlertVisible] = useState(false);

  // Hook
  const { deleteCart, isLoading, stateError } = useCart();

  // onClick of delete button - handle item deletion
  const handleDeleteItem = async (itemId) => {
    try {
      await deleteCart(itemId, userId);
      setAlertMessage('Removed');
      setItemAlertVisible(true);
      refetchCart(); // refetch the updated cart data
      setTimeout(() => {
        setItemAlertVisible(false);
      }, 1000);
      refetchUserData(); // refetch updated user data
    } catch (e) {
      console.log('Delete from cart error:', e);
    }
  };

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
          justifyContent='flex-start'
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
                  objectFit: 'contain',
                }}
              />
            </Box>
            <QuantityIncrementer userData={userData} />
          </Stack>

          {/* Product details */}
          <Stack direction='column' justifyContent='flex-end'>
            {/* Name */}
            <Typography textAlign='left' variant='body1' sx={{ fontSize: 14 }}>
              {item.item.name}
            </Typography>

            {/* Price */}
            <Typography
              textAlign='left'
              variant='body1'
              fontWeight={'bold'}
              sx={{ fontSize: 14 }}
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

            {/* Buttons  */}
            <DeleteItem
              onClick={() => handleDeleteItem(item.item._id)} // pass item._id to function as itemId
            />
          </Stack>
          {/* ⚠️ Alerts ⚠️ - visibility controlled by local state */}
          <ItemAlert visible={itemAlertVisible} message={alertMessage} />
        </Stack>
      ))}
    </>
  );
}
