import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Link } from '@mui/material';

export default function Footer(props) {
  return (
    <Box
      component='footer'
      sx={{
        py: 4,
      }}
    >
      <Container maxWidth='xl'>
        <Typography variant='body2' textAlign='center' color='text.primary'>
          My sticky footer can be found here.
        </Typography>
        <Typography
          variant='body2'
          align='center'
          {...props}
          color='text.primary'
        >
          {'Copyright © '}
          <Link color='text.primary' href='/'>
            AppName
          </Link>{' '}
          {new Date().getFullYear()}
          {'.'}
        </Typography>
      </Container>
    </Box>
  );
}
