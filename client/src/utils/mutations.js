import { gql } from '@apollo/client'


// BUYER 
export const buyer_Signup = gql`
  mutation buyerSignup($firstName: String!, $lastName: String!, $email: String!, $password: String!) {
    AddUser(firstName: $firstName, lastName: $lastName, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`

// VENDOR
