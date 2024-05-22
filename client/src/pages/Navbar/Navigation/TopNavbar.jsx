import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { NavLink } from "react-router-dom";
import LogoutButton from "../../../components/Buttons/Logout";
import GetStarted from "../../../components/Buttons/GetStarted";
import { useAuthContext } from "../../../hooks/useAuthContext";

export default function MainNav() {
  const { user } = useAuthContext();

  return (
    <>
      {/* DESKTOP/MAIN NAVBAR */}
      <Box
        className="nav-link-Container"
        sx={{ display: { xs: "none", sm: "flex" } }}
      >
        {/* HOME */}
        <Button key="Home" sx={{ color: "#fff", textTransform: "none" }}>
          {user ? (
            <NavLink
              to="/explore"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Home
            </NavLink>
          ) : (
            <NavLink
              to="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Home
            </NavLink>
          )}
        </Button>

        {/* EXPLORE */}
        {user ? null : (
          <Button key="Explore" sx={{ color: "#fff", textTransform: "none" }}>
            <NavLink
              to="/explore"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Explore
            </NavLink>
          </Button>
        )}

        {/* PROFILE or SIGN IN */}
        {user ? (
          <>
            <Button key="Profile" sx={{ color: "#fff", textTransform: "none" }}>
              <NavLink
                to="/profile"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Profile
              </NavLink>
            </Button>
            {/* <LogoutButton /> */}
          </>
        ) : (
          <>
            <Button key="Signin" sx={{ color: "#fff", textTransform: "none" }}>
              <NavLink
                to="/signin"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sign In
              </NavLink>
            </Button>
            <GetStarted />
          </>
        )}

        {/* SUPPORT */}
        {user ? (
          <Button key="Support" sx={{ color: "#fff", textTransform: "none" }}>
            <NavLink
              to="/support"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Support
            </NavLink>
          </Button>
        ) : null}

        {/* LOGOUT */}
        {user ? <LogoutButton /> : null}
      </Box>
    </>
  );
}
