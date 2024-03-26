import HomeInfo from "./HomeInfo";
import HomeLogo from "./HomeLogo";
import HomeServices from "./HomeServices";
import "./HomeMain.css";
import Grid from "@mui/material/Unstable_Grid2";
import { Container } from "@mui/material";

// Parent Home component
export default function HomeMain() {
  return (
    <Container maxWidth="false">
      <Grid
        container
        className="home-main-container"
        alignItems={"center"}
        spacing={1}
        margin={1}
      >
        {/* Text Section */}
        <Grid item xs={12} md={6} lg={6} className="homeInfo">
          <HomeInfo />
        </Grid>

        {/* Logo Section */}
        <Grid item xs={0} md={6} lg={6} className="homeLogo">
          <HomeLogo />
        </Grid>

        {/*  Services Section */}
        <Grid item xs={12} className="homeServices">
          <HomeServices />
        </Grid>
      </Grid>

        {/* Testimonial Section */}
      <Grid item></Grid>
    </Container>
  );
}
