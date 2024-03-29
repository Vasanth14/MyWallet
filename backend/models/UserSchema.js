const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  dob : {
    type: Date,
    required: true,
  },
  profilePic  : {
    type: String,
    required: false,
  },
  password: {
    type: String,
    minLength: 5,
  },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
