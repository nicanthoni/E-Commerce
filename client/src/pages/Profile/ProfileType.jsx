import BuyerProfile from './Buyer/BuyerAccount';
import VendorProfile from './Vendor/VendorAccount';
import { useAuthContext } from '../../hooks/useAuthContext';
import Auth from '../../utils/auth';
import ErrorPage from '../ErrorPage';

export default function Profile() {
const {user} = useAuthContext()

  if (!user) {
    return <ErrorPage/>;
  }
  const userType = Auth.getProfile().data.userType;
  return userType === 'buyer' ? <BuyerProfile /> : <VendorProfile />;
}
