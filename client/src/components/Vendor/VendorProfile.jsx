import { Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { useParams } from 'react-router-dom'


// Vendor profile
export default function VendorProfile() {
  const navigate = useNavigate();

  // Check if user is logged in
  if (!Auth.loggedIn()) {
    // If not logged in, navigate to '/'
    navigate("/");
    return null; // Render nothing
  }

  // Logout button handler
  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <Container maxWidth="xl">
      <Typography variant="h6" textAlign="center">
        Welcome, Vendor!
      </Typography>

      {/* LOGOUT */}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}
