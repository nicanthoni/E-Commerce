import { Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { useLazyQuery } from "@apollo/client";
import { User } from "../../utils/queries";
import { useEffect } from "react";
import { Grid, Box, Avatar, Stack } from "@mui/material";

// Buyer profile: Wishlist, 'followed' Shops, Settings, Card info, etc
export default function BuyerProfile() {
  const navigate = useNavigate();
  const id = Auth.getProfile().data._id;
  const [loadUser, { loading, data, error }] = useLazyQuery(User, {
    variables: { userId: id },
  });
  // Check if user is logged in
  if (!Auth.loggedIn()) {
    // If not, navigate to '/'

    return null; // Render nothing
  }

  // Logout button handler
  const handleLogout = () => {
    navigate("/");
    Auth.logout();
  };

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
      <Grid container direction="column">
        <Grid item>
          <Stack direction='column' alignItems='center'>
          <Avatar alt={user.firstName} src="#" />
          <Typography textAlign="center" variant="h6">
            Signed in as: {user.firstName} {user.lastName}
          </Typography>
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

      {/* LOGOUT */}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>

    </Container>
  );
}
