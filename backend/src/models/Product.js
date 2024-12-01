const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true 
  },
  team: { 
    type: String, 
    required: true 
  },
  price: { 
    type: Number, 
    required: true 
  },
  image: { 
    type: String, 
    default: '/jersey.jpg' 
  },
  description: { 
    type: String, 
    required: true 
  },
  category: {
    type: String,
    enum: ['Jerseys', 'Accessories', 'Collectibles', 'Fan Gear'],
    default: 'Accessories'
  },
  rating: {
    type: Number,
    default: 4.5,
    min: 0,
    max: 5
  }
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);