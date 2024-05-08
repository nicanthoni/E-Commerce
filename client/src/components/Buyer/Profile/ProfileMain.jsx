import { Typography, Container } from "@mui/material";
import Auth from "../../../utils/auth";
import { useLazyQuery } from "@apollo/client";
import { User } from "../../../utils/queries";
import { useEffect } from "react";
import { Grid, Avatar, Stack } from "@mui/material";
import NicsAvatar from "../../../assets/images/MyAvatar-PNG.png";
import Logout from "../../Buttons/Logout";
import ProfileAccordions from "./AccordionsMain";

export default function BuyerProfile() {
  const id = Auth.getProfile().data._id;
  const [loadUser, { loading, data, error }] = useLazyQuery(User, {
    variables: { userId: id },
  });

  // Check if user is logged in
  if (!Auth.loggedIn()) {
    // If not, navigate to '/'
    return null; // Render nothing
  }

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (error) {
    console.error("GraphQL Error:", error);
    return <p>Error fetching data</p>;
  }
  if (loading) {
    return <p>Loading...</p>; // Replace with loading spinner
  }
  if (!data || !data.user) {
    return <p>No user data found</p>;
  }

  const user = data.user;
  console.log("User data: ", user);

  return (
    <Container maxWidth="lg">
      <Grid container direction="column" marginTop={12}>

        {/* OVERVIEW stats */}
        <Grid item>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Avatar alt={user.firstName} src={NicsAvatar} />
            <Typography textAlign="center" variant="h6">
              Hi, {user.firstName} {user.lastName} 👋
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              textAlign="center"
              spacing={4}
            >
              <Stack alignItems="center">
                <Typography fontWeight="bold" color="secondary.main">
                  {user.ratings.length}
                </Typography>
                <Typography variant="caption">Reviews</Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography fontWeight="bold" color="secondary.main">
                  {user.wishlist.length}
                </Typography>
                <Typography variant="caption">Wishlist</Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography fontWeight="bold" color="secondary.main">
                  {user.buyHistory.length}
                </Typography>
                <Typography variant="caption">Orders</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        {/* ACCORDIONS   */}
        <Grid item>
          <ProfileAccordions />
        </Grid>
      </Grid>

      {/* LOGOUT Button */}
      <Logout />
    </Container>
  );
}
