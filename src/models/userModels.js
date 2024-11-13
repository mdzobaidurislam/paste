import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
  },
  password: {
    type: String,
    default: null,
  },
  referral_code: {
    type: String,
    default: null,
  },
  picture: {
    type: String,
    default: null,
  },
  isVerified: {
    type: Boolean,
    default: true,
  },
  monetization: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    // Changed from String to Boolean
    type: Boolean, // This is the key fix
    default: false,
  },
  waiting_time: {
    type: Number,
    default: 2,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  verifyToken: {
    type: String,
    default: null,
  },
  verifyTokenExpiry: {
    type: Date,
    default: null,
  },
});

const User = mongoose.models?.User || mongoose.model("User", userSchema);
export default User;
