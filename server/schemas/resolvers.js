const { User, Vendor, Item, Rating } = require('../models');
const {
  signToken,
  AuthenticationError,
  LoginInError,
} = require('../utils/auth');

const resolvers = {
  Query: {
    test: async () => {
      return 'test';
    },
    user: async (parent, { id }, context) => {
      console.log('User ID:', id);
      const user = await User.findById(id)
        .populate({
          path: 'cart.item',
          populate: { path: 'vendor' },
        })
        .populate({
          path: 'wishlist.item',
          populate: { path: 'vendor' },
        })
        .populate({
          path: 'buyHistory.item',
          populate: { path: 'vendor' },
        })
        .populate({
          path: 'ratings',
          populate: { path: 'item' },
        });
      return user;
    },
    vendor: async (parent, { id }) => {
      console.log('VendorID:', id);
      const vendor = await Vendor.findById(id)
        .populate('inventory')
        .populate('sales.item');
      console.log('Vendor Data:', vendor);
      return vendor;
    },
    item: async (parent, { id }) => {
      const item = await Item.findById(id)
        .populate('vendor') // Populate the vendor field
        .populate({
          path: 'ratings',
          populate: { path: 'user' } // Populate the user field inside ratings
        });
      console.log('Item: ', item);
      return item;
    },

    findItems: async (parent, { search }) => {
      try {
        return await Item.find({ name: { $regex: search, $options: 'i' } });
      } catch (e) {
        throw new Error(e);
      }
    },
    filterItems: async (parent, { category }) => {
      try {
        if (category && category !== 'All Products') {
          // If a category FILTER is selected, fetch by category
          console.log(`Fetching products from: ${category}`);
          const filteredProducts = await Item.find({ category });
          return filteredProducts;
        } else if (category == 'All Products') {
          // If all products is chosen, show all Items data
          const allProducts = await Item.find({});
          return allProducts;
        } else {
          // If NO selection made, fetch all items from db
          console.log('Fetching ALL products from db');
          const allProducts = await Item.find({});
          return allProducts;
        }
      } catch (e) {
        throw new Error(e);
      }
    },
    usersWishlist: async (parent, { id }) => {
      try {
        console.log(`Checking for products in ${id}'s wishlist`);
        // Find the user and populate the wishlist items
        const user = await User.findById(id).populate('wishlist.item');
        // Extract the wishlisted item IDs
        const wishlistedItemIds = user.wishlist.map((wish) =>
          wish.item._id.toString()
        );
        return wishlistedItemIds;
      } catch (error) {
        console.error('Error checking users wishlist:', error);
        throw new Error('Error checking wishlisted items');
      }
    },
    itemInWishlist: async (_, { userId, itemId }) => {
      try {
        console.log(
          `Checking if item ${itemId} exists in ${userId}'s wishlist`
        );

        // Find the user by userId and populate the wishlist field
        const user = await User.findById(userId).populate('wishlist.item');

        // Check if the item with the given itemId exists in the user's wishlist
        const itemInWishlist = user.wishlist.some(
          (wishlistItem) => wishlistItem.item._id.toString() === itemId
        );

        return itemInWishlist;
      } catch (error) {
        console.error('Error checking wishlist:', error);
        throw new Error('Error checking wishlist');
      }
    },
    usersCart: async (parent, { id }) => {
      try {
        console.log(`Checking for products in ${id}'s cart`);
        // Find the user and populate their items in cart
        const user = await User.findById(id).populate('cart.item');
        // Extract the cart item's IDs
        const cartItemIds = user.cart.map((cartitem) =>
          cartitem.item._id.toString()
        );
        return cartItemIds;
      } catch (error) {
        console.error('Error checking users cart:', error);
        throw new Error('Error checking cart items');
      }
    },
  },
  Mutation: {
    AddUser: async (parent, { firstName, lastName, email, password }) => {
      try {
        const user = await User.create({
          firstName,
          lastName,
          email,
          password,
        });
        if (!user) {
          throw new Error('ERROR');
        }
        const token = signToken({
          email: user.email,
          _id: user._id,
          userType: 'buyer',
        });
        user.isOnline = true;
        await user.save();
        return { token, user };
      } catch (e) {
        throw new Error(e);
      }
    },
    DeleteUser: async (parent, { userId }) => {
      try {
        const user = await User.findById(userId);
        await user.deleteOne();
        return `User ${userId} was deleted`;
      } catch (e) {
        throw new Error(e);
      }
    },
    Userlogin: async (parent, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw AuthenticationError;
        }
        const checkPassword = await user.isCorrectPassword(password);
        if (!checkPassword) {
          throw AuthenticationError;
        }
        const token = signToken({
          email: user.email,
          _id: user._id,
          userType: 'buyer',
        });
        user.isOnline = true;
        await user.save();
        return { token, user };
      } catch (e) {
        throw new Error(e);
      }
    },
    AddVendor: async (parent, { vendorName, email, password }) => {
      try {
        const vendor = await Vendor.create({ vendorName, email, password });
        if (!vendor) {
          throw new Error('ERROR');
        }
        const token = signToken({
          email: vendor.email,
          _id: vendor._id,
          userType: 'vendor',
        });
        vendor.isOnline = true;
        await vendor.save();
        return { token, vendor };
      } catch (e) {
        throw new Error(e);
      }
    },
    DeleteVendor: async (parent, { vendorId }) => {
      try {
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
          throw AuthenticationError;
        }

        await Item.deleteMany({ _id: { $in: vendor.inventory } });
        await vendor.deleteOne();
        return 'Vendor was deleted';
      } catch (e) {
        throw new Error(e);
      }
    },
    Vendorlogin: async (parent, { email, password }) => {
      try {
        const vendor = await Vendor.findOne({ email });
        if (!vendor) {
          throw AuthenticationError;
        }
        const checkPassword = await vendor.isCorrectPassword(password);
        if (!checkPassword) {
          throw AuthenticationError;
        }
        const token = signToken({
          email: vendor.email,
          _id: vendor._id,
          userType: 'vendor',
        });
        vendor.isOnline = true;
        await vendor.save();
        return { token, vendor };
      } catch (e) {
        throw new Error(e);
      }
    },
    CreateItem: async (
      parent,
      { name, price, category, vendor, inventory, img }
    ) => {
      try {
        const selectedVendor = await Vendor.findById(vendor);
        if (!selectedVendor) {
          throw AuthenticationError;
        }
        const item = await Item.create({
          name,
          price,
          category,
          vendor,
          inventory,
          img,
        });
        if (!item) {
          throw new Error('Item could not be created');
        }
        selectedVendor.inventory.push(item._id);
        await selectedVendor.save();
        return item;
      } catch (e) {
        throw new Error(e);
      }
    },
    DeleteItem: async (parent, { itemId, vendorId }) => {
      try {
        const item = await Item.findById(itemId);
        const vendor = await Vendor.findById(vendorId);
        if (!item || !vendor) {
          throw new Error('Item or Vendor not found');
        }
        await User.updateMany({ cart: item }, { $pull: { cart: item } });
        await User.updateMany(
          { wishlist: item },
          { $pull: { wishlist: item } }
        );
        await item.deleteOne();
        return `${item.name} from ${vendor.username} was deleted`;
      } catch (e) {
        throw new Error(e);
      }
    },
    AddToCart: async (parent, { itemId, userId }) => {
      try {
        const item = await Item.findById(itemId);
        const user = await User.findById(userId);
        if (!item || !user) {
          throw new Error('Item or User not found');
        }
        if (item.inventory < 1) {
          throw new Error('Item not in stock');
        }
        const alreadyInCart = user.cart.findIndex(
          (cartItem) => cartItem.item.toString() === itemId
        );
        if (alreadyInCart !== -1) {
          user.cart[alreadyInCart].quantity += 1;
        } else {
          user.cart.push({ item: item._id, quantity: 1 });
        }
        item.inCart += 1;
        await item.save();
        await user.save();
        return `${item.name} added to ${user.username}'s cart`;
      } catch (e) {
        throw new Error(e);
      }
    },
    DeleteFromCart: async (parent, { itemId, userId }) => {
      try {
        const item = await Item.findById(itemId);
        const user = await User.findById(userId);
        if (!item || !user) {
          throw new Error('Item or User not found');
        }
        user.cart = user.cart.filter(
          (cartItems) => cartItems.item.toString() !== itemId
        );
        item.inCart -= 1;
        await item.save();
        await user.save();
        return `${item.name} deleted from ${user.username}'s cart`;
      } catch (e) {
        throw new Error(e);
      }
    },
    AddToWishlist: async (parent, { itemId, userId }) => {
      try {
        const item = await Item.findById(itemId);
        const user = await User.findById(userId);
        if (!item || !user) {
          throw new Error('Item or User not found');
        }
        const alreadyInWishlist = user.wishlist.findIndex(
          (cartItem) => cartItem.item.toString() === itemId
        );
        if (alreadyInWishlist !== -1) {
          user.wishlist[alreadyInWishlist].quantity += 1;
        } else {
          user.wishlist.push({ item: item._id, quantity: 1 });
        }
        await user.save();
        return `${item.name} added to ${user.username}'s wishlist`;
      } catch (e) {
        throw new Error(e);
      }
    },
    DeleteFromWishlist: async (parent, { itemId, userId }) => {
      try {
        const item = await Item.findById(itemId);
        const user = await User.findById(userId);
        if (!item || !user) {
          throw new Error('Item or User not found');
        }
        user.wishlist = user.wishlist.filter(
          (wishlistItems) => wishlistItems.item.toString() !== itemId
        );
        await user.save();
        return `${item.name} deleted from ${user.username}'s wishlist`;
      } catch (e) {
        throw new Error(e);
      }
    },
    AddFromWishlistToCart: async (parent, { itemId, userId }) => {
      try {
        const item = await Item.findById(itemId);
        const user = await User.findById(userId);
        if (!item || !user) {
          throw new Error('Item or User not found');
        }
        if (item.inventory < 1) {
          throw new Error('Item not in stock');
        }
        user.cart.push({ item: item._id, quanity: 1 });
        user.wishlist = user.wishlist.filter(
          (wishlistItems) => wishlistItems.toString() !== itemId
        );
        item.inCart += 1;
        await item.save();
        await user.save();
        return `${item.name} was moved from ${user.username}'s wishlist and added to their cart`;
      } catch (e) {
        throw new Error(e);
      }
    },
    AddRating: async (parent, { itemId, userId, stars, review }) => {
      try {
        const item = await Item.findById(itemId);
        const user = await User.findById(userId);
        if (!item || !user) {
          throw new Error('Item or User not found');
        }
        const rating = await Rating.create({
          user: userId,
          item: itemId,
          stars,
          review,
        });
        item.ratings.push(rating._id);
        user.ratings.push(rating._id);
        return `${user.username} left a review on ${item.name}`;
      } catch (e) {
        throw new Error(e);
      }
    },
    // checkout: async (parent, { userId }) => {
    //   try {
    //     const user = await User.findById(userId).populate('cart.item')
    //     if (!user) {
    //       throw new Error('User not found')
    //     }
    //     const cart = user.cart
    //   } catch (e) {
    //     throw new Error(e)
    //   }
    // }
  },
};
module.exports = resolvers;
