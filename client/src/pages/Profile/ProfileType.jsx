import BuyerProfile from './Buyer/Profile/BuyerProfile';
import VendorProfile from './Vendor/Profile/VendorProfile';
import { useAuthContext } from '../../hooks/useAuthContext';

export default function Profile() {
  const { user, type } = useAuthContext();

  if (!user) {
    return null;
  }
  return type === 'buyer' ? <BuyerProfile /> : <VendorProfile />;
}
