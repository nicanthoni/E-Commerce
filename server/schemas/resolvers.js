const { User, Vendor, Item } = require('../models')
const { signToken, AuthenticationError, LoginInError } = require('../utils/auth')

const resolvers = {
  Query: {
    test: async () => {
      return 'test'
    },
    user: async (parent, { id }) => {
      console.log('User ID:', id)
      const user = await User.findById(id)
      console.log('User Data:', user)
      return user
    },
    vendor: async (parent, { id }) => {
      console.log('VendorID:', id)
      const vendor = await Vendor.findById(id)
      console.log('Vendor Data:', vendor)
      return vendor
    },
    item: async (parent, { id }) => {
      const item = await Item.findById(id)
      console.log('Item: ', item)
      return item
    },
    findItems: async (parent, { search }) => {
      try {
        return await Item.find({ name: { $regex: search, $options: 'i' } })
      } catch (e) {
        throw new Error(e)
      }
    }
  },
  Mutation: {
    AddUser: async (parent, { username, email, password }) => {
      try {
        const user = await User.create({ username, email, password })
        if (!user) {
          throw new Error('ERROR')
        }
        const token = signToken(user)
        user.isOnline = true
        await user.save()
        return { token, user }
      } catch (e) {
        throw new Error(e)
      }
    },
    DeleteUser: async (parent, { userId }) => {
      try {
        const user = await User.findById(userId)
        await user.deleteOne()
        return 'User was deleted'
      } catch (e) {
        throw new Error(e)
      }
    },
    Userlogin: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email })
        if (!user) {
          throw AuthenticationError
        }
        const checkPassword = await user.isCorrectPassword(password)
        if (!checkPassword) {
          throw AuthenticationError
        }
        if (user.isOnline = true) {
          throw LoginInError
        }
        const token = signToken(user)
        user.isOnline = true
        await user.save()
        return { token, user }
      } catch (e) {
        throw new Error(e)
      }
    },
    AddVendor: async (parent, { username, email, password }) => {
      try {
        const vendor = await Vendor.create({ username, email, password })
        if (!vendor) {
          throw new Error('ERROR')
        }
        const token = signToken(vendor)
        vendor.isOnline = true
        await vendor.save()
        return { token, vendor }
      } catch (e) {
        throw new Error(e)
      }
    },
    DeleteVendor: async (parent, { vendorId }) => {
      try {
        const vendor = await Vendor.findById(vendorId)
        if (!vendor) {
          throw AuthenticationError
        }

        await Item.deleteMany({ _id: { $in: vendor.inventory } })
        await vendor.deleteOne()
        return 'Vendor was deleted'
      } catch (e) {
        throw new Error(e)
      }
    },
    Vendorlogin: async (parent, { email, password }) => {
      try {
        const vendor = await Vendor.findOne({ email })
        if (!vendor) {
          throw AuthenticationError
        }
        const checkPassword = await vendor.isCorrectPassword(password)
        if (!checkPassword) {
          throw AuthenticationError
        }
        if (vendor.isOnline = true) {
          throw LoginInError
        }
        const token = signToken(vendor)
        vendor.isOnline = true
        await vendor.save()
        return { token, vendor }
      } catch (e) {
        throw new Error(e)
      }
    },
    CreateItem: async (parent, { name, price, category, vendor, inventory, img }) => {
      try {
        const selectedVendor = await Vendor.findById(vendor)
        if (!selectedVendor) {
          throw AuthenticationError
        }
        const item = await Item.create({
          name,
          price,
          category,
          vendor,
          inventory,
          img
        })
        if (!item) {
          throw new Error('Item could not be created')
        }
        selectedVendor.inventory.push(item._id)
        await selectedVendor.save()
        return item
      } catch (e) {
        throw new Error(e)
      }
    },
    DeleteItem: async (parent, { itemId, vendorId }) => {
      try {
        const item = await Item.findById(itemId)
        const vendor = await Vendor.findById(vendorId)
        if (!item || !vendor) {
          throw new Error('Item or Vendor not found')
        }
        await User.updateMany({ 'cart': item }, { $pull: { 'cart': item } })
        await User.updateMany({ 'wishlist': item }, { $pull: { 'wishlist': item } })
        await item.deleteOne()
        return `${item.name} from ${vendor.username} was deleted`
      } catch (e) {
        throw new Error(e)
      }
    },
    AddToCart: async (parent, { itemId, userId }) => {
      try {
        const item = await Item.findById(itemId)
        const user = await User.findById(userId)
        if (!item || !user) {
          throw new Error('Item or User not found')
        }
        user.cart.push(item._id)
        await user.save()
        return `${item.name} added to ${user.username}'s cart`
      } catch (e) {
        throw new Error(e)
      }
    },
    DeleteFromCart: async (parent, { itemId, userId }) => {
      try {
        const item = await Item.findById(itemId)
        const user = await User.findById(userId)
        if (!item || !user) {
          throw new Error('Item or User not found')
        }
        user.cart = user.cart.filter(cartItems => cartItems.toString() !== itemId)
        await user.save()
        return `${item.name} deleted from ${user.username}'s cart`
      } catch (e) {
        throw new Error(e)
      }
    },
    AddToWishlist: async (parent, { itemId, userId }) => {
      try {
        const item = await Item.findById(itemId)
        const user = await User.findById(userId)
        if (!item || !user) {
          throw new Error('Item or User not found')
        }
        user.wishlist.push(item._id)
        await user.save()
        return `${item.name} added to ${user.username}'s wishlist`
      } catch (e) {
        throw new Error(e)
      }
    },
    DeleteFromWishlist: async (parent, { itemId, userId }) => {
      try {
        const item = await Item.findById(itemId)
        const user = await User.findById(userId)
        if (!item || !user) {
          throw new Error('Item or User not found')
        }
        user.wishlist = user.wishlist.filter(wishlistItems => wishlistItems.toString() !== itemId)
        await user.save()
        return `${item.name} deleted from ${user.username}'s wishlist`
      } catch (e) {
        throw new Error(e)
      }
    },
    AddFromWishlistToCart: async (parent, { itemId, userId }) => {
      try {
        const item = await Item.findById(itemId)
        const user = await User.findById(userId)
        if (!item || !user) {
          throw new Error('Item or User not found')
        }
        user.cart.push(item._id)
        user.wishlist = user.wishlist.filter(wishlistItems => wishlistItems.toString() !== itemId)
        await user.save()
        return `${item.name} was moved from ${user.username}'s wishlist and added to their cart`
      } catch (e) {
        throw new Error(e)
      }
    }
  }
}
module.exports = resolvers
