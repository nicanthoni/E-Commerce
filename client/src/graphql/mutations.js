import { gql } from '@apollo/client';

//// BUYER ////
export const buyer_Signup = gql`
  mutation buyerSignup(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    AddUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
        email
      }
    }
  }
`;
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
`;

export const add_wishlist = gql`
  mutation AddWishlist($itemId: ID!, $userId: ID!) {
    AddToWishlist(itemId: $itemId, userId: $userId)
  }
`;

export const delete_wishlist = gql`
  mutation DeleteWishlist($itemId: ID!, $userId: ID!) {
    DeleteFromWishlist(itemId: $itemId, userId: $userId)
  }
`;

export const add_cart = gql`
  mutation AddCart($itemId: ID!, $userId: ID!) {
    AddToCart(itemId: $itemId, userId: $userId)
  }
`;
export const delete_cart = gql`
  mutation DeleteCart($itemId: ID!, $userId: ID!) {
    DeleteFromCart(itemId: $itemId, userId: $userId)
  }
`;

//// VENDOR ////
export const vendor_Signup = gql`
  mutation vendorSignup(
    $vendorName: String!
    $email: String!
    $password: String!
  ) {
    AddVendor(vendorName: $vendorName, email: $email, password: $password) {
      token
      vendor {
        _id
        email
      }
    }
  }
`;
export const vendor_Login = gql`
  mutation vendorLogin($email: String!, $password: String!) {
    Vendorlogin(email: $email, password: $password) {
      token
      vendor {
        _id
      }
    }
  }
`;

export const create_Item = gql`
mutation createItem($name: String!, $description: String!, $price: Int!, $category: String!, $vendorId: ID!, $inventory: Int!, $img: String!) {
  createItem(name: $name, description: $description, price: $price, category: $category, vendorId: $vendorId, inventory: $inventory, img: $img) {
    _id
    name
  }
}
`;

// Buyer & Vendors

export const delete_user = gql`
  mutation DeleteUser($userId: ID!) {
    DeleteUser(userId: $userId)
  }
`;
