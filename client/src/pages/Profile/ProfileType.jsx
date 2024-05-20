import BuyerProfile from './Buyer/BuyerAccount';
import VendorProfile from './Vendor/VendorAccount';
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
