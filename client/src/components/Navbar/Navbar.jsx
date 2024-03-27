import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Badge } from "@mui/material";
import "./Navbar.css";
import CheckoutMain from "../CheckoutDrawer/CheckoutMain";
import SkateboardingIcon from '@mui/icons-material/Skateboarding'; // Logo placeholder

// adjust width of menu drawer
const drawerWidth = 250;

// Nav items array
const navItems = ["Home", "Men", "Women", "Explore"];

// Nav item routes
const routes = {
  Home: "/",
  Men: "explore/men",
  Women: "explore/women",
  Explore: "/explore/all",
};

export default function Navbar() {
  const [showCart, setShowCart] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Toggle CHECKOUT drawer
  const toggleShowCart = () => {
    console.log("Cart clicked");
    setShowCart((prevShowCart) => !prevShowCart); // functional update to ensure proper synchronization
  };

  // Toggle MENU drawer (mobile only)
  const handleDrawerToggle = () => {
    console.log("Menu icon clicked");
    setMobileOpen((prevState) => !prevState);
  };

  // Items in MENU drawer - Decompose as a separate component?
  const menuDrawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ bgcolor: "primary.main" }}>
        <Typography variant="h6" color='#fff' sx={{ my: 2, display: 'inline-block' }}>
          XYZ
        </Typography>
      </Box>
      <Divider />
      <List sx={{ display: 'inline-block'}}>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton>
              <NavLink
                to={routes[item]}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItemText primary={item}/>
              </NavLink>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  // Main Navbar
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{ backgroundColor: "primary", display: "flex" }}
        elevation={0}
      >
        <Toolbar>
          <IconButton
            className="menu-icon"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            alignItems="left"
            sx={{ ml: 3, display: { sm: "none", color: '#fff' } }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: { xs: "center", sm: "left" },
              marginLeft: 4,
              color: "secondary.main"
            }}
          >
            <NavLink to="/"
            style={{ textDecoration: "none", color: "#fff" }}
            >
             <SkateboardingIcon/>
              
              </NavLink>
          </Typography>

          {/* Main Navbar items on desktop view */}
          <Box
            className="nav-link-Container"
            sx={{ display: { xs: "none", sm: "yes" } }}
          >
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                <NavLink
                  to={routes[item]}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {item}
                </NavLink>
              </Button>
            ))}
          </Box>

          {/* CheckoutMain component drawer renders on Cart click */}
          <Box className="cart-icon" alignItems="right" sx={{ ml: 3, mr: 4 }}>
            <Badge badgeContent={1} max={10} color="secondary">
              {/* Color for icon controlled in <CheckoutMain/> */}
              <ShoppingCartIcon onClick={toggleShowCart} />
            </Badge>
          </Box>
          {showCart && <CheckoutMain />}
        </Toolbar>
      </AppBar>

      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {menuDrawer}
        </Drawer>
      </nav>
    </Box>
  );
}
