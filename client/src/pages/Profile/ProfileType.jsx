import BuyerProfile from './Buyer/Profile/BuyerProfile';
import VendorProfile from './Vendor/Profile/VendorProfile';
import { useAuthContext } from '../../hooks/useAuthContext';
import Auth from '../../utils/auth';

export default function Profile() {
const {user} = useAuthContext()

  if (!user) {
    return null;
  }
  const userType = Auth.getProfile().data.userType;
  return userType === 'buyer' ? <BuyerProfile /> : <VendorProfile />;
}
