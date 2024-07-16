import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';

export default function Footer(props) {
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
        <Typography
          variant='body2'
          color='text.secondary'
          align='center'
          {...props}
        >
          {'Copyright © '}
          <Link color='inherit' href='/'>
            AppName
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}
