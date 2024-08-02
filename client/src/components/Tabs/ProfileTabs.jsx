import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useState } from 'react';
import {
  AccountDetails,
  Wishlist,
  OrdersandReviews,
} from '../../pages/Profile/Buyer/Profile/Profile Tabs/Tabs';

export default function ProfileTabs(props) {
  const [tabValue, setTabValue] = useState(1);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderTabContent = () => {
    switch (tabValue) {
      case 1:
        return (
          <Wishlist
            userData={props.userData}
            handleWishlist={props.handleWishlist}
            handleCart={props.handleCart}
            userId={props.userId}
          />
        );
      case 2:
        return (
          <OrdersandReviews userData={props.userData} userId={props.userId} />
        );
      case 3:
        return (
          <AccountDetails
            onClick={props.onClick}
            name={props.name}
            email={props.email}
            accountType={props.accountType}
            memberSince={props.memberSince}
            userId={props.userId}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box display='flex' justifyContent='center'>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          textColor='secondary'
          indicatorColor='secondary'
        >
          <Tab
            value={1}
            label='My Wishlist'
            sx={{
              textTransform: 'none',
              color: tabValue === 1 ? 'secondary.main' : 'text.primary',
            }}
          />
          <Tab
            value={2}
            label='Orders & Reviews'
            sx={{
              textTransform: 'none',
              color: tabValue === 2 ? 'secondary.main' : 'text.primary',
            }}
          />
          <Tab
            value={3}
            label='Account Details'
            sx={{
              textTransform: 'none',
              color: tabValue === 3 ? 'secondary.main' : 'text.primary',
            }}
          />
        </Tabs>
      </Box>
      <Box mt={2}>{renderTabContent()}</Box>
    </Box>
  );
}
