import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/register", async (req, res) =>{
    try {
        const {name, email, password} = req.body;
        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashed });
        res.json(user);
    } catch (err) {
        res.status(400).json({ error: err.message});
    }
});

router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) return res.status(400).json({error: "User not found"});

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({error: "Invalid credentials"});

        const token = jwt.sign({id: user._id},process.env.JWT_SECRET, {expiresIn: "1d"});
        res.json({teken, user});
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

export default router;