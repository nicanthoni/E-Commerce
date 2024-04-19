import { Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { useLazyQuery } from "@apollo/client";
import { User } from "../../utils/queries";
import { useEffect } from "react";

// Buyer profile: Wishlist, 'followed' Shops, Settings, Card info, etc
export default function BuyerProfile() {
  const navigate = useNavigate();
  const id = Auth.getProfile().data._id
  const [loadUser, { loading, data, error }] = useLazyQuery(User, {
    variables: { userId: id }
  })
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
    loadUser()
  }, [loadUser])

  if (error) {
    console.error('GraphQL Error:', error)
    return <p>Error fetching data</p>
  }

  if (loading) {
    return <p>Loading...</p> // Replace with loading spinner
  }
  if (!data || !data.user) {
    return <p>No user data found</p>
  }

  const user = data.user
  return (
    <Container maxWidth="xl">
      <Typography textAlign="center" variant="h6">
        Welcome, {user.firstName} {user.lastName}
      </Typography>
      <br />
      {user.email}
      <br />
      Cart:
      <br />
      {user.cart &&
        user.cart.map((item) => (
          <div key={item.id}>
            <p>name: {item.item.name}</p>
            <p>price: {item.item.price}</p>
            <p>vendor: {item.item.vendor.vendorName}</p>
            <p>quanity: {item.quantity}</p>
          </div>
        ))}
      <br />
      Wishlist:
      <br />
      {user.wishlist &&
        user.wishlist.map((item) => (
          <div key={item.id}>
            <p>name: {item.item.name}</p>
            <p>price: {item.item.price}</p>
            <p>vendor: {item.item.vendor.vendorName}</p>
            <p>quanity: {item.quantity}</p>
          </div>
        ))}
      <br />
      Buy History:
      {user.buyHistory &&
        user.buyHistory.map((item) => (
          <div key={item.id}>
            <p>name: {item.item.name}</p>
            <p>price: {item.item.price}</p>
            <p>vendor: {item.item.vendor.vendorName}</p>
            <p>quanity: {item.quantity}</p>
          </div>
        ))}
      <br />
      Ratings :
      {user.ratings &&
        user.ratings.map((rating) => (
          <div key={rating.id}>
            <p>name: {rating.item.name}</p>
            <p>review: {rating.review}</p>
            <p>stars: {rating.stars}</p>
            <p>created at: {rating.createdAt}</p>
          </div>
        ))}
      {/* LOGOUT */}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
