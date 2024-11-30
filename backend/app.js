const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
const cookieParser = require("cookie-parser");



const app = express();
app.use(bodyParser.json()); 
app.use(
  cors({
      origin: "http://localhost:3000", 
      credentials: true,
  })
);
app.use(cookieParser());



mongoose.connect('mongodb://localhost:27017/authDB')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));


  app.get("/",(req,res)=>{
    res.send("helo")
  })






app.listen(8080, () => {
    console.log('Server running on port 8080');
});