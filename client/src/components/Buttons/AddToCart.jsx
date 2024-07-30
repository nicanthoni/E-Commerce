import { Button, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

export default function AddToCart(props) {
  // onClick = callback function defined in parent

  return (
    <Button
      onClick={props.onClick}
      variant='contained'
      color='secondary'
      endIcon={<AddShoppingCartIcon />}
      sx={{
        color: 'text.secondary',
        textTransform: 'none',
        textWrap: 'nowrap',
        borderRadius: 6,
        fontWeight: 'bold',
      }}
    >
      Add
    </Button>
  );
}
