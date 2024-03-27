import HomeInfo from "./HomeInfo";
import HomeLogo from "./HomeLogo";
import HomeServices from "./HomeServices";
import HomeTestimonials from "./HomeTestimonials";
import "./HomeMain.css";
import Grid from "@mui/material/Unstable_Grid2";
import { Container } from "@mui/material";

// Parent Home component
export default function HomeMain() {
  return (
    <div className="home-main-container">
      <Container style={{ backgroundColor: "#024959" }} maxWidth="false">
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
      </Container>

      {/* Services Section */}
      <HomeServices />

      {/* Testimonial Section */}
      <Container style={{ backgroundColor: "#F2F2F2" }} maxWidth="false">
        <Grid item>
        <HomeTestimonials/>
        </Grid>
      </Container>
    </div>
  );
}
