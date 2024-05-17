import { Box, Badge } from '@mui/material'
import { useState } from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CheckoutMain from '../../Checkout/CheckoutDrawer/CheckoutMain';


export default function CartDrawer () {
    const [showCart, setShowCart] = useState(false);

      // Toggle CHECKOUT drawer
    const toggleShowCart = () => {
    setShowCart((prevShowCart) => !prevShowCart); //
  };

    return (
        <>
            <Box className='cart-icon' sx={{ ml: 3, mr: 4, cursor: 'pointer' }}>
              <Badge
                onClick={toggleShowCart}
                badgeContent={1}
                max={10}
                color='error'
              >
                <ShoppingCartIcon />
              </Badge>
            </Box>
                {showCart && <CheckoutMain />}
        </>
    )
}