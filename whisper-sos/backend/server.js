import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/auth.js";
import reportRoutes from "./routes/report.js";


dotenv.config();
const app = express(); 

//Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(rateLimit({windowsMS: 15 * 60 * 1000, max: 100}))

//Routes
app.use("/api/auth", authRoutes);
app.use("/api/report", reportRoutes); 

const PORT = process.env.PORT || 5000;
mongoose
.connect(process.env.MONGO_URI)
.then(() => app.listen(PORT, () => console.log(`API running on ${PORT}`)))
.catch((err) => console.log (err));


