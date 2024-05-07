import { Typography, Button, Container } from "@mui/material";
import Auth from "../../utils/auth";
import { useLazyQuery } from "@apollo/client";
import { User } from "../../utils/queries";
import { useEffect } from "react";
import { Grid, Box, Avatar, Stack } from "@mui/material";
import Logout from "../Buttons/Logout";

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

  return (
    <Container maxWidth="xl">
      <Grid container direction="column" marginTop={10}>
        <Grid item>
          <Stack direction="column" alignItems="center" spacing={2}>
            <Avatar alt={user.firstName} src="#" />
            <Typography textAlign="center" variant="h6">
              Signed in as {user.firstName} {user.lastName}
            </Typography>
            <Stack
              direction="row"
              justifyContent="space-around"
              alignItems="center"
              textAlign="center"
              spacing={4}
            >
              <Stack alignItems="center">
                <Typography>0</Typography>
                <Typography variant="caption">Following</Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography>0</Typography>
                <Typography variant="caption">Wishlist</Typography>
              </Stack>
              <Stack alignItems="center">
                <Typography>0</Typography>
                <Typography variant="caption">Orders</Typography>
              </Stack>
            </Stack>
          </Stack>
        </Grid>

        <Grid item>
          <Typography>{user.email}</Typography>
        </Grid>

        <Typography>Cart:</Typography>

        <Grid item>
          {user.cart &&
            user.cart.map((item) => (
              <Box key={item.id}>
                <Typography>name: {item.item.name}</Typography>
                <Typography>price: {item.item.price}</Typography>
                <Typography>vendor: {item.item.vendor.vendorName}</Typography>
                <Typography>quanity: {item.quantity}</Typography>
              </Box>
            ))}
        </Grid>

        <Typography>Wishlist:</Typography>
        <Grid item>
          {user.wishlist &&
            user.wishlist.map((item) => (
              <Box key={item.id}>
                <Typography>name: {item.item.name}</Typography>
                <Typography>price: {item.item.price}</Typography>
                <Typography>vendor: {item.item.vendor.vendorName}</Typography>
                <Typography>quanity: {item.quantity}</Typography>
              </Box>
            ))}
        </Grid>

        <Grid item>
          <Typography>Buy History:</Typography>
          {user.buyHistory &&
            user.buyHistory.map((item) => (
              <Box key={item.id}>
                <Typography>name: {item.item.name}</Typography>
                <Typography>price: {item.item.price}</Typography>
                <Typography>vendor: {item.item.vendor.vendorName}</Typography>
                <Typography>quanity: {item.quantity}</Typography>
              </Box>
            ))}
        </Grid>

        <Grid item>
          <Typography>Ratings :</Typography>
          {user.ratings &&
            user.ratings.map((rating) => (
              <div key={rating.id}>
                <p>name: {rating.item.name}</p>
                <p>review: {rating.review}</p>
                <p>stars: {rating.stars}</p>
                <p>created at: {rating.createdAt}</p>
              </div>
            ))}
        </Grid>
      </Grid>

      {/* LOGOUT Button */}
      <Logout />
    </Container>
  );
}
