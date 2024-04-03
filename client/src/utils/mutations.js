import { gql } from '@apollo/client'

// Update based on buyer sign up form data ‼️

export const signup = gql`
  mutation signin($username: String!, $email: String!, $password: String!) {
    AddUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`