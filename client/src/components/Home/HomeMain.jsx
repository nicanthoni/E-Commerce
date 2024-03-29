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
    <>
    <Box style={{ backgroundColor: "#024959" }}>
      <Container maxWidth="xl" className="home-main-container">
        <Grid container spacing={3} alignItems={"center"}>
          {/* Text Section */}
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            className="homeInfo"
            sx={{ marginTop: { xs: 9, md: 0 } }}
          >
            <HomeInfo />
          </Grid>

          {/* Logo Section */}
          <Grid
            item
            xs={12}
            md={6}
            lg={6}
            className="homeLogo"
            sx={{ padding: { xs: 6, sm: 4, md: 2 } }}
          >
            <HomeLogo />
          </Grid>
        </Grid>
      </Container>
      </Box>

      {/* Services Section */}
        <Box style={{ backgroundColor: "#FFF", width: "100%" }} padding={2}>
          <Container maxWidth="xl">
            <HomeServices />
          </Container>
        </Box>


      {/* Testimonial Section */}
      <Box style={{ backgroundColor: "#F2F2F2", width: "100%" }}>
        <Container maxWidth="xl">
          <HomeTestimonials />
        </Container>
      </Box>

      {/* Call to Action section with Button */}




      {/* Footer - add to root-layout?*/}

      </>
  );
}
