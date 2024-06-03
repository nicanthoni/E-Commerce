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

// PRODUCTS

// Products (filter by cat | cat !NOT required)
export const Products = gql`
query ProductsQuery($category: String) {
  filterItems(category: $category) {
    _id
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

export const IndividualProduct = gql`
query SingleProductQuery($id: ID!) {
  item(id: $id) {
    name
    price
    description
    category
    vendor {
      vendorName
    }
    img
    ratings {
      stars
    }
  }
}
`
