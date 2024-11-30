const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const z = require("zod");
const bcrypt = require("bcryptjs");
const User = require('../models/User');
require('dotenv').config();



const JWT_SECRET = process.env.JWT_SECRET || "tushar";  


const signupBody = z.object({
    name: z.string().min(1, { message: "Username is required" }),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
     team:z.string()
})

const signinBody = z.object({
    email: z.string().min(1, { message: "Username is required" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});




router.post("/signup", async (req, res) => {
    const parsed = signupBody.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            msg: "Invalid input",
            errors: parsed.error.errors,
        });
    }

    try {
        const { email, name, password,team } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ msg: "Email already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            team,
        });

        const userId = user._id;

        const token = jwt.sign({ userId }, JWT_SECRET,{ expiresIn: '1h' });

        return res.status(200).json({
            msg: "User account created successfully",
            token,
            user: { name: user.name, email: user.email, id: userId, team:user.team },
        });
    } catch (error) {
        console.error("Error during signup:", error);
        return res.status(500).json({ msg: "Server error during signup" });
    }
});

router.post("/signin", async (req, res) => {
    const parsed = signinBody.safeParse(req.body);
    if (!parsed.success) {
        return res.status(400).json({
            msg: "Invalid input",
            errors: parsed.error.errors,
        });
    }
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid username or password" });
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            msg: "Signin successful",
            token,
            user: { name: user.name, email: user.email,team: user.team },
        });
    } catch (err) {
        console.error("Error during signin:", err.message);
        return res.status(500).json({ msg: "Server error during signin" });
    }
});


module.exports=router;