import mongoose from "mongoose";

const fbSchema = new mongoose.Schema({
  reviewId: String,
  fromEmp: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
  text: String,
});

export default mongoose.model("Feedback", fbSchema);
