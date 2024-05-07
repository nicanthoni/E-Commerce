import { Button } from "@mui/material";
import Auth from "../../utils/auth";
import { useNavigate } from "react-router-dom";

// Reusable Logout button component
export default function Logout() {

  const navigate = useNavigate();
  // Logout button handler
  
  const handleLogout = () => {
    navigate("/");
    Auth.logout();
  };

  return (
    <Button
      onClick={handleLogout}
      variant="contained"
      sx={{
        bgcolor: "secondary.main",
        color: "primary.main",
        textTransform: "none",
      }}
    >
      Logout
    </Button>
  );
}
