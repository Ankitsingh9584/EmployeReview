import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  title: String,
  employeeId: String,
  assigned: [String]
});

export default mongoose.model("Review", reviewSchema);