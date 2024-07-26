import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
} from '@mui/material';
import { Typography, List, ListItem, Link } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { delete_user } from '../../../../../graphql/mutations';
import { useLogout } from '../../../../../hooks/useLogout';
import { useAuthContext } from '../../../../../hooks/useAuthContext';
import OrdersAndReviewsImgList from './OrdersAndReviewsImgList';
import AuthAlert from '../../../../../components/Alerts/Auth/AuthAlert';
import DeleteAccountButton from '../../../../../components/Buttons/DeleteAccount';
import { formatDate } from '../../../../../utils/formatters/formatDate';

export default function ProfileAccordion({
  refetchUserData,
  loadUser,
  userData,
  userId,
}) {
  const { type } = useAuthContext();

  // states
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  // hooks
  const { logout } = useLogout();

  // Mutation
  const [DeleteUser, { loading, data, error }] = useMutation(delete_user);

  // refetchUserData() when component renders - re-run loadUser if it changes
  useEffect(() => {
    refetchUserData();
  }, [loadUser]);

  // onClick of DeleteAccountButton - Delete account and logout
  const handleDeleteAccount = async () => {
    try {
      await DeleteUser({ variables: { userId } }); // delete user
      setAlertMessage('Account successfuly deleted.');
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        logout();
      }, 2000);
    } catch (e) {
      console.log('User Deletion error: ', e);
    }
  };

  return (
    <Box>
      {/*   Order & Review History */}
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls='panel2-content'
          id='panel2-header'
        >
          <Typography>Orders & Reviews</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {userData.buyHistory.length > 0 ? (
            <Typography variant='caption'>
              <OrdersAndReviewsImgList
                refetchUserData={refetchUserData}
                loadUser={loadUser}
                userData={userData}
              />
            </Typography>
          ) : (
            <Typography variant='caption'>
              There have been 0 orders placed. Explore items{' '}
              <Link underline='hover' fontWeight='bold' href='/explore'>
                here!
              </Link>
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
        <AccordionDetails>
          <Typography variant='caption'>
            <List>
              <ListItem>
                Name: {userData.firstName} {userData.lastName}
              </ListItem>
              <ListItem>Email Address: {userData.email}</ListItem>
              <ListItem>Account Type: {type}</ListItem>
              <ListItem>
                Member since: {formatDate(userData.createdAt)}
              </ListItem>
              <ListItem>
                <DeleteAccountButton onClick={handleDeleteAccount} />
              </ListItem>
            </List>
          </Typography>
        </AccordionDetails>
      </Accordion>

      {/* Alert - visibility controlled by local state */}
      <AuthAlert visible={showAlert} message={alertMessage} />
    </Box>
  );
}
