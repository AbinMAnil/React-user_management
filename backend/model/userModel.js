const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userModel = new schema({
  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  blockStatus: {
    type: Boolean,
    default: false,
  },
});

const userSchema = mongoose.model("user", userModel);
module.exports = userSchema;
