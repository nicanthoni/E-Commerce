import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import { Typography, List, ListItem, Link } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { User } from '../../../../../utils/queries';
import Auth from '../../../../../utils/auth';
import CartImgList from './CartImgList';
import WishImglist from './WishlistImgList';
import OrdersImgList from './OrdersImgList';
import ReviewsImgList from './ReviewsImgList';

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
    console.error('GraphQL Error:', error);
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

  // If user is a Buyer ( represented as 'User'), render account type field as 'Shopper' instead
  let accountType = data.user.__typename;
  if (accountType === 'User') {
    accountType = 'Shopper';
  }

  return (
    <Box sx={{ marginBottom: { xs: 8, md: 0 } }}>

      {/* WISHLIST */}
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography>Wishlist</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {user.wishlist.length > 0 ? (
            <Typography variant='caption'>
              <WishImglist />
            </Typography>
          ) : (
            <Typography variant='caption'>
              There are 0 items in your wishlist. Explore items{' '}
              <Link underline='hover' fontWeight='bold' href='/explore'>
                here!
              </Link>
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* CART */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography>Cart</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {user.cart.length > 0 ? (
            <Typography variant='caption'>
              <CartImgList />
            </Typography>
          ) : (
            <Typography variant='caption'>
              There are 0 items in your cart. Explore items{' '}
              <Link underline='hover' fontWeight='bold' href='/explore'>
                here!
              </Link>
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/*   ORDER HISTORY  */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography>Order History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {user.buyHistory.length > 0 ? (
            <Typography variant='caption'>
              <OrdersImgList />
            </Typography>
          ) : (
            <Typography variant='caption'>
              There have been 0 orders placed from this account. Explore items{' '}
              <Link underline='hover' fontWeight='bold' href='/explore'>
                here!
              </Link>
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/*   REVIEW HISTORY  */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography>Reviews</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {user.ratings.length > 0 ? (
            <Typography variant='caption'>
              <ReviewsImgList />
            </Typography>
          ) : (
            <Typography variant='caption'>
              There have been 0 reviews left from this account.
            </Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* ACCOUNT DETAILS */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography>Account Details</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ backgroundColor: '#F2F2F2' }}>
          <Typography variant='caption'>
            <List>
              <ListItem>Account Type: {accountType}</ListItem>
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
