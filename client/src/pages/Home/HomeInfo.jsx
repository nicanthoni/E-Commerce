import { Typography } from '@mui/material';
import GetStarted from '../../components/Buttons/GetStarted';
import Grid from '@mui/material/Grid';

export default function HomeInfo() {
  return (
    <Grid
      container
      className='home-info-Container'
      direction='column'
      rowSpacing={3}
      sx={{ alignItems: { xs: 'center', sm: 'normal' } }}
    >
      <Grid item>
        <Typography
          className='info-header'
          variant='h2'
          sx={{
            fontWeight: 'bold',
            textAlign: { xs: 'center', sm: 'center', md: 'left' },
          }}
          color='#fff'
        >
        Sell Your Passion, Shop the World.
        </Typography>
      </Grid>
      <Grid item>
        <Typography
          className='info-text'
          color='#fff'
          sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' } }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum nulla
          voluptatibus consequatur animi recusandae unde ipsa eligendi magni,
          porro fugiat dicta ut sequi at perspiciatis. Necessitatibus, et
          numquam. Autem, aperiam.
        </Typography>
      </Grid>
      <Grid item sx={{ textAlign: { xs: 'center', sm: 'center', md: 'left' } }}>
        <GetStarted />
      </Grid>
    </Grid>
  );
}
