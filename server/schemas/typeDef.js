const typeDefs = `

    type User {
        _id: ID
        username: String
        firstName: String
        lastName: String
        email: String
        isOnline: Boolean
        wishlist: [CartItem]
        cart: [CartItem]
        buyHistory: [CartItem]
        ratings: [Rating]
        total: Float
    }
    type CartItem {
        item: Item
        quantity: Int
    }
    type SoldItems {
        item: Item
        sold: Int
    }
    type Vendor {
        _id: ID
        username: String
        vendorName: String
        email: String
        isOnline: Boolean
        inventory: [Item]
        sales: [SoldItems]
    }
    type Item {
        _id: ID
        name: String
        price: Float
        description: String
        category: String
        vendor: Vendor
        inventory: Int
        img: String
        inCart: Int
        ratings: [Rating]
        createdAt: String
    }
    type Rating {
        _id: ID
        user: User
        item: Item
        review: String
        stars: Float
        createdAt: String
    }
    type Auth {
        token: ID!
        user: User
        vendor: Vendor
    }
    type Query {
        test: String
        user(id: ID!): User
        vendor(id: ID!): Vendor
        item(id: ID!): Item
        findItems(id: ID!): [Item]
        filterItems(category: String): [Item] 
        usersWishlist(id: ID!): [ID]
        itemInWishlist(userId: ID!, itemId: ID!): Boolean
        usersCart(id: ID!): [ID]
    }
    type Mutation {
        AddUser(firstName: String!, lastName: String!, email: String!, password: String!): Auth
        DeleteUser(userId: ID!): String
        Userlogin(email: String!, password: String!): Auth
        AddVendor(vendorName: String!, email: String!, password: String!): Auth
        DeleteVendor(userId: ID!): String
        Vendorlogin(email: String!, password: String!): Auth
        CreateItem(name: String!, price: Int!, category: String!, vendor: ID!, inventory: Int, img: String): Item
        DeleteItem(itemId: ID!, vendorId: ID!): String
        AddToCart(itemId: ID!, userId: ID!): String
        DeleteFromCart(itemId: ID!, userId: ID!): String
        AddToWishlist(itemId: ID!, userId: ID!): String
        DeleteFromWishlist(itemId: ID!, userId: ID!): String
        AddFromWishlistToCart(itemId: ID!, userId: ID!): String
        AddRating(itemId: ID!, userId: ID!, stars: Float!, review: String): String

    }
`
module.exports = typeDefs
