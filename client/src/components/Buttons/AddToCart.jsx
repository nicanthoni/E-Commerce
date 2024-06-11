import { Button } from '@mui/material'
import { useCart } from '../../hooks/_tests_/useCart'
import { useState } from 'react';
import CartSuccess from '../Alerts/Cart/CartSuccess';
import CartWarning from '../Alerts/Cart/CartWarning';


export default function AddToCart ({ onCartUpdate, user, userId, itemId, }) {
// Hook
const { addCart, deleteCart } = useCart()

// States
const [alertMessage, setAlertMessage] = useState(''); 
const [errorAlertVisible, setErrorAlertVisible] = useState(false);
const [successAlertVisible, setSuccessAlertVisible] = useState(false);
const [warningAlertVisible, setWarningAlertVisible] = useState(false);


    const handleCartChange = async () => {
      if (user) {
        try {
          console.log(`User ${userId} added item ${itemId} to cart`);
          await addCart(itemId, userId); // call add to cart hook
          setSuccessAlertVisible(true); // show alert 
          setTimeout(() => { // hide alert after delay
            setSuccessAlertVisible(false); 
          }, 2000);
        } catch (e) {
          console.log('Add to cart error:', e);
          setErrorAlertVisible(true);
          setTimeout(() => { // hide alert after delay
            setErrorAlertVisible(false); 
          }, 2000);
        }
      } else { // For non-authetnicated user scenario
        setWarningAlertVisible(true); // show warning alert
        setTimeout(() => { // hide alert after delay
          setWarningAlertVisible(false); 
        }, 2500);
      }
    };

    return (
      <>
      {/* Render Alerts with visibility controlled by local state */}
      <CartSuccess visible={successAlertVisible}/> 
      <CartWarning visible={warningAlertVisible}/> 

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

            </>
    )
}