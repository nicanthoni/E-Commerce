import { Button } from '@mui/material';

export default function RemoveFromCart({ onClick }) {
  // onClick = callback function defined in parent

  return (
    <Button
      onClick={onClick}
      variant='contained'
      color='primary'
      sx={{
        color: 'secondary.main',
        textTransform: 'none',
      }}
    >
      Remove
    </Button>
  );
}
