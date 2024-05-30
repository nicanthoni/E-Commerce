import { gql } from '@apollo/client';

// Buyer
export const User = gql`
  query UserQuery($userId: ID!) {
    user(id: $userId) {
      firstName
      lastName
      email
      cart {
        item {
          name
          price
          img
          description
          # ratings
          vendor {
            vendorName
          }
        }
        quantity
      }
      wishlist {
        item {
          name
          price
          vendor {
            vendorName
          }
        }
      }
      buyHistory {
        item {
          name
          price
          img
          vendor {
            vendorName
          }
        }
        quantity
      }
      ratings {
        item {
          name
        }
        review
        stars
        createdAt
      }
    }
  }
`;

// Vendor
export const Vendor = gql`
  query VendorQuery($vendorId: ID!) {
    vendor(id: $vendorId) {
      vendorName
      email
      inventory {
        name
        inventory
      }
      sales {
        item {
          name
        }
        sold
      }
    }
  }
`;
