const db = require("../config/connection");
const { User, Item, Vendor, Rating } = require("../models");
const userSeeds = require("./userSeeds.json");
const vendorSeeds = require("./vendorSeeds.json");
const cleanDB = require("./cleanDB");


db.once("open", async () => {
  try {
    await cleanDB("User", "users");
    await cleanDB("Item", "items");
    await cleanDB("Vendor", "vendors");
    await cleanDB("Rating", "ratings");
    const users = await User.create(userSeeds);
    const vendors = await Vendor.create(vendorSeeds);
    const item1 = await Item.create({
      name: "Red ball",
      price: 1.99,
      description: "Its just a red ball",
      category: 1,
      vendor: vendors[0],
      img: "../../client/src/assets/images/seededItems/red-ball.png", 
      inventory: 15,
    });
    const item2 = await Item.create({
      name: "Blue ball",
      price: 1.99,
      description: "Its just a blue ball",
      category: 1,
      vendor: vendors[0],
      img: "../../client/src/assets/images/seededItems/blue-ball.png", 
      inventory: 10,
    });
    vendors[0].inventory.push(item1._id);
    vendors[0].inventory.push(item2._id);
    const item3 = await Item.create({
      name: "Otter plush",
      price: 5.99,
      description: "An otter plush, very fluffy",
      category: 2,
      vendor: vendors[1],
      img: '/images/seededItems/otter-plush.png', // public URL so can be server statically 
      inventory: 15,
    });
    const item4 = await Item.create({
      name: "Big otter plush",
      price: 10.99,
      description: "A big otter plsuh, very large",
      category: 2,
      vendor: vendors[1],
      img: '/images/seededItems/bigger-otter-plush.jpg', // public URL so can be server statically 
      inventory: 10,
    });
    vendors[1].inventory.push(item3._id);
    vendors[1].inventory.push(item4._id);
    const item5 = await Item.create({
      name: "Oshawott plush",
      price: 10.99,
      description: "Its just a oshawott plush",
      category: 2,
      vendor: vendors[2],
      img: "../../client/src/assets/images/seededItems/oshawott-plush.png",
      inventory: 15,
    });
    const item6 = await Item.create({
      name: "Big oshawott plush",
      price: 20.99,
      description: "A big oshawott plush",
      category: 2,
      vendor: vendors[2],
      img: "../../client/src/assets/images/seededItems/big-oshawott-plush.jpg",
      inventory: 10,
    });
    vendors[2].inventory.push(item5._id);
    vendors[2].inventory.push(item6._id);
    const item7 = await Item.create({
      name: "Not radioactive material",
      price: 10000,
      description: "Please dont open",
      category: 10,
      vendor: vendors[3],
      img: "../../client/src/assets/images/seededItems/radioactive-material.png",
      inventory: 15,
    });
    const item8 = await Item.create({
      name: "Box of 1000 bees",
      price: 100,
      description: "we counted 1000 bees to get the name right",
      category: 3,
      vendor: vendors[3],
      img: "../../client/src/assets/images/seededItems/box-of-bees.png",
      inventory: 10,
    });
    vendors[3].inventory.push(item7._id);
    vendors[3].inventory.push(item8._id);
    users[0].cart.push({ item: item1._id, quantity: 2 });
    item1.inCart += 2;
    users[0].cart.push({ item: item2._id, quantity: 1 });
    item2.inCart += 1;
    users[1].cart.push({ item: item3._id, quantity: 20 });
    item3.inCart += 20;
    users[1].cart.push({ item: item4._id, quantity: 10 });
    item4.inCart += 10;
    users[2].cart.push({ item: item5._id, quantity: 4 });
    item5.inCart += 4;
    users[2].cart.push({ item: item6._id, quantity: 1 });
    item6.inCart += 1;
    users[3].cart.push({ item: item7._id, quantity: 2 });
    item7.inCart += 2;
    users[3].cart.push({ item: item8._id, quantity: 10 });
    item8.inCart += 10;
    const rating1 = await Rating.create({
      user: users[0]._id,
      item: item3._id,
      stars: 5,
      review: "The best purchase of my life",
    });
    users[0].buyHistory.push({ item: item3._id, quantity: 10 });
    vendors[1].sales.push({ item: item3._id, sold: 10 });
    users[0].ratings.push(rating1._id);
    item3.ratings.push(rating1._id);
    const rating2 = await Rating.create({
      user: users[1]._id,
      item: item8._id,
      stars: 5,
      review: "They werent lying there really are 1000 bees",
    });
    users[1].buyHistory.push({ item: item8._id, quantity: 1 });
    vendors[3].sales.push({ item: item8._id, sold: 1 });
    users[1].ratings.push(rating2._id);
    item8.ratings.push(rating2._id);
    const rating3 = await Rating.create({
      user: users[2]._id,
      item: item7._id,
      stars: 3,
      review:
        "when i try to take pictures of this item, the pictures are all fuzzy",
    });
    users[2].buyHistory.push({ item: item7._id, quantity: 1 });
    vendors[3].sales.push({ item: item7._id, sold: 1 });
    users[2].ratings.push(rating3._id);
    item7.ratings.push(rating3._id);
    const rating4 = await Rating.create({
      user: users[3]._id,
      item: item1._id,
      stars: 0,
    });
    users[3].buyHistory.push({ item: item1._id, quantity: 1 });
    vendors[0].sales.push({ item: item1._id, sold: 1 });
    users[3].ratings.push(rating4._id);
    item1.ratings.push(rating4._id);

    await item1.save();
    await item2.save();
    await item3.save();
    await item4.save();
    await item5.save();
    await item6.save();
    await item7.save();
    await item8.save();
    await Promise.all(vendors.map((vendor) => vendor.save()));
    await Promise.all(users.map((user) => user.save()));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
