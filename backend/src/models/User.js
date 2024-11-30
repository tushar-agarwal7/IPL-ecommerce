const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  team: { type: String, default: 'Neutral' },
  cart: { type: Array, default: [] },
},
{
    timestamps: true 
  }
);


const User = mongoose.model('User', UserSchema);
module.exports = User;
