import Copyright from './Copyright';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

export default function Footer() {
  return (
    <Box
      component='footer'
      sx={{
        py: 5,
        backgroundColor: '#background.main',
      }}
    >
      <Container maxWidth='xl'>
        <Typography variant='body2' textAlign={'center'}>
          My sticky footer can be found here.
        </Typography>
        <Copyright />
      </Container>
    </Box>
  );
}
