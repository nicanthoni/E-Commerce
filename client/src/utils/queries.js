import { gql } from '@apollo/client';


// Vendor - by id, returns all data associated with vendor
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

// Buyer - by user id, returns all data assocoiated with buyer
export const User = gql`
  query UserQuery($userId: ID!) {
    user(id: $userId) {
      firstName
      lastName
      email
      # createdAt
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
          _id
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

// Wishlist - by user id, returns array of product ids in wishlist
export const Wishlist = gql`
  query UserWishlist($id: ID!) {
    usersWishlist(id: $id)
  }
`;

// Wishlist - by item and user id, checks if item is in wishlist and returns boolean 
export const WishlistedItemCheck = gql`
  query ItemInWishlist($userId: ID!, $itemId: ID!) {
    itemInWishlist(userId: $userId, itemId: $itemId)
  }
`;

// Cart - by user id, returns array of product IDs in users cart
export const Cart = gql`
  query UserCart($id: ID!) {
    usersCart(id: $id)
  }
`;

// Product(s) - by category
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

// Product - by id
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
      _id
      stars
      review
    }
  }
}
`