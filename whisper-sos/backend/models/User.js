import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    trustedContacts: [{ name: String, phone: String}],
    location: {lat: Number, lang: Number}
});

export default mongoose.model("User", userSchema);