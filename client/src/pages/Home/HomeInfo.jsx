import { Typography, Stack } from '@mui/material';
import GetStarted from '../../components/Buttons/GetStarted';
import Grid from '@mui/material/Grid';

export default function HomeInfo() {
  return (
    <Stack
      gap={3}
      direction='column'
      sx={{ alignItems: { xs: 'center', sm: 'normal' }, padding: {xs: 4, sm: 5, md: 6}}}
      
    >
      {/* Slogan statement */}
      <Typography
        variant='h2'
        sx={{
          fontWeight: 'bold',
          textAlign: { xs: 'center', sm: 'center', md: 'left' },
        }}
        color='text.secondary'
      >
        Sell Your Passion, Shop the World.
      </Typography>

      {/* Lorem ipsum */}
      <Typography
        color='text.secondary'
        sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' } }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum nulla
        voluptatibus consequatur animi recusandae unde ipsa eligendi magni,
        porro fugiat dicta ut sequi at perspiciatis. Necessitatibus, et numquam.
        Autem, aperiam.
      </Typography>

      <Grid item sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' } }}>
        <GetStarted />
      </Grid>
    </Stack>
  );
}
