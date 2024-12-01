const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const rootRouter = require("./src/router/index");
const User = require('./src/models/User');

require('dotenv').config();

const products = [
  {
        name: "Gujarat Titans Official Jersey 2024",
        team: "GT",
        price: 2999,
        image: "/jersey.jpg",
        description: "Official Gujarat Titans jersey made with breathable fabric for comfort.",
        category: "Jerseys",
        rating: 4.6
      },
      {
        name: "Gujarat Titans Cap",
        team: "GT",
        price: 799,
        image: "/jersey.jpg",
        description: "Stylish Gujarat Titans cap with team logo.",
        category: "Accessories",
        rating: 4.5
      },
      {
        name: "Gujarat Titans T-shirt",
        team: "GT",
        price: 999,
        image: "/jersey.jpg",
        description: "Comfortable cotton T-shirt with Gujarat Titans team logo.",
        category: "Fan Gear",
        rating: 4.4
      },
      {
        name: "Gujarat Titans Backpack",
        team: "GT",
        price: 1499,
        image: "/jersey.jpg",
        description: "Durable backpack with Gujarat Titans logo and spacious compartments.",
        category: "Fan Gear",
        rating: 4.6
      },
      {
        name: "Gujarat Titans Mug",
        team: "GT",
        price: 399,
        image: "/jersey.jpg",
        description: "Ceramic mug with the Gujarat Titans team logo.",
        category: "Accessories",
        rating: 4.3
      },
      {
        name: "Gujarat Titans Phone Case",
        team: "GT",
        price: 499,
        image: "/jersey.jpg",
        description: "Protective phone case with Gujarat Titans logo.",
        category: "Accessories",
        rating: 4.5
      },
    
      // Lucknow Super Giants products
      {
        name: "Lucknow Super Giants Official Jersey 2024",
        team: "LSG",
        price: 2999,
        image: "/jersey.jpg",
        description: "Official Lucknow Super Giants jersey designed for comfort and style.",
        category: "Jerseys",
        rating: 4.7
      },
      {
        name: "Lucknow Super Giants Cap",
        team: "LSG",
        price: 799,
        image: "/jersey.jpg",
        description: "Stylish Lucknow Super Giants cap with embroidered team logo.",
        category: "Accessories",
        rating: 4.5
      },
      {
        name: "Lucknow Super Giants T-shirt",
        team: "LSG",
        price: 999,
        image: "/jersey.jpg",
        description: "Comfortable cotton T-shirt featuring Lucknow Super Giants logo.",
        category: "Fan Gear",
        rating: 4.4
      },
      {
        name: "Lucknow Super Giants Mug",
        team: "LSG",
        price: 399,
        image: "/jersey.jpg",
        description: "Ceramic mug with the Lucknow Super Giants logo.",
        category: "Accessories",
        rating: 4.6
      },
      {
        name: "Lucknow Super Giants Hoodie",
        team: "LSG",
        price: 2499,
        image: "/jersey.jpg",
        description: "Soft hoodie with the Lucknow Super Giants logo, perfect for cooler weather.",
        category: "Fan Gear",
        rating: 4.7
      },
      {
        name: "Lucknow Super Giants Phone Case",
        team: "LSG",
        price: 499,
        image: "/jersey.jpg",
        description: "Durable phone case featuring Lucknow Super Giants logo.",
        category: "Accessories",
        rating: 4.5
      },
  {
    name: "RCB Official Jersey 2024",
    team: "RCB",
    price: 2999,
    image: "/jersey.jpg",
    description: "Authentic Royal Challengers Bangalore jersey, made with premium breathable fabric.",
    category: "Jerseys",
    rating: 4.5
  },
  {
    name: "Mumbai Indians Cap",
    team: "MI",
    price: 799,
    image: "/jersey.jpg",
    description: "Official Mumbai Indians baseball cap with embroidered team logo.",
    category: "Accessories",
    rating: 4.7
  },
  {
    name: "CSK Commemorative Bat",
    team: "CSK",
    price: 6999,
    image: "/jersey.jpg",
    description: "Limited edition bat signed by Chennai Super Kings players.",
    category: "Collectibles",
    rating: 4.9
  },
  {
    name: "Delhi Capitals Jersey 2024",
    team: "DC",
    price: 2999,
    image: "/jersey.jpg",
    description: "Official Delhi Capitals jersey with moisture-wicking fabric for ultimate comfort.",
    category: "Jerseys",
    rating: 4.4
  },
  {
    name: "Kolkata Knight Riders Mug",
    team: "KKR",
    price: 399,
    image: "/jersey.jpg",
    description: "Ceramic mug featuring the iconic Kolkata Knight Riders logo.",
    category: "Accessories",
    rating: 4.3
  },
  {
    name: "Rajasthan Royals Backpack",
    team: "RR",
    price: 1299,
    image: "/jersey.jpg",
    description: "Stylish and durable backpack with the Rajasthan Royals logo and spacious compartments.",
    category: "Fan Gear",
    rating: 4.5
  },
  {
    name: "Sunrisers Hyderabad Cap",
    team: "SRH",
    price: 799,
    image: "/jersey.jpg",
    description: "Official Sunrisers Hyderabad baseball cap, perfect for any fan.",
    category: "Accessories",
    rating: 4.6
  },
  {
    name: "Punjab Kings Commemorative Bat",
    team: "PBKS",
    price: 5999,
    image: "/jersey.jpg",
    description: "Limited edition bat signed by Punjab Kings players, a must-have for collectors.",
    category: "Collectibles",
    rating: 4.8
  },
  // Continue with other teams
  {
    name: "Chennai Super Kings Hooded Sweatshirt",
    team: "CSK",
    price: 1999,
    image: "/jersey.jpg",
    description: "Cozy hooded sweatshirt with Chennai Super Kings logo, great for colder months.",
    category: "Fan Gear",
    rating: 4.6
  },
  {
    name: "Mumbai Indians Cricket Bat",
    team: "MI",
    price: 4999,
    image: "/jersey.jpg",
    description: "Official Mumbai Indians cricket bat with a sleek design and premium material.",
    category: "Accessories",
    rating: 4.7
  },
  {
    name: "Royal Challengers Bangalore T-shirt",
    team: "RCB",
    price: 899,
    image: "/jersey.jpg",
    description: "Comfortable cotton T-shirt featuring Royal Challengers Bangalore logo.",
    category: "Fan Gear",
    rating: 4.4
  },
  {
    name: "RCB Official Jersey 2024",
    team: "RCB",
    price: 2999,
    image: "/jersey.jpg",
    description: "Authentic Royal Challengers Bangalore jersey, made with premium breathable fabric.",
    category: "Jerseys",
    rating: 4.5
  },
  {
    name: "Mumbai Indians Cap",
    team: "MI",
    price: 799,
    image: "/jersey.jpg",
    description: "Official Mumbai Indians baseball cap with embroidered team logo.",
    category: "Accessories",
    rating: 4.7
  },
  {
    name: "CSK Commemorative Bat",
    team: "CSK",
    price: 6999,
    image: "/jersey.jpg",
    description: "Limited edition bat signed by Chennai Super Kings players.",
    category: "Collectibles",
    rating: 4.9
  },
  {
    name: "Delhi Capitals Jersey 2024",
    team: "DC",
    price: 2999,
    image: "/jersey.jpg",
    description: "Official Delhi Capitals jersey with moisture-wicking fabric for ultimate comfort.",
    category: "Jerseys",
    rating: 4.4
  },
  {
    name: "Kolkata Knight Riders Mug",
    team: "KKR",
    price: 399,
    image: "/jersey.jpg",
    description: "Ceramic mug featuring the iconic Kolkata Knight Riders logo.",
    category: "Accessories",
    rating: 4.3
  },
  {
    name: "Rajasthan Royals Backpack",
    team: "RR",
    price: 1299,
    image: "/jersey.jpg",
    description: "Stylish and durable backpack with the Rajasthan Royals logo and spacious compartments.",
    category: "Fan Gear",
    rating: 4.5
  },
  {
    name: "Sunrisers Hyderabad Cap",
    team: "SRH",
    price: 799,
    image: "/jersey.jpg",
    description: "Official Sunrisers Hyderabad baseball cap, perfect for any fan.",
    category: "Accessories",
    rating: 4.6
  },
  {
    name: "Punjab Kings Commemorative Bat",
    team: "PBKS",
    price: 5999,
    image: "/jersey.jpg",
    description: "Limited edition bat signed by Punjab Kings players, a must-have for collectors.",
    category: "Collectibles",
    rating: 4.8
  },
  {
    name: "Chennai Super Kings Hooded Sweatshirt",
    team: "CSK",
    price: 1999,
    image: "/jersey.jpg",
    description: "Cozy hooded sweatshirt with Chennai Super Kings logo, great for colder months.",
    category: "Fan Gear",
    rating: 4.6
  },
  {
    name: "Mumbai Indians Cricket Bat",
    team: "MI",
    price: 4999,
    image: "/jersey.jpg",
    description: "Official Mumbai Indians cricket bat with a sleek design and premium material.",
    category: "Accessories",
    rating: 4.7
  },
  {
    name: "Royal Challengers Bangalore T-shirt",
    team: "RCB",
    price: 899,
    image: "/jersey.jpg",
    description: "Comfortable cotton T-shirt featuring Royal Challengers Bangalore logo.",
    category: "Fan Gear",
    rating: 4.4
  },
  {
    name: "Royal Challengers Bangalore Hoodie",
    team: "RCB",
    price: 2499,
    image: "/jersey.jpg",
    description: "Soft fleece hoodie with the RCB logo, perfect for chilly weather.",
    category: "Fan Gear",
    rating: 4.6
  },
  {
    name: "Chennai Super Kings Phone Case",
    team: "CSK",
    price: 499,
    image: "/jersey.jpg",
    description: "Durable phone case with the Chennai Super Kings team logo.",
    category: "Accessories",
    rating: 4.3
  },
  {
    name: "Delhi Capitals Cap",
    team: "DC",
    price: 799,
    image: "/jersey.jpg",
    description: "Official Delhi Capitals cap with an adjustable strap and embroidered logo.",
    category: "Accessories",
    rating: 4.5
  },
  {
    name: "Mumbai Indians Official T-shirt",
    team: "MI",
    price: 1199,
    image: "/jersey.jpg",
    description: "Cotton T-shirt with the official Mumbai Indians logo.",
    category: "Fan Gear",
    rating: 4.4
  },
  {
    name: "Kolkata Knight Riders Scarf",
    team: "KKR",
    price: 699,
    image: "/jersey.jpg",
    description: "Stylish knitted scarf with the Kolkata Knight Riders logo.",
    category: "Fan Gear",
    rating: 4.6
  },
  {
    name: "Rajasthan Royals T-shirt",
    team: "RR",
    price: 999,
    image: "/jersey.jpg",
    description: "Comfortable cotton T-shirt featuring Rajasthan Royals logo.",
    category: "Fan Gear",
    rating: 4.5
  },
  {
    name: "Sunrisers Hyderabad Jersey",
    team: "SRH",
    price: 2799,
    image: "/jersey.jpg",
    description: "Official Sunrisers Hyderabad jersey with a breathable, moisture-wicking design.",
    category: "Jerseys",
    rating: 4.7
  },
  {
    name: "Sunrisers Hyderabad Cap",
    team: "SRH",
    price: 799,
    image: "/jersey.jpg",
    description: "Official Sunrisers Hyderabad baseball cap, perfect for any fan.",
    category: "Accessories",
    rating: 4.6
  },
  {
    name: "Punjab Kings Keychain",
    team: "PBKS",
    price: 299,
    image: "/jersey.jpg",
    description: "Official Punjab Kings keychain with engraved team logo.",
    category: "Accessories",
    rating: 4.4
  },
  {
    name: "Sunrisers Hyderabad Jersey",
    team: "SRH",
    price: 2799,
    image: "/jersey.jpg",
    description: "Official Sunrisers Hyderabad jersey with a breathable, moisture-wicking design.",
    category: "Jerseys",
    rating: 4.7
  },

];




const app = express();
app.use(bodyParser.json()); 
app.use(
  cors({
      origin: "http://localhost:3000", 
      credentials: true,
  })
);
app.use(cookieParser());



mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));


  app.get("/",(req,res)=>{
    res.send("helo")
  })

  app.get('/allUsers', async (req, res) => {
    try {
      const users = await User.find({}, '-password'); 
      res.status(200).json(users); 
    } catch (e) {
      console.error("Error fetching users:", e.message); 
      res.status(500).json({ msg: "Error occurred while fetching users", error: e.message }); 
    }
  });


  app.post("/seed-products", async (req, res) => {
    try {
        const Product = require("./src/models/Product");
        await Product.deleteMany({});
        await Product.insertMany(products);
        res.status(200).json({ msg: "Products seeded successfully!"  });
    } catch (error) {
        console.error("Error seeding products:", error.message);
        res.status(500).json({ msg: "Error occurred while seeding products", error: error.message });
    }
});
  
app.use("/api/v1", rootRouter);



app.listen(8080, () => {
    console.log('Server running on port 8080');
});

