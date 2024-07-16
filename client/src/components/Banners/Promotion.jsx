import { Box, Typography, Link } from '@mui/material';

export default function Promotion() {
  return (
    <Typography padding={1.5} color='white.main' fontSize='small'>
      Promotional Banner{' '}
      <Link underline='always' color='white.main'>
        Click here!
      </Link>
    </Typography>
  );
}
