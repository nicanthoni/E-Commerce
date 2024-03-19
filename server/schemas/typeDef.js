const typeDefs = `
    type User {
        _id: ID
        username: String
        email: String
        isOnline: Boolean
        wishlist: [Item]
        cart: [Item]
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
    type Query {
        test: String
    }
`
module.exports = typeDefs
