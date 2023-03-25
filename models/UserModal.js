const mongoose = require("mongoose");

const user_Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
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
});

const User_modal = mongoose.model("user", user_Schema);

module.exports = { User_modal };
