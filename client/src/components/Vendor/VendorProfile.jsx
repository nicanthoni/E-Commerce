import { Typography, Container, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Auth from "../../utils/auth";
import { Vendor } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";


// Vendor profile
export default function VendorProfile() {
  const navigate = useNavigate();
  const id = Auth.getProfile().data._id
  const [loadUser, { loading, data, error }] = useLazyQuery(Vendor, {
    variables: { vendorId: id }
  })
  // Check if user is logged in
  if (!Auth.loggedIn()) {
    // If not logged in, navigate to '/'
    navigate("/");
    return null; // Render nothing
  }
  // Logout button handler
  const handleLogout = () => {
    navigate("/")
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
  if (!data || !data.vendor) {
    return <p>No vendor data found</p>
  }
  const vendor = data.vendor
  console.log(vendor.sales)
  return (
    <Container maxWidth="xl">
      <Typography variant="h6" textAlign="center">
        Welcome, {vendor.vendorName}
      </Typography>
      <>
        email: {vendor.email}
        <br />
        inventory: {vendor.inventory &&
          vendor.inventory.map((inventoryItem) => (
            <div key={inventoryItem.id}>
              <p>Name: {inventoryItem.name}</p>
              <p>Stock: {inventoryItem.inventory}</p>
            </div>
          ))
        }
        <br />
        sales: {vendor.sales &&
          vendor.sales.map((soldItem) => (
            <div key={soldItem.id}>
              <p>name: {soldItem.item.name}</p>
              <p>sold: {soldItem.sold}</p>
            </div>
          ))
        }
      </>
      <br />
      {/* LOGOUT */}
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
}

