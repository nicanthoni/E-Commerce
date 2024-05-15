import BuyerProfile from "./Buyer/BuyerAccount";
import VendorProfile from "./Vendor/VendorAccount";
import Auth from "../../utils/auth";

export default function profile() {
  if (!Auth.loggedIn()) {
    navigate("/");
    return null;
  }
  const userType = Auth.getProfile().data.userType;
  return userType === "buyer" ? <BuyerProfile /> : <VendorProfile />;
}
