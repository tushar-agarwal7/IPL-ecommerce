const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const z = require("zod");
const bcrypt = require("bcryptjs");
const User = require('../models/User');
require('dotenv').config();

const IPL_TEAM_COLORS = {
    red: { name: 'RCB', color: '#ff0000', logo: 'url-to-rcb-logo' },
    blue: { name: 'MI', color: '#004ba0', logo: 'url-to-mi-logo' },
    yellow: { name: 'CSK', color: '#ffff00', logo: 'url-to-csk-logo' },
    orange: { name: 'SRH', color: '#ff9933', logo: 'url-to-srh-logo' },
    pink: { name: 'RR', color: '#ff66b3', logo: 'url-to-rr-logo' },
    purple: { name: 'KKR', color: '#800080', logo: 'url-to-kkr-logo' },
    green: { name: 'LSG', color: '#00ff00', logo: 'url-to-lsg-logo' },
    teal: { name: 'DC', color: '#008080', logo: 'url-to-dc-logo' },
    navy: { name: 'GT', color: '#003366', logo: 'url-to-gt-logo' }, // Gujarat Titans
    maroon: { name: 'PBKS', color: '#800000', logo: 'url-to-pbks-logo' } // Punjab Kings
};


const JWT_SECRET = process.env.JWT_SECRET || "tushar";  


const signupBody = z.object({
    name: z.string(),
    email: z.string().email({ message: "Invalid email format" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    color: z.string()
})

const signinBody = z.object({
    email: z.string(),
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
        const { email, name, password, color } = req.body;



  if (!IPL_TEAM_COLORS[color]) {
    return res.status(400).json({ message: 'Invalid color selected' });
  }

  const assignedTeam = IPL_TEAM_COLORS[color].name;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ msg: "Email already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            team:assignedTeam,
        });

        const userId = user._id;


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

       
          return res.status(200).json({
            msg: "Signin successful",
            token,
            user: { 
                name: user.name, 
                email: user.email,
                team: user.team 
            },
        });

    } catch (err) {
        console.error("Error during signin:", err.message);
        return res.status(500).json({ msg: "Server error during signin" });
    }
});

router.put("/update-team", async (req, res) => {
    try {
      

        const { color,userId } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const newTeam = IPL_TEAM_COLORS[color].name;
        
        // Update user's team
        user.team = newTeam;
        await user.save();

      
        return res.status(200).json({
            msg: "Team updated successfully",
            token,
            user: {
                name: user.name,
                email: user.email,
                team: user.team,
                id: user._id
            }
        });

    } catch (error) {
        console.error("Error during team update:", error);
        return res.status(500).json({ msg: "Server error during team update" });
    }
});

module.exports=router;