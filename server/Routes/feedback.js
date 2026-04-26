import express from "express";
import Fb from "../Models/feedback.js";
import e from "express";

const router = express.Router();

router.post("/add", async (req, res) => {
  let f = new Fb(req.body);
  await f.save();
  res.send(f);
});

router.get("/review/:id", async (req, res) => {
  
  let data = await Fb.find({ reviewId: req.params.id }).populate("fromEmp", "name");
  console.log("aaaabcbcb",data)
  res.send(data);
});

export default router;