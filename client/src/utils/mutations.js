import { gql } from '@apollo/client'


// BUYER 
export const buyer_Signup = gql`
  mutation buyerSignup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    AddUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`
export const buyer_login = gql`
mutation buyerLogin($email: String!, $password: String!) {
  Userlogin(email: $email, password: $password) {
    token
    user {
      _id
      email
    }
  }
}
`

// VENDOR
export const vendor_Signup = gql`
  mutation vendorSignup($vendorName: String!, $email: String!, $password: String!) {
    AddVendor(vendorName: $vendorName, email: $email, password: $password) {
      token
      vendor {
        _id
        email
      }
    }
  }
`
export const vendor_Login = gql`
mutation vendorLogin($email: String!, $password: String!) {
  Vendorlogin(email: $email, password: $password) {
    token
    vendor {
      _id
    }
  }
}
`