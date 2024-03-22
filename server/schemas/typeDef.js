const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        isOnline: Boolean
        wishlist: [Item]
        cart: [Item]
        buyHistory: [Item]
        total: Int
    }
    type Vendor {
        _id: ID
        username: String
        email: String
        isOnline: Boolean
        inventory: [Item]
        sales: Int
    }
    type Item {
        _id: ID
        name: String
        price: Int
        category: Int
        vendor: Vendor
        inventory: Int
        img: String
    }
    type Auth {
        token: ID!
        user: User
    }
    type Query {
        test: String
        user(id: ID!): User
        vendor(id: ID!): Vendor
        item(id: ID!): Item
        findItems(id: ID!): [Item]
    }
    type Mutation {
        AddUser(username: String!, email: String!, password: String!): Auth
        DeleteUser(userId: ID!): String
        Userlogin(email: String!, password: String!): Auth
        AddVendor(username: String!, email: String!, password: String!): Auth
        DeleteVendor(userId: ID!): String
        Vendorlogin(email: String!, password: String!): Auth
        CreateItem(name: String!, price: Int!, category: Int!, vendor: ID!, inventory: Int, img: String): Item
        DeleteItem(itemId: ID!, vendorId: ID!): String
        AddToCart(itemId: ID!, userId: ID!): String
        DeleteFromCart(itemId: ID!, userId: ID!): String
        AddToWishlist(itemId: ID!, userId: ID!): String
        DeleteFromWishlist(itemId: ID!, userId: ID!): String
        AddFromWishlistToCart(itemId: ID!, userId: ID!): String
    }
`
module.exports = typeDefs
