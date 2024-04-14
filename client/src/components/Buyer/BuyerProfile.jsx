import { Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";

// Buyer profile: Wishlist, 'followed' Shops, Settings, Card info, etc
export default function BuyerProfile() {
const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout button clicked");
    Auth.logout();
  };

   // Check if user is logged in
   if (!Auth.loggedIn()) {
    // If not logged in, navigate to '/'
    navigate("/");
    return null; // Render nothing
  }
  
  return (

    <Container maxWidth="xl">
      <Typography textAlign="center">Welcome, Buyer!</Typography>

      {/* LOGOUT */}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Container>

  );
}
