import { Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { useParams } from 'react-router-dom'


// Buyer profile: Wishlist, 'followed' Shops, Settings, Card info, etc
export default function BuyerProfile() {
  const navigate = useNavigate();

  // Check if user is logged in
  if (!Auth.loggedIn()) {
    // If not, navigate to '/'
    navigate("/");
    return null; // Render nothing
  }

// Logout button handler
const handleLogout = () => {
    Auth.logout();
  };

  return (
    <Container maxWidth="xl">
      <Typography textAlign="center" variant="h6">
        Welcome, Buyer!
      </Typography>

      {/* LOGOUT */}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
