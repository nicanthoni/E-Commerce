import { Button } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function RemoveFromCart(props) {
  // onClick = callback function defined in parent

  return (
    <Button
      onClick={props.onClick}
      variant='contained'
      color='primary'
      endIcon={<ShoppingCartIcon />}
      sx={{
        color: 'text.secondary',
        textTransform: 'none',
        textWrap: 'nowrap',
        borderRadius: 6,
        fontWeight: 'bold',
      }}
    >
      Remove
    </Button>
  );
}
