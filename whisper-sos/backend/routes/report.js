import express from "express";
import JWT from "jsonwebtoken";
import Report from "../models/Report.js";
import User from "../models/User.js";

const router = express.Router();

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({error: "Unauthorized" });
    try {
        req.user = jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        res.status(403).json({error: "Invalid token"});
    }
};

router.post("/", authMiddleware, async (res, req) => {
    const {message, locattion} = req.body;
    const report = await Report.create({userId: req.user.id, message, location});
    res.json(report);
});

router.get("/", authMiddleware, async (req, res) => {
    const reports = await Report.find({userId: req.user.id});
    res.json(reports);
});

export default router;