import { Button } from '@mui/material'
import { useState } from 'react';
import { useCart } from '../../hooks/_tests_/useCart'

export default function AddToCart ({ onCartUpdate, user, userId, itemId, }) {
const { addCart, deleteCart } = useCart()


    const handleCartChange = async () => {
      if (user) {
        try {
          console.log(`User ${userId} added item ${itemId} to cart`);
          await addCart(itemId, userId); // call add to cart hook
          onCartUpdate(true); // show alert via parent component
          setTimeout(() => { // hide alert after delay
            onCartUpdate(false); 
          }, 2000);
        } catch (e) {
          console.log('Add to cart error:', e);
        }
      } else {
        // Handling for non-user scenario
      }
    };

    return (
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
    )
}