import { Button } from '@mui/material';

export default function DeleteItem({ onClick }) {
  return (
    <>
      <Button
        onClick={() => onClick()}
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
    </>
  );
}
