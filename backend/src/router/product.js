const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

router.get("/all", async (req, res) => {
    const { team } = req.query;
    
    try {
      let query = {};
      
      if (team) {
        query.team = team;
      }
      
      const products = await Product.find(query);
      
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error.message);
      res.status(500).json({ 
        message: "Error fetching products", 
        error: error.message 
      });
    }
  });


module.exports=router;