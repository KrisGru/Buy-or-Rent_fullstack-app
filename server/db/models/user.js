const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true,},
  login: { type: String, required: true,},
  password: { type: String, required: true,},
  typeUser: { type: String, required: true,},
  boughtOrders: { type: Array, required: false,},
  rentedOrders: { type: Array, required: false,}
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
