import Grid from '@mui/material/Grid';
import { Box, Container } from '@mui/material';
import HomeInfo from './HomeInfo';
import HomeLogo from './HomeLogo';
import HomeServices from './HomeServices';
import HomeTestimonials from './HomeTestimonials';
import HomeCTA from './HomeCTA';
import Footer from '../../components/Footer/Footer';

export default function Home() {
  return (
    <>
      {/* <Navbar/> */}
      <Box sx={{ backgroundColor: 'primary.main' }}>
        <Container maxWidth='xl'>
          <Grid container spacing={4} alignItems='center'>
            {/* Slogan  */}
            <Grid item xs={12} md={6} sx={{ marginTop: { xs: 12, lg: 0 } }}>
              <HomeInfo />
            </Grid>

            {/* Logo  */}
            <Grid item xs={12} md={6}>
              <HomeLogo />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Services  */}
      <Box sx={{ backgroundColor: '#FFF', width: '100%' }} padding={2}>
        <Container maxWidth='xl'>
          <HomeServices />
        </Container>
      </Box>

      {/* Testimonials */}
      <Box sx={{ backgroundColor: '#F2F2F2', width: '100%' }}>
        <Container maxWidth='xl'>
          <HomeTestimonials />
        </Container>
      </Box>

      {/* CTA  */}
      <Box sx={{ backgroundColor: 'primary.main', width: '100%' }}>
        <Container maxWidth='xl'>
          <HomeCTA />
        </Container>
      </Box>

      {/* Footer */}
      <Footer />
    </>
  );
}
