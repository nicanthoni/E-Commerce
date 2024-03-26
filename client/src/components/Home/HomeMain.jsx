import HomeInfo from "./HomeInfo";
import HomeModels from "./HomeModels";
import "./HomeMain.css";
import Grid from "@mui/material/Unstable_Grid2";
import { Container} from "@mui/material";


// Parent Home component
export default function HomeMain() {
  return (
    <Container maxWidth='false'>
    <Grid
      container
      className="home-main-container"
      alignItems={"center"}
      spacing={5}
      margin={1}
      padding={1}
    >
      <Grid item xs={12} md={6} lg={6} className="home-info">
        <HomeInfo />
      </Grid>
      <Grid item xs={0} md={6} lg={6} className="home-models">
        <HomeModels />
      </Grid>
    </Grid>
    </Container>
  )
}
