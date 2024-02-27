const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");

// Schema to create User model
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  favoritedItem: [
    {
      type: Schema.Types.ObjectId,
      ref: "Item",
    },
  ],
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cart",
    },
  ],
});

// Encrypt password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema)

model.exports = User