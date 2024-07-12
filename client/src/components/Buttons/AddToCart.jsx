import { Button } from '@mui/material';

export default function AddToCart({ onClick }) {
  // onClick = callback function defined in parent

  return (
    <Button
      onClick={onClick}
      variant='contained'
      color='secondary'
      sx={{
        color: 'primary.main',
        textTransform: 'none',
        borderRadius: 6,
      }}
    >
      Add to cart
    </Button>
  );
}
