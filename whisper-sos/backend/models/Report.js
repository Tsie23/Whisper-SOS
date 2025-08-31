import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: { type: String, enum: ["SOS", "Alert"], default: "SOS" },
    message: String,
    location: { lat: Number, lang: Number },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Report", reportSchema);
