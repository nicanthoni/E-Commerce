import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from "@mui/material";
import { Typography, List, ListItem } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { User } from "../../../utils/queries";
import Auth from "../../../utils/auth";;
import CartImageList from "./CartImageList";
import OrdersImageList from "./OrdersImageList";
import ReviewsList from "./ReviewsList";

export default function ProfileAccordion() {
  const id = Auth.getProfile().data._id;
  const [loadUser, { loading, data, error }] = useLazyQuery(User, {
    variables: { userId: id },
  });

  // Run loadUser 1x when component renders - re-run loadUser if it changes
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

  // Grab data
  const user = data.user;

  return (
    <Box>
      {/* WISHLIST - Once items have image data, the accordion will be a horizontal scroll of imgs*/}
      {/* Render with accordion OPENED if there are wishlist items */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          ListItem
        >
          <Typography>Wishlist</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {user.wishlist.length > 0 ? (
            <Typography>
              {user.wishlist.map((item) => (
                <Box key={item.id}>
                  <List>
                    {/* Linked, horizonally scrolling, clickable IMG for each item once IMG data avail */}
                    <ListItem>Item: {item.item.name}</ListItem>
                    <ListItem>Price: {item.item.price}</ListItem>
                    <ListItem>Vendor: {item.item.vendor.vendorName}</ListItem>
                  </List>
                </Box>
              ))}
            </Typography>
          ) : (
            <Typography variant="caption">
              There are 0 items in your wishlist.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* CART */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          ListItem
        >
          <Typography>Cart</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {user.cart.length > 0 ? (
            <Typography variant="caption">
              {/* IMGs + total price  */}
              <CartImageList />
            </Typography>
          ) : (
            <Typography variant="caption">
              There are 0 items in your cart.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/*   ORDER HISTORY  */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          ListItem
        >
          <Typography>Order History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {user.buyHistory.length > 0 ? (
            <Typography variant="caption">
              {/* Linked, horizonally scrolling, clickable IMG for each item once IMG data avail */}
              <OrdersImageList />
            </Typography>
          ) : (
            <Typography variant="caption">
              There have been 0 orders placed from this account.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>


      {/*   REVIEW HISTORY  */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
          ListItem
        >
          <Typography>Reviews</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {user.ratings.length > 0 ? (
            <Typography variant="caption">
              {/* Linked, horizonally scrolling, clickable IMG for each item once IMG data avail */}
              <ReviewsList />
            </Typography>
          ) : (
            <Typography variant="caption">
              There have been 0 reviews left from this account.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* ACCOUNT DETAILS */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Account Details</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="caption">
            <List>
              <ListItem>Account Type:</ListItem>
              <ListItem>
                Name: {user.firstName} {user.lastName}
              </ListItem>
              <ListItem>Email Address: {user.email}</ListItem>
              {/* <ListItem>Created on: TBD </ListItem> */}
            </List>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
