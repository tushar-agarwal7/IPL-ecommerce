const express = require("express");
const router = express.Router();
const Product = require("../models/Product");


router.get("/all", async (req, res) => {
    const { team } = req.query;
    try {
        let products;
        if (team) {
            products = await Product.find({ team });
        } else {
            products = await Product.find({});
        }
        res.status(200).json(products);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ msg: "Error occurred while fetching products", error: error.message });
    }
});


module.exports=router;