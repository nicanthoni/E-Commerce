import { Box, Typography, Link } from '@mui/material';

export default function Promotion() {
  return (
    <Box
      margin={0}
      padding={0}
      display='flex'
      justifyContent='center'
      bgcolor='secondary.main'
      sx={{ opacity: 0.8 }}
    >
      <Typography padding={1} color='white.main'>
        Promotional Banner{' '}
        <Link underline='always' color='white.main'>
          Click here!
        </Link>
      </Typography>
    </Box>
  );
}
