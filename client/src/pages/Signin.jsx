// This page will conditionally render either the Vendor or Buyer signup form
import React from "react"
import { Typography } from "@mui/material"
import { useParams } from "react-router-dom"
import BuyerSignin from "../components/Signin/BuyerSignin"
import VendorSignin from "../components/Signin/VendorSignin"

export default function Signin() {
    const { userType } = useParams();
  return (
    userType === "buyer" ? (
      <BuyerSignin />
      ) : (
        <VendorSignin/>
      )
  );
}
