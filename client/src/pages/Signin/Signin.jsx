// This page will conditionally render either the Vendor or Buyer signin form
import { useParams } from 'react-router-dom';
import BuyerSignin from './Buyer/BuyerSignin';
import VendorSignin from './Vendor/VendorSignin';

export default function Signin() {
  const { userType } = useParams();

  return userType === 'buyer' ? <BuyerSignin /> : <VendorSignin />;
}
