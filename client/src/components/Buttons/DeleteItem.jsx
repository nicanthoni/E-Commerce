import { Button } from '@mui/material';
import { useState } from 'react';
import ItemAlert from '../Alerts/Items/ItemUpdate';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCart } from '../../hooks/Products/useCart';

export default function DeleteItem({ refetchCart, itemId, refetchUserData }) {
  const { id } = useAuthContext();
  const userId = id;

  // Alert States
  const [alertMessage, setAlertMessage] = useState('');
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);

  // Hook
  const { deleteCart, isLoading, stateError } = useCart();

  // OnClick - handle deletion
  const handleDeleteItem = async () => {
    try {
      await deleteCart(itemId, userId); // delete item from user's cart
      setAlertMessage('Removed'); // set message
      setSuccessAlertVisible(true); // show alert
      refetchCart(); // refetch the updated cart data
      setTimeout(() => {
        setSuccessAlertVisible(false);
      }, 1000);
      refetchUserData(); // refetch updated user data
    } catch (e) {
      console.log('Delete from cart error:', e);
    }
  };

  return (
    <>
      <Button
        onClick={() => handleDeleteItem()}
        variant='contained'
        color='grey'
        sx={{
          backgroundColor: 'white',
          color: 'primary.main',
          textTransform: 'none',
          maxWidth: 80,
        }}
      >
        Delete
      </Button>

      {/* Alerts visibility controlled by local state */}
      <ItemAlert
        visible={successAlertVisible && alertMessage === 'Removed'}
        message={alertMessage}
      />
    </>
  );
}
