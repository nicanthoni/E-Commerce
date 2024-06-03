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
          vendor {
            vendorName
          }
        }
        quantity
      }
      wishlist {
        item {
          img
          description
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
          img
          description
        }
        review
        stars
        createdAt
      }
    }
  }
`;

////////////////////////////////////////


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

////////////////////////////////////////


// Products (filter by cat | cat !NOT required)
export const Products = gql`
query productsQuery($category: Int) {
  products(category: $category) {
    name
    price
    description
    category
    vendor {
      vendorName
    }
    inventory
    img
    ratings {
      stars
      review
    }
    inCart
  }
}
`;
