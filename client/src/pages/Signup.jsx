// This page will conditionally render either the Vendor or Buyer signup form
import { useParams } from "react-router-dom";
import BuyerSignup from "../components/Signup/BuyerSignup";
import VendorSignup from "../components/Signup/VendorSignup";


export default function Signup() {
  
  const { userType } = useParams();

  return (
    userType === "buyer" ? (
      <BuyerSignup />
      ) : (
        <VendorSignup/>
      )
  );
}
