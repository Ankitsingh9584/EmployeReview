import mongoose from "mongoose";

const empSchema = new mongoose.Schema({
  name: String,
  email: String
});

export default mongoose.model("Employee", empSchema);