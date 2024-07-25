import { Button } from '@mui/material';

export default function RemoveFromCart({ onClick }) {
  // onClick = callback function defined in parent

  return (
    <Button
      onClick={onClick}
      variant='contained'
      sx={{
        bgcolor: 'text.alt',
        color: 'text.secondary',
        textTransform: 'none',
        textWrap: 'nowrap',
        borderRadius: 6,
      }}
    >
      Remove from Cart
    </Button>
  );
}
