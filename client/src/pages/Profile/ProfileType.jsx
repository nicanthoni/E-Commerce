import BuyerProfile from './Buyer/BuyerAccount';
import VendorProfile from './Vendor/VendorAccount';
import { useAuthContext } from '../../hooks/useAuthContext';
import Auth from '../../utils/auth';
import { Typography } from '@mui/material';

export default function Profile() {
const {user} = useAuthContext()

  if (!user) {
    return <Typography>Oops</Typography>;
  }
  const userType = Auth.getProfile().data.userType;
  return userType === 'buyer' ? <BuyerProfile /> : <VendorProfile />;
}
