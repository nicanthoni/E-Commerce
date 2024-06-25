const router = require('express').Router();
const multer = require('multer');
const fs = require('fs');
const { Vendor, Item } = require('../models');

const upload = multer({ dest: './uploads/' });

router.post('/', upload.single('file'), async (req, res) => {
  console.log('Handling /uploads POST request...');
  const { vendorId, name, price, description, category, inventory } = req.body;

  if (!vendorId) {
    return res.status(400).json('No vendor Id provided');
  }

  const vendor = await Vendor.findById(vendorId);
  if (!vendor) {
    return res.status(400).json('Vendor not found');
  }

  const file = req.file;

  if (!file) {
    return res.status(400).json('No file found');
  }

  const originalFilename = file.originalname;
  const filenameWithoutSpaces = originalFilename.replace(/\s+/g, '');
  const filename = vendorId + 'test';
  const newFilePath = './uploads/' + filename;
  fs.renameSync(file.path, newFilePath);

  // Create a new item
  const newItem = new Item({
    name,
    price,
    description,
    category,
    vendor: vendorId,
    inventory,
    img: newFilePath,
  });

  await newItem.save();

  // Add item to Vendor's inventory
  vendor.inventory.push(newItem._id);
  await vendor.save();

  res.json({ message: 'Item uploaded successfully', item: newItem });
});

module.exports = router;
