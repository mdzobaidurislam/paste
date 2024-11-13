import mongoose from "mongoose";

const pasterSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
  },
  content: {
    type: String,
    required: [true, "Please provide a content"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Paster =
  mongoose.models?.pasters || mongoose.model("pasters", pasterSchema);
export default Paster;
