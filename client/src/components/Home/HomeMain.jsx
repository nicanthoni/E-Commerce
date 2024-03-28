import HomeInfo from "./HomeInfo";
import HomeLogo from "./HomeLogo";
import HomeServices from "./HomeServices";
import HomeTestimonials from "./HomeTestimonials";
import "./HomeMain.css";
import Grid from "@mui/material/Unstable_Grid2";
import { Box, Container } from "@mui/material";

// Parent Home component
export default function HomeMain() {
  return (
    <Box style={{ backgroundColor: "#024959" }}>
    <Container 
    maxWidth="xl" 
    className="home-main-container" 
    style={{ backgroundColor: "#024959" }}>
      
        <Grid container spacing={3} alignItems={"center"}>
          {/* Text Section */}
          <Grid item xs={12} md={6} lg={6} className="homeInfo">
            <HomeInfo />
          </Grid>

          {/* Logo Section */}
          <Grid item xs={12} md={6} lg={6} className="homeLogo">
            <HomeLogo />
          </Grid>
        </Grid>
      

      {/* Services Section */}
      <HomeServices />

      {/* Testimonial Section */}
      <Container style={{ backgroundColor: "#F2F2F2" }} maxWidth="xl">
        <Grid container  alignItems={"center"}>
          <Grid item xs={12}>
            <HomeTestimonials />
          </Grid>
        </Grid>
      </Container>

      {/* 1-2 more sections - another Discover button included, a footer with social icons */}
    </Container>
    </Box>
  );
}
