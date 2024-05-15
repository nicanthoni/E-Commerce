import Avatar from "@mui/material/Avatar";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Typography } from "@mui/material";
import NicsAvatar from '../../assets/images/MyAvatar-PNG.png'
import {Divider} from "@mui/material";



export default function HomeTestimonials() {
  return (
    <Stack
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      {/* Section Heading */}
      <Typography
        variant="h4"
        color="primary.main"
        fontWeight="bold"
        textAlign="center"
        padding={6}
      >
        Customers around the globe love AppName
      </Typography>

      {/* Reviews */}
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        textAlign='center'
        // On small screens, change direction to column
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        {/* Review 1 */}
        <Stack padding={2} alignItems="center" gap={1} direction="column">
          <Avatar src={NicsAvatar} alt='Customer Photo' 
          sx={{ bgcolor: "primary.main", width: 68, height: 68 }}>
          </Avatar>

          <Typography>
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos
            repellat id quidem!"
          </Typography>

          <Typography variant="caption">
           - Denji
          </Typography>

          <Typography variant="caption">
            Engineering Manager
          </Typography>

          <Rating name="read-only" value={5} readOnly />
        </Stack>
        <Divider flexItem/>

        {/* Review 2 */}
        <Stack padding={2} alignItems="center" gap={1} direction="column">
          <Avatar src={NicsAvatar} alt='Customer Photo' 
          sx={{ bgcolor: "primary.main", width: 68, height: 68 }}>
          </Avatar>

          <Typography>
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos
            repellat id quidem!"
          </Typography>

          <Typography variant="caption">
            - Marcus
          </Typography>

          <Typography variant="caption">
            Head of Finance
          </Typography>

          <Rating name="read-only" value={5} readOnly />
        </Stack>
        <Divider flexItem/>

        {/* Review 3 */}
        <Stack padding={2} alignItems="center" gap={1} direction="column">
          <Avatar src={NicsAvatar} alt='Customer Photo' 
          sx={{ bgcolor: "primary.main", width: 68, height: 68 }}>
          </Avatar>

          <Typography>
            "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eos
            repellat id quidem!"
          </Typography>

          <Typography variant="caption">
            - Libby
          </Typography>

          <Typography  variant="caption">
            CEO
          </Typography>

          <Rating name="read-only" value={5} readOnly />
        </Stack>

      </Stack>

    </Stack>
  );
}
