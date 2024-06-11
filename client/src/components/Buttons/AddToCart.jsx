import { Button } from '@mui/material'
import { useCart } from '../../hooks/_tests_/useCart'
import { useState } from 'react';
import CartSuccess from '../Alerts/Cart/CartSuccess';
import CartWarning from '../Alerts/Cart/CartWarning';
import CartError from '../Alerts/Cart/CartError';


export default function AddToCart ({ onCartUpdate, user, userId, itemId, cartedItems, refetchCart }) {
  
  // Hooks
  const { addCart, deleteCart } = useCart()

  // States
  const [alertMessage, setAlertMessage] = useState(''); 
  const [successAlertVisible, setSuccessAlertVisible] = useState(false);
  const [warningAlertVisible, setWarningAlertVisible] = useState(false);

   // Check if item is already in cart
   const isInCart = cartedItems.includes(itemId);


   const handleCartChange = async () => {
    if (user) {
      try {
        if (isInCart) { // if item's in the cart already, delete it
        await deleteCart(itemId, userId) // delete item from users cart
        setAlertMessage('Removed'); // set message
        setSuccessAlertVisible(true); // show alert 
        setTimeout(() => { 
          setSuccessAlertVisible(false);
          }, 2000);
          refetchCart();
        } else { // if item's not in cart, add it
          await addCart(itemId, userId); // call add to cart hook
          setAlertMessage('Added'); // set message
          setSuccessAlertVisible(true); // show alert 
          setTimeout(() => { 
            setSuccessAlertVisible(false); 
          }, 2000);
          refetchCart();
        }
      } catch (e) {
        console.log('Add to cart error:', e);
        // setErrorAlertVisible(true);
        // setTimeout(() => { 
        //   setErrorAlertVisible(false); 
        // }, 2000);
      }
    } else { // for non-authenticated users
      setWarningAlertVisible(true); // show warning alert
      setTimeout(() => { 
        setWarningAlertVisible(false); 
      }, 2500);
    }
   }

  return (
    <>
      {isInCart ? ( // Render button to indicate the item's' already in cart
        <Button
          onClick={() => handleCartChange()} 
          variant='contained'
          color='primary'
          sx={{
            color: 'secondary.main',
            textTransform: 'none',
          }}
        >
          Remove
        </Button>

      ) : ( // Render the Add to Cart button

        <Button
          onClick={() => handleCartChange()} 
          variant='contained'
          color='secondary'
          sx={{
            color: 'primary.main',
            textTransform: 'none',
          }}
        >
          Add to cart
        </Button>
      )}

      {/* Render Alerts with visibility controlled by local state */}
      <CartSuccess visible={successAlertVisible && alertMessage === 'Added'} message="Added to cart." /> 
      <CartSuccess visible={successAlertVisible && alertMessage === 'Removed'} message="Removed from cart." /> 
      <CartWarning visible={warningAlertVisible} /> 

    </>
  )
}